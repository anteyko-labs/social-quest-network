import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Social Quest Network - Gasless Social Gaming',
  description: 'Revolutionary social gaming platform with gasless transactions on Status Network',
  keywords: 'blockchain, gaming, social, gasless, Status Network, Web3',
}

// Динамический импорт для отключения SSR
const ClientOnlyApp = dynamic(() => import('./page'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Social Quest Network</h1>
        <p className="text-gray-600">Loading gasless social gaming platform...</p>
      </div>
    </div>
  )
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ClientOnlyApp />
        </Providers>
      </body>
    </html>
  )
}
