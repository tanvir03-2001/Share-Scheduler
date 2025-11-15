'use client'

import PostContentCreator from '@/components/dashboard/PostContentCreator'
import PostsTable from '@/components/dashboard/PostsTable'
import { useSidebar } from '@/contexts/SidebarContext'
import { Image, Plus, Type, Video } from 'lucide-react'
import { useState } from 'react'

interface ContentAreaProps {
  activeTab: string
}

export default function ContentArea({ activeTab }: ContentAreaProps) {
  const { isCollapsed, isMobile } = useSidebar()
  
  const renderContent = () => {
    switch (activeTab) {
      case 'schedule':
        return <ScheduleContent />
      case 'posts':
        return <PostsContent />
      case 'analytics':
        return <AnalyticsContent />
      case 'audience':
        return <AudienceContent />
      case 'history':
        return <HistoryContent />
      case 'trending':
        return <TrendingContent />
      case 'comments':
        return <CommentsContent />
      default:
        return <ScheduleContent />
    }
  }

  return (
    <div className={`flex-1 bg-gray-50 overflow-y-auto transition-all duration-300 ${
      isMobile 
        ? 'ml-0' 
        : isCollapsed 
          ? 'ml-16' 
          : 'ml-64'
    }`}>
      <div className="p-2 md:p-3 pt-16 md:pt-3">
        {renderContent()}
      </div>
    </div>
  )
}

function ScheduleContent() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'reel' | 'story' | 'text'>('all')

  const filterOptions = [
    { id: 'all', label: 'All Posts', icon: null },
    { id: 'reel', label: 'Reels', icon: Video },
    { id: 'story', label: 'Stories', icon: Image },
    { id: 'text', label: 'Text Posts', icon: Type }
  ]

  return (
    <div className="space-y-6">
      {/* Header with Create Button */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <div>
          <h1 className="text-lg md:text-xl font-bold text-gray-900">Content & Post Management</h1>
          <p className="text-sm text-gray-600 mt-1">Create, schedule and manage your social media content</p>
        </div>
        <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 md:px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 flex items-center transition-all duration-200 font-medium text-xs md:text-sm shadow-sm hover:shadow-md">
          <Plus className="h-3 w-3 md:h-4 md:w-4 mr-2" />
          Create New Post
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium text-gray-500 mr-2">Filter by type:</span>
          {filterOptions.map((filter) => {
            const Icon = filter.icon
            const isActive = selectedFilter === filter.id
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id as any)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-500 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {Icon && <Icon className="w-3 h-3" />}
                {filter.label}
              </button>
            )
          })}
        </div>
      </div>
      
      {/* Posts Table */}
      <PostsTable postTypeFilter={selectedFilter === 'all' ? undefined : selectedFilter} />
    </div>
  )
}

function PostsContent() {
  return <PostContentCreator />
}

function AnalyticsContent() {
  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Analytics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { title: 'Total Posts', value: '1,234', change: '+12%' },
          { title: 'Engagement', value: '8.5%', change: '+3.2%' },
          { title: 'Reach', value: '45.2K', change: '+18%' },
          { title: 'Followers', value: '12.8K', change: '+5.1%' }
        ].map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-2 md:p-3">
            <h3 className="text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">{metric.title}</h3>
            <p className="text-lg md:text-xl font-bold text-gray-900 mb-1">{metric.value}</p>
            <p className="text-xs text-green-600">{metric.change} from last month</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function AudienceContent() {
  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Audience Insights</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 md:p-4">
        <p className="text-xs md:text-sm text-gray-600">Audience analytics and insights will be displayed here.</p>
      </div>
    </div>
  )
}

function HistoryContent() {
  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Post History</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 md:p-4">
        <p className="text-xs md:text-sm text-gray-600">Your post history and performance metrics will be displayed here.</p>
      </div>
    </div>
  )
}

function TrendingContent() {
  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Trending Content</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 md:p-4">
        <p className="text-xs md:text-sm text-gray-600">Discover trending topics and hashtags to boost your content reach.</p>
      </div>
    </div>
  )
}

function CommentsContent() {
  return (
    <div>
      <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Comments Management</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 md:p-4">
        <p className="text-xs md:text-sm text-gray-600">Manage and respond to comments across all your social media platforms.</p>
      </div>
    </div>
  )
}
