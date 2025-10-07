import { CheckCircle, FileText, Globe, Scale, Shield, Users } from 'lucide-react'
import Link from 'next/link'

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <Scale className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Terms of Service</h1>
                <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString()}</p>
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

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl border border-white/20 p-8">
          
          {/* Introduction */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Agreement to Terms</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using AutoPost, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          {/* Service Description */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Service Description</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              AutoPost is a Facebook automation platform that allows users to schedule, manage, and optimize their Facebook posts. 
              Our service integrates with Facebook's official API to provide automated posting capabilities.
            </p>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="font-semibold text-green-900 mb-2">What We Provide</h3>
              <ul className="space-y-2 text-green-800">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Facebook post scheduling and automation</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Content management and optimization tools</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Analytics and performance tracking</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Customer support and assistance</span>
                </li>
              </ul>
            </div>
          </div>

          {/* User Responsibilities */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">User Responsibilities</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Account Security</h3>
                <ul className="space-y-1 text-blue-800 text-sm">
                  <li>• Maintain the confidentiality of your account credentials</li>
                  <li>• Notify us immediately of any unauthorized access</li>
                  <li>• Use strong, unique passwords</li>
                  <li>• Keep your contact information up to date</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-orange-900 mb-2">Content Guidelines</h3>
                <ul className="space-y-1 text-orange-800 text-sm">
                  <li>• Ensure all content complies with Facebook's policies</li>
                  <li>• Do not post spam, misleading, or harmful content</li>
                  <li>• Respect intellectual property rights</li>
                  <li>• Follow applicable laws and regulations</li>
                </ul>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="font-semibold text-red-900 mb-2">Prohibited Activities</h3>
                <ul className="space-y-1 text-red-800 text-sm">
                  <li>• Attempting to hack or compromise our systems</li>
                  <li>• Using the service for illegal activities</li>
                  <li>• Violating Facebook's Terms of Service</li>
                  <li>• Sharing your account with unauthorized users</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Service Availability */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-yellow-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Service Availability</h2>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                While we strive to provide reliable service, we cannot guarantee uninterrupted access. 
                Our service may be temporarily unavailable due to:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Technical Issues</h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Scheduled maintenance</li>
                    <li>• System updates</li>
                    <li>• Technical difficulties</li>
                    <li>• Third-party service outages</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">External Factors</h3>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Facebook API changes</li>
                    <li>• Network connectivity issues</li>
                    <li>• Force majeure events</li>
                    <li>• Regulatory changes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy and Data */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Privacy and Data Protection</h2>
            </div>
            
            <div className="bg-indigo-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our collection and use of personal information is governed by our 
                Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              
              <div className="flex items-center space-x-2">
                <Link 
                  href="/privacy" 
                  className="text-indigo-600 hover:text-indigo-500 font-medium underline"
                >
                  Read our Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Scale className="w-4 h-4 text-gray-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Limitation of Liability</h2>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, AutoPost shall not be liable for any indirect, incidental, 
                special, consequential, or punitive damages, including but not limited to loss of profits, data, 
                or business opportunities.
              </p>
              
              <p className="text-gray-700">
                Our total liability to you for any claims arising from or related to these Terms or the Service 
                shall not exceed the amount you paid us in the 12 months preceding the claim.
              </p>
            </div>
          </div>

          {/* Termination */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Termination</h2>
            </div>
            
            <div className="bg-red-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                Either party may terminate this agreement at any time. Upon termination:
              </p>
              
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Your access to the service will be immediately suspended</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>You may request deletion of your personal data</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <span>Any outstanding obligations will remain in effect</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-gray-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Contact Us</h2>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-700">legal@autopost.com</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
                  <p className="text-gray-700">support@autopost.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Updates */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Changes to Terms</h2>
            <p className="text-gray-700">
              We reserve the right to modify these Terms of Service at any time. We will notify users of any 
              material changes by posting the new Terms on this page and updating the "Last updated" date. 
              Your continued use of the service after such modifications constitutes acceptance of the updated Terms.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
