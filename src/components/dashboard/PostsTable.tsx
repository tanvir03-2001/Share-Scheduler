'use client'

import { usePage } from '@/contexts/PageContext'
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
    thumbnailUrl?: string
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
  postTypeFilter?: 'reel' | 'story' | 'text' | 'image'
}

export default function PostsTable({ type = 'all', postTypeFilter }: PostsTableProps) {
  const { selectedPage } = usePage()
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedPosts, setSelectedPosts] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'published' | 'scheduled' | 'drafts'>('published')

  // Fetch content from API - refresh when page changes
  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        setError(null)
        // Only fetch if a page is selected
        if (!selectedPage) {
          setContent([])
          setError('Please select a Facebook page to view posts')
          setLoading(false)
          return
        }
        
        const response = await apiClient.getUserContent(1, 50, undefined, undefined, selectedPage.pageId)
        
        if (response.success && response.data) {
          // Add mock metrics for demonstration (you can remove this when real metrics are available)
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
          // No content available from API
          setContent([])
          setError(response.error || 'No content found')
        }
      } catch (err) {
        console.error('Error fetching content:', err)
        setError('Failed to fetch content from server')
        setContent([])
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [selectedPage?.pageId]) // Refresh when page changes

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
    
    const matchesPostType = postTypeFilter ? item.postType === postTypeFilter : true
    
    return matchesSearch && matchesTab && matchesPostType
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
              <th className="px-4 md:px-6 py-2 text-left">
                <input
                  type="checkbox"
                  checked={selectedPosts.length === filteredContent.length && filteredContent.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
              </th>
              <th className="px-4 md:px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[300px]">
                Posts
              </th>
              <th className="px-4 md:px-6 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date and Time
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
                <td className="px-4 md:px-6 py-2">
                  <input
                    type="checkbox"
                    checked={selectedPosts.includes(item.id)}
                    onChange={() => handleSelectPost(item.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 md:px-6 py-2">
                   <div className="flex items-start space-x-3">
                     {/* Post Type Icon or Image Thumbnail */}
                     <div className="flex-shrink-0">
                       {item.mediaFile && (item.mediaFile.thumbnailUrl || item.mediaFile.previewUrl || item.mediaFile.url) ? (
                         <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center relative">
                           <img
                             src={item.mediaFile.thumbnailUrl || item.mediaFile.previewUrl || item.mediaFile.url}
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
                             <p className="text-xs text-gray-900 truncate max-w-[200px]">
                               {item.content && item.content !== '0' ? 
                                (item.content.length > 50 ? item.content.substring(0, 50) + '...' : item.content) : 
                                item.mediaFile ? `${item.postType.charAt(0).toUpperCase() + item.postType.slice(1)} post` : 
                                `Post ${item.id.slice(-6)}`}
                             </p>
                             {item.status === 'published' ? (
                               <svg className="w-3 h-3 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                               </svg>
                             ) : (
                               <span className={`px-1.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                                 {item.status}
                               </span>
                             )}
                           </div>
                           {item.hashtags && (
                             <p className="text-xs text-blue-600 mt-0.5 truncate max-w-[180px]">
                               {item.hashtags.length > 30 ? item.hashtags.substring(0, 30) + '...' : item.hashtags}
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
                           {item.status === 'scheduled' && (
                             <button className="bg-orange-600 text-white px-2 py-0.5 rounded text-xs font-medium hover:bg-orange-700 transition-colors">
                               Edit
                             </button>
                           )}
                         </div>
                       </div>
                     </div>
                   </div>
                 </td>
                <td className="px-4 md:px-6 py-2 text-xs">
                  {item.status === 'scheduled' && item.scheduledPost?.scheduledDate && item.scheduledPost?.scheduledTime ? (
                    <div>
                      <div className="text-blue-700 font-semibold mb-1">Scheduled for:</div>
                      <div className="font-medium text-gray-900">
                        {formatDate(item.scheduledPost.scheduledDate)}
                      </div>
                      <div className="font-mono text-blue-600 mt-0.5">
                        {formatScheduledTime(item.scheduledPost.scheduledTime)}
                      </div>
                      <div className="text-gray-500 text-xs mt-1">
                        {item.platforms.join(', ')}
                      </div>
                    </div>
                  ) : item.status === 'published' && item.publishedAt ? (
                    <div>
                      <div className="text-green-700 font-semibold mb-1">Posted on:</div>
                      <div className="font-medium text-gray-900">
                        {formatDate(item.publishedAt)}
                      </div>
                      <div className="font-mono text-green-600 mt-0.5">
                        {formatTime(item.publishedAt)}
                      </div>
                      <div className="text-gray-500 text-xs mt-1">
                        {item.platforms.join(', ')}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="font-medium text-gray-900">
                        {formatDate(item.createdAt)}
                      </div>
                      <div className="font-mono text-gray-600 mt-0.5">
                        {formatTime(item.createdAt)}
                      </div>
                    </div>
                  )}
                </td>
                <td className="px-4 md:px-6 py-2 hidden md:table-cell">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-900">
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
                <td className="px-4 md:px-6 py-2 hidden lg:table-cell">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-900">
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
                <td className="px-4 md:px-6 py-2 hidden lg:table-cell">
                  <div className="flex items-center">
                    <div className="flex-1">
                      <div className="text-xs font-medium text-gray-900">
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

      {filteredContent.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-2">
            {content.length === 0 
              ? 'No posts available. Create your first post to get started!' 
              : 'No posts found matching your criteria.'}
          </div>
          {content.length === 0 && (
            <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Create New Post
            </button>
          )}
        </div>
      )}
    </div>
  )
}
