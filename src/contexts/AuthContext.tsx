'use client'

import Cookies from 'js-cookie'
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

interface User {
  id: string
  email: string
  name: string
  isVerified: boolean
  avatar?: string
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  verifyOTP: (otp: string) => Promise<boolean>
  forgotPassword: (email: string) => Promise<boolean>
  resetPassword: (token: string, password: string) => Promise<boolean>
  resendOTP: () => Promise<boolean>
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

  const isAuthenticated = !!user

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get('auth_token')
        if (token) {
          // Check if it's a mock token (for testing)
          if (token.startsWith('mock_jwt_token_')) {
            // Mock user data for testing
            const mockUser = {
              id: 'user_123',
              name: 'Admin User',
              email: 'admin@sharescheduler.com',
              isVerified: true,
              avatar: undefined
            }
            setUser(mockUser)
          } else {
            // Verify token with backend (for production)
            const response = await fetch('/api/auth/verify', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
            
            if (response.ok) {
              const userData = await response.json()
              setUser(userData.user)
            } else {
              Cookies.remove('auth_token')
            }
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        Cookies.remove('auth_token')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      
      // Fixed login credentials for testing
      const fixedCredentials = {
        email: 'admin@sharescheduler.com',
        password: 'admin123'
      }
      
      // Check if credentials match fixed values
      if (email === fixedCredentials.email && password === fixedCredentials.password) {
        // Simulate successful login
        const mockUser = {
          id: 'user_123',
          name: 'Admin User',
          email: 'admin@sharescheduler.com',
          isVerified: true,
          avatar: undefined
        }
        
        const mockToken = 'mock_jwt_token_' + Date.now()
        
        Cookies.set('auth_token', mockToken, { expires: 7 })
        setUser(mockUser)
        toast.success('Login successful!')
        return true
      } else {
        toast.error('Invalid email or password')
        return false
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Account created! Please verify your email.')
        return true
      } else {
        toast.error(data.message || 'Signup failed')
        return false
      }
    } catch (error) {
      toast.error('Network error. Please try again.')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    Cookies.remove('auth_token')
    setUser(null)
    toast.success('Logged out successfully')
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
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Password reset link sent to your email!')
        return true
      } else {
        toast.error(data.message || 'Failed to send reset link')
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
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Password reset successfully!')
        return true
      } else {
        toast.error(data.message || 'Password reset failed')
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

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    try {
      setIsLoading(true)
      const token = Cookies.get('auth_token')
      const response = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      const responseData = await response.json()

      if (response.ok) {
        setUser(responseData.user)
        toast.success('Profile updated successfully!')
        return true
      } else {
        toast.error(responseData.message || 'Profile update failed')
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
    forgotPassword,
    resetPassword,
    resendOTP,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
