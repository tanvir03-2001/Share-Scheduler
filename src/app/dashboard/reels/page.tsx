import ContentArea from '@/components/dashboard/ContentArea'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Reels - Facebook Auto Post',
  description: 'Create and schedule Facebook Reels to engage your audience with short-form video content. Upload, edit, and publish reels automatically.',
  keywords: 'facebook reels, video content, short-form video, reels scheduling, video marketing',
  openGraph: {
    title: 'Reels - Facebook Auto Post',
    description: 'Create and schedule Facebook Reels to engage your audience with short-form video content.',
    type: 'website',
  },
}

export default function ReelsPage() {
  return <ContentArea activeTab="reels" />
}
