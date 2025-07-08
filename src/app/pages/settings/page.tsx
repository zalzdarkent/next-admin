import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Settings, Database, Globe, Shield, Palette, Bell } from 'lucide-react'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
        <p className="text-gray-600 mt-1">Kelola pengaturan aplikasi dan konfigurasi sistem</p>
      </div>

      {/* Application Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe size={20} />
              Application Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Application Name
              </label>
              <input
                type="text"
                defaultValue="Starter Admin"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Application URL
              </label>
              <input
                type="url"
                defaultValue="https://starter-admin.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Default Language
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="id">Indonesian</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
              </select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette size={20} />
              Theme & Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Default Theme
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button className="p-3 border-2 border-blue-500 rounded-lg bg-white text-center">
                  <div className="w-full h-8 bg-gray-100 rounded mb-2"></div>
                  <span className="text-xs">Light</span>
                </button>
                <button className="p-3 border rounded-lg bg-gray-800 text-white text-center">
                  <div className="w-full h-8 bg-gray-600 rounded mb-2"></div>
                  <span className="text-xs">Dark</span>
                </button>
                <button className="p-3 border rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white text-center">
                  <div className="w-full h-8 bg-blue-400 rounded mb-2"></div>
                  <span className="text-xs">Auto</span>
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Color
              </label>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded border-2 border-gray-300 cursor-pointer"></div>
                <div className="w-8 h-8 bg-green-600 rounded border-2 border-gray-300 cursor-pointer"></div>
                <div className="w-8 h-8 bg-purple-600 rounded border-2 border-gray-300 cursor-pointer"></div>
                <div className="w-8 h-8 bg-red-600 rounded border-2 border-gray-300 cursor-pointer"></div>
                <div className="w-8 h-8 bg-orange-600 rounded border-2 border-gray-300 cursor-pointer"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database size={20} />
              Database Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-medium text-green-800">Database Status</h3>
              <p className="text-sm text-green-600">Connected - MySQL 8.0</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Records:</span>
                <span className="text-sm font-medium">1,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Database Size:</span>
                <span className="text-sm font-medium">45.2 MB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Last Backup:</span>
                <span className="text-sm font-medium">2 hours ago</span>
              </div>
            </div>
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Create Backup Now
            </button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield size={20} />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Force HTTPS</h3>
                <p className="text-sm text-gray-600">Redirect all HTTP traffic to HTTPS</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Session Timeout</h3>
                <p className="text-sm text-gray-600">Auto logout after inactivity</p>
              </div>
              <select className="px-2 py-1 border rounded text-sm">
                <option>30 minutes</option>
                <option>1 hour</option>
                <option>2 hours</option>
                <option>4 hours</option>
              </select>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Enable Registration</h3>
                <p className="text-sm text-gray-600">Allow new users to register</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell size={20} />
            System Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Error Alerts</h3>
                <p className="text-sm text-gray-600">System error notifications</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">User Registration</h3>
                <p className="text-sm text-gray-600">New user signup alerts</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Daily Reports</h3>
                <p className="text-sm text-gray-600">Daily activity summary</p>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Backup Status</h3>
                <p className="text-sm text-gray-600">Database backup alerts</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Security Events</h3>
                <p className="text-sm text-gray-600">Login attempts & security</p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium">Maintenance Mode</h3>
                <p className="text-sm text-gray-600">Scheduled maintenance alerts</p>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings size={20} />
            System Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2">Application</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Version: 1.0.0</li>
                <li>Environment: Development</li>
                <li>Build: #12345</li>
                <li>Last Updated: Today</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Database</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Type: MySQL</li>
                <li>Status: Connected</li>
                <li>Version: 8.0</li>
                <li>Last Backup: 2 hours ago</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Server</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>Runtime: Node.js 18</li>
                <li>Memory Usage: 245 MB</li>
                <li>Uptime: 2 days</li>
                <li>Status: Healthy</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Save Settings */}
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Save All Settings
        </button>
      </div>
    </div>
  )
}
