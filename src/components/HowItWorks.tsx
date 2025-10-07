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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started with Facebook automation in just three simple steps. 
            No technical knowledge required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-facebook-200 transform translate-x-4 z-0"></div>
                )}
                
                <div className="relative z-10 text-center">
                  <div className="flex items-center justify-center w-20 h-20 bg-facebook-500 rounded-full mx-auto mb-6 relative">
                    <Icon className="w-10 h-10 text-white" />
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-gray-900">{step.number}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-16">
          <button className="btn-primary text-lg px-8 py-4">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  )
}
