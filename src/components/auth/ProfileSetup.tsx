'use client'

import { useAuth } from '@/contexts/AuthContext'
import { ArrowRight, Building, Camera, Check, FileText, Globe, Loader2, Mail, User, UserCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

interface ProfileSetupFormData {
  name: string
  email: string
  bio?: string
  company?: string
  website?: string
}

const ProfileSetup: React.FC = () => {
  const [avatar, setAvatar] = useState<string | null>(null)
  const { user, updateProfile, isLoading } = useAuth()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileSetupFormData>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  })

  const onSubmit = async (data: ProfileSetupFormData) => {
    const profileData = {
      ...data,
      avatar: avatar || undefined,
    }
    
    const success = await updateProfile(profileData)
    if (success) {
      router.push('/dashboard')
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setAvatar(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSkip = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <UserCheck className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Complete your profile
          </h2>
          <p className="text-gray-600">
            Add some details to personalize your experience
          </p>
        </div>
        
        {/* Main Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Avatar Upload */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <label
                  htmlFor="avatar"
                  className="absolute bottom-0 right-0 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full p-2 cursor-pointer hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Camera className="h-4 w-4" />
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="mt-3 text-sm text-gray-500">Click to upload your photo</p>
            </div>

            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                </div>
                <input
                  {...register('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters',
                    },
                  })}
                  type="text"
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all duration-200 bg-white/50 hover:bg-white/80"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                </div>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all duration-200 bg-white/50 hover:bg-white/80"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Bio Field */}
            <div className="space-y-2">
              <label htmlFor="bio" className="block text-sm font-semibold text-gray-700">
                Bio (Optional)
              </label>
              <div className="relative group">
                <div className="absolute top-4 left-4 flex items-start pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                </div>
                <textarea
                  {...register('bio')}
                  rows={3}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all duration-200 bg-white/50 hover:bg-white/80 resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            {/* Company Field */}
            <div className="space-y-2">
              <label htmlFor="company" className="block text-sm font-semibold text-gray-700">
                Company (Optional)
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                </div>
                <input
                  {...register('company')}
                  type="text"
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all duration-200 bg-white/50 hover:bg-white/80"
                  placeholder="Your company name"
                />
              </div>
            </div>

            {/* Website Field */}
            <div className="space-y-2">
              <label htmlFor="website" className="block text-sm font-semibold text-gray-700">
                Website (Optional)
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Globe className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                </div>
                <input
                  {...register('website', {
                    pattern: {
                      value: /^https?:\/\/.+$/,
                      message: 'Please enter a valid URL',
                    },
                  })}
                  type="url"
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all duration-200 bg-white/50 hover:bg-white/80"
                  placeholder="https://yourwebsite.com"
                />
              </div>
              {errors.website && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                  {errors.website.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-4 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Completing profile...
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" />
                    Complete Profile
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleSkip}
                className="w-full flex items-center justify-center gap-2 py-3 px-6 border-2 border-gray-200 text-gray-700 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 font-medium text-sm"
              >
                Skip for now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileSetup