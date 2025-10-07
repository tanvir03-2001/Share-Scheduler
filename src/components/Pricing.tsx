import { Check, Star } from 'lucide-react'

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: '$9',
      period: '/month',
      description: 'Perfect for individuals and small businesses',
      features: [
        'Up to 5 Facebook pages',
        '100 posts per month',
        'Basic scheduling',
        'Email support',
        'Basic analytics',
      ],
      popular: false,
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/month',
      description: 'Ideal for growing businesses and agencies',
      features: [
        'Up to 20 Facebook pages',
        'Unlimited posts',
        'Advanced scheduling',
        'Priority support',
        'Advanced analytics',
        'Bulk upload',
        'Team collaboration',
      ],
      popular: true,
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      description: 'For large organizations with advanced needs',
      features: [
        'Unlimited Facebook pages',
        'Unlimited posts',
        'Custom scheduling',
        '24/7 phone support',
        'Custom analytics',
        'API access',
        'White-label solution',
        'Dedicated account manager',
      ],
      popular: false,
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-3">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-lg shadow-sm border border-gray-100 p-4 ${
                plan.popular
                  ? 'ring-2 ring-facebook-500 transform scale-105'
                  : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-facebook-500 text-white px-3 py-2 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-sm text-gray-600 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start space-x-3">
                    <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-facebook-500 to-facebook-600 hover:from-facebook-600 hover:to-facebook-700 text-white shadow-sm hover:shadow-md'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                }`}
              >
                Start Free Trial
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-600 mb-4">
            Need a custom plan? We've got you covered.
          </p>
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200">
            Contact Sales
          </button>
        </div>
      </div>
    </section>
  )
}
