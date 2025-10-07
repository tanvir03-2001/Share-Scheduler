import { ArrowRight, CheckCircle } from 'lucide-react'

export default function CTA() {
  return (
    <section className="py-20 bg-facebook-500">
      <div className="max-w-4xl mx-auto px-3 text-center">
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Ready to Transform Your Facebook Marketing?
          </h2>
          
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join thousands of businesses already using AutoPost to automate their Facebook presence. 
            Start your free trial today and see the difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button className="bg-white text-facebook-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center space-x-2 shadow-sm hover:shadow-md">
              <span>Start Free Trial</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-facebook-600 font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
              Schedule a Demo
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-blue-100 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-300" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-300" />
              <span>No setup fees</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-300" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-300" />
              <span>24/7 support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
