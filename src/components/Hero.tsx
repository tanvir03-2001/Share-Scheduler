import { ArrowRight, CheckCircle, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-facebook-500 via-facebook-600 to-primary-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Automate Your
                <span className="block text-yellow-300">Facebook Posts</span>
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 leading-relaxed">
                Schedule, manage, and optimize your Facebook content with our powerful automation platform. 
                Save time and grow your audience effortlessly.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-facebook-600 hover:bg-gray-100 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-facebook-600 font-semibold py-4 px-8 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-6 text-blue-100">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-300" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-white/70 text-sm ml-4">Facebook Auto Post Dashboard</span>
                </div>
                
                <div className="bg-white rounded-lg p-6 text-gray-900">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-facebook-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">F</span>
                    </div>
                    <div>
                      <h3 className="font-semibold">Your Page Name</h3>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    🚀 Just scheduled 5 posts for the next week! Our new product launch is going to be amazing. 
                    Can't wait to share it with you all! #NewProduct #Launch
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>👍 24</span>
                    <span>💬 8</span>
                    <span>📤 3</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">1,247</div>
                    <div className="text-sm text-blue-100">Posts Scheduled</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">98.5%</div>
                    <div className="text-sm text-blue-100">Success Rate</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-sm text-blue-100">Monitoring</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
