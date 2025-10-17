'use client'

import Modal from '@/components/ui/Modal'
import { apiClient, FacebookPage } from '@/lib/api'
import { AlertCircle, CheckCircle, ExternalLink, Facebook, Users } from 'lucide-react'
import { useEffect, useState } from 'react'

interface FacebookPageListProps {
  onPageSelect: (page: FacebookPage) => void
  selectedPageId?: string
  onPageSwitch?: () => void
}

export default function FacebookPageList({ onPageSelect, selectedPageId, onPageSwitch }: FacebookPageListProps) {
  const [pages, setPages] = useState<FacebookPage[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showPageList, setShowPageList] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load Facebook connection status and pages
  useEffect(() => {
    loadFacebookPages()
  }, [])

  const loadFacebookPages = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await apiClient.getFacebookConnectionStatus()
      
      if (response.success && response.data) {
        setIsConnected(response.data.isConnected)
        setPages(response.data.pages)
        
        // Auto-select default active page if none selected
        if (response.data.pages.length > 0 && !selectedPageId) {
          const defaultActivePage = response.data.pages.find(page => page.isDefaultActive) || response.data.pages[0]
          onPageSelect(defaultActivePage)
        }
      } else {
        setError(response.error || 'Failed to load Facebook pages')
      }
    } catch (err) {
      setError('Failed to load Facebook pages')
      console.error('Error loading Facebook pages:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFacebookLogin = async () => {
    try {
      setIsLoading(true)
      const response = await apiClient.generateFacebookUserAuthUrl()
      
      if (response.success && response.data) {
        window.location.href = response.data.authUrl
      } else {
        setError(response.error || 'Failed to generate Facebook auth URL')
      }
    } catch (err) {
      setError('Failed to connect Facebook account')
      console.error('Error connecting Facebook:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFacebookReconnect = async () => {
    try {
      setIsLoading(true)
      const response = await apiClient.generateFacebookUserAuthUrl(true)
      
      if (response.success && response.data) {
        window.location.href = response.data.authUrl
      } else {
        setError(response.error || 'Failed to generate Facebook reconnect URL')
      }
    } catch (err) {
      setError('Failed to reconnect Facebook account')
      console.error('Error reconnecting Facebook:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePageSelect = async (page: FacebookPage) => {
    try {
      // Call API to set this page as active
      await apiClient.setActiveFacebookPage(page.pageId)
      
      // Update local state
      onPageSelect(page)
      setShowPageList(false)
    } catch (err) {
      console.error('Error setting active page:', err)
      // Still update local state even if API call fails
      onPageSelect(page)
      setShowPageList(false)
    }
  }

  const handlePageSwitch = () => {
    setShowPageList(true)
    if (onPageSwitch) {
      onPageSwitch()
    }
  }

  const handleCloseModal = () => {
    setShowPageList(false)
  }

  const selectedPage = pages.find(page => page.pageId === selectedPageId) || pages[0]

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
            <span className="text-gray-600">Loading Facebook pages...</span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
            <div>
              <h3 className="font-semibold text-red-900">Error Loading Pages</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
          <button
            onClick={loadFacebookPages}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!isConnected) {
    return (
      <div className="p-4">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mr-4">
              <Facebook className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Connect Facebook</h3>
              <p className="text-sm text-gray-600">Link your Facebook pages to get started</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Connect your Facebook account to manage and schedule posts across all your pages.
          </p>
          
          <button
            onClick={handleFacebookLogin}
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Connecting...
              </>
            ) : (
              <>
                <Facebook className="w-4 h-4 mr-2" />
                Connect Facebook Account
              </>
            )}
          </button>
          
          <p className="text-xs text-gray-500 mt-3 text-center">
            We'll only access your pages, not your personal profile
          </p>
        </div>
      </div>
    )
  }

  if (pages.length === 0) {
    return (
      <div className="p-4">
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mr-4">
              <Facebook className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">No Pages Found</h3>
              <p className="text-sm text-gray-600">You don't have any Facebook pages connected</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            You need to connect your Facebook pages to start managing and scheduling posts.
          </p>
          
          <button
            onClick={handleFacebookLogin}
            disabled={isLoading}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Connecting...
              </>
            ) : (
              <>
                <Facebook className="w-4 h-4 mr-2" />
                Connect Facebook Pages
              </>
            )}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4">
      {/* Active Page Display */}
      {selectedPage && (
        <div 
          onClick={handlePageSwitch}
          className="p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200 group"
        >
          <div className="flex items-center">
            {selectedPage.picture ? (
              <img
                src={selectedPage.picture}
                alt={selectedPage.pageName}
                className="w-10 h-10 rounded-full object-cover mr-3 flex-shrink-0"
              />
            ) : (
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                <Facebook className="w-5 h-5 text-blue-600" />
              </div>
            )}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <h4 className="font-medium text-sm text-gray-900 truncate">{selectedPage.pageName}</h4>
                <CheckCircle className="w-4 h-4 text-green-500 ml-2 flex-shrink-0" />
              </div>
              
              <div className="flex items-center mt-1">
                <span className="text-xs text-gray-500">{selectedPage.category}</span>
                {selectedPage.followersCount && (
                  <>
                    <span className="text-xs text-gray-400 mx-2">•</span>
                    <div className="flex items-center">
                      <Users className="w-3 h-3 text-gray-400 mr-1" />
                      <span className="text-xs text-gray-500">{selectedPage.followersCount.toLocaleString()}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <div className="ml-2">
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          </div>
        </div>
      )}

      {/* Reconnect Button */}
      <div className="mt-3">
        <button
          onClick={handleFacebookReconnect}
          disabled={isLoading}
          className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center border border-blue-200"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              Reconnecting...
            </>
          ) : (
            <>
              <Facebook className="w-4 h-4 mr-2" />
              Reconnect Facebook Account
            </>
          )}
        </button>
      </div>

      {/* Page List Modal */}
      <Modal
        isOpen={showPageList}
        onClose={handleCloseModal}
        title="Select Facebook Page"
        size="md"
      >
        <div className="space-y-3 scrollbar-thin">
          <p className="text-sm text-gray-600 mb-4">
            Choose a Facebook page to manage and schedule content for.
          </p>
          
          {pages.map((page) => (
            <div
              key={page.pageId}
              onClick={() => handlePageSelect(page)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                selectedPageId === page.pageId
                  ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-100'
                  : 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                {page.picture ? (
                  <img
                    src={page.picture}
                    alt={page.pageName}
                    className="w-12 h-12 rounded-lg object-cover mr-4 flex-shrink-0"
                  />
                ) : (
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <Facebook className="w-6 h-6 text-blue-600" />
                  </div>
                )}
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <h4 className="font-semibold text-gray-900 truncate">{page.pageName}</h4>
                    <CheckCircle className="w-5 h-5 text-green-500 ml-3 flex-shrink-0" />
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      {page.category}
                    </span>
                    {page.followersCount && (
                      <div className="flex items-center ml-3">
                        <Users className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-600">{page.followersCount.toLocaleString()} followers</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center">
              <Facebook className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-sm text-blue-800 font-medium">Need to add more pages?</span>
            </div>
            <p className="text-xs text-blue-600 mt-1">
              Create new pages on Facebook or request access to existing pages from their admins.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  )
}

