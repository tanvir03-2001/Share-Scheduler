'use client'

import ContentList from '@/components/dashboard/ContentList'
import FacebookBusinessConnection from '@/components/dashboard/FacebookBusinessConnection'
import PostContentCreator from '@/components/dashboard/PostContentCreator'
import { useSidebar } from '@/contexts/SidebarContext'
import { Calendar, Clock, Plus } from 'lucide-react'

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
      case 'reels':
        return <ReelsContent />
      case 'stories':
        return <StoriesContent />
      case 'text':
        return <TextContent />
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
  return (
    <div className="space-y-6">
      {/* Facebook Business Connection Section */}
      <FacebookBusinessConnection />
      
      {/* Scheduled Content Section */}
      <div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
          <h1 className="text-lg md:text-xl font-bold text-gray-900">Scheduled Content</h1>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 md:px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 flex items-center transition-all duration-200 font-medium text-xs md:text-sm shadow-sm hover:shadow-md">
            <Plus className="h-3 w-3 md:h-4 md:w-4 mr-2" />
            Schedule New Post
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="bg-white rounded-lg shadow-sm border border-gray-100 p-2 md:p-3">
              <div className="flex items-center justify-between mb-2 md:mb-3">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 md:h-4 md:w-4 text-blue-500 mr-2" />
                  <span className="text-xs md:text-sm font-medium text-gray-900">Post #{item}</span>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Scheduled</span>
              </div>
              <p className="text-gray-600 text-xs md:text-sm mb-2 md:mb-3">
                This is a sample scheduled post content that will be published automatically...
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  <span className="hidden sm:inline">Dec 15, 2024 at 2:00 PM</span>
                  <span className="sm:hidden">Dec 15, 2:00 PM</span>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-xs">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PostsContent() {
  return <PostContentCreator />
}

function ReelsContent() {
  return <ContentList type="reel" title="Reels" />
}

function StoriesContent() {
  return <ContentList type="story" title="Stories" />
}

function TextContent() {
  return <ContentList type="text" title="Text Posts" />
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
