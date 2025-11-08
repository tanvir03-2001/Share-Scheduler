'use client'

import Tooltip from '@/components/ui/Tooltip'
import { useAuth } from '@/contexts/AuthContext'
import { usePage } from '@/contexts/PageContext'
import { useSidebar } from '@/contexts/SidebarContext'
import { apiClient, FacebookConnectionStatus, FacebookPage } from '@/lib/api'
import {
    AlertCircle,
    ArrowRight,
    BarChart3,
    Bell,
    Calendar,
    CheckCircle,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Clock,
    Eye,
    EyeOff,
    Facebook,
    FileText,
    Image,
    Loader2,
    Lock,
    LogOut,
    Mail,
    MessageSquare,
    Minus,
    Plus,
    Settings,
    TrendingUp,
    Type,
    User,
    Users,
    Video
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

interface SidebarProps {
  activeTab?: string
}

interface LoginFormData {
  email: string
  password: string
}


const sidebarItems = [
  {
    id: 'schedule',
    label: 'Content & Post',
    icon: Calendar,
    description: 'Manage content and posts',
    href: '/dashboard/schedule'
  },
  {
    id: 'posts',
    label: 'Post Content',
    icon: FileText,
    description: 'Create and manage posts',
    href: '/dashboard/posts'
  },
  {
    id: 'reels',
    label: 'Reels',
    icon: Video,
    description: 'Create and schedule reels',
    href: '/dashboard/reels'
  },
  {
    id: 'stories',
    label: 'Stories',
    icon: Image,
    description: 'Manage story content',
    href: '/dashboard/stories'
  },
  {
    id: 'text',
    label: 'Text Posts',
    icon: Type,
    description: 'Create text-only posts',
    href: '/dashboard/text-posts'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    description: 'View performance metrics',
    href: '/dashboard/analytics'
  },
  {
    id: 'audience',
    label: 'Audience',
    icon: Users,
    description: 'Manage audience insights',
    href: '/dashboard/audience'
  },
  {
    id: 'history',
    label: 'Post History',
    icon: Clock,
    description: 'View past posts',
    href: '/dashboard/post-history'
  },
  {
    id: 'trending',
    label: 'Trending',
    icon: TrendingUp,
    description: 'Discover trending content',
    href: '/dashboard/trending'
  },
  {
    id: 'comments',
    label: 'Comments',
    icon: MessageSquare,
    description: 'Manage comments',
    href: '/dashboard/comments'
  }
]

export default function Sidebar({ activeTab }: SidebarProps) {
  const { user, logout, login, isLoading } = useAuth()
  const { isCollapsed, isMobile, isMobileMenuOpen, toggleSidebar, closeMobileMenu } = useSidebar()
  const { selectedPage, setSelectedPage } = usePage()
  const pathname = usePathname()
  const router = useRouter()
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false)
  const [pages, setPages] = useState<FacebookPage[]>([])
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<FacebookConnectionStatus | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pageDropdownRef = useRef<HTMLDivElement>(null)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<LoginFormData>()

  // Load Facebook connection status on mount
  useEffect(() => {
    if (user) {
      loadConnectionStatus()
    }
  }, [user])

  // Reload connection status when returning from Facebook callback
  useEffect(() => {
    const handleFocus = () => {
      if (user) {
        loadConnectionStatus()
      }
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [user])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false)
      }
      if (pageDropdownRef.current && !pageDropdownRef.current.contains(event.target as Node)) {
        setIsPageDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  // Load Facebook connection status
  const loadConnectionStatus = async () => {
    try {
      setError(null)
      const response = await apiClient.getFacebookConnectionStatus()
      
      if (response.success && response.data) {
        setConnectionStatus(response.data)
        setPages(response.data.pages)
        
        // Debug: Log page data to check picture URLs
        console.log('Facebook pages loaded:', response.data.pages.map(page => ({
          name: page.pageName,
          picture: page.picture,
          followers: page.followersCount
        })))
        
        // Auto-select default active page if none selected
        if (response.data.pages.length > 0 && !selectedPage) {
          const defaultActivePage = response.data.pages.find(page => page.isDefaultActive) || response.data.pages[0]
          setSelectedPage(defaultActivePage)
        }
      } else {
        setError(response.error || 'Failed to load connection status')
      }
    } catch (err) {
      setError('Failed to load connection status')
      console.error('Error loading connection status:', err)
    }
  }

  // Helper function to format follower count
  const formatFollowerCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`
    }
    return count.toString()
  }

  // Handle page selection
  const handlePageSelect = async (page: FacebookPage) => {
    try {
      // Call API to set this page as active
      await apiClient.setActiveFacebookPage(page.pageId)
      
      // Update local state
      setSelectedPage(page)
      setIsPageDropdownOpen(false)
    } catch (err) {
      console.error('Error setting active page:', err)
      // Still update local state even if API call fails
      setSelectedPage(page)
      setIsPageDropdownOpen(false)
    }
  }

  // Handle Facebook connection
  const handleConnectFacebook = async () => {
    try {
      setIsConnecting(true)
      setError(null)
      const response = await apiClient.generateFacebookUserAuthUrl()
      
      if (response.success && response.data) {
        window.location.href = response.data.authUrl
      } else {
        setError(response.error || 'Failed to generate Facebook auth URL')
      }
    } catch (err) {
      setError('Failed to connect Facebook account')
      console.error('Error connecting Facebook:', err)
    } finally {
      setIsConnecting(false)
    }
  }

  // Handle Facebook reconnect
  const handleReconnectFacebook = async () => {
    try {
      setIsConnecting(true)
      setError(null)
      const response = await apiClient.generateFacebookUserAuthUrl(true) // Pass true for reconnect
      
      if (response.success && response.data) {
        window.location.href = response.data.authUrl
      } else {
        setError(response.error || 'Failed to generate Facebook auth URL')
      }
    } catch (err) {
      setError('Failed to reconnect Facebook account')
      console.error('Error reconnecting Facebook:', err)
    } finally {
      setIsConnecting(false)
    }
  }

  // Handle page removal
  const handleRemovePage = (pageId: string) => {
    const updatedPages = pages.filter(page => page.pageId !== pageId)
    setPages(updatedPages)
    
    // If the removed page was selected, clear selection
    if (selectedPage?.pageId === pageId) {
      setSelectedPage(null)
    }
    setIsPageDropdownOpen(false)
  }

  // Handle login form submission
  const onSubmit = async (data: LoginFormData) => {
    const success = await login(data.email, data.password)
    if (success) {
      setShowLoginForm(false)
      reset()
      router.push('/dashboard')
    }
  }

  // Handle quick login for demo
  const handleQuickLogin = async (email: string, password: string) => {
    const success = await login(email, password)
    if (success) {
      setShowLoginForm(false)
      router.push('/dashboard')
    }
  }

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 bg-white shadow-lg border-r border-gray-100 h-screen flex flex-col z-50 transition-all duration-300 ${
        isMobile 
          ? (isMobileMenuOpen ? 'w-64' : '-translate-x-full')
          : (isCollapsed ? 'w-16' : 'w-64')
      }`}>
      {/* Logo and Toggle Button */}
      <div className="p-2 md:p-3 border-b border-gray-100 flex items-center justify-between relative">
        <div className="flex items-center space-x-2 overflow-hidden">
          <div className="flex items-center justify-center w-6 h-6 md:w-8 md:h-8 bg-facebook-500 rounded-lg flex-shrink-0">
            <Facebook className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <span className={`text-sm md:text-lg font-bold text-gray-900 transition-all duration-300 ${
            isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
          }`}>
            AutoPost
          </span>
        </div>
        
        {/* Unified Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={`transition-all duration-200 flex items-center justify-center z-10 ${
            isCollapsed && !isMobile
              ? 'absolute top-2 right-2 md:top-3 md:right-3 w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md'
              : 'p-2 rounded-lg bg-blue-500 hover:bg-blue-600 shadow-sm flex-shrink-0'
          }`}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-white" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-white" />
          )}
        </button>
      </div>

      {/* Facebook Connection Section - Show when user is authenticated */}
      {user && (
        <div className="p-2 md:p-3 border-b border-gray-100">
          {error && (
            <div className="mb-2 p-2 bg-red-50 border border-red-200 rounded text-xs">
              <div className="flex items-center">
                <AlertCircle className="h-3 w-3 text-red-400 mr-1 flex-shrink-0" />
                <p className="text-red-800 text-xs">{error}</p>
              </div>
            </div>
          )}

          {!connectionStatus?.isConnected ? (
            // Show connect button when not connected
            <button
              onClick={handleConnectFacebook}
              disabled={isConnecting}
              className={`w-full flex items-center justify-center p-2 rounded-lg bg-facebook-500 hover:bg-facebook-600 disabled:bg-gray-400 text-white transition-colors ${
                isCollapsed ? 'flex-col space-y-1' : 'space-x-2'
              }`}
            >
              {isConnecting ? (
                <Loader2 className="h-4 w-4 animate-spin flex-shrink-0" />
              ) : (
                <Facebook className="h-4 w-4 flex-shrink-0" />
              )}
              {!isCollapsed && (
                <span className="text-xs font-medium">
                  {isConnecting ? 'Connecting...' : 'Connect Facebook'}
                </span>
              )}
            </button>
          ) : (
            // Show connected status and page management
            <div className="space-y-2">
              {/* Connection Status */}
              <div className="flex items-center p-2 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                {!isCollapsed && (
                  <div className="flex-1">
                    <p className="text-xs font-medium text-green-800">Connected</p>
                    <p className="text-xs text-green-600">
                      Facebook Connected
                    </p>
                  </div>
                )}
              </div>

              {/* Page Management */}
              {pages.length > 0 ? (
                <div className="relative" ref={pageDropdownRef}>
                  {/* Current Page Display */}
                  <button
                    onClick={() => setIsPageDropdownOpen(!isPageDropdownOpen)}
                    className={`w-full flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors ${
                      isCollapsed ? 'justify-center' : 'justify-between'
                    }`}
                  >
                    <div className={`flex items-center transition-all duration-300 ${
                      isCollapsed ? 'flex-col space-y-1' : 'space-x-2'
                    }`}>
                      {selectedPage?.picture ? (
                        <img
                          src={selectedPage.picture}
                          alt={selectedPage.pageName}
                          className="h-6 w-6 rounded object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="h-6 w-6 bg-facebook-500 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-xs font-bold">
                            {selectedPage?.pageName?.charAt(0)?.toUpperCase() || 'F'}
                          </span>
                        </div>
                      )}
                      {!isCollapsed && selectedPage && (
                        <div className="flex-1 text-left">
                          <p className="text-xs font-medium text-gray-900 truncate">{selectedPage.pageName}</p>
                          <p className="text-xs text-gray-500">{formatFollowerCount(selectedPage.followersCount || 0)} followers</p>
                        </div>
                      )}
                    </div>
                    {!isCollapsed && (
                      <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform duration-200 ${
                        isPageDropdownOpen ? 'rotate-180' : ''
                      }`} />
                    )}
                  </button>

                  {/* Page Dropdown Menu */}
                  {isPageDropdownOpen && (
                    <div className={`absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 ${
                      isCollapsed ? 'w-48 left-0' : 'w-full'
                    }`}>
                      <div className="py-1">
                        {/* Reconnect Button */}
                        <button
                          onClick={handleReconnectFacebook}
                          disabled={isConnecting}
                          className="w-full flex items-center px-3 py-2 text-xs text-blue-600 hover:bg-blue-50 transition-colors disabled:opacity-50"
                        >
                          <Facebook className="h-3 w-3 mr-2 text-blue-500" />
                          {isConnecting ? 'Reconnecting...' : 'Reconnect Account'}
                        </button>
                        
                        {/* Divider */}
                        <div className="border-t border-gray-100 my-1"></div>
                        
                        {/* Connected Pages */}
                        {pages.map((page) => (
                          <div key={page.pageId} className="group">
                            <button
                              onClick={() => handlePageSelect(page)}
                              className={`w-full flex items-center px-3 py-2 text-xs transition-colors ${
                                selectedPage?.pageId === page.pageId 
                                  ? 'bg-blue-50 text-blue-700' 
                                  : 'text-gray-700 hover:bg-gray-50'
                              }`}
                            >
                              {page.picture ? (
                                <img
                                  src={page.picture}
                                  alt={page.pageName}
                                  className="h-5 w-5 rounded object-cover mr-2 flex-shrink-0"
                                />
                              ) : (
                                <div className="h-5 w-5 bg-facebook-500 rounded flex items-center justify-center mr-2 flex-shrink-0">
                                  <span className="text-white text-xs font-bold">
                                    {page.pageName?.charAt(0)?.toUpperCase() || 'P'}
                                  </span>
                                </div>
                              )}
                              <div className="flex-1 text-left">
                                <p className="font-medium truncate">{page.pageName}</p>
                                <p className="text-xs text-gray-500">{formatFollowerCount(page.followersCount || 0)} followers</p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleRemovePage(page.pageId)
                                }}
                                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 text-red-500 hover:text-red-700 transition-all duration-200"
                                title="Remove page"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleReconnectFacebook}
                  disabled={isConnecting}
                  className={`w-full flex items-center justify-center p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors ${
                    isCollapsed ? 'flex-col space-y-1' : 'space-x-2'
                  }`}
                >
                  <Plus className="h-4 w-4 text-blue-500 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-xs font-medium">Add Pages</span>
                  )}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Login Form Section - Show when user is not authenticated */}
      {!user && (
        <div className="p-2 md:p-3 border-b border-gray-100">
          {!showLoginForm ? (
            <button
              onClick={() => setShowLoginForm(true)}
              className={`w-full flex items-center justify-center p-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition-colors ${
                isCollapsed ? 'flex-col space-y-2' : 'space-x-2'
              }`}
            >
              <User className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && (
                <span className="text-sm font-medium">Login</span>
              )}
            </button>
          ) : (
            <div className="space-y-3">
              {/* Quick Login Buttons */}
              <div className="space-y-2">
                <button
                  onClick={() => handleQuickLogin('test@example.com', 'password123')}
                  className="w-full text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 py-1 px-2 rounded transition-colors"
                >
                  Demo User
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                {/* Email Field */}
                <div className="space-y-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <Mail className="h-3 w-3 text-gray-400" />
                    </div>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email',
                        },
                      })}
                      type="email"
                      className="w-full pl-6 pr-2 py-1.5 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      placeholder="Email"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email.message}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                      <Lock className="h-3 w-3 text-gray-400" />
                    </div>
                    <input
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Min 6 characters',
                        },
                      })}
                      type={showPassword ? 'text' : 'password'}
                      className="w-full pl-6 pr-8 py-1.5 text-xs border border-gray-200 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-2 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-3 w-3 text-gray-400" />
                      ) : (
                        <Eye className="h-3 w-3 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500">{errors.password.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-1 py-1.5 px-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded text-xs font-medium transition-colors"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-3 w-3 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign in
                      <ArrowRight className="h-3 w-3" />
                    </>
                  )}
                </button>
              </form>

              {/* Cancel Button */}
              <button
                onClick={() => {
                  setShowLoginForm(false)
                  reset()
                }}
                className="w-full text-xs text-gray-500 hover:text-gray-700 py-1 transition-colors"
              >
                Cancel
              </button>

              {/* Sign Up Link */}
              <div className="text-center">
                <Link
                  href="/auth/signup"
                  className="text-xs text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Create account
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto p-2 md:p-3 scrollbar-thin">
        {/* Navigation Items */}
        <div className="mb-4">
          <h3 className={`text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 transition-all duration-300 overflow-hidden ${
            isCollapsed ? 'opacity-0 h-0' : 'opacity-100 h-auto'
          }`}>
            Menus
          </h3>
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Tooltip key={item.id} content={isCollapsed ? item.description : ''} position="right">
                  <Link
                    href={item.href}
                    onClick={() => isMobile && closeMobileMenu()}
                    className={`w-full flex items-center p-2 rounded-lg text-left transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                  >
                    <Icon 
                      className={`h-4 w-4 flex-shrink-0 ${isCollapsed ? '' : 'mr-3'} ${
                        isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-600'
                      }`} 
                    />
                    <span className={`font-medium text-xs md:text-sm transition-all duration-300 overflow-hidden ${
                      isCollapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
                    }`}>
                      {item.label}
                    </span>
                  </Link>
                </Tooltip>
              )
            })}
          </nav>
        </div>
      </div>
      
      {/* Bottom Section - User Info with Dropdown */}
      <div className="p-2 md:p-3 border-t border-gray-100">
        <div className="relative" ref={dropdownRef}>
          {/* User Info Button */}
          <button
            onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
            className={`w-full flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors ${
              isCollapsed ? 'justify-center' : 'justify-between'
            }`}
          >
            <div className={`flex items-center transition-all duration-300 ${
              isCollapsed ? 'flex-col space-y-2' : 'space-x-3'
            }`}>
              <div className="h-10 w-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-medium">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
              {!isCollapsed && (
                <div className="flex-1 text-left">
                  <p className="text-xs md:text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                isUserDropdownOpen ? 'rotate-180' : ''
              }`} />
            )}
          </button>

          {/* Dropdown Menu */}
          {isUserDropdownOpen && (
            <div className={`absolute bottom-full left-0 mb-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 ${
              isCollapsed ? 'w-48 left-0' : 'w-full'
            }`}>
              <div className="py-1">
                {/* Profile Option */}
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <User className="h-4 w-4 mr-3 text-gray-400" />
                  Profile
                </button>
                
                {/* Settings Option */}
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <Settings className="h-4 w-4 mr-3 text-gray-400" />
                  Settings
                </button>
                
                {/* Notifications Option */}
                <button className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  <Bell className="h-4 w-4 mr-3 text-gray-400" />
                  Notifications
                </button>
                
                {/* Divider */}
                <div className="border-t border-gray-100 my-1"></div>
                
                {/* Logout Option */}
                <button
                  onClick={logout}
                  className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-3 text-red-400" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  )
}
