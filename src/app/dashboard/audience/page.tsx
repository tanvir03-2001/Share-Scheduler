import ContentArea from '@/components/dashboard/ContentArea'
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

export default function AudiencePage() {
  return <ContentArea activeTab="audience" />
}
