import ContentArea from '@/components/dashboard/ContentArea'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Post History - Facebook Auto Post',
  description: 'View your complete Facebook post history. Track all your published posts, their performance, and engagement metrics.',
  keywords: 'facebook post history, published posts, post archive, social media history, post tracking',
  openGraph: {
    title: 'Post History - Facebook Auto Post',
    description: 'View your complete Facebook post history and track performance.',
    type: 'website',
  },
}

export default function PostHistoryPage() {
  return <ContentArea activeTab="history" />
}
