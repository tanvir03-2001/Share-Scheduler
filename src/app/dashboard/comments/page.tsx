import ContentArea from '@/components/dashboard/ContentArea'
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

export default function CommentsPage() {
  return <ContentArea activeTab="comments" />
}
