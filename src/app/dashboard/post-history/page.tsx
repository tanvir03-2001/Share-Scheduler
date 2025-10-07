import ProtectedRoute from '@/components/auth/ProtectedRoute'
import ContentArea from '@/components/dashboard/ContentArea'
import Sidebar from '@/components/dashboard/Sidebar'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Post History - Facebook Auto Post',
  description: 'View your complete Facebook post history. Track all your published posts, their performance, and engagement metrics.',
  keywords: 'facebook post history, published posts, post archive, social media history, post tracking',
  openGraph: {
    title: 'Post History - Facebook Auto Post',
    description: 'View your complete Facebook post history and track performance.',
    type: 'website',
  },
}

function PostHistoryContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 md:ml-64 sm:ml-56">
        <ContentArea activeTab="history" />
      </div>
    </div>
  )
}

export default function PostHistoryPage() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <PostHistoryContent />
      </SidebarProvider>
    </ProtectedRoute>
  )
}
