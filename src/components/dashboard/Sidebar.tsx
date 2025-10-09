'use client'

import Tooltip from '@/components/ui/Tooltip'
import { useAuth } from '@/contexts/AuthContext'
import { useSidebar } from '@/contexts/SidebarContext'
import {
  BarChart3,
  Bell,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock,
  Facebook,
  FileText,
  Image,
  LogOut,
  MessageSquare,
  Plus,
  Settings,
  TrendingUp,
  Type,
  User,
  Users,
  Video
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

interface SidebarProps {
  activeTab?: string
}

interface FacebookPage {
  id: string
  name: string
  logo: string
  followersCount: number
  isConnected: boolean
}

// Demo data for Facebook pages - start with no connected pages
const demoPages: FacebookPage[] = [
  {
    id: '1',
    name: 'Tech News Hub',
    logo: 'TN',
    followersCount: 125000,
    isConnected: false
  },
  {
    id: '2', 
    name: 'Fashion Trends',
    logo: 'FT',
    followersCount: 89000,
    isConnected: false
  },
  {
    id: '3',
    name: 'Food & Recipes',
    logo: 'FR', 
    followersCount: 156000,
    isConnected: false
  }
]

const sidebarItems = [
  {
    id: 'schedule',
    label: 'Schedule Content',
    icon: Calendar,
    description: 'Manage scheduled posts',
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
  const { user, logout } = useAuth()
  const { isCollapsed, isMobile, isMobileMenuOpen, toggleSidebar, closeMobileMenu } = useSidebar()
  const pathname = usePathname()
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false)
  const [selectedPage, setSelectedPage] = useState<FacebookPage | null>(null)
  const [pages, setPages] = useState<FacebookPage[]>(demoPages)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pageDropdownRef = useRef<HTMLDivElement>(null)

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
  const handlePageSelect = (page: FacebookPage) => {
    setSelectedPage(page)
    setIsPageDropdownOpen(false)
  }

  // Handle add page (connect Facebook profile)
  const handleAddPage = () => {
    // This would typically open a Facebook OAuth flow
    console.log('Opening Facebook connection flow...')
    setIsPageDropdownOpen(false)
    
    // For demo purposes, let's connect the first page
    const updatedPages = pages.map((page, index) => 
      index === 0 ? { ...page, isConnected: true } : page
    )
    setPages(updatedPages)
    setSelectedPage(updatedPages[0])
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

      {/* Facebook Page Management Section */}
      <div className="p-2 md:p-3 border-b border-gray-100">
        {selectedPage ? (
          // Show page dropdown when pages are connected
          <div className="relative" ref={pageDropdownRef}>
            {/* Current Page Display */}
            <button
              onClick={() => setIsPageDropdownOpen(!isPageDropdownOpen)}
              className={`w-full flex items-center p-2 rounded-lg hover:bg-gray-50 transition-colors ${
                isCollapsed ? 'justify-center' : 'justify-between'
              }`}
            >
              <div className={`flex items-center transition-all duration-300 ${
                isCollapsed ? 'flex-col space-y-2' : 'space-x-3'
              }`}>
                <div className="h-8 w-8 bg-facebook-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">
                    {selectedPage.logo}
                  </span>
                </div>
                {!isCollapsed && (
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-900 truncate">{selectedPage.name}</p>
                    <p className="text-xs text-gray-500">{formatFollowerCount(selectedPage.followersCount)} followers</p>
                  </div>
                )}
              </div>
              {!isCollapsed && (
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
                  isPageDropdownOpen ? 'rotate-180' : ''
                }`} />
              )}
            </button>

            {/* Page Dropdown Menu */}
            {isPageDropdownOpen && (
              <div className={`absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 ${
                isCollapsed ? 'w-48 left-0' : 'w-full'
              }`}>
                <div className="py-1">
                  {/* Add Page Button */}
                  <button
                    onClick={handleAddPage}
                    className="w-full flex items-center px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <Plus className="h-4 w-4 mr-3 text-blue-500" />
                    Add Page
                  </button>
                  
                  {/* Divider */}
                  <div className="border-t border-gray-100 my-1"></div>
                  
                  {/* Connected Pages */}
                  {pages.filter(page => page.isConnected).map((page) => (
                    <button
                      key={page.id}
                      onClick={() => handlePageSelect(page)}
                      className={`w-full flex items-center px-4 py-2 text-sm transition-colors ${
                        selectedPage.id === page.id 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="h-6 w-6 bg-facebook-500 rounded flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-white text-xs font-bold">
                          {page.logo}
                        </span>
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium truncate">{page.name}</p>
                        <p className="text-xs text-gray-500">{formatFollowerCount(page.followersCount)} followers</p>
                      </div>
                    </button>
                  ))}
                  
                  {/* Disconnected Pages */}
                  {pages.filter(page => !page.isConnected).length > 0 && (
                    <>
                      <div className="border-t border-gray-100 my-1"></div>
                      <div className="px-4 py-2">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Not Connected</p>
                      </div>
                      {pages.filter(page => !page.isConnected).map((page) => (
                        <button
                          key={page.id}
                          onClick={() => handleAddPage()}
                          className="w-full flex items-center px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                          <div className="h-6 w-6 bg-gray-300 rounded flex items-center justify-center mr-3 flex-shrink-0">
                            <span className="text-gray-600 text-xs font-bold">
                              {page.logo}
                            </span>
                          </div>
                          <div className="flex-1 text-left">
                            <p className="font-medium truncate">{page.name}</p>
                            <p className="text-xs text-gray-400">Click to connect</p>
                          </div>
                        </button>
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          // Show simple Add Page button when no pages are connected
          <button
            onClick={handleAddPage}
            className={`w-full flex items-center p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors ${
              isCollapsed ? 'justify-center' : 'justify-center'
            }`}
          >
            <Plus className="h-5 w-5 text-blue-500 flex-shrink-0" />
            {!isCollapsed && (
              <span className="ml-2 text-sm font-medium">Add Page</span>
            )}
          </button>
        )}
      </div>
      
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
