'use client'

import { Trophy, Zap, Users, Star } from 'lucide-react'

export function Hero() {
  return (
    <section className="text-center py-16">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium mb-6">
          <Zap className="w-4 h-4 mr-2" />
          Powered by Status Network - 100% Gasless
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Social Quest
          <span className="text-gradient"> Network</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          The first social gaming platform with completely gasless transactions. 
          Create quests, earn rewards, and build your reputation - all without paying gas fees!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Create Quests</h3>
            <p className="text-gray-600">Design challenges for others to complete and earn rewards</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Tasks</h3>
            <p className="text-gray-600">Take on quests from the community and earn tokens</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Build Reputation</h3>
            <p className="text-gray-600">Gain recognition and unlock exclusive rewards</p>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Why Status Network?</h3>
          <p className="text-gray-600">
            Unlike other platforms, every interaction is completely gasless. Create quests, complete tasks, 
            and earn rewards without ever paying transaction fees. This makes social gaming accessible to everyone!
          </p>
        </div>
      </div>
    </section>
  )
}
