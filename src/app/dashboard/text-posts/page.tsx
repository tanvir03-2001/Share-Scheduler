import ContentArea from '@/components/dashboard/ContentArea'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Text Posts - Facebook Auto Post',
  description: 'Create and schedule text-only Facebook posts. Share your thoughts, updates, and announcements with your audience.',
  keywords: 'facebook text posts, text content, social media text, post scheduling, text publishing',
  openGraph: {
    title: 'Text Posts - Facebook Auto Post',
    description: 'Create and schedule text-only Facebook posts for your audience.',
    type: 'website',
  },
}

export default function TextPostsPage() {
  return <ContentArea activeTab="text" />
}
