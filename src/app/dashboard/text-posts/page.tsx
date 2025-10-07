import ProtectedRoute from '@/components/auth/ProtectedRoute'
import ContentArea from '@/components/dashboard/ContentArea'
import Sidebar from '@/components/dashboard/Sidebar'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text Posts - Facebook Auto Post',
  description: 'Create and schedule text-only Facebook posts. Share your thoughts, updates, and announcements with your audience.',
  keywords: 'facebook text posts, text content, social media text, post scheduling, text publishing',
  openGraph: {
    title: 'Text Posts - Facebook Auto Post',
    description: 'Create and schedule text-only Facebook posts for your audience.',
    type: 'website',
  },
}

function TextPostsContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 md:ml-64 sm:ml-56">
        <ContentArea activeTab="text" />
      </div>
    </div>
  )
}

export default function TextPostsPage() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <TextPostsContent />
      </SidebarProvider>
    </ProtectedRoute>
  )
}
