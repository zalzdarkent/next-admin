'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, ChevronRight, Home } from 'lucide-react'
import Sidebar from '@/components/layout/Sidebar'

interface User {
  id: number
  name: string | null
  email: string
}

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  // Generate breadcrumb from pathname
  const generateBreadcrumb = () => {
    const paths = pathname.split('/').filter(Boolean)
    const breadcrumbs = [{ name: 'Dashboard', href: '/dashboard' }]
    
    let currentPath = ''
    paths.forEach((path, index) => {
      currentPath += `/${path}`
      if (index > 0) { // Skip 'dashboard' as it's already added
        const name = path.charAt(0).toUpperCase() + path.slice(1)
        breadcrumbs.push({ name, href: currentPath })
      }
    })
    
    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumb()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/me')
        if (response.ok) {
          const data = await response.json()
          setUser(data.user)
        } else {
          // Jika gagal mendapatkan user, redirect ke login
          router.push('/auth/login')
        }
      } catch (error) {
        console.error('Error fetching user:', error)
        router.push('/auth/login')
      } finally {
        setIsLoading(false)
      }
    }

    fetchUser()
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Component will redirect to login
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Fixed */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        currentUser={user} 
        isCollapsed={isSidebarCollapsed}
        onMobileToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      {/* Main content area - dengan margin left untuk desktop */}
      <div className={`transition-all duration-500 ease-in-out ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        {/* Content wrapper card */}
        <div className="p-4 md:p-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-3rem)]">
            {/* Header with breadcrumb and toggle */}
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
              <div className="flex items-center space-x-4">
                {/* Desktop sidebar collapse toggle button */}
                <button
                  onClick={toggleSidebarCollapse}
                  className="hidden md:flex p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Menu size={20} className="text-gray-600" />
                </button>

                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-sm">
                  <Home size={16} className="text-gray-400" />
                  {breadcrumbs.map((breadcrumb, index) => (
                    <div key={breadcrumb.href} className="flex items-center">
                      {index > 0 && <ChevronRight size={16} className="text-gray-400 mx-2" />}
                      <a
                        href={breadcrumb.href}
                        className={`${
                          index === breadcrumbs.length - 1
                            ? 'text-gray-900 font-medium'
                            : 'text-gray-500 hover:text-gray-700'
                        } transition-colors`}
                      >
                        {breadcrumb.name}
                      </a>
                    </div>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main content */}
            <div className="p-4 md:p-6">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  )
}
