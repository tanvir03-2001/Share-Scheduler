'use client'

import { apiClient } from '@/lib/api'
import { BarChart3, Image, Search, Video } from 'lucide-react'
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
    cloudinaryPublicId?: string
    previewUrl?: string
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
  // Mock metrics for demonstration
  metrics?: {
    reach: number
    engagement: number
    reactions: number
  }
}

interface PostsTableProps {
  type?: 'all' | 'published' | 'scheduled' | 'drafts'
}

export default function PostsTable({ type = 'all' }: PostsTableProps) {
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'published' | 'scheduled' | 'drafts'>('published')

  // Fetch content from API
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        const response = await apiClient.getUserContent(1, 50)
        
        if (response.success && response.data) {
          // Add mock metrics for demonstration
          const contentWithMetrics = (response.data.contents || []).map((item: ContentItem) => ({
            ...item,
            metrics: {
              reach: Math.floor(Math.random() * 100) + 1,
              engagement: Math.floor(Math.random() * 50) + 1,
              reactions: Math.floor(Math.random() * 30) + 1
            }
          }))
          setContent(contentWithMetrics)
        } else {
          // If no content from API, show sample data for demonstration
          const sampleData: ContentItem[] = [
            {
              id: '68f40e5616632cf8cd0e3bdf',
              postType: 'text',
              content: 'text dslfjl',
              platforms: ['facebook'],
              publishMode: 'now',
              status: 'published',
              createdAt: '2025-10-18T22:01:58.544Z',
              updatedAt: '2025-10-18T22:01:58.544Z',
              publishedAt: '2025-10-18T22:01:58.544Z',
              metrics: { reach: 2, engagement: 2, reactions: 2 }
            },
            {
              id: '68f40e6b16632cf8cd0e3be6',
              postType: 'image',
              content: 'jhjg',
              mediaFile: {
                filename: 'c371b660-aa50-4fc2-a622-c7e806ce4a87-1760824936166.png',
                originalName: 'ChatGPT Image Oct 12, 2025, 02_10_19 AM.png',
                mimetype: 'image/png',
                size: 1290851,
                url: 'https://res.cloudinary.com/dlb79o5oh/image/upload/v1760824936/facebook-auto-post/content/c371b660-aa50-4fc2-a622-c7e806ce4a87-1760824936166_gaqvnm.png',
                type: 'image',
                cloudinaryPublicId: 'facebook-auto-post/content/c371b660-aa50-4fc2-a622-c7e806ce4a87-1760824936166_gaqvnm',
                previewUrl: 'https://res.cloudinary.com/dlb79o5oh/image/upload/c_fill,g_auto,h_300,q_auto,w_300/v1/facebook-auto-post/content/c371b660-aa50-4fc2-a622-c7e806ce4a87-1760824936166_gaqvnm?_a=BAMAK+WO0'
              },
              platforms: ['facebook'],
              publishMode: 'now',
              status: 'published',
              createdAt: '2025-10-18T22:02:19.624Z',
              updatedAt: '2025-10-18T22:02:19.624Z',
              publishedAt: '2025-10-18T22:02:19.624Z',
              metrics: { reach: 7, engagement: 1, reactions: 1 }
            },
            {
              id: '68f40e7e16632cf8cd0e3bec',
              postType: 'reel',
              content: 'hshfg',
              mediaFile: {
                filename: '071ded4a-7212-4423-89f4-3dbfed412e14-1760824954625.mp4',
                originalName: 'ssstik.io_@md...hridoy....raaz_1760733127911.mp4',
                mimetype: 'video/mp4',
                size: 3941955,
                url: 'https://res.cloudinary.com/dlb79o5oh/video/upload/v1760824955/facebook-auto-post/content/071ded4a-7212-4423-89f4-3dbfed412e14-1760824954625_r8zrmf.mp4',
                type: 'video',
                cloudinaryPublicId: 'facebook-auto-post/content/071ded4a-7212-4423-89f4-3dbfed412e14-1760824954625_r8zrmf',
                previewUrl: 'https://res.cloudinary.com/dlb79o5oh/video/upload/c_fill,g_auto,h_300,q_auto,so_1,w_300/v1/facebook-auto-post/content/071ded4a-7212-4423-89f4-3dbfed412e14-1760824954625_r8zrmf?_a=BAMAK+WO0'
              },
              platforms: ['facebook'],
              publishMode: 'schedule',
              scheduledPost: {
                postNumber: 1,
                scheduledDate: '2025-10-19T00:00:00.000Z',
                scheduledTime: '04:42',
                status: 'pending'
              },
              status: 'scheduled',
              createdAt: '2025-10-18T22:02:38.990Z',
              updatedAt: '2025-10-18T22:02:38.990Z',
              metrics: { reach: 15, engagement: 8, reactions: 12 }
            },
            {
              id: '68f40e9916632cf8cd0e3bf3',
              postType: 'story',
              content: '241213212',
              mediaFile: {
                filename: 'cbc13598-d63a-4562-8f28-89ed64e04dfc-1760824981195.mp4',
                originalName: 'ssstik.io_@musfikamoni5_1760481056735.mp4',
                mimetype: 'video/mp4',
                size: 3685169,
                url: 'https://res.cloudinary.com/dlb79o5oh/video/upload/v1760824981/facebook-auto-post/content/cbc13598-d63a-4562-8f28-89ed64e04dfc-1760824981195_tkvzj3.mp4',
                type: 'video',
                cloudinaryPublicId: 'facebook-auto-post/content/cbc13598-d63a-4562-8f28-89ed64e04dfc-1760824981195_tkvzj3',
                previewUrl: 'https://res.cloudinary.com/dlb79o5oh/video/upload/c_fill,g_auto,h_300,q_auto,so_1,w_300/v1/facebook-auto-post/content/cbc13598-d63a-4562-8f28-89ed64e04dfc-1760824981195_tkvzj3?_a=BAMAK+WO0'
              },
              platforms: ['facebook'],
              publishMode: 'schedule',
              scheduledPost: {
                postNumber: 1,
                scheduledDate: '2025-10-19T00:00:00.000Z',
                scheduledTime: '04:42',
                status: 'pending'
              },
              status: 'scheduled',
              createdAt: '2025-10-18T22:03:05.202Z',
              updatedAt: '2025-10-18T22:03:05.202Z',
              metrics: { reach: 10, engagement: 5, reactions: 8 }
            }
          ]
          setContent(sampleData)
        }
      } catch (err) {
        console.error('Error fetching content:', err)
        // Show sample data on error for demonstration
        const sampleData: ContentItem[] = [
          {
            id: '68f40e5616632cf8cd0e3bdf',
            postType: 'text',
            content: 'text dslfjl',
            platforms: ['facebook'],
            publishMode: 'now',
            status: 'published',
            createdAt: '2025-10-18T22:01:58.544Z',
            updatedAt: '2025-10-18T22:01:58.544Z',
            publishedAt: '2025-10-18T22:01:58.544Z',
            metrics: { reach: 2, engagement: 2, reactions: 2 }
          },
          {
            id: '68f40e6b16632cf8cd0e3be6',
            postType: 'image',
            content: 'jhjg',
            mediaFile: {
              filename: 'c371b660-aa50-4fc2-a622-c7e806ce4a87-1760824936166.png',
              originalName: 'ChatGPT Image Oct 12, 2025, 02_10_19 AM.png',
              mimetype: 'image/png',
              size: 1290851,
              url: 'https://res.cloudinary.com/dlb79o5oh/image/upload/v1760824936/facebook-auto-post/content/c371b660-aa50-4fc2-a622-c7e806ce4a87-1760824936166_gaqvnm.png',
              type: 'image',
              cloudinaryPublicId: 'facebook-auto-post/content/c371b660-aa50-4fc2-a622-c7e806ce4a87-1760824936166_gaqvnm',
              previewUrl: 'https://res.cloudinary.com/dlb79o5oh/image/upload/c_fill,g_auto,h_300,q_auto,w_300/v1/facebook-auto-post/content/c371b660-aa50-4fc2-a622-c7e806ce4a87-1760824936166_gaqvnm?_a=BAMAK+WO0'
            },
            platforms: ['facebook'],
            publishMode: 'now',
            status: 'published',
            createdAt: '2025-10-18T22:02:19.624Z',
            updatedAt: '2025-10-18T22:02:19.624Z',
            publishedAt: '2025-10-18T22:02:19.624Z',
            metrics: { reach: 7, engagement: 1, reactions: 1 }
          }
        ]
        setContent(sampleData)
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [])

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
        return <span className="text-lg font-bold">Aa</span>
      case 'image':
        return <Image className="w-4 h-4" />
      default:
        return <span className="text-lg font-bold">Aa</span>
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const formatScheduledTime = (timeString: string) => {
    // If it's already in HH:MM format, return as is
    if (timeString.match(/^\d{1,2}:\d{2}$/)) {
      return timeString
    }
    // Otherwise format it
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const filteredContent = content.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTab = activeTab === 'published' ? item.status === 'published' :
                      activeTab === 'scheduled' ? item.status === 'scheduled' :
                      activeTab === 'drafts' ? item.status === 'draft' : true
    
    return matchesSearch && matchesTab
  })

  const handleSelectPost = (postId: string) => {
    setSelectedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    )
  }

  const handleSelectAll = () => {
    if (selectedPosts.length === filteredContent.length) {
      setSelectedPosts([])
    } else {
      setSelectedPosts(filteredContent.map(item => item.id))
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-gray-500">Loading posts...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="text-red-500">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'published', label: 'Published', count: content.filter(item => item.status === 'published').length },
            { id: 'scheduled', label: 'Scheduled', count: content.filter(item => item.status === 'scheduled').length },
            { id: 'drafts', label: 'Drafts', count: content.filter(item => item.status === 'draft').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by post ID or caption"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Shared to: All</option>
            <option>Facebook</option>
            <option>Instagram</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option>Lifetime: Mar 31, 2019 - Nov 24, 2021</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <BarChart3 className="w-4 h-4 mr-2" />
            Customize Columns
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={selectedPosts.length === filteredContent.length && filteredContent.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[300px]">
                Posts
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Reach
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Engagement
              </th>
              <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Reactions/Likes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContent.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 md:px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(item.id)}
                    onChange={() => handleSelectPost(item.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 md:px-6 py-4">
                   <div className="flex items-start space-x-3">
                     {/* Post Type Icon or Image Thumbnail */}
                     <div className="flex-shrink-0">
                       {item.mediaFile && (item.mediaFile.previewUrl || item.mediaFile.url) ? (
                         <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center relative">
                           <img
                             src={item.mediaFile.previewUrl || item.mediaFile.url}
                             alt={item.mediaFile.originalName || 'Post thumbnail'}
                             className="w-full h-full object-cover"
                             onError={(e) => {
                               // Fallback to icon if image fails to load
                               const target = e.target as HTMLImageElement;
                               target.style.display = 'none';
                               const parent = target.parentElement;
                               if (parent) {
                                 parent.innerHTML = item.postType === 'reel' 
                                   ? '<svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>'
                                   : '<svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>';
                               }
                             }}
                           />
                           {/* Video indicator for reels and stories */}
                           {(item.postType === 'reel' || item.postType === 'story') && (
                             <div className="absolute inset-0 flex items-center justify-center">
                               <div className="w-6 h-6 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                                 <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                   <path d="M8 5v14l11-7z"/>
                                 </svg>
                               </div>
                             </div>
                           )}
                         </div>
                       ) : (
                         <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                           {getTypeIcon(item.postType)}
                         </div>
                       )}
                     </div>
                     
                     {/* Post Content */}
                     <div className="flex-1 min-w-0">
                       <div className="flex items-start justify-between">
                         <div className="flex-1">
                           <div className="flex items-center space-x-2 mb-1">
                             <p className="text-sm text-gray-900 truncate max-w-xs">
                               {item.content && item.content !== '0' ? item.content : 
                                item.mediaFile ? `${item.postType.charAt(0).toUpperCase() + item.postType.slice(1)} post` : 
                                `Post ${item.id.slice(-6)}`}
                             </p>
                             <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                               {item.status}
                             </span>
                           </div>
                           {item.hashtags && (
                             <p className="text-xs text-blue-600 mt-1 truncate max-w-xs">
                               {item.hashtags}
                             </p>
                           )}
                           <div className="flex items-center mt-1 space-x-2">
                             <div className="w-4 h-4 bg-blue-600 rounded-sm flex items-center justify-center">
                               <span className="text-white text-xs font-bold">f</span>
                             </div>
                             <span className="text-xs text-gray-500">Facebook</span>
                             {item.mediaFile && (
                               <span className="text-xs text-gray-400">•</span>
                             )}
                             {item.mediaFile && (
                               <span className="text-xs text-gray-500 capitalize">{item.postType}</span>
                             )}
                             {item.scheduledPost && (
                               <>
                                 <span className="text-xs text-gray-400">•</span>
                                 <span className="text-xs text-orange-600">Scheduled</span>
                               </>
                             )}
                           </div>
                         </div>
                         <div className="flex items-center space-x-2">
                           {item.status === 'published' && (
                             <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-blue-700 transition-colors">
                               Boost post
                             </button>
                           )}
                           {item.status === 'scheduled' && (
                             <button className="bg-orange-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-orange-700 transition-colors">
                               Edit
                             </button>
                           )}
                         </div>
                       </div>
                     </div>
                   </div>
                 </td>
                <td className="px-4 md:px-6 py-4 text-sm text-gray-900">
                  <div className="font-medium">
                    {item.scheduledPost?.scheduledDate ? 
                      formatDate(item.scheduledPost.scheduledDate) :
                      item.publishedAt ? formatDate(item.publishedAt) :
                      formatDate(item.createdAt)
                    }
                  </div>
                  {item.scheduledPost && (
                    <div className="text-xs text-orange-600 mt-1">
                      Scheduled
                    </div>
                  )}
                </td>
                <td className="px-4 md:px-6 py-4 text-sm text-gray-600">
                  <div className="font-mono">
                    {item.scheduledPost?.scheduledTime ? 
                      formatScheduledTime(item.scheduledPost.scheduledTime) :
                      item.publishedAt ? formatTime(item.publishedAt) :
                      formatTime(item.createdAt)
                    }
                  </div>
                  {item.scheduledPost && (
                    <div className="text-xs text-gray-500 mt-1">
                      Post #{item.scheduledPost.postNumber}
                    </div>
                  )}
                </td>
                <td className="px-4 md:px-6 py-4 hidden md:table-cell">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {item.metrics?.reach || 0} People reached
                      </div>
                      <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${Math.min((item.metrics?.reach || 0) * 2, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4 hidden lg:table-cell">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {item.metrics?.engagement || 0} Post Engagements
                      </div>
                      <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${Math.min((item.metrics?.engagement || 0) * 4, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 md:px-6 py-4 hidden lg:table-cell">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">
                        {item.metrics?.reactions || 0} Reactions
                      </div>
                      <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-green-500 h-2 rounded-full" 
                          style={{ width: `${Math.min((item.metrics?.reactions || 0) * 6, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-8">
          <div className="text-gray-500">No posts found matching your criteria.</div>
        </div>
      )}
    </div>
  )
}
