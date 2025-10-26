'use client'

import { useAccount } from 'wagmi'
import { Button } from './ui/Button'

export function NetworkSwitcher() {
  const { chain } = useAccount()

  const statusSepolia = {
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
    },
    blockExplorers: {
      default: { 
        name: 'Status Explorer', 
        url: 'https://sepoliascan.status.network'
      },
    },
    testnet: true,
  }

  const addStatusNetwork = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x62E4A8C', // 1660990954 in hex
            chainName: 'Status Network Sepolia',
            nativeCurrency: {
              name: 'Ethereum',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: ['https://public.sepolia.rpc.status.network'],
            blockExplorerUrls: ['https://sepoliascan.status.network'],
          }],
        })
      } catch (error) {
        console.error('Error adding Status Network:', error)
      }
    }
  }

  const switchToStatusNetwork = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x62E4A8C' }], // 1660990954 in hex
        })
      } catch (error: any) {
        // If the chain doesn't exist, add it
        if (error.code === 4902) {
          await addStatusNetwork()
        } else {
          console.error('Error switching to Status Network:', error)
        }
      }
    }
  }

  if (!chain) {
    return null
  }

  if (chain.id === 1660990954) {
    return (
      <div className="flex items-center space-x-2 text-green-600">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-sm font-medium">Status Network Sepolia</span>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm text-gray-600">
        Switch to Status Network for gasless transactions
      </div>
      <Button
        onClick={switchToStatusNetwork}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm"
      >
        Switch Network
      </Button>
      <Button
        onClick={addStatusNetwork}
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm"
      >
        Add Network
      </Button>
    </div>
  )
}
