import ProtectedRoute from '@/components/auth/ProtectedRoute'
import ContentArea from '@/components/dashboard/ContentArea'
import Sidebar from '@/components/dashboard/Sidebar'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reels - Facebook Auto Post',
  description: 'Create and schedule Facebook Reels to engage your audience with short-form video content. Upload, edit, and publish reels automatically.',
  keywords: 'facebook reels, video content, short-form video, reels scheduling, video marketing',
  openGraph: {
    title: 'Reels - Facebook Auto Post',
    description: 'Create and schedule Facebook Reels to engage your audience with short-form video content.',
    type: 'website',
  },
}

function ReelsContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 md:ml-64 sm:ml-56">
        <ContentArea activeTab="reels" />
      </div>
    </div>
  )
}

export default function ReelsPage() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <ReelsContent />
      </SidebarProvider>
    </ProtectedRoute>
  )
}
