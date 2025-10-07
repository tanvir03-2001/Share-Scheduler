'use client'

import { Calendar, CheckCircle, Clock, Plus } from 'lucide-react'

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
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Post Content</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Create New Post
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Post Content</label>
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              placeholder="What's on your mind?"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Schedule Date</label>
              <input 
                type="datetime-local"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Facebook</option>
                <option>Instagram</option>
                <option>Twitter</option>
                <option>LinkedIn</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
              Save Draft
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Schedule Post
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReelsContent() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Reels</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Create Reel
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="aspect-[9/16] bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Reel #{item}</span>
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Reel #{item}</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Draft</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Created 2 hours ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function StoriesContent() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Stories</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Create Story
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
              <span className="text-white font-bold">Story #{item}</span>
            </div>
            <div className="p-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-900">#{item}</span>
                <CheckCircle className="h-3 w-3 text-green-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TextContent() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Text Posts</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Create Text Post
        </button>
      </div>
      
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-2">Text Post #{item}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  This is a sample text post that can be scheduled across multiple platforms. 
                  It contains engaging content that will help increase your social media presence.
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>Created: Dec 14, 2024</span>
                  <span>Platform: Facebook, Instagram</span>
                  <span>Status: Published</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
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
