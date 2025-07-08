import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Activity, TrendingUp, Settings } from 'lucide-react'

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Users',
      value: '1',
      description: 'Jumlah user terdaftar',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Active Sessions',
      value: '1',
      description: 'Session yang aktif',
      icon: Activity,
      color: 'bg-green-500',
    },
    {
      title: 'Growth',
      value: '+100%',
      description: 'Pertumbuhan bulan ini',
      icon: TrendingUp,
      color: 'bg-purple-500',
    },
    {
      title: 'System',
      value: 'Online',
      description: 'Status sistem',
      icon: Settings,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Selamat Datang di Dashboard
        </h1>
        <p className="text-gray-600">
          Ini adalah halaman dashboard admin sederhana yang dilengkapi dengan sistem autentikasi JWT.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center justify-between">
                <span>{stat.title}</span>
                <div className={`p-2 rounded-md ${stat.color} text-white`}>
                  <stat.icon className="w-4 h-4" />
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-2xl font-bold mb-1">
                {stat.value}
              </CardTitle>
              <p className="text-sm text-gray-600">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
            <CardDescription>
              Menu aksi yang sering digunakan
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <h3 className="font-medium">Kelola User</h3>
              <p className="text-sm text-gray-600">Tambah, edit, atau hapus user</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <h3 className="font-medium">Pengaturan</h3>
              <p className="text-sm text-gray-600">Konfigurasi sistem dan preferensi</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <h3 className="font-medium">Laporan</h3>
              <p className="text-sm text-gray-600">Lihat laporan dan analisis</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
            <CardDescription>
              Log aktivitas sistem
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">User berhasil login</p>
                <p className="text-xs text-gray-500">Baru saja</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Sistem dashboard aktif</p>
                <p className="text-xs text-gray-500">2 menit yang lalu</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Database terhubung</p>
                <p className="text-xs text-gray-500">5 menit yang lalu</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Section */}
      <Card>
        <CardHeader>
          <CardTitle>Tentang Aplikasi</CardTitle>
          <CardDescription>
            Informasi tentang Starter Admin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2">Teknologi</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Next.js 15</li>
                <li>• TypeScript</li>
                <li>• Prisma ORM</li>
                <li>• MySQL Database</li>
                <li>• JWT Authentication</li>
                <li>• Tailwind CSS</li>
                <li>• Shadcn/ui Components</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Fitur</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Login & Register</li>
                <li>• JWT Token Auth</li>
                <li>• Protected Routes</li>
                <li>• Responsive Design</li>
                <li>• Modern UI</li>
                <li>• Dark Mode Ready</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Status</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• ✅ Authentication</li>
                <li>• ✅ Database Connection</li>
                <li>• ✅ API Routes</li>
                <li>• ✅ Middleware</li>
                <li>• ✅ UI Components</li>
                <li>• 🚀 Ready to Use</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
