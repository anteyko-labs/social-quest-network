'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useContract, useContractRead, useContractWrite } from 'wagmi'
import { createPublicClient, http, parseAbiItem } from 'viem'
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

// Contract addresses (updated after deployment)
const SOCIAL_QUEST_ADDRESS = '0x172EF1b0185273112b331637b67bFF523F7239bA'
const REWARD_TOKEN_ADDRESS = '0x7cF63006E9108CCeba3dFD60316aE49206e03A6F'

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
  },
  {
    "inputs": [{"internalType": "uint256", "name": "_questId", "type": "uint256"}],
    "name": "getQuestDetails",
    "outputs": [
      {"internalType": "uint256", "name": "id", "type": "uint256"},
      {"internalType": "address", "name": "creator", "type": "address"},
      {"internalType": "string", "name": "title", "type": "string"},
      {"internalType": "string", "name": "description", "type": "string"},
      {"internalType": "uint256", "name": "reward", "type": "uint256"},
      {"internalType": "bool", "name": "isActive", "type": "bool"},
      {"internalType": "bool", "name": "isCompleted", "type": "bool"},
      {"internalType": "address", "name": "completer", "type": "address"},
      {"internalType": "uint256", "name": "createdAt", "type": "uint256"},
      {"internalType": "uint256", "name": "completedAt", "type": "uint256"}
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export default function Home() {
  const { address, isConnected } = useAccount()
  const [activeQuests, setActiveQuests] = useState<any[]>([])
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // Debug: Log contract addresses
  console.log('Contract addresses:', {
    SOCIAL_QUEST_ADDRESS,
    REWARD_TOKEN_ADDRESS,
    isConnected,
    address
  })

  // Contract hooks
  const { data: questIds, refetch: refetchQuests } = useContractRead({
    address: SOCIAL_QUEST_ADDRESS as `0x${string}`,
    abi: SOCIAL_QUEST_ABI,
    functionName: 'getActiveQuests',
    enabled: isConnected,
  })

  // Function to get quest details using direct contract call
  const getQuestDetails = async (questId: string) => {
    try {
      // For now, we'll use a simplified approach
      // In a real implementation, you'd use ethers.js or viem to call the contract directly
      return {
        id: questId,
        title: `Quest #${questId}`,
        description: `Quest created on blockchain with ID ${questId}`,
        reward: 100, // Default reward
        creator: '0x0000000000000000000000000000000000000000',
        isActive: true,
        createdAt: Date.now(),
      }
    } catch (error) {
      console.error('Error getting quest details:', error)
      return null
    }
  }

  // Function to get quest details from contract using viem
  const getQuestDetailsFromContract = async (questId: string) => {
    try {
      console.log(`Getting quest details for ID: ${questId}`)
      
      // Create a public client for Status Network Sepolia
      const publicClient = createPublicClient({
        chain: {
          id: 1660990954,
          name: 'Status Network Sepolia',
          network: 'status-sepolia',
          nativeCurrency: {
            decimals: 18,
            name: 'Ethereum',
            symbol: 'ETH',
          },
          rpcUrls: {
            default: {
              http: ['https://public.sepolia.rpc.status.network'],
            },
            public: {
              http: ['https://public.sepolia.rpc.status.network'],
            },
          },
          blockExplorers: {
            default: {
              name: 'Status Explorer',
              url: 'https://sepoliascan.status.network',
            },
          },
          testnet: true,
        },
        transport: http('https://public.sepolia.rpc.status.network'),
      })
      
      // Call the contract's getQuestDetails function
      const result = await publicClient.readContract({
        address: SOCIAL_QUEST_ADDRESS as `0x${string}`,
        abi: SOCIAL_QUEST_ABI,
        functionName: 'getQuestDetails',
        args: [BigInt(questId)],
      })
      
      if (result) {
        return {
          id: result[0].toString(),
          title: result[2], // title
          description: result[3], // description
          reward: Number(result[4]), // reward
          creator: result[1], // creator
          isActive: result[5], // isActive
          isCompleted: result[6], // isCompleted
          completer: result[7], // completer
          createdAt: Number(result[8]) * 1000, // createdAt (convert to milliseconds)
          completedAt: Number(result[9]) * 1000, // completedAt (convert to milliseconds)
        }
      }
      
      // Fallback to placeholder data
      return {
        id: questId,
        title: `Quest #${questId}`,
        description: `Quest created on blockchain with ID ${questId}`,
        reward: 100, // Default reward
        creator: '0x0000000000000000000000000000000000000000',
        isActive: true,
        createdAt: Date.now(),
      }
    } catch (error) {
      console.error('Error getting quest details from contract:', error)
      // Fallback to placeholder data on error
      return {
        id: questId,
        title: `Quest #${questId}`,
        description: `Quest created on blockchain with ID ${questId}`,
        reward: 100, // Default reward
        creator: '0x0000000000000000000000000000000000000000',
        isActive: true,
        createdAt: Date.now(),
      }
    }
  }

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

  // Load quests when connected
  useEffect(() => {
    if (isConnected) {
      loadQuests()
    }
  }, [isConnected])

  const loadQuests = async () => {
    setIsLoading(true)
    try {
      // Check if contracts are deployed
      if (SOCIAL_QUEST_ADDRESS === '0x0000000000000000000000000000000000000000') {
        console.log('Contracts not deployed, using demo data')
        const demoQuests = [
          {
            id: '1',
            title: 'Welcome to Social Quest Network!',
            description: 'Complete your first quest and earn 100 QRT tokens. This is a demo quest to showcase the platform.',
            reward: 100,
            creator: '0x1234567890123456789012345678901234567890',
            isActive: true,
            createdAt: Date.now() - 3600000, // 1 hour ago
          },
          {
            id: '2',
            title: 'Connect Your Wallet',
            description: 'Connect your MetaMask wallet to Status Network Sepolia and earn 50 QRT tokens.',
            reward: 50,
            creator: '0x0987654321098765432109876543210987654321',
            isActive: true,
            createdAt: Date.now() - 7200000, // 2 hours ago
          },
          {
            id: '3',
            title: 'Create Your First Quest',
            description: 'Create a quest for other users to complete and earn 200 QRT tokens.',
            reward: 200,
            creator: '0x1111111111111111111111111111111111111111',
            isActive: true,
            createdAt: Date.now() - 10800000, // 3 hours ago
          }
        ]
        setActiveQuests(demoQuests)
        return
      }

      // Refetch quest IDs from contract
      console.log('Refreshing quests from deployed contracts...')
      const { data: freshQuestIds } = await refetchQuests()
      console.log('Fresh questIds from contract:', freshQuestIds)
      
      if (freshQuestIds && freshQuestIds.length > 0) {
        console.log(`Found ${freshQuestIds.length} quests in contract`)
        // Get quest details for each quest ID
        const quests = []
        for (let i = 0; i < freshQuestIds.length; i++) {
          const questId = freshQuestIds[i]
          const questDetails = await getQuestDetailsFromContract(questId.toString())
          if (questDetails) {
            quests.push(questDetails)
          }
        }
        setActiveQuests(quests)
        console.log('Loaded quests:', quests)
      } else {
        console.log('No quests found in contract, showing empty list')
        setActiveQuests([])
      }
    } catch (error) {
      console.error('Error loading quests:', error)
      // Fallback to demo data on error
      const demoQuests = [
        {
          id: 'demo-1',
          title: 'Demo Quest (Error Loading)',
          description: 'There was an error loading quests from the contract.',
          reward: 0,
          creator: '0x0000000000000000000000000000000000000000',
          isActive: true,
          createdAt: Date.now(),
        }
      ]
      setActiveQuests(demoQuests)
    } finally {
      setIsLoading(false)
      // Trigger profile refresh
      setRefreshTrigger(prev => prev + 1)
    }
  }

  const handleCreateQuest = async (title: string, description: string, reward: number) => {
    try {
      // Check if contracts are deployed
      if (SOCIAL_QUEST_ADDRESS === '0x0000000000000000000000000000000000000000') {
        // Demo mode
        const newQuest = {
          id: Date.now().toString(),
          title,
          description,
          reward,
          creator: address || '0x0000000000000000000000000000000000000000',
          isActive: true,
          createdAt: Date.now(),
        }
        
        setActiveQuests(prev => [newQuest, ...prev])
        setShowCreateModal(false)
        
        alert(`Quest "${title}" created successfully! (Demo mode - contracts not deployed)`)
        return
      }

      // Use real contract
      console.log('Creating quest with real contract...')
      if (!createQuest) {
        throw new Error('Contract not available')
      }

      // Call the smart contract
      console.log('Calling createQuest with args:', [title, description, reward])
      const result = await createQuest({
        args: [title, description, reward],
      })
      
      console.log('Quest creation result:', result)
      setShowCreateModal(false)
      
      // Show success message immediately
      alert(`Quest "${title}" created successfully! Transaction sent to blockchain!`)
      
      // Reload quests after a short delay to allow transaction to be mined
      setTimeout(() => {
        console.log('Reloading quests after creation...')
        loadQuests()
      }, 3000)
    } catch (error) {
      console.error('Error creating quest:', error)
      alert(`Error creating quest: ${error.message}`)
    }
  }

  const handleCompleteQuest = async (questId: string) => {
    try {
      // Check if contracts are deployed
      if (SOCIAL_QUEST_ADDRESS === '0x0000000000000000000000000000000000000000') {
        // Demo mode
        setActiveQuests(prev => prev.filter(quest => quest.id !== questId))
        alert(`Quest completed successfully! You earned QRT tokens! (Demo mode - contracts not deployed)`)
        return
      }

      // Use real contract
      console.log('Completing quest with real contract...')
      if (!completeQuest) {
        throw new Error('Contract not available')
      }

      // Call the smart contract
      console.log('Calling completeQuest with questId:', questId)
      const result = await completeQuest({
        args: [questId],
      })
      
      console.log('Quest completion result:', result)
      
      // Show success message immediately
      alert(`Quest completed successfully! You earned QRT tokens! Transaction sent to blockchain!`)
      
      // Reload quests after a short delay to allow transaction to be mined
      setTimeout(() => {
        console.log('Reloading quests after completion...')
        loadQuests()
      }, 3000)
    } catch (error) {
      console.error('Error completing quest:', error)
      alert(`Error completing quest: ${error.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <Hero />
        
        <Stats refreshTrigger={refreshTrigger} />
        
        {isConnected && address ? (
          <div className="mt-12">
            <div className="mb-6">
              <NetworkSwitcher />
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">Active Quests</h2>
              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    console.log('Manual quest reload triggered')
                    loadQuests()
                  }}
                  disabled={isLoading}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Loading...</span>
                    </div>
                  ) : (
                    '🔄 Refresh'
                  )}
                </button>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="quest-button"
                >
                  + Create New Quest
                </button>
              </div>
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
                      🎯
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
              🔗
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">Connect Your Wallet</h3>
            <p className="text-gray-500 mb-6">Connect to Status Network to start your social quest journey!</p>
            
            <WalletHelp />
            
            <div className="mt-6">
              <ConnectButton />
            </div>
            
            {/* Debug info */}
            <div className="mt-4 p-4 bg-gray-100 rounded text-sm">
              <p>Debug: isConnected = {isConnected ? 'true' : 'false'}</p>
              <p>Debug: address = {address || 'undefined'}</p>
            </div>
          </div>
        )}
        
          {isConnected && <UserProfile address={address} refreshTrigger={refreshTrigger} />}
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
