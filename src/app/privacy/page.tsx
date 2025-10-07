import { CheckCircle, Database, Eye, FileText, Globe, Lock, Shield, Users } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
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
              <h2 className="text-xl font-semibold text-gray-900">Introduction</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              At AutoPost, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
              Facebook automation platform. By using our service, you agree to the collection and use of information in 
              accordance with this policy.
            </p>
          </div>

          {/* Information We Collect */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Database className="w-4 h-4 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Information We Collect</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Personal Information</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Name and email address (required for account creation)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Profile information you choose to provide</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Contact information for customer support</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Facebook Data</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Facebook Page access tokens (with your explicit permission)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Page information (name, ID, permissions)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span>Post content and scheduling data</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Usage Information</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Log data (IP address, browser type, pages visited)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Device information and operating system</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                    <span>Usage patterns and feature interactions</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Information */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Eye className="w-4 h-4 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">How We Use Your Information</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Service Provision</h3>
                <ul className="space-y-1 text-blue-800 text-sm">
                  <li>• Provide and maintain our Facebook automation service</li>
                  <li>• Process and schedule your Facebook posts</li>
                  <li>• Manage your connected Facebook pages</li>
                  <li>• Provide customer support</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">Communication</h3>
                <ul className="space-y-1 text-green-800 text-sm">
                  <li>• Send important service updates</li>
                  <li>• Respond to your inquiries</li>
                  <li>• Send security notifications</li>
                  <li>• Provide account-related information</li>
                </ul>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-orange-900 mb-2">Improvement</h3>
                <ul className="space-y-1 text-orange-800 text-sm">
                  <li>• Analyze usage patterns</li>
                  <li>• Improve our service features</li>
                  <li>• Develop new functionality</li>
                  <li>• Optimize performance</li>
                </ul>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="font-semibold text-red-900 mb-2">Security</h3>
                <ul className="space-y-1 text-red-800 text-sm">
                  <li>• Protect against fraud and abuse</li>
                  <li>• Ensure service security</li>
                  <li>• Comply with legal obligations</li>
                  <li>• Enforce our terms of service</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <Lock className="w-4 h-4 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Data Security</h2>
            </div>
            
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Technical Safeguards</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>End-to-end encryption for data transmission</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Secure data storage with industry-standard encryption</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Regular security audits and updates</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Access controls and authentication</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Operational Safeguards</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span>Limited access to personal data</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span>Employee training on data protection</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span>Incident response procedures</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-500" />
                      <span>Regular backup and recovery systems</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Facebook Integration */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Globe className="w-4 h-4 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Facebook Integration</h2>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                Our service integrates with Facebook through their official API. When you connect your Facebook account:
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Permission-Based Access</h4>
                    <p className="text-gray-700 text-sm">We only request the minimum permissions necessary to provide our service</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Secure Token Storage</h4>
                    <p className="text-gray-700 text-sm">Your Facebook access tokens are encrypted and stored securely</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">No Unauthorized Access</h4>
                    <p className="text-gray-700 text-sm">We never access your Facebook data without your explicit consent</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Revocable Access</h4>
                    <p className="text-gray-700 text-sm">You can revoke our access to your Facebook account at any time</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Your Rights */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-4 h-4 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Your Rights</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Access & Control</h3>
                  <ul className="space-y-1 text-green-800 text-sm">
                    <li>• View and update your personal information</li>
                    <li>• Download your data</li>
                    <li>• Delete your account and data</li>
                    <li>• Control your privacy settings</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Communication</h3>
                  <ul className="space-y-1 text-blue-800 text-sm">
                    <li>• Opt-out of marketing emails</li>
                    <li>• Control notification preferences</li>
                    <li>• Request data portability</li>
                    <li>• Object to data processing</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-2">Legal Rights</h3>
                  <ul className="space-y-1 text-purple-800 text-sm">
                    <li>• Right to rectification</li>
                    <li>• Right to erasure</li>
                    <li>• Right to restrict processing</li>
                    <li>• Right to data portability</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 rounded-lg p-4">
                  <h3 className="font-semibold text-orange-900 mb-2">Support</h3>
                  <ul className="space-y-1 text-orange-800 text-sm">
                    <li>• Contact our privacy team</li>
                    <li>• File a complaint</li>
                    <li>• Request information</li>
                    <li>• Get help with your rights</li>
                  </ul>
                </div>
              </div>
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
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                  <p className="text-gray-700">privacy@autopost.com</p>
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
            <h2 className="text-lg font-semibold text-gray-900 mb-3">Policy Updates</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy 
              Policy periodically for any changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
