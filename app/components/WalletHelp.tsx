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
            Не можете подключить кошелек?
          </h3>
          <p className="text-blue-700 mb-4">
            Следуйте этим простым шагам для подключения к Status Network:
          </p>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                1
              </div>
              <div>
                <p className="font-medium text-blue-900">Получите тестовый ETH</p>
                <p className="text-sm text-blue-700">
                  Перейдите на{' '}
                  <a 
                    href="https://www.alchemy.com/faucets/ethereum-sepolia" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline inline-flex items-center"
                  >
                    Alchemy Sepolia Faucet <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                  {' '}и получите тестовый ETH
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                2
              </div>
              <div>
                <p className="font-medium text-blue-900">Добавьте Status Network</p>
                <p className="text-sm text-blue-700">
                  При подключении кошелька нажмите "Approve" для добавления сети
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                3
              </div>
              <div>
                <p className="font-medium text-blue-900">Наслаждайтесь безгазовыми транзакциями!</p>
                <p className="text-sm text-blue-700 flex items-center">
                  <Zap className="w-4 h-4 mr-1 text-green-500" />
                  Все взаимодействия полностью бесплатны
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>
                <ClientOnly fallback="💡">💡</ClientOnly> Совет:
              </strong> Status Network Sepolia - это тестовая сеть с полностью безгазовыми транзакциями. 
              Никаких комиссий за газ не требуется!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
