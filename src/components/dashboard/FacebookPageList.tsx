'use client'

import Modal from '@/components/ui/Modal'
import { AlertCircle, CheckCircle, ExternalLink, Facebook, Users } from 'lucide-react'
import { useState } from 'react'

interface FacebookPage {
  id: string
  name: string
  category: string
  followers: number
  isConnected: boolean
  profilePicture: string
  accessToken?: string
}

interface FacebookPageListProps {
  onPageSelect: (page: FacebookPage) => void
  selectedPageId?: string
  onPageSwitch?: () => void
}

// Sample data - in real app, this would come from Facebook API
const samplePages: FacebookPage[] = [
  {
    id: '1',
    name: 'My Business Page',
    category: 'Business',
    followers: 1250,
    isConnected: true,
    profilePicture: '/api/placeholder/40/40',
    accessToken: 'valid_token'
  },
  {
    id: '2',
    name: 'Tech News Hub',
    category: 'Media/News',
    followers: 5600,
    isConnected: true,
    profilePicture: '/api/placeholder/40/40',
    accessToken: 'valid_token'
  },
  {
    id: '3',
    name: 'Fashion Store',
    category: 'Shopping & Retail',
    followers: 890,
    isConnected: false,
    profilePicture: '/api/placeholder/40/40'
  },
  {
    id: '4',
    name: 'Local Restaurant',
    category: 'Restaurant',
    followers: 320,
    isConnected: true,
    profilePicture: '/api/placeholder/40/40',
    accessToken: 'valid_token'
  }
]

export default function FacebookPageList({ onPageSelect, selectedPageId, onPageSwitch }: FacebookPageListProps) {
  const [isConnected, setIsConnected] = useState(true) // Set to true to show pages
  const [isLoading, setIsLoading] = useState(false)
  const [showPageList, setShowPageList] = useState(false)

  const handleFacebookLogin = async () => {
    setIsLoading(true)
    // Simulate Facebook login process
    setTimeout(() => {
      setIsConnected(true)
      setIsLoading(false)
    }, 2000)
  }

  const handlePageSelect = (page: FacebookPage) => {
    if (page.isConnected) {
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

  const selectedPage = samplePages.find(page => page.id === selectedPageId) || samplePages[0]

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

  return (
    <div className="p-4">
      {/* Active Page Display */}
      <div 
        onClick={handlePageSwitch}
        className="p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 cursor-pointer transition-all duration-200 group"
      >
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 group-hover:bg-blue-200 transition-colors">
            <Facebook className="w-5 h-5 text-blue-600" />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center">
              <h4 className="font-medium text-sm text-gray-900 truncate">{selectedPage.name}</h4>
              <CheckCircle className="w-4 h-4 text-green-500 ml-2 flex-shrink-0" />
            </div>
            
            <div className="flex items-center mt-1">
              <span className="text-xs text-gray-500">{selectedPage.category}</span>
              <span className="text-xs text-gray-400 mx-2">•</span>
              <div className="flex items-center">
                <Users className="w-3 h-3 text-gray-400 mr-1" />
                <span className="text-xs text-gray-500">{selectedPage.followers.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="ml-2">
            <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
        </div>
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
          
          {samplePages.map((page) => (
            <div
              key={page.id}
              onClick={() => handlePageSelect(page)}
              className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                selectedPageId === page.id
                  ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-100'
                  : page.isConnected
                  ? 'bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  : 'bg-gray-50 border-gray-200 opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                  <Facebook className="w-6 h-6 text-blue-600" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <h4 className="font-semibold text-gray-900 truncate">{page.name}</h4>
                    {page.isConnected ? (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-3 flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-orange-500 ml-3 flex-shrink-0" />
                    )}
                  </div>
                  
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                      {page.category}
                    </span>
                    <div className="flex items-center ml-3">
                      <Users className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-600">{page.followers.toLocaleString()} followers</span>
                    </div>
                  </div>
                </div>
                
                {!page.isConnected && (
                  <div className="ml-4">
                    <button className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full font-medium">
                      Connect Required
                    </button>
                  </div>
                )}
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
