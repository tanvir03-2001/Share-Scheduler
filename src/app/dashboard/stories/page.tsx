import ProtectedRoute from '@/components/auth/ProtectedRoute'
import ContentArea from '@/components/dashboard/ContentArea'
import MobileHeader from '@/components/dashboard/MobileHeader'
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
      <MobileHeader />
      <ContentArea activeTab="stories" />
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
