import ProtectedRoute from '@/components/auth/ProtectedRoute'
import ContentArea from '@/components/dashboard/ContentArea'
import Sidebar from '@/components/dashboard/Sidebar'
import { SidebarProvider } from '@/contexts/SidebarContext'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Trending - Facebook Auto Post',
  description: 'Discover trending topics and hashtags on Facebook. Stay updated with viral content and trending discussions in your niche.',
  keywords: 'facebook trending, viral content, trending hashtags, social media trends, trending topics',
  openGraph: {
    title: 'Trending - Facebook Auto Post',
    description: 'Discover trending topics and hashtags on Facebook to boost your content reach.',
    type: 'website',
  },
}

function TrendingContent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 md:ml-64 sm:ml-56">
        <ContentArea activeTab="trending" />
      </div>
    </div>
  )
}

export default function TrendingPage() {
  return (
    <ProtectedRoute>
      <SidebarProvider>
        <TrendingContent />
      </SidebarProvider>
    </ProtectedRoute>
  )
}
