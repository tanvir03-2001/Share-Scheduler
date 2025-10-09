import ProtectedRoute from '@/components/auth/ProtectedRoute'
import ContentArea from '@/components/dashboard/ContentArea'
import MobileHeader from '@/components/dashboard/MobileHeader'
import Sidebar from '@/components/dashboard/Sidebar'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comments - Facebook Auto Post',
  description: 'Manage and respond to comments on your Facebook posts. Monitor engagement and maintain conversations with your audience.',
  keywords: 'facebook comments, comment management, social media engagement, comment moderation, audience interaction',
  openGraph: {
    title: 'Comments - Facebook Auto Post',
    description: 'Manage and respond to comments on your Facebook posts effectively.',
    type: 'website',
  },
}

function CommentsContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <MobileHeader />
      <ContentArea activeTab="comments" />
    </div>
  )
}

export default function CommentsPage() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <CommentsContent />
      </SidebarProvider>
    </ProtectedRoute>
  )
}
