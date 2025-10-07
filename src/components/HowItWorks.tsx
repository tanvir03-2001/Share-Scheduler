import { Calendar, Link, TrendingUp } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      icon: Link,
      title: 'Connect Your Facebook',
      description: 'Securely connect your Facebook page or account with just a few clicks. We use Facebook\'s official API for maximum security.',
    },
    {
      number: '02',
      icon: Calendar,
      title: 'Schedule Your Content',
      description: 'Create and schedule your posts using our intuitive editor. Set specific times or let our AI choose optimal posting times.',
    },
    {
      number: '03',
      icon: TrendingUp,
      title: 'Watch Your Growth',
      description: 'Monitor your performance with real-time analytics and insights. Track engagement, reach, and optimize your strategy.',
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with Facebook automation in just three simple steps. 
            No technical knowledge required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-facebook-200 transform translate-x-4 z-0"></div>
                )}
                
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-facebook-500 rounded-full mx-auto mb-4 relative">
                    <Icon className="w-8 h-8 text-white" />
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-900">{step.number}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium text-sm shadow-sm hover:shadow-md">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  )
}
