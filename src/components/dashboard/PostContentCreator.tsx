'use client'

import BeautifulAlert from '@/components/ui/BeautifulAlert'
import UploadModal from '@/components/ui/UploadModal'
import UploadProgress from '@/components/ui/UploadProgress'
import { usePage } from '@/contexts/PageContext'
import { convertLocalToUTC, formatTimeWithTimezone, getMinScheduleDate, getMinScheduleTime, getUserTimezone, isScheduledTimeInFuture } from '@/lib/timeUtils'
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  Check,
  Globe,
  Hash,
  Image,
  Play,
  Plus,
  Type,
  Upload,
  Users,
  X
} from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

interface PostType {
  id: string
  name: string
  icon: any
  description: string
  color: string
}

interface UploadedFile {
  id: string
  file: File
  preview: string
  type: 'image' | 'video'
}

const postTypes: PostType[] = [
  {
    id: 'text',
    name: 'Text',
    icon: Type,
    description: 'Share text content with your audience',
    color: 'bg-blue-500'
  },
  {
    id: 'image',
    name: 'Image',
    icon: Image,
    description: 'Share photos and images',
    color: 'bg-green-500'
  },
  {
    id: 'reel',
    name: 'Reel',
    icon: Play,
    description: 'Create engaging short videos',
    color: 'bg-pink-500'
  },
  {
    id: 'story',
    name: 'Story',
    icon: Camera,
    description: 'Share temporary stories',
    color: 'bg-orange-500'
  }
]

export default function PostContentCreator() {
  const { selectedPage } = usePage()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPostType, setSelectedPostType] = useState<string>('')
  const [content, setContent] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [publishMode, setPublishMode] = useState<'now' | 'schedule'>('now')
  const [scheduleDate, setScheduleDate] = useState(() => getMinScheduleDate())
  const [scheduleTimes, setScheduleTimes] = useState<string[]>(() => [getMinScheduleTime()])
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['facebook'])
  const [hashtags, setHashtags] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  
  // Beautiful alert states
  const [alert, setAlert] = useState<{
    type: 'success' | 'error' | 'warning' | 'info'
    title: string
    message: string
    isVisible: boolean
  }>({
    type: 'info',
    title: '',
    message: '',
    isVisible: false
  })
  
  // Progress states
  const [progress, setProgress] = useState<{
    isVisible: boolean
    current: number
    total: number
    currentFileName?: string
  }>({
    isVisible: false,
    current: 0,
    total: 0
  })
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const totalSteps = 4

  // Ensure date is properly initialized on component mount
  useEffect(() => {
    console.log('🚀 PostContentCreator component mounted!')
    
    const today = new Date()
    // Format as YYYY-MM-DD using local date components
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const day = today.getDate().toString().padStart(2, '0')
    const todayString = `${year}-${month}-${day}`
    
    console.log('🔍 Date Debug Info:')
    console.log('Current system date (LOCAL):', todayString)
    console.log('Current scheduleDate state:', scheduleDate)
    console.log('Date comparison:', scheduleDate !== todayString)
    
    // Always force update to today's date
    console.log('🔄 Force updating date to:', todayString)
    setScheduleDate(todayString)
    
    // Force update time if it's empty or invalid
    if (scheduleTimes.length === 0 || scheduleTimes[0] === '') {
      const now = new Date()
      now.setMinutes(now.getMinutes() + 40) // Add 40 minutes
      const timeString = now.toTimeString().slice(0, 5) // Format as HH:MM
      console.log('🕐 Force updating time to:', timeString)
      setScheduleTimes([timeString])
    }
  }, [scheduleDate, scheduleTimes]) // Run when these values change

  // Helper functions for beautiful alerts
  const showAlert = (type: 'success' | 'error' | 'warning' | 'info', title: string, message: string) => {
    setAlert({ type, title, message, isVisible: true })
  }

  const hideAlert = () => {
    setAlert(prev => ({ ...prev, isVisible: false }))
  }

  const showProgress = (total: number) => {
    setProgress({ isVisible: true, current: 0, total })
  }

  const updateProgress = (current: number, fileName?: string) => {
    setProgress(prev => ({ ...prev, current, currentFileName: fileName }))
  }

  const hideProgress = () => {
    setProgress(prev => ({ ...prev, isVisible: false }))
  }

  // Ensure Facebook is always selected by default
  useEffect(() => {
    if (selectedPlatforms.length === 0) {
      setSelectedPlatforms(['facebook'])
    }
  }, [selectedPlatforms.length])

  // Initialize default date and time
  const getDefaultDate = () => getMinScheduleDate()
  const getMinDate = () => getMinScheduleDate()
  const getDefaultTime = () => getMinScheduleTime()

  // Handle publish mode change
  const handlePublishModeChange = (mode: 'now' | 'schedule') => {
    setPublishMode(mode)
    if (mode === 'schedule') {
      // Initialize with default date and time when switching to schedule
      setScheduleDate(getDefaultDate())
      setScheduleTimes([getDefaultTime()])
    }
  }

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: Users, default: true },
    { id: 'instagram', name: 'Instagram', icon: Camera },
    { id: 'twitter', name: 'Twitter', icon: Hash },
    { id: 'linkedin', name: 'LinkedIn', icon: Globe }
  ]

  // Step navigation functions
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return selectedPostType !== ''
      case 2:
        if (publishMode === 'now') {
          return true
        } else if (publishMode === 'schedule') {
          return scheduleDate !== '' && scheduleTimes.some(time => time.trim() !== '')
        }
        return false
      case 3:
        return selectedPlatforms.length > 0
      case 4:
        return true
      default:
        return false
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Select Post Type'
      case 2:
        return 'Choose Publish Mode'
      case 3:
        return 'Select Platforms'
      case 4:
        return 'Upload Content'
      default:
        return ''
    }
  }

  // Memoize placeholder to prevent unnecessary re-renders
  const contentPlaceholder = useMemo(() => {
    if (selectedPostType === 'text') {
      return "What's on your mind? Share your thoughts with your audience..."
    }
    if (uploadedFiles.length > 0) {
      return "Add a caption for your media (optional)..."
    }
    return "Add a caption for your media..."
  }, [selectedPostType, uploadedFiles.length])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    handleFileUpload(files)
  }, [])

  const handleFileUpload = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      type: (selectedPostType === 'reel' || file.type.startsWith('video/')) ? 'video' : 'image'
    }))
    
    setUploadedFiles(prev => [...prev, ...newFiles])
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files)
      handleFileUpload(files)
    }
  }

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const fileToRemove = prev.find(f => f.id === id)
      if (fileToRemove) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      return prev.filter(f => f.id !== id)
    })
  }

  const togglePlatform = (platformId: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platformId)) {
        // Don't allow deselecting the last platform
        if (prev.length <= 1) {
          return prev
        }
        return prev.filter(p => p !== platformId)
      } else {
        return [...prev, platformId]
      }
    })
  }

  const addScheduleTime = () => {
    setScheduleTimes(prev => [...prev, getDefaultTime()])
  }

  const removeScheduleTime = (index: number) => {
    setScheduleTimes(prev => prev.filter((_, i) => i !== index))
  }

  const updateScheduleTime = (index: number, time: string) => {
    setScheduleTimes(prev => prev.map((t, i) => i === index ? time : t))
  }

  const handleUploadComplete = (files: UploadedFile[]) => {
    setUploadedFiles(files)
    setShowUploadModal(false)
  }

  const generateSchedulePlan = () => {
    if (publishMode === 'now') return []
    
    const validTimes = scheduleTimes.filter(time => time.trim() !== '')
    if (validTimes.length === 0) return []
    
    const startDate = new Date(scheduleDate)
    const schedulePlan: Array<{date: string, time: string, postNumber: number}> = []
    
    // Calculate schedule plan with smart time distribution
    const totalPosts = Math.max(validTimes.length, uploadedFiles.length)
    
    for (let i = 0; i < totalPosts; i++) {
      const currentDate = new Date(startDate)
      let timeToUse = validTimes[0] || '09:00'
      
      // Smart distribution: use available times first, then move to next date
      if (i < validTimes.length) {
        // Use different time on same date
        timeToUse = validTimes[i]
      } else {
        // Move to next date and use first time
        const daysToAdd = Math.floor(i / validTimes.length)
        currentDate.setDate(currentDate.getDate() + daysToAdd)
        timeToUse = validTimes[i % validTimes.length]
      }
      
      schedulePlan.push({
        date: currentDate.toISOString().split('T')[0],
        time: timeToUse,
        postNumber: i + 1
      })
    }
    
    return schedulePlan
  }

  const handleSubmit = async () => {
    setIsUploading(true)
    
    try {
      // Debug logging
      console.log('Form submission started:', {
        currentStep,
        selectedPostType,
        selectedPlatforms,
        content: content.trim(),
        uploadedFiles: uploadedFiles.length,
        publishMode
      });
      
      // Client-side validation
      const hasMediaFiles = uploadedFiles.length > 0;
      const hasContent = content.trim().length > 0;
      const isMediaPost = ['image', 'reel', 'story'].includes(selectedPostType);
      
      // Validate content requirements
      if (selectedPostType === 'text' && !hasContent) {
        showAlert('error', 'Content Required', 'Content is required for text posts');
        setIsUploading(false);
        return;
      }
      
      if (isMediaPost && !hasContent && !hasMediaFiles) {
        showAlert('error', 'Content or Media Required', 'Either content or media files are required for media posts');
        setIsUploading(false);
        return;
      }
      
      // Validate platform selection
      if (selectedPlatforms.length === 0) {
        showAlert('error', 'Platform Required', 'At least one platform must be selected. Please go back to step 3 and select a platform.');
        setIsUploading(false);
        return;
      }
      
      // Validate schedule date and time (must be in the future) - UTC validation
      if (publishMode === 'schedule' && scheduleDate && scheduleTimes.length > 0) {
        const validTimes = scheduleTimes.filter(time => time.trim() !== '');
        
        console.log(`🌍 Frontend UTC Timezone Validation:`, {
          scheduleDate,
          validTimes,
          userTimezone: getUserTimezone(),
          validationMethod: 'UTC Timezone Validation',
          timezone: 'UTC'
        });
        
        for (const time of validTimes) {
          // Convert local time to UTC and validate against UTC
          // isScheduledTimeInFuture now converts to UTC internally and validates
          const utcConversion = convertLocalToUTC(scheduleDate, time);
          const isValid = isScheduledTimeInFuture(scheduleDate, time);
          
          console.log(`🌍 UTC validation for ${time} (local) → ${utcConversion.utcDate} ${utcConversion.utcTime} (UTC): ${isValid ? '✅ Valid' : '❌ Invalid'}`);
          
          if (!isValid) {
            showAlert('error', 'Invalid Time', `The selected time ${time} on ${scheduleDate} (converts to ${utcConversion.utcTime} UTC on ${utcConversion.utcDate}) is in the past. Please select a future time.`);
            setIsUploading(false);
            return;
          }
        }
        
        console.log(`✅ All UTC timezone validations passed - Ready for server validation!`);
      }
      
      console.log('Selected platforms:', selectedPlatforms);
      
      const schedulePlan = generateSchedulePlan()
      console.log('Publishing with plan:', {
        postType: selectedPostType,
        content,
        platforms: selectedPlatforms,
        publishMode,
        schedulePlan
      })
      
      // Import API client
      const { apiClient } = await import('../../lib/api')
      
      // Create separate content entries for each media file
      const files = uploadedFiles.map(file => file.file)
      let successCount = 0
      let errorCount = 0
      
      // Show progress indicator
      const totalItems = files.length > 0 ? files.length : 1
      showProgress(totalItems)
      
      if (files.length > 0) {
        // Create separate content for each file
        for (let i = 0; i < files.length; i++) {
          // Update progress
          updateProgress(i, files[i].name)
          const singleFile = [files[i]]
          
          // Calculate smart schedule date and time for each video
          let videoScheduleDate = scheduleDate
          let videoScheduleTime = scheduleTimes[0] || '09:00'
          
          if (publishMode === 'schedule' && scheduleDate && scheduleTimes.length > 0) {
            const validTimes = scheduleTimes.filter(time => time.trim() !== '')
            
            // Smart distribution: use available times first, then move to next date
            if (i < validTimes.length) {
              // Use different time on same date
              videoScheduleTime = validTimes[i]
            } else {
              // Move to next date and use first time
              const daysToAdd = Math.floor(i / validTimes.length)
              const originalDate = new Date(scheduleDate)
              originalDate.setDate(originalDate.getDate() + daysToAdd)
              videoScheduleDate = originalDate.toISOString().split('T')[0]
              videoScheduleTime = validTimes[i % validTimes.length]
            }
          }
          
          // Create content data for this specific file
          const contentData = {
            postType: selectedPostType,
            content: content.trim() || '', // Use the same content for all files
            hashtags,
            platforms: selectedPlatforms,
            publishMode,
            scheduleDate: publishMode === 'schedule' ? videoScheduleDate : undefined,
            scheduleTimes: publishMode === 'schedule' ? [videoScheduleTime] : undefined,
            selectedPageId: selectedPage?.pageId
          }
          
          try {
            const response = await apiClient.createContent(contentData, singleFile)
            
            if (response.success) {
              console.log(`Content ${i + 1} created successfully:`, response.data)
              successCount++
            } else {
              console.error(`Failed to create content ${i + 1}:`, response.error)
              errorCount++
            }
          } catch (error) {
            console.error(`Error creating content ${i + 1}:`, error)
            errorCount++
          }
          
          // Update progress after each upload
          updateProgress(i + 1, files[i].name)
        }
      } else {
        // No media files, create single content entry
        const contentData = {
          postType: selectedPostType,
          content: content.trim() || '',
          hashtags,
          platforms: selectedPlatforms,
          publishMode,
          scheduleDate: publishMode === 'schedule' ? scheduleDate : undefined,
          scheduleTimes: publishMode === 'schedule' ? scheduleTimes.filter(time => time.trim() !== '') : undefined,
          selectedPageId: selectedPage?.pageId
        }
        
        const response = await apiClient.createContent(contentData, [])
        
        if (response.success) {
          console.log('Content created successfully:', response.data)
          successCount++
        } else {
          console.error('Failed to create content:', response.error)
          errorCount++
        }
      }
      
      // Hide progress and show result
      hideProgress()
      
      // Show result message
      if (successCount > 0 && errorCount === 0) {
        if (successCount > 1 && publishMode === 'schedule') {
          showAlert('success', 'Content Scheduled Successfully!', 
            `${successCount} content items have been scheduled on consecutive dates starting from ${scheduleDate}. No page reload required!`)
        } else {
          showAlert('success', 'Content Created Successfully!', 
            `${successCount} content item(s) has been created and is ready to publish!`)
        }
      } else if (successCount > 0 && errorCount > 0) {
        showAlert('warning', 'Partial Success', 
          `Successfully created ${successCount} content item(s), but ${errorCount} failed. Please check your connection and try again.`)
      } else {
        showAlert('error', 'Upload Failed', 
          'Failed to create content. Please check your connection and try again.')
        setIsUploading(false)
        return
      }
      
      // Reset form
      setContent('')
      setUploadedFiles([])
      setScheduleDate(getMinScheduleDate())
      setScheduleTimes([getMinScheduleTime()])
      setHashtags('')
      setPublishMode('now')
      setSelectedPostType('')
      setCurrentStep(1)
    } catch (error) {
      console.error('Error creating content:', error)
      hideProgress()
      showAlert('error', 'Unexpected Error', 'An unexpected error occurred while creating content. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-2 md:px-3 py-4 overflow-x-hidden relative">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Create New Post</h1>
        <p className="text-gray-500 text-xs md:text-sm">Step {currentStep} of {totalSteps}: {getStepTitle()}</p>
        {selectedPlatforms.length > 0 && (
          <div className="mt-2 flex items-center space-x-2">
            <span className="text-xs text-gray-600">Selected platforms:</span>
            {selectedPlatforms.map(platformId => {
              const platform = platforms.find(p => p.id === platformId)
              if (platform) {
                const Icon = platform.icon
                return (
                  <div key={platformId} className="flex items-center bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                    <Icon className="w-3 h-3 mr-1" />
                    {platform.name}
                  </div>
                )
              }
              return null
            })}
          </div>
        )}
      </div>

      {/* Compact Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                step <= currentStep 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {step < currentStep ? <Check className="w-3 h-3" /> : step}
              </div>
              {step < totalSteps && (
                <div className={`w-8 md:w-12 h-0.5 mx-1 md:mx-2 rounded-full transition-all duration-300 ${
                  step < currentStep ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600 font-medium">
          <span className="hidden sm:inline">Post Type</span>
          <span className="sm:hidden">Type</span>
          <span className="hidden sm:inline">Publish Mode</span>
          <span className="sm:hidden">Mode</span>
          <span className="hidden sm:inline">Platforms</span>
          <span className="sm:hidden">Platforms</span>
          <span className="hidden sm:inline">Content</span>
          <span className="sm:hidden">Content</span>
        </div>
      </div>

      {/* Compact Overview Panel */}
      <div className="mb-4 bg-white rounded-lg shadow-sm border border-gray-100 p-2 md:p-3 sticky top-0 z-[999999]">
        <h3 className="text-xs md:text-sm font-semibold text-gray-900 mb-3 flex items-center">
          <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center mr-2">
            <Check className="w-2 h-2 md:w-3 md:h-3 text-white" />
          </div>
          Post Summary
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
          {/* Post Type */}
          <div className="bg-gray-50 rounded-lg p-2 md:p-3">
            <h4 className="font-medium text-gray-900 mb-2 text-xs uppercase tracking-wide">Post Type</h4>
            {selectedPostType ? (
              <div className="flex items-center">
                {(() => {
                  const type = postTypes.find(t => t.id === selectedPostType)
                  if (type) {
                    const Icon = type.icon
                    return (
                      <>
                        <div className={`w-6 h-6 ${type.color} rounded flex items-center justify-center mr-2`}>
                          <Icon className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-800 text-xs font-medium">{type.name}</span>
                      </>
                    )
                  }
                  return <span className="text-gray-500 text-xs">Not selected</span>
                })()}
              </div>
            ) : (
              <span className="text-gray-400 text-xs">Not selected</span>
            )}
          </div>

          {/* Publish Mode */}
          <div className="bg-gray-50 rounded-lg p-2 md:p-3">
            <h4 className="font-medium text-gray-900 mb-2 text-xs uppercase tracking-wide">Publish Mode</h4>
            {publishMode ? (
              <div className="flex items-center">
                <div className={`w-6 h-6 ${publishMode === 'now' ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-purple-500 to-purple-600'} rounded flex items-center justify-center mr-2`}>
                  {publishMode === 'now' ? <Upload className="w-3 h-3 text-white" /> : <Plus className="w-3 h-3 text-white" />}
                </div>
                <span className="text-gray-800 text-xs font-medium">
                  {publishMode === 'now' ? 'Publish Now' : 'Schedule'}
                </span>
              </div>
            ) : (
              <span className="text-gray-400 text-xs">Not selected</span>
            )}
          </div>

          {/* Platforms */}
          <div className="bg-gray-50 rounded-lg p-2 md:p-3">
            <h4 className="font-medium text-gray-900 mb-2 text-xs uppercase tracking-wide">Platforms</h4>
            {selectedPlatforms.length > 0 ? (
              <div className="space-y-1">
                {selectedPlatforms.map(platformId => {
                  const platform = platforms.find(p => p.id === platformId)
                  if (platform) {
                    const Icon = platform.icon
                    return (
                      <div key={platformId} className="flex items-center">
                        <Icon className="w-3 h-3 text-gray-600 mr-1" />
                        <span className="text-gray-800 text-xs font-medium">{platform.name}</span>
                      </div>
                    )
                  }
                  return null
                })}
              </div>
            ) : (
              <span className="text-red-500 text-xs">⚠️ Required</span>
            )}
          </div>

          {/* Content Status */}
          <div className="bg-gray-50 rounded-lg p-2 md:p-3">
            <h4 className="font-medium text-gray-900 mb-2 text-xs uppercase tracking-wide">Content</h4>
            <div className="space-y-1">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  content.trim() || (['image', 'reel', 'story'].includes(selectedPostType) && uploadedFiles.length > 0) 
                    ? 'bg-green-500' 
                    : selectedPostType === 'text' || (['image', 'reel', 'story'].includes(selectedPostType) && uploadedFiles.length === 0)
                      ? 'bg-red-500'
                      : 'bg-gray-300'
                }`}></div>
                <span className="text-gray-800 text-xs font-medium">
                  Text: {content.trim() ? 'Added' : 
                    selectedPostType === 'text' ? 'Required' :
                    ['image', 'reel', 'story'].includes(selectedPostType) && uploadedFiles.length > 0 ? 'Optional' : 'Required'}
                </span>
              </div>
              {(selectedPostType === 'image' || selectedPostType === 'reel' || selectedPostType === 'story') && (
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${uploadedFiles.length > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-gray-800 text-xs font-medium">Media: {uploadedFiles.length} file(s)</span>
                </div>
              )}
              {publishMode === 'schedule' && (
                <div className="flex items-center">
                  <div className={`w-2 h-2 rounded-full mr-2 ${scheduleDate && scheduleTimes.some(t => t.trim()) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="text-gray-800 text-xs font-medium">Schedule: {generateSchedulePlan().length} post(s)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Compact Step Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 md:p-4">
        {currentStep === 1 && (
          <div>
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4">Choose Post Type</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {postTypes.map((type) => {
                const Icon = type.icon
                const isSelected = selectedPostType === type.id
                
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedPostType(type.id)}
                    className={`p-2 md:p-3 rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-10 h-10 md:w-12 md:h-12 ${type.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-xs md:text-sm">{type.name}</h4>
                    <p className="text-xs text-gray-600">{type.description}</p>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4">Choose Publish Mode</h2>
            <div className="space-y-3">
              <button
                onClick={() => handlePublishModeChange('now')}
                className={`w-full flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                  publishMode === 'now'
                    ? 'border-green-500 bg-green-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center mr-3">
                  <Upload className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">Publish Now</h3>
                  <p className="text-gray-600 text-xs">Publish your content immediately</p>
                </div>
              </button>
              
              <button
                onClick={() => handlePublishModeChange('schedule')}
                className={`w-full flex items-center p-4 rounded-lg border-2 transition-all duration-200 ${
                  publishMode === 'schedule'
                    ? 'border-purple-500 bg-purple-50 shadow-sm'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-gray-900 text-sm mb-1">Schedule</h3>
                  <p className="text-gray-600 text-xs">Schedule your content for later</p>
                </div>
              </button>
            </div>

            {/* Compact Schedule Settings */}
            {publishMode === 'schedule' && (
              <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                <h3 className="text-sm font-bold text-purple-900 mb-3 flex items-center">
                  <div className="w-5 h-5 bg-gradient-to-r from-purple-500 to-purple-600 rounded flex items-center justify-center mr-2">
                    <Plus className="w-3 h-3 text-white" />
                  </div>
                  Schedule Settings
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-purple-800 mb-1 uppercase tracking-wide">
                      Start Date
                    </label>
                    <p className="text-xs text-purple-600 mb-2">
                      📅 Select today or a future date for scheduling
                    </p>
                    <input
                      type="date"
                      value={scheduleDate}
                      defaultValue={getDefaultDate()}
                      min={getMinDate()}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full p-2 border border-purple-200 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-sm"
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-semibold text-purple-800 uppercase tracking-wide">
                        Schedule Times
                      </label>
                      <button
                        onClick={addScheduleTime}
                        className="text-purple-600 hover:text-purple-700 text-xs font-semibold flex items-center bg-white px-2 py-1 rounded hover:bg-purple-50 transition-all duration-200 border border-purple-200"
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        Add Time
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      {scheduleTimes.map((time, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="time"
                            value={time}
                            onChange={(e) => updateScheduleTime(index, e.target.value)}
                            className="flex-1 p-2 border border-purple-200 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-sm"
                            placeholder="Select time"
                          />
                          {scheduleTimes.length > 1 && (
                            <button
                              onClick={() => removeScheduleTime(index)}
                              className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded transition-all duration-200 border border-red-200"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Schedule Preview */}
                  {generateSchedulePlan().length > 0 && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-purple-200">
                      <h4 className="font-bold text-purple-900 mb-2 text-sm">Schedule Preview</h4>
                      <div className="mb-2 text-xs text-purple-600">
                        🌍 Your timezone: {getUserTimezone()}
                      </div>
                      <div className="space-y-1">
                        {generateSchedulePlan().map((item, index) => {
                          // Convert local time to UTC for preview
                          const utcConversion = convertLocalToUTC(item.date, item.time);
                          return (
                            <div key={index} className="text-xs p-2 bg-purple-50 rounded border border-purple-100">
                              <div className="text-purple-800 font-medium">
                                Post {item.postNumber}: {formatTimeWithTimezone(item.date, item.time)}
                              </div>
                              <div className="text-purple-600 mt-1">
                                📅 Will be stored as: {utcConversion.utcDate} at {utcConversion.utcTime} UTC
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4">Select Platforms</h2>
            <p className="text-sm text-gray-600 mb-4">Choose which platforms to publish your content to. At least one platform must be selected.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {platforms.map((platform) => {
                const Icon = platform.icon
                const isSelected = selectedPlatforms.includes(platform.id)
                const isLastSelected = isSelected && selectedPlatforms.length === 1
                
                return (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    disabled={isLastSelected}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    } ${isLastSelected ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
                    title={isLastSelected ? 'At least one platform must be selected' : ''}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                        isSelected ? 'bg-blue-500' : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="font-bold text-gray-900 text-sm">{platform.name}</h3>
                        {isLastSelected && (
                          <p className="text-xs text-gray-500 mt-1">Required</p>
                        )}
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </button>
                )
              })}
            </div>
            {selectedPlatforms.length === 0 && (
              <p className="text-red-500 text-sm mt-3">⚠️ At least one platform must be selected</p>
            )}
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4">Create Content</h2>

          {/* Content Input */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                Post Content {selectedPostType === 'text' && <span className="text-red-500">*</span>}
                {['image', 'reel', 'story'].includes(selectedPostType) && uploadedFiles.length === 0 && <span className="text-red-500">*</span>}
              </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={contentPlaceholder}
              className="w-full h-24 p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm transition-all duration-200"
            />
            {selectedPostType === 'text' && !content.trim() && (
              <p className="text-red-500 text-xs mt-1">Content is required for text posts</p>
            )}
            {['image', 'reel', 'story'].includes(selectedPostType) && !content.trim() && uploadedFiles.length === 0 && (
              <p className="text-red-500 text-xs mt-1">Either content or media files are required</p>
            )}
            </div>
            
            {/* Hashtags */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                Hashtags
              </label>
              <input
                type="text"
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
                placeholder="#hashtag1 #hashtag2 #trending"
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all duration-200"
              />
          </div>

            {/* Compact File Upload */}
          {(selectedPostType === 'image' || selectedPostType === 'reel' || selectedPostType === 'story') && (
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                  Media Upload
                </label>
                <p className="text-xs text-blue-600 mb-2">
                  💡 Each file will create a separate post with its own timestamp
                  {publishMode === 'schedule' && uploadedFiles.length > 1 && (
                    <span className="block mt-1 text-purple-600">
                      📅 Smart scheduling: Videos will use different times on same date, then move to next date
                    </span>
                  )}
                </p>
                
                {/* Compact Drag and Drop Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                  isDragOver
                    ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                  }`}
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-bold text-gray-900 mb-1">
                  Drag and drop {selectedPostType === 'reel' ? 'videos' : selectedPostType === 'story' ? 'images or videos' : 'images'} here
                </p>
                  <p className="text-gray-600 mb-3 text-xs">
                  or click to browse files
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-700 font-semibold text-sm shadow-sm hover:shadow-md transition-all duration-200"
                >
                  Choose Files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept={selectedPostType === 'reel' ? 'video/*' : selectedPostType === 'story' ? 'image/*,video/*' : 'image/*'}
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>

                {/* Compact Uploaded Files Preview */}
              {uploadedFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-bold text-gray-900 mb-3 text-sm">Uploaded Files</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="relative group">
                          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                          {file.type === 'video' ? (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-900">
                              <Play className="w-8 h-8 text-white" />
                            </div>
                          ) : (
                            <img
                              src={file.preview}
                              alt={file.file.name}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-sm hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                          <p className="text-xs text-gray-600 mt-1 truncate font-medium">{file.file.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

                      </div>
                    )}
          </div>

      {/* Compact Navigation Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center px-3 md:px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-xs md:text-sm w-full sm:w-auto"
        >
          <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-1" />
          Previous
        </button>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <button className="px-3 md:px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium text-xs md:text-sm">
            Save Draft
          </button>
          
          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              disabled={!canProceedToNext()}
              className="flex items-center justify-center px-4 md:px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 font-medium text-xs md:text-sm shadow-sm hover:shadow-md"
            >
              Next
              <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isUploading}
              className="flex items-center justify-center px-4 md:px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 font-medium text-xs md:text-sm shadow-sm hover:shadow-md"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 md:h-4 md:w-4 border-b-2 border-white mr-1"></div>
                  <span className="hidden sm:inline">{publishMode === 'now' ? 'Publishing...' : 'Scheduling...'}</span>
                  <span className="sm:hidden">{publishMode === 'now' ? 'Publishing...' : 'Scheduling...'}</span>
                </>
              ) : (
                <>
                  <Upload className="w-3 h-3 md:w-4 md:h-4 mr-1" />
                  <span className="hidden sm:inline">{publishMode === 'now' ? 'Publish Now' : 'Schedule Posts'}</span>
                  <span className="sm:hidden">{publishMode === 'now' ? 'Publish' : 'Schedule'}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        postType={selectedPostType}
        platforms={selectedPlatforms}
        publishMode={publishMode}
        onUploadComplete={handleUploadComplete}
      />

      {/* Beautiful Alert */}
      <BeautifulAlert
        type={alert.type}
        title={alert.title}
        message={alert.message}
        isVisible={alert.isVisible}
        onClose={hideAlert}
        autoClose={true}
        duration={6000}
      />

      {/* Upload Progress */}
      <UploadProgress
        isVisible={progress.isVisible}
        current={progress.current}
        total={progress.total}
        currentFileName={progress.currentFileName}
        onClose={hideProgress}
      />
    </div>
  )
}
