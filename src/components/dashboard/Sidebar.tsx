'use client'

import FacebookPageList from '@/components/dashboard/FacebookPageList'
import Tooltip from '@/components/ui/Tooltip'
import {
    BarChart3,
    Calendar,
    Clock,
    FileText,
    Image,
    MessageSquare,
    Settings,
    TrendingUp,
    Type,
    Users,
    Video
} from 'lucide-react'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  selectedPageId?: string
  onPageSelect?: (page: any) => void
}

const sidebarItems = [
  {
    id: 'schedule',
    label: 'Schedule Content',
    icon: Calendar,
    description: 'Manage scheduled posts'
  },
  {
    id: 'posts',
    label: 'Post Content',
    icon: FileText,
    description: 'Create and manage posts'
  },
  {
    id: 'reels',
    label: 'Reels',
    icon: Video,
    description: 'Create and schedule reels'
  },
  {
    id: 'stories',
    label: 'Stories',
    icon: Image,
    description: 'Manage story content'
  },
  {
    id: 'text',
    label: 'Text Posts',
    icon: Type,
    description: 'Create text-only posts'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: BarChart3,
    description: 'View performance metrics'
  },
  {
    id: 'audience',
    label: 'Audience',
    icon: Users,
    description: 'Manage audience insights'
  },
  {
    id: 'history',
    label: 'Post History',
    icon: Clock,
    description: 'View past posts'
  },
  {
    id: 'trending',
    label: 'Trending',
    icon: TrendingUp,
    description: 'Discover trending content'
  },
  {
    id: 'comments',
    label: 'Comments',
    icon: MessageSquare,
    description: 'Manage comments'
  }
]

export default function Sidebar({ activeTab, onTabChange, selectedPageId, onPageSelect }: SidebarProps) {
  return (
    <div className="fixed left-0 top-0 w-64 md:w-64 sm:w-56 bg-white shadow-lg border-r border-gray-100 h-screen flex flex-col z-40">
      <div className="p-3 border-b border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Content Studio</h2>
      </div>
      
      {/* Facebook Page List */}
      <div className="border-b border-gray-100">
        <FacebookPageList 
          onPageSelect={onPageSelect || (() => {})} 
          selectedPageId={selectedPageId}
          onPageSwitch={() => {}}
        />
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 scrollbar-thin">
        {/* Page Switch Section */}
        <div className="mb-4">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Switch Pages</h3>
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              
              return (
                <Tooltip key={item.id} content={item.description} position="right">
                  <button
                    onClick={() => onTabChange(item.id)}
                    className={`w-full flex items-center p-2 rounded-lg text-left transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon 
                      className={`h-4 w-4 mr-3 ${
                        isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-600'
                      }`} 
                    />
                    <span className="font-medium text-sm">{item.label}</span>
                  </button>
                </Tooltip>
              )
            })}
          </nav>
        </div>
      </div>
      
      <div className="p-3 border-t border-gray-100">
        <Tooltip content="Application settings" position="right">
          <button 
            className="w-full flex items-center p-2 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <Settings className="h-4 w-4 mr-3 text-gray-400" />
            <span className="font-medium text-sm">Settings</span>
          </button>
        </Tooltip>
      </div>
    </div>
  )
}
