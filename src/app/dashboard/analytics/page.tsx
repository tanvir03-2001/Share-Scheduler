import ContentArea from '@/components/dashboard/ContentArea'
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

export default function AnalyticsPage() {
  return <ContentArea activeTab="analytics" />
}
