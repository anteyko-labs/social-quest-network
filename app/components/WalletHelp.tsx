'use client'

import { AlertCircle, ExternalLink, Zap } from 'lucide-react'
import { ClientOnly } from './ClientOnly'

export function WalletHelp() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
      <div className="flex items-start space-x-3">
        <AlertCircle className="w-6 h-6 text-blue-600 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            Can't connect your wallet?
          </h3>
          <p className="text-blue-700 mb-4">
            Follow these simple steps to connect to Status Network:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                1
              </div>
              <div>
                <p className="font-medium text-blue-900">Get test ETH</p>
                <p className="text-sm text-blue-700">
                  Go to{' '}
                  <a 
                    href="https://www.alchemy.com/faucets/ethereum-sepolia" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline inline-flex items-center"
                  >
                    Alchemy Sepolia Faucet <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                  {' '}and get test ETH
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                2
              </div>
              <div>
                <p className="font-medium text-blue-900">Add Status Network</p>
                <p className="text-sm text-blue-700">
                  When connecting your wallet, click "Approve" to add the network
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                3
              </div>
              <div>
                <p className="font-medium text-blue-900">Enjoy gasless transactions!</p>
                <p className="text-sm text-blue-700 flex items-center">
                  <Zap className="w-4 h-4 mr-1 text-green-500" />
                  All interactions are completely free
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>
                💡 Tip:
              </strong> Status Network Sepolia is a testnet with completely gasless transactions. 
              No gas fees required!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
