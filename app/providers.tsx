'use client'

import { WagmiConfig, createConfig, configureChains } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { RainbowKitProvider, getDefaultWallets } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'

// Status Network Sepolia configuration
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
    public: {
      http: ['https://public.sepolia.rpc.status.network'],
    },
  },
  blockExplorers: {
    default: { 
      name: 'Status Explorer', 
      url: 'https://sepoliascan.status.network',
      apiUrl: 'https://sepoliascan.status.network/api'
    },
  },
  testnet: true,
  // Add additional parameters for better compatibility
  chainId: 1660990954,
  shortName: 'status-sepolia',
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [statusSepolia, sepolia, mainnet],
  [publicProvider()]
)

// Use RainbowKit's default wallets
const { connectors } = getDefaultWallets({
  appName: 'Social Quest Network',
  projectId: 'demo-project-id',
  chains,
})

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} modalSize="compact">
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
