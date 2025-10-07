import { ArrowRight, CheckCircle, Play } from 'lucide-react'

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-facebook-500 via-facebook-600 to-primary-700 text-white">
      <div className="max-w-7xl mx-auto px-3 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6">
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

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="bg-white text-facebook-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md">
                <span>Start Free Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-facebook-600 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-4 text-blue-100">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span className="text-sm">14-day free trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span className="text-sm">No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-300" />
                <span className="text-sm">Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-white/70 text-sm ml-4">Facebook Auto Post Dashboard</span>
                </div>
                
                <div className="bg-white rounded-lg p-4 text-gray-900">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-facebook-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">F</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">Your Page Name</h3>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-3 text-sm">
                    🚀 Just scheduled 5 posts for the next week! Our new product launch is going to be amazing. 
                    Can't wait to share it with you all! #NewProduct #Launch
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>👍 24</span>
                    <span>💬 8</span>
                    <span>📤 3</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold">1,247</div>
                    <div className="text-xs text-blue-100">Posts Scheduled</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold">98.5%</div>
                    <div className="text-xs text-blue-100">Success Rate</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-3 text-center">
                    <div className="text-xl font-bold">24/7</div>
                    <div className="text-xs text-blue-100">Monitoring</div>
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
