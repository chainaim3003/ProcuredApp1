'use client'

/**
 * Buyer App Wrapper
 * 
 * Uses Stellar wallet connection but shows AlgoTITANS ImporterDashboard UI
 * Wallet: Stellar (from WalletContext)
 * UI & Logic: AlgoTITANS (unchanged)
 */

import React from 'react'
import { ImporterDashboard } from './ImporterDashboard'
import { MarketplaceService } from '../services/MarketplaceService'
import { useWallet } from '@/contexts/WalletContext'

export const BuyerApp: React.FC = () => {
  const walletContext = useWallet()
  const marketplaceService = new MarketplaceService()

  const handleNavigateToMarketplace = () => {
    alert('Navigate to marketplace - feature to be implemented')
  }

  // Show connect wallet message if not connected
  if (!walletContext?.address) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Connect Your Stellar Wallet
          </h2>
          <p className="text-gray-600 mb-6">
            Please connect your Stellar wallet to access the Importer Dashboard
          </p>
          <button
            onClick={() => alert('Please use the wallet connect button in the header')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    )
  }

  return (
    <ImporterDashboard
      marketplaceService={marketplaceService}
      onNavigateToMarketplace={handleNavigateToMarketplace}
    />
  )
}
