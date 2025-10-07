import { Star } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'TechStart Inc.',
      avatar: 'SJ',
      content: 'AutoPost has revolutionized our social media strategy. We\'ve increased our engagement by 300% and saved 10 hours per week on content scheduling.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Founder',
      company: 'EcoProducts',
      avatar: 'MC',
      content: 'The analytics insights are incredible. We can now see exactly when our audience is most active and optimize our posting schedule accordingly.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Social Media Manager',
      company: 'Fashion Forward',
      avatar: 'ER',
      content: 'Managing multiple Facebook pages used to be a nightmare. Now I can handle everything from one dashboard. It\'s a game-changer!',
      rating: 5,
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-3">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have transformed their Facebook marketing with AutoPost.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
              <div className="flex items-center mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <blockquote className="text-sm text-gray-700 mb-4 leading-relaxed">
                "{testimonial.content}"
              </blockquote>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-facebook-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-600">
                    {testimonial.role} at {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="flex items-center justify-center space-x-6 text-gray-600">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">10,000+</div>
              <div className="text-xs">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">1M+</div>
              <div className="text-xs">Posts Scheduled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">99.9%</div>
              <div className="text-xs">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
