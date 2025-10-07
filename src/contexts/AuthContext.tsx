'use client'

import { apiClient } from '@/lib/api'
import { useRouter } from 'next/navigation'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

interface User {
  id: string
  email: string
  name: string
  role: string
  isEmailVerified: boolean
  createdAt: string
  updatedAt: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string, acceptPrivacyPolicy: boolean) => Promise<boolean>
  logout: () => void
  verifyOTP: (otp: string) => Promise<boolean>
  verifyEmail: (token: string) => Promise<boolean>
  forgotPassword: (email: string) => Promise<boolean>
  resetPassword: (token: string, password: string) => Promise<boolean>
  resendOTP: () => Promise<boolean>
  resendVerificationEmail: (email: string) => Promise<boolean>
  updateProfile: (data: Partial<User>) => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!user

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to get user profile - this will automatically handle token refresh if needed
        const response = await apiClient.verifyToken('')
        
        if (response.success && response.data) {
          setUser(response.data)
        } else {
          // If verification fails, clear any stale state
          setUser(null)
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        // On error, clear user state
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      const response = await apiClient.login({ email, password })
      
      if (response.success && response.data) {
        const { user } = response.data
        
        // Server has already set the cookies, just set user state
        setUser(user)
        toast.success('Login successful!')
        return true
      } else {
        toast.error(response.error || 'Login failed')
        return false
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string, acceptPrivacyPolicy: boolean): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      const response = await apiClient.signup({ name, email, password, acceptPrivacyPolicy })
      
      if (response.success) {
        toast.success('Account created successfully! Please check your email to verify your account.')
        return true
      } else {
        toast.error(response.error || 'Signup failed')
        return false
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      // Call logout endpoint - server will clear cookies
      await apiClient.logout('')
      
      // Clear local state
      setUser(null)
      
      // Show success message
      toast.success('Logged out successfully')
      
      // Small delay to ensure state is updated before redirect
      setTimeout(() => {
        router.push('/')
      }, 100)
    } catch (error) {
      console.error('Logout error:', error)
      // Even if there's an error, clear local data and redirect
      setUser(null)
      router.push('/')
    }
  }

  const verifyOTP = async (otp: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }),
      })

      const data = await response.json()

      if (response.ok) {
        setUser(data.user)
        toast.success('Email verified successfully!')
        return true
      } else {
        toast.error(data.message || 'OTP verification failed')
        return false
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      const response = await apiClient.forgotPassword({ email })
      
      if (response.success) {
        toast.success('Password reset link sent to your email!')
        return true
      } else {
        toast.error(response.error || 'Failed to send reset link')
        return false
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const resetPassword = async (token: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      const response = await apiClient.resetPassword({ token, newPassword: password })
      
      if (response.success) {
        toast.success('Password reset successfully!')
        return true
      } else {
        toast.error(response.error || 'Password reset failed')
        return false
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const resendOTP = async (): Promise<boolean> => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/auth/resend-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('OTP sent to your email!')
        return true
      } else {
        toast.error(data.message || 'Failed to resend OTP')
        return false
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      const response = await apiClient.verifyEmail({ token })
      
      if (response.success && response.data) {
        const { user } = response.data
        
        // Store user data and redirect to dashboard
        setUser(user)
        toast.success('Email verified successfully!')
        router.push('/dashboard')
        return true
      } else {
        toast.error(response.error || 'Email verification failed')
        return false
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const resendVerificationEmail = async (email: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      const response = await apiClient.resendVerificationEmail({ email })
      
      if (response.success) {
        toast.success('Verification email sent successfully!')
        return true
      } else {
        toast.error(response.error || 'Failed to resend verification email')
        return false
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      const response = await apiClient.updateProfile(data, '')
      
      if (response.success && response.data) {
        setUser(response.data.user)
        toast.success('Profile updated successfully!')
        return true
      } else {
        toast.error(response.error || 'Profile update failed')
        return false
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    signup,
    logout,
    verifyOTP,
    verifyEmail,
    forgotPassword,
    resetPassword,
    resendOTP,
    resendVerificationEmail,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
