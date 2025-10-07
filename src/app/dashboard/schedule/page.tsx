import ProtectedRoute from '@/components/auth/ProtectedRoute'
import ContentArea from '@/components/dashboard/ContentArea'
import Sidebar from '@/components/dashboard/Sidebar'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Schedule Content - Facebook Auto Post',
  description: 'Schedule and manage your Facebook posts with our automated posting system. Plan your content calendar and maintain consistent social media presence.',
  keywords: 'facebook scheduling, social media automation, content calendar, post scheduling',
  openGraph: {
    title: 'Schedule Content - Facebook Auto Post',
    description: 'Schedule and manage your Facebook posts with our automated posting system.',
    type: 'website',
  },
}

function ScheduleContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 md:ml-64 sm:ml-56">
        <ContentArea activeTab="schedule" />
      </div>
    </div>
  )
}

export default function SchedulePage() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <ScheduleContent />
      </SidebarProvider>
    </ProtectedRoute>
  )
}
