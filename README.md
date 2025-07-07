# Starter Admin - Simple Admin Dashboard

Dashboard admin sederhana dengan autentikasi JWT menggunakan Next.js, Prisma, dan MySQL.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment
Copy `.env.local.example` ke `.env` dan sesuaikan:
```env
DATABASE_URL="mysql://root@localhost:3306/starter_admin?authPlugin=mysql_native_password"
JWT_SECRET="your-super-secret-jwt-key"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

### 3. Database Migration
```bash
# Buat migration (seperti di Laravel)
npm run db:migrate

# Atau kalau database sudah ada, reset dulu
npm run db:reset
npm run db:migrate
```

### 4. Run Development Server
```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) dan mulai dengan register user baru.

## 🛠️ Tech Stack

- **Next.js 15** dengan TypeScript
- **Prisma ORM** untuk database (seperti Eloquent di Laravel)
- **MySQL** sebagai database
- **JWT** untuk autentikasi
- **Shadcn/ui** untuk komponen UI
- **Tailwind CSS** untuk styling

## 📁 Struktur Folder

```
src/
├── app/
│   ├── api/auth/           # API routes untuk autentikasi
│   ├── auth/               # Halaman login & register  
│   ├── dashboard/          # Halaman dashboard (protected)
│   └── ...
├── components/
│   ├── auth/               # Komponen autentikasi
│   ├── layout/             # Layout components
│   └── ui/                 # UI components (Shadcn/ui)
├── lib/
│   ├── auth/               # JWT utilities
│   ├── db/                 # Database connection
│   └── utils.ts
└── middleware.ts           # Route protection
```

## 🔐 Fitur

- ✅ **Register/Login** dengan JWT
- ✅ **Protected Routes** dengan middleware
- ✅ **Dashboard** responsive dengan sidebar
- ✅ **Database Migration** seperti Laravel
- ✅ **Modern UI** dengan Shadcn/ui

## 🗃️ Database Commands

```bash
npm run db:migrate          # Buat migration baru
npm run db:studio          # Buka Prisma Studio (seperti phpMyAdmin)
npm run db:reset           # Reset database
npm run db:generate        # Generate Prisma client
```

## 🚀 Deployment

1. Build project: `npm run build`
2. Setup database di production
3. Run migrations: `npm run db:migrate`
4. Deploy ke Vercel/hosting pilihan

---

**Happy Coding!** 🎉
