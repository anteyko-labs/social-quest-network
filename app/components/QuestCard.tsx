'use client'

import { Trophy, Clock, User, Coins, CheckCircle, Zap, AlertCircle, X } from 'lucide-react'
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
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  
  const handleComplete = async () => {
    setIsCompleting(true)
    try {
      await onComplete()
      setShowConfirmModal(false)
    } finally {
      setIsCompleting(false)
    }
  }

  const handleCompleteClick = () => {
    setShowConfirmModal(true)
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
            onClick={handleCompleteClick}
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

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Confirm Quest Completion</h2>
                  <p className="text-sm text-gray-500">Are you sure you want to complete this quest?</p>
                </div>
              </div>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">{quest.title}</h3>
                <p className="text-sm text-blue-700 mb-3">{quest.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-600">Reward:</span>
                  <span className="font-semibold text-blue-900">{quest.reward} QRT</span>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-900 mb-1">Important Notice</h4>
                    <p className="text-xs text-yellow-700">
                      Once you complete this quest, you will receive {quest.reward} QRT tokens as a reward. 
                      This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 quest-button-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleComplete}
                  disabled={isCompleting}
                  className="flex-1 quest-button disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCompleting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Completing...</span>
                    </div>
                  ) : (
                    'Complete Quest'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
