import ProtectedRoute from '@/components/auth/ProtectedRoute'
import ContentArea from '@/components/dashboard/ContentArea'
import MobileHeader from '@/components/dashboard/MobileHeader'
import Sidebar from '@/components/dashboard/Sidebar'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analytics - Facebook Auto Post',
  description: 'View detailed analytics and performance metrics for your Facebook posts. Track engagement, reach, and audience insights.',
  keywords: 'facebook analytics, social media metrics, post performance, engagement tracking, facebook insights',
  openGraph: {
    title: 'Analytics - Facebook Auto Post',
    description: 'View detailed analytics and performance metrics for your Facebook posts.',
    type: 'website',
  },
}

function AnalyticsContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <MobileHeader />
      <ContentArea activeTab="analytics" />
    </div>
  )
}

export default function AnalyticsPage() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AnalyticsContent />
      </SidebarProvider>
    </ProtectedRoute>
  )
}
