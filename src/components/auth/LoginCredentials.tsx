'use client'

import { Check, Copy } from 'lucide-react'
import React, { useState } from 'react'

interface LoginCredentialsProps {
  onQuickLogin?: (email: string, password: string) => void
}

const LoginCredentials: React.FC<LoginCredentialsProps> = ({ onQuickLogin }) => {
  const [copied, setCopied] = useState<string | null>(null)

  const credentials = {
    email: 'admin@sharescheduler.com',
    password: 'admin123'
  }

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(type)
      setTimeout(() => setCopied(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleQuickLogin = () => {
    if (onQuickLogin) {
      onQuickLogin(credentials.email, credentials.password)
    }
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <h3 className="text-sm font-medium text-blue-800 mb-3">
        🧪 Test Login Credentials
      </h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-blue-600 font-medium">Email:</span>
            <span className="ml-2 text-sm text-blue-800 font-mono">
              {credentials.email}
            </span>
          </div>
          <button
            onClick={() => copyToClipboard(credentials.email, 'email')}
            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
            title="Copy email"
          >
            {copied === 'email' ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-blue-600 font-medium">Password:</span>
            <span className="ml-2 text-sm text-blue-800 font-mono">
              {credentials.password}
            </span>
          </div>
          <button
            onClick={() => copyToClipboard(credentials.password, 'password')}
            className="p-1 text-blue-600 hover:text-blue-800 transition-colors"
            title="Copy password"
          >
            {copied === 'password' ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-blue-600">
          💡 Use these credentials to test the login functionality
        </p>
        {onQuickLogin && (
          <button
            onClick={handleQuickLogin}
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Quick Login
          </button>
        )}
      </div>
    </div>
  )
}

export default LoginCredentials
