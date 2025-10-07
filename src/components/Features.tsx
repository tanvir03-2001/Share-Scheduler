import { BarChart3, Calendar, Clock, Shield, Users, Zap } from 'lucide-react'

export default function Features() {
  const features = [
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'Schedule posts for optimal engagement times with our AI-powered recommendations.',
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Track performance with detailed analytics and get insights to improve your content strategy.',
    },
    {
      icon: Users,
      title: 'Multi-Account Management',
      description: 'Manage multiple Facebook pages and accounts from a single dashboard.',
    },
    {
      icon: Clock,
      title: 'Time Zone Support',
      description: 'Automatically adjust posting times for different time zones and global audiences.',
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with 99.9% uptime guarantee for your peace of mind.',
    },
    {
      icon: Zap,
      title: 'Bulk Operations',
      description: 'Upload and schedule hundreds of posts at once with our bulk import feature.',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Automate Facebook
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools you need to streamline your Facebook marketing 
            and grow your audience effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="card hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-center w-12 h-12 bg-facebook-500 rounded-lg mb-4">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
