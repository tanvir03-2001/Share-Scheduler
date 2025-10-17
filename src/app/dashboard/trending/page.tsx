import ContentArea from '@/components/dashboard/ContentArea'
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

export default function TrendingPage() {
  return <ContentArea activeTab="trending" />
}
