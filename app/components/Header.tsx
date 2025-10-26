'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Trophy, Zap, Users } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Social Quest Network</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Zap className="w-4 h-4 text-green-500" />
                <span>Gasless Transactions</span>
                <span>•</span>
                <span>Status Network</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>1,234 Active Users</span>
              </div>
              <div className="flex items-center space-x-1">
                <Trophy className="w-4 h-4" />
                <span>567 Quests Completed</span>
              </div>
            </div>
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  )
}
