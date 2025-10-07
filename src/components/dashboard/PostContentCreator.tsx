'use client'

import UploadModal from '@/components/ui/UploadModal'
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
  Video,
  X
} from 'lucide-react'
import { useCallback, useRef, useState } from 'react'

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
    name: 'Text Post',
    icon: Type,
    description: 'Share text content with your audience',
    color: 'bg-blue-500'
  },
  {
    id: 'image',
    name: 'Image Post',
    icon: Image,
    description: 'Share photos and images',
    color: 'bg-green-500'
  },
  {
    id: 'video',
    name: 'Video Post',
    icon: Video,
    description: 'Share video content',
    color: 'bg-purple-500'
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
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPostType, setSelectedPostType] = useState<string>('')
  const [content, setContent] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [publishMode, setPublishMode] = useState<'now' | 'schedule'>('now')
  const [scheduleDate, setScheduleDate] = useState('')
  const [scheduleTimes, setScheduleTimes] = useState<string[]>([''])
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [hashtags, setHashtags] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)

  const totalSteps = 4

  // Initialize default date and time
  const getDefaultDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const getDefaultTime = () => {
    const now = new Date()
    now.setMinutes(now.getMinutes() + 40) // Add 40 minutes
    return now.toTimeString().slice(0, 5) // Format as HH:MM
  }

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
    { id: 'facebook', name: 'Facebook', icon: Users },
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
      type: file.type.startsWith('video/') ? 'video' : 'image'
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
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    )
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
    
    validTimes.forEach((time, index) => {
      const currentDate = new Date(startDate)
      currentDate.setDate(startDate.getDate() + index)
      
      schedulePlan.push({
        date: currentDate.toISOString().split('T')[0],
        time: time,
        postNumber: index + 1
      })
    })
    
    return schedulePlan
  }

  const handleSubmit = async () => {
    setIsUploading(true)
    
    const schedulePlan = generateSchedulePlan()
    console.log('Publishing with plan:', {
      postType: selectedPostType,
      content,
      platforms: selectedPlatforms,
      publishMode,
      schedulePlan
    })
    
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false)
      // Reset form
      setContent('')
      setUploadedFiles([])
      setScheduleDate('')
      setScheduleTimes([''])
      setHashtags('')
      setPublishMode('now')
    }, 2000)
  }

  return (
    <div className="max-w-4xl mx-auto px-3">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Create New Post</h1>
        <p className="text-gray-500 text-sm">Step {currentStep} of {totalSteps}: {getStepTitle()}</p>
      </div>

      {/* Compact Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                step <= currentStep 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-400'
              }`}>
                {step < currentStep ? <Check className="w-3 h-3" /> : step}
              </div>
              {step < totalSteps && (
                <div className={`w-12 h-0.5 mx-2 rounded-full transition-all duration-300 ${
                  step < currentStep ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-600 font-medium">
          <span>Post Type</span>
          <span>Publish Mode</span>
          <span>Platforms</span>
          <span>Content</span>
        </div>
      </div>

      {/* Compact Overview Panel */}
      <div className="mb-4 bg-white rounded-lg shadow-sm border border-gray-100 p-3">
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
          <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center mr-2">
            <Check className="w-3 h-3 text-white" />
          </div>
          Post Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Post Type */}
          <div className="bg-gray-50 rounded-lg p-3">
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
          <div className="bg-gray-50 rounded-lg p-3">
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
          <div className="bg-gray-50 rounded-lg p-3">
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
              <span className="text-gray-400 text-xs">Not selected</span>
            )}
          </div>

          {/* Content Status */}
          <div className="bg-gray-50 rounded-lg p-3">
            <h4 className="font-medium text-gray-900 mb-2 text-xs uppercase tracking-wide">Content</h4>
            <div className="space-y-1">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-2 ${content.trim() ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                <span className="text-gray-800 text-xs font-medium">Text: {content.trim() ? 'Added' : 'Empty'}</span>
              </div>
              {(selectedPostType === 'image' || selectedPostType === 'video' || selectedPostType === 'reel' || selectedPostType === 'story') && (
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
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        {currentStep === 1 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Choose Post Type</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {postTypes.map((type) => {
                const Icon = type.icon
                const isSelected = selectedPostType === type.id
                
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedPostType(type.id)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-1 text-sm">{type.name}</h4>
                    <p className="text-xs text-gray-600">{type.description}</p>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Choose Publish Mode</h2>
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
                    <input
                      type="date"
                      value={scheduleDate}
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
                      <div className="space-y-1">
                        {generateSchedulePlan().map((item, index) => (
                          <div key={index} className="flex items-center justify-between text-xs p-2 bg-purple-50 rounded border border-purple-100">
                            <span className="text-purple-800 font-medium">
                              Post {item.postNumber}: {new Date(item.date).toLocaleDateString()} at {item.time}
                            </span>
                          </div>
                        ))}
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
            <h2 className="text-lg font-bold text-gray-900 mb-4">Select Platforms</h2>
            <div className="grid grid-cols-2 gap-3">
              {platforms.map((platform) => {
                const Icon = platform.icon
                const isSelected = selectedPlatforms.includes(platform.id)
                
                return (
                  <button
                    key={platform.id}
                    onClick={() => togglePlatform(platform.id)}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center mr-3 ${
                        isSelected ? 'bg-blue-500' : 'bg-gray-100'
                      }`}>
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div className="text-left flex-1">
                        <h3 className="font-bold text-gray-900 text-sm">{platform.name}</h3>
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
          </div>
        )}

        {currentStep === 4 && (
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Create Content</h2>

          {/* Content Input */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                Post Content
              </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind? Share your thoughts with your audience..."
                className="w-full h-24 p-3 border border-gray-200 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm transition-all duration-200"
            />
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
          {(selectedPostType === 'image' || selectedPostType === 'video' || selectedPostType === 'reel' || selectedPostType === 'story') && (
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-900 mb-2 uppercase tracking-wide">
                  Media Upload
                </label>
                
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
                  Drag and drop files here
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
                  accept="image/*,video/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>

                {/* Compact Uploaded Files Preview */}
              {uploadedFiles.length > 0 && (
                  <div className="mt-4">
                    <h4 className="font-bold text-gray-900 mb-3 text-sm">Uploaded Files</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        <div className="flex space-x-2">
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 font-medium text-sm">
            Save Draft
          </button>
          
          {currentStep < totalSteps ? (
            <button
              onClick={nextStep}
              disabled={!canProceedToNext()}
              className="flex items-center px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isUploading}
              className="flex items-center px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md"
            >
              {isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-1"></div>
                  {publishMode === 'now' ? 'Publishing...' : 'Scheduling...'}
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-1" />
                  {publishMode === 'now' ? 'Publish Now' : 'Schedule Posts'}
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
    </div>
  )
}
