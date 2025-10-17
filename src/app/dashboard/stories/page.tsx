import ContentArea from '@/components/dashboard/ContentArea'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Stories - Facebook Auto Post',
  description: 'Manage your Facebook Stories with automated posting. Create engaging story content that disappears after 24 hours.',
  keywords: 'facebook stories, story content, temporary posts, story scheduling, social media stories',
  openGraph: {
    title: 'Stories - Facebook Auto Post',
    description: 'Manage your Facebook Stories with automated posting and scheduling.',
    type: 'website',
  },
}

export default function StoriesPage() {
  return <ContentArea activeTab="stories" />
}
