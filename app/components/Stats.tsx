'use client'

import React from 'react'
import { Trophy, Users, Zap, Coins } from 'lucide-react'
import { useContractRead } from 'wagmi'

// Contract ABI for platform stats
const PLATFORM_STATS_ABI = [
  {
    "inputs": [],
    "name": "getPlatformStats",
    "outputs": [
      {"internalType": "uint256", "name": "totalQuestsCreated", "type": "uint256"},
      {"internalType": "uint256", "name": "totalQuestsCompleted", "type": "uint256"},
      {"internalType": "uint256", "name": "totalActiveUsers", "type": "uint256"},
      {"internalType": "uint256", "name": "totalRewardsDistributed", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

interface StatsProps {
  refreshTrigger?: number
}

export function Stats({ refreshTrigger }: StatsProps) {
  // Get platform stats from contract
  const { data: statsData, refetch } = useContractRead({
    address: '0x172EF1b0185273112b331637b67bFF523F7239bA' as `0x${string}`,
    abi: PLATFORM_STATS_ABI,
    functionName: 'getPlatformStats',
  })

  // Refetch when refreshTrigger changes
  React.useEffect(() => {
    if (refreshTrigger) {
      refetch()
    }
  }, [refreshTrigger, refetch])

  // Use contract data or fallback to default values
  const totalQuestsCreated = statsData ? Number((statsData as any)[0]) : 0
  const totalQuestsCompleted = statsData ? Number((statsData as any)[1]) : 0
  const totalActiveUsers = statsData ? Number((statsData as any)[2]) : 0
  const totalRewardsDistributed = statsData ? Number((statsData as any)[3]) : 0

  const stats = [
    {
      icon: Trophy,
      label: 'Quests Created',
      value: totalQuestsCreated.toLocaleString(),
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: Users,
      label: 'Active Users',
      value: totalActiveUsers.toLocaleString(),
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: Zap,
      label: 'Gasless Transactions',
      value: (totalQuestsCreated + totalQuestsCompleted).toLocaleString() + '+',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      icon: Coins,
      label: 'Rewards Distributed',
      value: totalRewardsDistributed.toLocaleString() + ' QRT',
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
