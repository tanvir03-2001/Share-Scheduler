'use client'

import ContentList from '@/components/dashboard/ContentList'
import PostContentCreator from '@/components/dashboard/PostContentCreator'
import { Calendar, Clock, Plus } from 'lucide-react'

interface ContentAreaProps {
  activeTab: string
}

export default function ContentArea({ activeTab }: ContentAreaProps) {
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
    <div className="flex-1 bg-gray-50 overflow-y-auto">
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  )
}

function ScheduleContent() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Scheduled Content</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Schedule New Post
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                <span className="text-sm font-medium text-gray-900">Post #{item}</span>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Scheduled</span>
            </div>
            <p className="text-gray-600 text-sm mb-3">
              This is a sample scheduled post content that will be published automatically...
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                Dec 15, 2024 at 2:00 PM
              </div>
              <button className="text-blue-600 hover:text-blue-700">Edit</button>
            </div>
          </div>
        ))}
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
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Posts', value: '1,234', change: '+12%' },
          { title: 'Engagement', value: '8.5%', change: '+3.2%' },
          { title: 'Reach', value: '45.2K', change: '+18%' },
          { title: 'Followers', value: '12.8K', change: '+5.1%' }
        ].map((metric, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">{metric.title}</h3>
            <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
            <p className="text-sm text-green-600">{metric.change} from last month</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function AudienceContent() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Audience Insights</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-600">Audience analytics and insights will be displayed here.</p>
      </div>
    </div>
  )
}

function HistoryContent() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Post History</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-600">Your post history and performance metrics will be displayed here.</p>
      </div>
    </div>
  )
}

function TrendingContent() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Trending Content</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-600">Discover trending topics and hashtags to boost your content reach.</p>
      </div>
    </div>
  )
}

function CommentsContent() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Comments Management</h1>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-600">Manage and respond to comments across all your social media platforms.</p>
      </div>
    </div>
  )
}
