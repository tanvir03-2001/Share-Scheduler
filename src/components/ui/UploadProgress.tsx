'use client'

import { CheckCircle, Upload, XCircle } from 'lucide-react'

interface UploadProgressProps {
  isVisible: boolean
  current: number
  total: number
  currentFileName?: string
  onClose: () => void
}

export default function UploadProgress({
  isVisible,
  current,
  total,
  currentFileName,
  onClose
}: UploadProgressProps) {
  const progress = total > 0 ? (current / total) * 100 : 0
  const isComplete = current >= total

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {isComplete ? 'Upload Complete!' : 'Uploading Content...'}
          </h3>
          {isComplete && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <XCircle className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{current} of {total} content items</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                isComplete ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {currentFileName && !isComplete && (
          <div className="flex items-center text-sm text-gray-600">
            <Upload className="w-4 h-4 mr-2 animate-pulse" />
            <span className="truncate">Uploading: {currentFileName}</span>
          </div>
        )}

        {isComplete && (
          <div className="flex items-center text-green-600">
            <CheckCircle className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">
              Successfully uploaded {total} content item(s)!
            </span>
          </div>
        )}

        <div className="mt-4 text-xs text-gray-500">
          {isComplete ? (
            'Your content has been scheduled successfully. No page reload required!'
          ) : (
            'Please wait while we upload your content. Do not refresh the page.'
          )}
        </div>
      </div>
    </div>
  )
}
