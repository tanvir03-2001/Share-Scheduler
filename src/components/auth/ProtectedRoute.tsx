'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireVerification?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireVerification = false 
}) => {
  const { user, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Only redirect if we're not loading and definitely not authenticated
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login')
      return
    }

    // Check email verification only if user is authenticated
    if (!isLoading && isAuthenticated && requireVerification && user && !user.isEmailVerified) {
      router.push('/auth/verify-otp')
      return
    }
  }, [isAuthenticated, isLoading, user, requireVerification, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-600" />
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  if (requireVerification && user && !user.isEmailVerified) {
    return null
  }

  return <>{children}</>
}

export default ProtectedRoute
