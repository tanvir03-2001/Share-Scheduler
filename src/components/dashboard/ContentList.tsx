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
              <div className="flex-shrink-0">
                <div className={`${item.postType === 'reel' ? 'w-20 h-28' : 'w-20 h-20'} bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden relative`}>
                  {item.mediaFile && item.mediaFile.url ? (
                    <img
                      src={item.mediaFile.url}
                      alt={item.mediaFile.originalName || 'Content thumbnail'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback to icon if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = item.postType === 'reel' 
                            ? '<svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>'
                            : '<svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>';
                        }
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center">
                      {item.postType === 'reel' ? (
                        <Video className="w-8 h-8 text-gray-400" />
                      ) : item.postType === 'image' || item.postType === 'story' ? (
                        <Image className="w-8 h-8 text-gray-400" />
                      ) : (
                        <Calendar className="w-8 h-8 text-gray-400" />
                      )}
                    </div>
                  )}
                  
                  {/* Show placeholder image for content without media */}
                  {!item.mediaFile && (item.postType === 'image' || item.postType === 'story') && (
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                      <div className="text-center">
                        <Image className="w-6 h-6 text-gray-500 mx-auto mb-1" />
                        <div className="text-xs text-gray-500">No Image</div>
                      </div>
                    </div>
                  )}
                  
                  {/* Post type indicator */}
                  <div className="absolute top-1 left-1">
                    <div className="bg-black bg-opacity-50 text-white text-xs px-1 py-0.5 rounded">
                      {item.postType === 'reel' ? 'VIDEO' : 
                       item.postType === 'image' ? 'IMG' : 
                       item.postType === 'story' ? 'STORY' : 'TEXT'}
                    </div>
                  </div>
                </div>
              </div>

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
                        {item.scheduledPost?.scheduledDate ? formatDate(item.scheduledPost.scheduledDate) : formatDate(item.createdAt)}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {item.scheduledPost?.scheduledTime || formatTime(item.createdAt)}
                      </div>
                      <div className="flex items-center">
                        {getTypeIcon(item.postType)}
                        <span className="ml-1 capitalize">{item.postType}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-400">•</span>
                        <span className="ml-1">{item.platforms.join(', ')}</span>
                      </div>
                      {item.scheduledPost?.facebookPostId && (
                        <div className="flex items-center">
                          <span className="text-gray-400">•</span>
                          <span className="ml-1 text-green-600">Posted to Facebook</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    {item.status === 'published' && (
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-700 transition-colors">
                        Boost Post
                      </button>
                    )}
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
