"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertIcon } from "@/components/ui/alert";
import { Loader2, CheckCircle } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{
    message: string;
    type: 'validation' | 'auth' | 'server';
    details?: string[];
  } | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Menentukan tipe error berdasarkan status dan response
        let errorType: 'validation' | 'auth' | 'server' = 'server';
        let errorMessage = "Terjadi kesalahan yang tidak diketahui";
        let errorDetails: string[] | undefined = undefined;

        if (response.status === 400) {
          errorType = 'validation';
          errorMessage = "Data yang dimasukkan tidak valid";
          errorDetails = data.details?.map((detail: { message: string }) => detail.message) || [];
        } else if (response.status === 401) {
          errorType = 'auth';
          errorMessage = data.error || "Email atau password yang Anda masukkan salah.";
        } else if (response.status >= 500) {
          errorType = 'server';
          errorMessage = "Terjadi kesalahan pada server. Silakan coba lagi nanti.";
        }

        setError({
          message: errorMessage,
          type: errorType,
          details: errorDetails
        });
        return;
      }

      // Tampilkan success alert
      setSuccess(true);
      
      // Redirect ke dashboard setelah delay singkat
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1500);
    } catch {
      setError({
        message: "Tidak dapat terhubung ke server. Periksa koneksi internet Anda.",
        type: 'server'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Starter Admin</h1>
          <p className="mt-2 text-sm text-gray-600">
            Silakan login untuk melanjutkan
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>Masukkan email dan password Anda</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {success && (
                <Alert variant="success" className="animate-in slide-in-from-top-2">
                  <AlertIcon variant="success" />
                  <AlertDescription>
                    <div className="font-medium mb-1">Login Berhasil!</div>
                    <div className="text-sm">
                      Selamat datang! Anda akan dialihkan ke dashboard dalam beberapa saat...
                    </div>
                  </AlertDescription>
                </Alert>
              )}
              
              {error && (
                <Alert variant="destructive" className="animate-in slide-in-from-top-2">
                  <AlertIcon variant="destructive" />
                  <AlertDescription>
                    <div className="font-medium mb-1">
                      {error.type === 'auth' && "Login Gagal"}
                      {error.type === 'validation' && "Data Tidak Valid"}
                      {error.type === 'server' && "Kesalahan Server"}
                    </div>
                    <div className="text-sm">{error.message}</div>
                    {error.details && error.details.length > 0 && (
                      <ul className="mt-2 text-sm list-disc list-inside space-y-1">
                        {error.details.map((detail, index) => (
                          <li key={index}>{detail}</li>
                        ))}
                      </ul>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="nama@email.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Masukkan password"
                />
              </div>

              <Button 
                type="submit" 
                className={`w-full transition-all duration-300 ${
                  success 
                    ? "bg-green-600 hover:bg-green-700 border-green-600" 
                    : ""
                }`} 
                disabled={isLoading || success}
              >
                {success ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Berhasil! Mengalihkan...
                  </>
                ) : isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Login...
                  </>
                ) : (
                  "Login"
                )}
              </Button>

              <div className="text-center text-sm">
                <span className="text-gray-600">Belum punya akun? </span>
                <Link
                  href="/auth/register"
                  className="font-medium text-primary hover:underline"
                >
                  Daftar di sini
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
