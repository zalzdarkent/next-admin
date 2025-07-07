import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword, generateToken } from '@/lib/auth/jwt'
import { z } from 'zod'

const RegisterSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  password: z.string().min(6, 'Password minimal 6 karakter'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validasi input
    const validation = RegisterSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Data tidak valid', 
          details: validation.error.errors 
        },
        { status: 400 }
      )
    }

    const { name, email, password } = validation.data

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Generate JWT token
    const token = generateToken({
      userId: 0, // sementara, akan diupdate setelah user dibuat
      email,
    })

    // Buat user baru
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        token,
      },
    })

    // Update token dengan userId yang benar
    const finalToken = generateToken({
      userId: user.id,
      email: user.email,
    })

    await prisma.user.update({
      where: { id: user.id },
      data: { token: finalToken },
    })

    // Set cookie
    const response = NextResponse.json({
      message: 'Registrasi berhasil',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      token: finalToken,
    })

    response.cookies.set('token', finalToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server' },
      { status: 500 }
    )
  }
}
