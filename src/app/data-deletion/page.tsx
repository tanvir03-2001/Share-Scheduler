'use client'

import { AlertTriangle, CheckCircle, Clock, Database, FileText, Mail, Trash2, Users } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function DataDeletionPage() {
  const [formData, setFormData] = useState({
    email: '',
    reason: '',
    confirmDeletion: false,
    confirmDataTypes: false
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Data Deletion Request Submitted</h1>
                  <p className="text-sm text-gray-600">Request ID: #DD-{Date.now().toString().slice(-6)}</p>
                </div>
              </div>
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Success Content */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl border border-white/20 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Received Successfully</h2>
              <p className="text-gray-600">Your data deletion request has been submitted and is being processed.</p>
            </div>

            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <h3 className="font-semibold text-green-900 mb-3">What happens next?</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900">Email Confirmation</h4>
                    <p className="text-green-800 text-sm">You'll receive a confirmation email within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900">Verification Process</h4>
                    <p className="text-green-800 text-sm">We'll verify your identity and account ownership</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900">Data Deletion</h4>
                    <p className="text-green-800 text-sm">Your data will be permanently deleted within 30 days</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-900">Final Confirmation</h4>
                    <p className="text-green-800 text-sm">You'll receive a final confirmation when deletion is complete</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-blue-800 text-sm mb-3">
                If you have any questions about your data deletion request, please contact our support team.
              </p>
              <div className="flex items-center space-x-2 text-blue-700">
                <Mail className="w-4 h-4" />
                <span className="text-sm">support@autopost.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Data Deletion Request</h1>
                <p className="text-sm text-gray-600">Request permanent deletion of your personal data</p>
              </div>
            </div>
            <Link
              href="/privacy"
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              ← Privacy Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-white/20 p-8">
          
          {/* Warning Notice */}
          <div className="mb-8">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">Important Notice</h3>
                  <p className="text-red-800 text-sm mb-3">
                    This action is <strong>irreversible</strong>. Once your data is deleted, it cannot be recovered. 
                    Please ensure you have backed up any important information before proceeding.
                  </p>
                  <ul className="text-red-800 text-sm space-y-1">
                    <li>• Your account will be permanently closed</li>
                    <li>• All your posts and scheduling data will be deleted</li>
                    <li>• Facebook page connections will be removed</li>
                    <li>• You will lose access to all service features</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* What Data Will Be Deleted */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <Database className="w-4 h-4 text-orange-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Data That Will Be Deleted</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Account Information</h3>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Personal profile data</li>
                  <li>• Email address and contact information</li>
                  <li>• Account preferences and settings</li>
                  <li>• Login credentials and authentication data</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Service Data</h3>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Facebook page connections and tokens</li>
                  <li>• Scheduled posts and content</li>
                  <li>• Post history and analytics data</li>
                  <li>• Usage logs and activity records</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Communication Data</h3>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Support tickets and messages</li>
                  <li>• Email communication history</li>
                  <li>• Feedback and survey responses</li>
                  <li>• Notification preferences</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Technical Data</h3>
                <ul className="space-y-1 text-gray-700 text-sm">
                  <li>• Device and browser information</li>
                  <li>• IP addresses and location data</li>
                  <li>• Session data and cookies</li>
                  <li>• Error logs and debugging information</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Retention Notice */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Data Retention & Legal Requirements</h2>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                While we will delete the majority of your personal data, some information may be retained for legal or regulatory purposes:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Legal Compliance</h4>
                    <p className="text-gray-700 text-sm">Data required for tax, accounting, or legal compliance (typically 7 years)</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Security & Fraud Prevention</h4>
                    <p className="text-gray-700 text-sm">Anonymized data used to prevent fraud and ensure service security</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Backup Systems</h4>
                    <p className="text-gray-700 text-sm">Data in backup systems will be deleted during regular cleanup cycles</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Deletion Request Form */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Request Data Deletion</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                  placeholder="Enter your registered email address"
                />
                <p className="text-sm text-gray-500 mt-1">
                  This must be the email address associated with your account
                </p>
              </div>

              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Deletion (Optional)
                </label>
                <select
                  id="reason"
                  name="reason"
                  value={formData.reason}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200"
                >
                  <option value="">Select a reason (optional)</option>
                  <option value="privacy-concerns">Privacy concerns</option>
                  <option value="no-longer-needed">No longer need the service</option>
                  <option value="found-alternative">Found an alternative service</option>
                  <option value="account-issues">Account or technical issues</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="confirmDeletion"
                    name="confirmDeletion"
                    checked={formData.confirmDeletion}
                    onChange={handleInputChange}
                    required
                    className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-0.5"
                  />
                  <label htmlFor="confirmDeletion" className="text-sm text-gray-700">
                    <strong>I understand that this action is irreversible</strong> and that all my personal data, 
                    account information, and service data will be permanently deleted. I confirm that I want to 
                    proceed with the data deletion request.
                  </label>
                </div>

                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="confirmDataTypes"
                    name="confirmDataTypes"
                    checked={formData.confirmDataTypes}
                    onChange={handleInputChange}
                    required
                    className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 mt-0.5"
                  />
                  <label htmlFor="confirmDataTypes" className="text-sm text-gray-700">
                    I have read and understood the types of data that will be deleted, including account information, 
                    service data, communication data, and technical data as described above.
                  </label>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-900 mb-1">Before You Submit</h4>
                    <ul className="text-yellow-800 text-sm space-y-1">
                      <li>• Download any data you want to keep before deletion</li>
                      <li>• Disconnect your Facebook pages if you plan to use them elsewhere</li>
                      <li>• Cancel any active subscriptions or billing</li>
                      <li>• Ensure you have access to alternative services if needed</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <Link
                  href="/privacy"
                  className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={!formData.confirmDeletion || !formData.confirmDataTypes || isSubmitting}
                  className="px-8 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      <span>Submit Deletion Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-3">Need Help or Have Questions?</h3>
            <p className="text-gray-700 mb-4">
              If you have questions about data deletion or need assistance with your request, please contact our support team.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">privacy@autopost.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">support@autopost.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
