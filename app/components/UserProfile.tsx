'use client'

import React from 'react'
import { Trophy, Star, Coins, Users, Award } from 'lucide-react'
import { ClientOnly } from './ClientOnly'
import { useAccount, useContractRead } from 'wagmi'

interface UserProfileProps {
  address?: string
  refreshTrigger?: number
}

// Contract ABI for user profile
const USER_PROFILE_ABI = [
  {
    "inputs": [{"internalType": "address", "name": "_user", "type": "address"}],
    "name": "getUserProfile",
    "outputs": [
      {"internalType": "uint256", "name": "reputation", "type": "uint256"},
      {"internalType": "uint256", "name": "questsCreated", "type": "uint256"},
      {"internalType": "uint256", "name": "questsCompleted", "type": "uint256"},
      {"internalType": "uint256", "name": "totalRewardsEarned", "type": "uint256"},
      {"internalType": "bool", "name": "isVerified", "type": "bool"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export function UserProfile({ address, refreshTrigger }: UserProfileProps) {
  // Get user profile from contract
  const { data: profileData, refetch } = useContractRead({
    address: '0x172EF1b0185273112b331637b67bFF523F7239bA' as `0x${string}`,
    abi: USER_PROFILE_ABI,
    functionName: 'getUserProfile',
    args: address ? [address] : undefined,
    enabled: !!address,
  })

  // Refetch when refreshTrigger changes
  React.useEffect(() => {
    if (refreshTrigger && address) {
      refetch()
    }
  }, [refreshTrigger, address, refetch])

  // Use contract data or fallback to mock data
  const profile = profileData ? {
    reputation: Number((profileData as any)[0]),
    questsCreated: Number((profileData as any)[1]),
    questsCompleted: Number((profileData as any)[2]),
    totalRewardsEarned: Number((profileData as any)[3]),
    isVerified: (profileData as any)[4],
    rank: Number((profileData as any)[0]) >= 1000 ? 'Gold' : Number((profileData as any)[0]) >= 500 ? 'Silver' : 'Bronze',
    level: Math.floor(Number((profileData as any)[0]) / 200) + 1
  } : {
    reputation: 0,
    questsCreated: 0,
    questsCompleted: 0,
    totalRewardsEarned: 0,
    isVerified: false,
    rank: 'Bronze',
    level: 1
  }
  
  const getReputationBadge = (reputation: number) => {
    if (reputation >= 1000) return { color: 'reputation-gold', icon: '🥇', label: 'Gold' }
    if (reputation >= 500) return { color: 'reputation-silver', icon: '🥈', label: 'Silver' }
    return { color: 'reputation-bronze', icon: '🥉', label: 'Bronze' }
  }
  
  const badge = getReputationBadge(profile.reputation)
  
  return (
    <section className="mt-12">
      <div className="quest-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Your Profile</h2>
          <div className={`reputation-badge ${badge.color}`}>
            <span className="mr-1">
              <ClientOnly fallback="🏆">{badge.icon}</ClientOnly>
            </span>
            {badge.label}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{profile.reputation}</div>
            <div className="text-sm text-gray-600">Reputation Points</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Trophy className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{profile.questsCreated}</div>
            <div className="text-sm text-gray-600">Quests Created</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{profile.questsCompleted}</div>
            <div className="text-sm text-gray-600">Quests Completed</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Coins className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{profile.totalRewardsEarned}</div>
            <div className="text-sm text-gray-600">QRT Earned</div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Level {profile.level} Explorer</h3>
              <p className="text-sm text-gray-600">Keep completing quests to level up!</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Next Level</div>
              <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">750/1000 XP</div>
            </div>
          </div>
        </div>
        
        {profile.isVerified && (
          <div className="mt-4 flex items-center space-x-2 text-green-600">
            <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
              <Award className="w-3 h-3" />
            </div>
            <span className="text-sm font-medium">Verified User</span>
          </div>
        )}
      </div>
    </section>
  )
}
