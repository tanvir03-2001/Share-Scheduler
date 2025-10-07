'use client'

import ProtectedRoute from '@/components/auth/ProtectedRoute'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function DashboardContent() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to schedule page by default
    router.replace('/dashboard/schedule')
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Redirecting...</p>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  )
}
