'use client'

import { Trophy, Clock, User, Coins, CheckCircle } from 'lucide-react'
import { useState } from 'react'

interface Quest {
  id: string
  title: string
  description: string
  reward: number
  creator: string
  isActive: boolean
  createdAt: number
}

interface QuestCardProps {
  quest: Quest
  onComplete: () => void
  userAddress?: string
}

export function QuestCard({ quest, onComplete, userAddress }: QuestCardProps) {
  const [isCompleting, setIsCompleting] = useState(false)
  
  const handleComplete = async () => {
    setIsCompleting(true)
    try {
      await onComplete()
    } finally {
      setIsCompleting(false)
    }
  }
  
  const formatTime = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const hours = Math.floor(diff / (1000 * 60 * 60))
    
    if (hours < 1) return 'Just now'
    if (hours < 24) return `${hours}h ago`
    return `${Math.floor(hours / 24)}d ago`
  }
  
  const isCreator = quest.creator.toLowerCase() === userAddress?.toLowerCase()
  
  return (
    <div className="quest-card group hover:scale-105 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="font-semibold text-gray-900">Quest #{quest.id}</span>
        </div>
        <div className="gasless-badge">
          <Zap className="w-3 h-3 mr-1" />
          Gasless
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{quest.title}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{quest.description}</p>
      
      <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
        <div className="flex items-center space-x-1">
          <User className="w-4 h-4" />
          <span>{quest.creator.slice(0, 6)}...{quest.creator.slice(-4)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span>{formatTime(quest.createdAt)}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Coins className="w-5 h-5 text-yellow-500" />
          <span className="font-semibold text-gray-900">{quest.reward} QRT</span>
        </div>
        
        {isCreator ? (
          <div className="flex items-center space-x-1 text-blue-600">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm font-medium">Your Quest</span>
          </div>
        ) : (
          <button
            onClick={handleComplete}
            disabled={isCompleting}
            className="quest-button text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCompleting ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Completing...</span>
              </div>
            ) : (
              'Complete Quest'
            )}
          </button>
        )}
      </div>
    </div>
  )
}
