'use client'

import { apiClient } from '@/lib/api'
import { Calendar, Clock, Edit, Image, MoreVertical, Trash2, Video } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ContentItem {
  id: string
  postType: string
  content: string
  hashtags?: string
  mediaFile?: {
    filename: string
    originalName: string
    mimetype: string
    size: number
    url: string
    type: string
  }
  platforms: string[]
  publishMode: string
  status: string
  publishedAt?: string
  createdAt: string
  updatedAt: string
  scheduledPost?: {
    postNumber: number
    scheduledDate: string
    scheduledTime: string
    status: string
    publishedAt?: string
    facebookPostId?: string
    error?: string
  }
}

interface ContentListProps {
  type: 'reel' | 'story' | 'text'
  title: string
}

// Sample data for different content types
const sampleContent: Record<string, ContentItem[]> = {
  reel: [
    {
      id: '1',
      title: 'Morning Workout Routine',
      description: 'Quick 15-minute morning workout to start your day with energy and motivation.',
      imageUrl: '/api/placeholder/80/120',
      postDate: '2024-12-15',
      postTime: '08:00',
      status: 'scheduled',
      type: 'reel'
    },
    {
      id: '2',
      title: 'Healthy Breakfast Ideas',
      description: '5 easy and nutritious breakfast recipes you can make in under 10 minutes.',
      imageUrl: '/api/placeholder/80/120',
      postDate: '2024-12-16',
      postTime: '09:30',
      status: 'draft',
      type: 'reel'
    },
    {
      id: '3',
      title: 'Productivity Tips',
      description: 'Simple productivity hacks that successful people use every day.',
      imageUrl: '/api/placeholder/80/120',
      postDate: '2024-12-14',
      postTime: '14:00',
      status: 'published',
      type: 'reel'
    }
  ],
  story: [
    {
      id: '4',
      title: 'Behind the Scenes',
      description: 'Take a look at our creative process and team collaboration.',
      imageUrl: '/api/placeholder/80/80',
      postDate: '2024-12-15',
      postTime: '12:00',
      status: 'scheduled',
      type: 'story'
    },
    {
      id: '5',
      title: 'Daily Motivation',
      description: 'Start your day with positive energy and motivation.',
      imageUrl: '/api/placeholder/80/80',
      postDate: '2024-12-16',
      postTime: '07:00',
      status: 'draft',
      type: 'story'
    },
    {
      id: '6',
      title: 'Weekend Vibes',
      description: 'Relaxing weekend activities and self-care routines.',
      imageUrl: '/api/placeholder/80/80',
      postDate: '2024-12-13',
      postTime: '18:00',
      status: 'published',
      type: 'story'
    }
  ],
  text: [
    {
      id: '7',
      title: 'Industry Insights',
      description: 'Latest trends and insights from the digital marketing industry. What you need to know to stay ahead.',
      postDate: '2024-12-15',
      postTime: '10:00',
      status: 'scheduled',
      type: 'text'
    },
    {
      id: '8',
      title: 'Customer Success Story',
      description: 'How our client increased their engagement by 300% using our strategies. Read the full case study.',
      postDate: '2024-12-16',
      postTime: '15:30',
      status: 'draft',
      type: 'text'
    },
    {
      id: '9',
      title: 'Weekly Newsletter',
      description: 'This week\'s highlights: New features, tips, and community updates. Don\'t miss out!',
      postDate: '2024-12-12',
      postTime: '09:00',
      status: 'published',
      type: 'text'
    }
  ]
}

export default function ContentList({ type, title }: ContentListProps) {
  const [showActions, setShowActions] = useState<string | null>(null)
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch content from API
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        const response = await apiClient.getUserContent(1, 50, undefined, type)
        
        if (response.success && response.data) {
          setContent(response.data.contents || [])
        } else {
          setError(response.error || 'Failed to fetch content')
        }
      } catch (err) {
        console.error('Error fetching content:', err)
        setError('Failed to fetch content')
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [type])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'scheduled':
        return 'bg-blue-100 text-blue-800'
      case 'draft':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (postType: string) => {
    switch (postType) {
      case 'reel':
        return <Video className="w-4 h-4" />
      case 'story':
        return <Image className="w-4 h-4" />
      case 'text':
        return <Calendar className="w-4 h-4" />
      case 'image':
        return <Image className="w-4 h-4" />
      default:
        return <Calendar className="w-4 h-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  const handleEdit = (id: string) => {
    console.log('Edit content:', id)
    setShowActions(null)
  }

  const handleDelete = (id: string) => {
    console.log('Delete content:', id)
    setShowActions(null)
  }

  if (loading) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">Loading content...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-red-500">Error: {error}</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center">
          <span className="mr-2">+</span>
          Create New {type.charAt(0).toUpperCase() + type.slice(1)}
        </button>
      </div>

      {content.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500">No {type} content found. Create your first post!</div>
        </div>
      ) : (
        <div className="space-y-4">
          {content.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              {/* Image/Thumbnail */}
              {item.mediaFile && (
                <div className="flex-shrink-0">
                  <div className={`${item.postType === 'reel' ? 'w-20 h-28' : 'w-20 h-20'} bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden`}>
                    {item.postType === 'reel' ? (
                      <Video className="w-8 h-8 text-gray-400" />
                    ) : (
                      <Image className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                </div>
              )}

              {/* Content Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {item.content || `Post ${item.id.slice(-6)}`}
                      </h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {item.content || 'No content description'}
                      {item.hashtags && (
                        <span className="text-blue-600 ml-2">{item.hashtags}</span>
                      )}
                    </p>
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {formatDate(item.createdAt)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {formatTime(item.createdAt)}
                      </div>
                      <div className="flex items-center">
                        {getTypeIcon(item.postType)}
                        <span className="ml-1 capitalize">{item.postType}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-400">•</span>
                        <span className="ml-1">{item.platforms.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setShowActions(showActions === item.id ? null : item.id)}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      title="More options"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ))}
        </div>
      )}
    </div>
  )
}
