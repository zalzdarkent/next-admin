"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home,
  Settings,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  User,
  ChevronUp,
} from "lucide-react";

interface SidebarProps {
  isOpen?: boolean;
  isCollapsed?: boolean;
  onMobileToggle?: () => void;
  currentUser?: {
    id: number;
    name: string | null;
    email: string;
  };
}

export default function Sidebar({
  isOpen,
  isCollapsed,
  onMobileToggle,
  currentUser,
}: SidebarProps) {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Use isOpen prop if provided, otherwise use internal state
  const sidebarOpen = isOpen !== undefined ? isOpen : isMobileMenuOpen;

  const handleMobileToggle = () => {
    if (onMobileToggle) {
      onMobileToggle();
    } else {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.push("/auth/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const menuGroups = [
    {
      label: "Main",
      items: [
        {
          title: "Dashboard",
          icon: Home,
          href: "/dashboard",
        },
      ],
    }
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
        onClick={handleMobileToggle}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 bg-white shadow-lg transform transition-all duration-500 ease-in-out
        md:translate-x-0
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        ${isCollapsed ? "w-20" : "w-64"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="flex items-center h-14 px-4 border-b hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => {
              if (onMobileToggle && sidebarOpen) {
                onMobileToggle();
              } else if (!onMobileToggle) {
                setIsMobileMenuOpen(false);
              }
            }}
          >
            <LayoutDashboard className="w-5 h-5 text-blue-600 flex-shrink-0 transition-all duration-300" />
            <div
              className={`overflow-hidden transition-all duration-300 ${
                isCollapsed ? "w-0 ml-0" : "w-full ml-3"
              }`}
            >
              <h1 className="text-lg font-bold text-gray-800 whitespace-nowrap">
                Starter Admin
              </h1>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-5">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex} className="space-y-1">
                {/* Group Label - hide when collapsed */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isCollapsed ? "h-0 opacity-0" : "h-auto opacity-100"
                  }`}
                >
                  <h3 className="px-3 text-xs font-medium text-gray-400 tracking-wide mb-2 whitespace-nowrap">
                    {group.label}
                  </h3>
                </div>

                {/* Group Items */}
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 ${
                        isCollapsed ? "justify-center" : ""
                      }`}
                      onClick={() => {
                        if (onMobileToggle && sidebarOpen) {
                          onMobileToggle();
                        } else if (!onMobileToggle) {
                          setIsMobileMenuOpen(false);
                        }
                      }}
                      title={isCollapsed ? item.title : undefined}
                    >
                      <item.icon className="w-4 h-4 flex-shrink-0 transition-all duration-300" />
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isCollapsed ? "w-0 ml-0" : "w-full ml-3"
                        }`}
                      >
                        <span className="whitespace-nowrap">{item.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* User info dropdown */}
          <div className="border-t p-3">
            <div className="relative">
              {!isCollapsed ? (
                /* Full user info */
                <button
                  className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                    <User size={16} className="text-white" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">
                      {currentUser?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {currentUser?.email}
                    </p>
                  </div>
                  <ChevronUp
                    size={16}
                    className={`text-gray-400 transition-transform ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
              ) : (
                /* Collapsed user avatar - clickable */
                <button
                  className="w-full flex justify-center"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div
                    className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                    title={currentUser?.name || "User"}
                  >
                    <User size={18} className="text-white" />
                  </div>
                </button>
              )}

              {/* Dropdown menu - works for both expanded and collapsed */}
              {isUserMenuOpen && (
                <>
                  {isCollapsed ? (
                    /* Collapsed dropdown - positioned to the right */
                    <div className="fixed bottom-16 left-20 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                      {/* User header in dropdown */}
                      <div className="px-3 py-2 border-b border-gray-100">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                            <User size={16} className="text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {currentUser?.name || "User"}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {currentUser?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="py-1">
                        <button
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            router.push('/dashboard/account');
                          }}
                        >
                          <User size={16} className="mr-3 text-gray-500" />
                          Account
                        </button>
                        <button
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            router.push('/dashboard/settings');
                          }}
                        >
                          <Settings size={16} className="mr-3 text-gray-500" />
                          Settings
                        </button>
                        <hr className="my-1 border-gray-100" />
                        <button
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            handleLogout();
                          }}
                        >
                          <LogOut size={16} className="mr-3 text-gray-500" />
                          Log out
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Expanded dropdown - normal positioning */
                    <div className="absolute bottom-full left-0 right-0 mb-1 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-50">
                      {/* User header in dropdown */}
                      <div className="px-3 py-2 border-b border-gray-100">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                            <User size={16} className="text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {currentUser?.name || "User"}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {currentUser?.email}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Menu items */}
                      <div className="py-1">
                        <button
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            router.push('/dashboard/account');
                          }}
                        >
                          <User size={16} className="mr-3 text-gray-500" />
                          Account
                        </button>
                        <button
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            router.push('/dashboard/settings');
                          }}
                        >
                          <Settings size={16} className="mr-3 text-gray-500" />
                          Settings
                        </button>
                        <hr className="my-1 border-gray-100" />
                        <button
                          className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            handleLogout();
                          }}
                        >
                          <LogOut size={16} className="mr-3 text-gray-500" />
                          Log out
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
