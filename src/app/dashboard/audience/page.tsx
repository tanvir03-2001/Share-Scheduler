import ProtectedRoute from '@/components/auth/ProtectedRoute'
import ContentArea from '@/components/dashboard/ContentArea'
import MobileHeader from '@/components/dashboard/MobileHeader'
import Sidebar from '@/components/dashboard/Sidebar'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Audience - Facebook Auto Post',
  description: 'Manage and analyze your Facebook audience insights. Understand your followers demographics, interests, and engagement patterns.',
  keywords: 'facebook audience, audience insights, follower demographics, social media audience, audience analytics',
  openGraph: {
    title: 'Audience - Facebook Auto Post',
    description: 'Manage and analyze your Facebook audience insights and demographics.',
    type: 'website',
  },
}

function AudienceContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <MobileHeader />
      <ContentArea activeTab="audience" />
    </div>
  )
}

export default function AudiencePage() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <AudienceContent />
      </SidebarProvider>
    </ProtectedRoute>
  )
}
