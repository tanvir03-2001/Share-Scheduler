'use client'

import {
    Camera,
    Check,
    Crop,
    Filter,
    Image,
    Play,
    RotateCcw,
    Upload,
    Video,
    X,
    Zap
} from 'lucide-react'
import { useCallback, useRef, useState } from 'react'

interface UploadedFile {
  id: string
  file: File
  preview: string
  type: 'image' | 'video'
  status: 'uploading' | 'completed' | 'error'
  progress: number
}

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  postType: string
  platforms: string[]
  publishMode: 'now' | 'schedule'
  onUploadComplete: (files: UploadedFile[]) => void
}

export default function UploadModal({
  isOpen,
  onClose,
  postType,
  platforms,
  publishMode,
  onUploadComplete
}: UploadModalProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const [isDragOver, setIsDragOver] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [currentStep, setCurrentStep] = useState<'upload' | 'edit' | 'preview'>('upload')
  
  const fileInputRef = useRef<HTMLInputElement>(null)

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
      type: file.type.startsWith('video/') ? 'video' : 'image',
      status: 'uploading',
      progress: 0
    }))
    
    setUploadedFiles(prev => [...prev, ...newFiles])
    simulateUpload(newFiles)
  }

  const simulateUpload = (files: UploadedFile[]) => {
    setIsUploading(true)
    
    files.forEach((file, index) => {
      const interval = setInterval(() => {
        setUploadedFiles(prev => prev.map(f => {
          if (f.id === file.id) {
            const newProgress = Math.min(f.progress + Math.random() * 20, 100)
            const newStatus = newProgress >= 100 ? 'completed' : 'uploading'
            
            if (newProgress >= 100) {
              clearInterval(interval)
            }
            
            return { ...f, progress: newProgress, status: newStatus }
          }
          return f
        }))
      }, 200 + index * 100)
    })

    // Complete all uploads after 3 seconds
    setTimeout(() => {
      setIsUploading(false)
      setCurrentStep('edit')
    }, 3000)
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

  const handleContinue = () => {
    if (currentStep === 'edit') {
      setCurrentStep('preview')
    } else if (currentStep === 'preview') {
      onUploadComplete(uploadedFiles)
      onClose()
    }
  }

  const getFileTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="w-6 h-6" />
      case 'video':
        return <Video className="w-6 h-6" />
      case 'reel':
        return <Play className="w-6 h-6" />
      case 'story':
        return <Camera className="w-6 h-6" />
      default:
        return <Upload className="w-6 h-6" />
    }
  }

  const getPlatformNames = () => {
    const platformMap: { [key: string]: string } = {
      facebook: 'Facebook',
      instagram: 'Instagram',
      twitter: 'Twitter',
      linkedin: 'LinkedIn'
    }
    return platforms.map(p => platformMap[p] || p).join(', ')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {getFileTypeIcon(postType)}
            <div>
              <h2 className="text-xl font-bold text-gray-900">Upload Content</h2>
              <p className="text-sm text-gray-500">
                {postType.charAt(0).toUpperCase() + postType.slice(1)} • {getPlatformNames()} • {publishMode === 'now' ? 'Publish Now' : 'Schedule'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            {[
              { key: 'upload', label: 'Upload', icon: Upload },
              { key: 'edit', label: 'Edit', icon: Crop },
              { key: 'preview', label: 'Preview', icon: Check }
            ].map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.key
              const isCompleted = ['upload', 'edit'].indexOf(currentStep) > ['upload', 'edit'].indexOf(step.key)
              
              return (
                <div key={step.key} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                    isActive || isCompleted
                      ? 'border-blue-500 bg-blue-500 text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </span>
                  {index < 2 && (
                    <div className={`w-8 h-0.5 mx-4 ${
                      isCompleted ? 'bg-blue-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {currentStep === 'upload' && (
            <div className="space-y-6">
              {/* Upload Area */}
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                  isDragOver
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Drag and drop your files here
                  </h3>
                  <p className="text-gray-500 mb-6">
                    or click to browse files from your device
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
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
              </div>

              {/* File Requirements */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">File Requirements</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Images: JPG, PNG, GIF (max 10MB each)</li>
                  <li>• Videos: MP4, MOV, AVI (max 100MB each)</li>
                  <li>• Maximum 10 files per upload</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 'edit' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Edit Your Content</h3>
                <div className="flex space-x-2">
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Crop className="w-4 h-4" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                  </button>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="relative group">
                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                      {file.type === 'video' ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
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
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <p className="text-xs text-gray-500 mt-1 truncate">{file.file.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 'preview' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Preview & Confirm</h3>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-medium text-gray-900 mb-4">Upload Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Post Type:</span>
                    <span className="font-medium">{postType.charAt(0).toUpperCase() + postType.slice(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platforms:</span>
                    <span className="font-medium">{getPlatformNames()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Publish Mode:</span>
                    <span className="font-medium">{publishMode === 'now' ? 'Publish Now' : 'Schedule'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Files:</span>
                    <span className="font-medium">{uploadedFiles.length} file(s)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {uploadedFiles.map((file) => (
                  <div key={file.id} className="relative">
                    <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
                      {file.type === 'video' ? (
                        <div className="w-full h-full flex items-center justify-center bg-gray-800">
                          <Play className="w-6 h-6 text-white" />
                        </div>
                      ) : (
                        <img
                          src={file.preview}
                          alt={file.file.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Zap className="w-4 h-4" />
            <span>Files will be optimized for each platform</span>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleContinue}
              disabled={uploadedFiles.length === 0 || isUploading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 flex items-center"
            >
              {currentStep === 'preview' ? 'Complete Upload' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
