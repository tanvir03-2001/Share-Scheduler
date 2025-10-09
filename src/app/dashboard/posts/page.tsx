import ProtectedRoute from '@/components/auth/ProtectedRoute'
import ContentArea from '@/components/dashboard/ContentArea'
import MobileHeader from '@/components/dashboard/MobileHeader'
import Sidebar from '@/components/dashboard/Sidebar'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Post Content - Facebook Auto Post',
  description: 'Create and manage your Facebook posts. Upload images, write captions, and publish content directly to your Facebook pages.',
  keywords: 'facebook posts, social media content, post creation, facebook publishing',
  openGraph: {
    title: 'Post Content - Facebook Auto Post',
    description: 'Create and manage your Facebook posts with our easy-to-use interface.',
    type: 'website',
  },
}

function PostContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <MobileHeader />
      <ContentArea activeTab="posts" />
    </div>
  )
}

export default function PostsPage() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <PostContent />
      </SidebarProvider>
    </ProtectedRoute>
  )
}
