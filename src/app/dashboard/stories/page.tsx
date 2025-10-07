import ProtectedRoute from '@/components/auth/ProtectedRoute'
import ContentArea from '@/components/dashboard/ContentArea'
import Sidebar from '@/components/dashboard/Sidebar'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stories - Facebook Auto Post',
  description: 'Manage your Facebook Stories with automated posting. Create engaging story content that disappears after 24 hours.',
  keywords: 'facebook stories, story content, temporary posts, story scheduling, social media stories',
  openGraph: {
    title: 'Stories - Facebook Auto Post',
    description: 'Manage your Facebook Stories with automated posting and scheduling.',
    type: 'website',
  },
}

function StoriesContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 md:ml-64 sm:ml-56">
        <ContentArea activeTab="stories" />
      </div>
    </div>
  )
}

export default function StoriesPage() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <StoriesContent />
      </SidebarProvider>
    </ProtectedRoute>
  )
}
