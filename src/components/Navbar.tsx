'use client'

import { useAuth } from '@/contexts/AuthContext'
import { BarChart3, Bell, Facebook, LogOut, Menu, Scale, Shield, Trash2, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-facebook-500 rounded-lg">
              <Facebook className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">AutoPost</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-gray-700 hover:text-facebook-500 transition-colors duration-200"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            )}
            
            {/* Legal Links */}
            <div className="flex items-center space-x-4">
              <Link
                href="/privacy"
                className="flex items-center space-x-1 text-gray-600 hover:text-facebook-500 transition-colors duration-200 text-sm"
              >
                <Shield className="w-3 h-3" />
                <span>Privacy</span>
              </Link>
              <Link
                href="/terms"
                className="flex items-center space-x-1 text-gray-600 hover:text-facebook-500 transition-colors duration-200 text-sm"
              >
                <Scale className="w-3 h-3" />
                <span>Terms</span>
              </Link>
              <Link
                href="/data-deletion"
                className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors duration-200 text-sm"
              >
                <Trash2 className="w-3 h-3" />
                <span>Delete Data</span>
              </Link>
            </div>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>
                  <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {user?.name?.charAt(0)?.toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors duration-200"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <>
                <Link href="/auth/login" className="btn-secondary">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="btn-primary">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-facebook-500 focus:outline-none focus:text-facebook-500"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
              {isAuthenticated && (
                <Link
                  href="/dashboard"
                  className="flex items-center space-x-3 text-gray-700 hover:text-facebook-500 hover:bg-gray-50 px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BarChart3 className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
              )}
              
              {/* Legal Links for Mobile */}
              <div className="border-t border-gray-200 pt-2 mt-2">
                <Link
                  href="/privacy"
                  className="flex items-center space-x-3 text-gray-600 hover:text-facebook-500 hover:bg-gray-50 px-3 py-2 rounded-md text-sm transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Shield className="w-4 h-4" />
                  <span>Privacy Policy</span>
                </Link>
                <Link
                  href="/terms"
                  className="flex items-center space-x-3 text-gray-600 hover:text-facebook-500 hover:bg-gray-50 px-3 py-2 rounded-md text-sm transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Scale className="w-4 h-4" />
                  <span>Terms of Service</span>
                </Link>
                <Link
                  href="/data-deletion"
                  className="flex items-center space-x-3 text-gray-600 hover:text-red-500 hover:bg-gray-50 px-3 py-2 rounded-md text-sm transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete Data</span>
                </Link>
              </div>
              <div className="pt-4 space-y-2">
                {isAuthenticated ? (
                  <>
                    <div className="flex items-center space-x-3 px-3 py-2">
                      <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg">
                        <Bell className="h-5 w-5" />
                        <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                      </button>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                          <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                        <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {user?.name?.charAt(0)?.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                      className="w-full flex items-center justify-center space-x-2 text-gray-700 hover:text-red-600 px-3 py-2 rounded-md transition-colors duration-200"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="w-full btn-secondary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="w-full btn-primary"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
