'use client'

import { useAuth } from '@/contexts/AuthContext'
import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function ConditionalNavbar() {
  const { isAuthenticated } = useAuth()
  const pathname = usePathname()

  // Show navbar when:
  // 1. User is not authenticated (always show)
  // 2. User is authenticated AND on home page
  if (isAuthenticated && pathname !== '/') {
    return null
  }

  return <Navbar />
}
