import ContentArea from '@/components/dashboard/ContentArea'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Schedule Content - Facebook Auto Post',
  description: 'Schedule and manage your Facebook posts with our automated posting system. Plan your content calendar and maintain consistent social media presence.',
  keywords: 'facebook scheduling, social media automation, content calendar, post scheduling',
  openGraph: {
    title: 'Schedule Content - Facebook Auto Post',
    description: 'Schedule and manage your Facebook posts with our automated posting system.',
    type: 'website',
  },
}

export default function SchedulePage() {
  return <ContentArea activeTab="schedule" />
}
