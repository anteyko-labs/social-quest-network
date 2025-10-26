'use client'

import { Trophy, Users, Zap, Coins } from 'lucide-react'

export function Stats() {
  const stats = [
    {
      icon: Trophy,
      label: 'Quests Created',
      value: '1,234',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Users,
      label: 'Active Users',
      value: '567',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Zap,
      label: 'Gasless Transactions',
      value: '10,000+',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Coins,
      label: 'Rewards Distributed',
      value: '50,000 QRT',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ]

  return (
    <section className="py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="quest-card text-center">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
