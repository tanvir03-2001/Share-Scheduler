import ContentArea from '@/components/dashboard/ContentArea'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Content & Post - Facebook Auto Post',
  description: 'Create, schedule and manage your Facebook posts with our automated posting system. Plan your content calendar and maintain consistent social media presence.',
  keywords: 'facebook scheduling, social media automation, content calendar, post scheduling, content management',
  openGraph: {
    title: 'Content & Post - Facebook Auto Post',
    description: 'Create, schedule and manage your Facebook posts with our automated posting system.',
    type: 'website',
  },
}

export default function SchedulePage() {
  return <ContentArea activeTab="schedule" />
}
