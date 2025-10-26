'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useContract, useContractRead, useContractWrite } from 'wagmi'
import { useState, useEffect } from 'react'
import { QuestCard } from './components/QuestCard'
import { CreateQuestModal } from './components/CreateQuestModal'
import { UserProfile } from './components/UserProfile'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { NetworkSwitcher } from './components/NetworkSwitcher'
import { WalletHelp } from './components/WalletHelp'
import { ClientOnly } from './components/ClientOnly'

// Contract addresses (will be updated after deployment)
const SOCIAL_QUEST_ADDRESS = process.env.NEXT_PUBLIC_SOCIAL_QUEST_ADDRESS || '0x0000000000000000000000000000000000000000'
const REWARD_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_REWARD_TOKEN_ADDRESS || '0x0000000000000000000000000000000000000000'

// Contract ABI (simplified for demo)
const SOCIAL_QUEST_ABI = [
  {
    "inputs": [],
    "name": "getActiveQuests",
    "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_questId", "type": "uint256"}],
    "name": "getQuest",
    "outputs": [{
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    }, {
      "internalType": "address",
      "name": "creator",
      "type": "address"
    }, {
      "internalType": "string",
      "name": "title",
      "type": "string"
    }, {
      "internalType": "string",
      "name": "description",
      "type": "string"
    }, {
      "internalType": "uint256",
      "name": "reward",
      "type": "uint256"
    }, {
      "internalType": "bool",
      "name": "isActive",
      "type": "bool"
    }, {
      "internalType": "bool",
      "name": "isCompleted",
      "type": "bool"
    }, {
      "internalType": "address",
      "name": "completer",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "createdAt",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "completedAt",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_questId", "type": "uint256"}],
    "name": "completeQuest",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "string", "name": "_title", "type": "string"}, {"internalType": "string", "name": "_description", "type": "string"}, {"internalType": "uint256", "name": "_reward", "type": "uint256"}],
    "name": "createQuest",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export default function Home() {
  const { address, isConnected } = useAccount()
  const [activeQuests, setActiveQuests] = useState<any[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Contract hooks
  const { data: questIds } = useContractRead({
    address: SOCIAL_QUEST_ADDRESS as `0x${string}`,
    abi: SOCIAL_QUEST_ABI,
    functionName: 'getActiveQuests',
    enabled: isConnected,
  })

  const { write: createQuest } = useContractWrite({
    address: SOCIAL_QUEST_ADDRESS as `0x${string}`,
    abi: SOCIAL_QUEST_ABI,
    functionName: 'createQuest',
  })

  const { write: completeQuest } = useContractWrite({
    address: SOCIAL_QUEST_ADDRESS as `0x${string}`,
    abi: SOCIAL_QUEST_ABI,
    functionName: 'completeQuest',
  })

  // Load quests when quest IDs change
  useEffect(() => {
    if (questIds && questIds.length > 0) {
      loadQuests()
    }
  }, [questIds])

  const loadQuests = async () => {
    if (!questIds) return
    
    setIsLoading(true)
    try {
      const questPromises = questIds.map(async (questId: bigint) => {
        // This would be a contract call to getQuest(questId)
        // For demo purposes, we'll create mock data
        return {
          id: questId.toString(),
          title: `Quest #${questId.toString()}`,
          description: `Complete this amazing quest and earn rewards!`,
          reward: 100,
          creator: '0x123...456',
          isActive: true,
          createdAt: Date.now() - Math.random() * 86400000, // Random time in last 24h
        }
      })
      
      const quests = await Promise.all(questPromises)
      setActiveQuests(quests)
    } catch (error) {
      console.error('Error loading quests:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateQuest = async (title: string, description: string, reward: number) => {
    try {
      await createQuest({
        args: [title, description, reward],
      })
      setShowCreateModal(false)
      // Refresh quests
      setTimeout(loadQuests, 2000)
    } catch (error) {
      console.error('Error creating quest:', error)
    }
  }

  const handleCompleteQuest = async (questId: string) => {
    try {
      await completeQuest({
        args: [BigInt(questId)],
      })
      // Refresh quests
      setTimeout(loadQuests, 2000)
    } catch (error) {
      console.error('Error completing quest:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Hero />
        
        <Stats />
        
        {isConnected ? (
          <div className="mt-12">
            <div className="mb-6">
              <NetworkSwitcher />
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Active Quests</h2>
              <button
                onClick={() => setShowCreateModal(true)}
                className="quest-button"
              >
                + Create New Quest
              </button>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="quest-card animate-pulse">
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeQuests.map((quest) => (
                  <QuestCard
                    key={quest.id}
                    quest={quest}
                    onComplete={() => handleCompleteQuest(quest.id)}
                    userAddress={address}
                  />
                ))}
              </div>
            )}
            
            {activeQuests.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">
                  <ClientOnly fallback={<div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>}>
                    🎯
                  </ClientOnly>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Active Quests</h3>
                <p className="text-gray-500 mb-6">Be the first to create a quest and start earning rewards!</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="quest-button"
                >
                  Create First Quest
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">
              <ClientOnly fallback={<div className="w-16 h-16 bg-gray-200 rounded-full mx-auto"></div>}>
                🔗
              </ClientOnly>
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Connect Your Wallet</h3>
            <p className="text-gray-500 mb-6">Connect to Status Network to start your social quest journey!</p>
            
            <WalletHelp />
            
            <ConnectButton />
          </div>
        )}
        
        {isConnected && <UserProfile address={address} />}
      </main>
      
      {showCreateModal && (
        <CreateQuestModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateQuest}
        />
      )}
    </div>
  )
}
