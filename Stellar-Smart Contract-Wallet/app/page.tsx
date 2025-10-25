'use client'

import { useState, useEffect } from 'react'
import { ProcurementApp } from '@/components/ProcurementApp'
import { Phase2App } from '@/components/Phase2App'
import { Phase3App } from '@/components/Phase3App'
import { ProductionApp } from '@/components/ProductionApp'
import { BuyerApp } from '@/components/BuyerApp'
import { SellerApp } from '@/components/SellerApp'
import { MarketplaceApp } from '@/components/MarketplaceApp'
import { MarketplaceService } from '@/services/MarketplaceService'
import { WalletProvider } from '@/contexts/WalletContext'
import { VLEIProvider } from '@/contexts/VLEIContext'
import { PasskeyWalletProvider } from '@/contexts/PasskeyWalletContext'
import { PaymentProvider } from '@/contexts/PaymentContext'
import { ContractProvider } from '@/contexts/ContractContext'

export default function Home() {
  const [phase, setPhase] = useState<'phase1' | 'phase2' | 'phase3' | 'production' | 'buyer' | 'seller' | 'marketplace'>('marketplace')

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-stellar-900 dark:text-stellar-100 mb-4">
          Stellar Procurement dApp
        </h1>
        
        {/* MARKETPLACE TAB - CENTERED AND PROMINENT */}
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setPhase('marketplace')}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 ${
              phase === 'marketplace'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300'
            }`}
          >
            🏪 MARKETPLACE
          </button>
        </div>

        {/* Phase Selector - Other Tabs */}
        <div className="flex justify-center space-x-3 mb-4 flex-wrap gap-y-2">
          <button
            onClick={() => setPhase('phase1')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              phase === 'phase1'
                ? 'bg-stellar-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Phase 1: MVP
          </button>
          <button
            onClick={() => setPhase('phase2')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              phase === 'phase2'
                ? 'bg-stellar-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Phase 2: vLEI Integration
          </button>
          <button
            onClick={() => setPhase('phase3')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              phase === 'phase3'
                ? 'bg-stellar-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            Phase 3: X402 Payments
          </button>
          <button
            onClick={() => setPhase('production')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              phase === 'production'
                ? 'bg-stellar-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            🚀 Production App
          </button>
          <button
            onClick={() => setPhase('buyer')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              phase === 'buyer'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            🛒 Buyer Dashboard
          </button>
          <button
            onClick={() => setPhase('seller')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              phase === 'seller'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            🏭 Seller Dashboard
          </button>
        </div>

        {phase === 'marketplace' ? (
          <>
            <p className="text-lg text-green-700 dark:text-green-300 mb-2">
              🏪 Marketplace: Escrow V5 Trade Listings
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Browse available trades • Fund escrow • Algorand Escrow V5 contract • Stellar wallet
            </p>
          </>
        ) : phase === 'phase1' ? (
          <>
            <p className="text-lg text-stellar-700 dark:text-stellar-300 mb-2">
              Phase 1 MVP: Smart Wallets with Passkeys
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Deploy smart wallets • Create purchase orders • Manual verification
            </p>
          </>
        ) : phase === 'phase2' ? (
          <>
            <p className="text-lg text-stellar-700 dark:text-stellar-300 mb-2">
              Phase 2: vLEI Integration with KERIA Agents
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Real vLEI credentials • KERIA agents • On-chain verification
            </p>
          </>
        ) : phase === 'phase3' ? (
          <>
            <p className="text-lg text-stellar-700 dark:text-stellar-300 mb-2">
              Phase 3: X402 Payments with USDC Settlement
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              X402 payment protocol • Automated USDC settlement • Invoice reconciliation
            </p>
          </>
        ) : phase === 'buyer' ? (
          <>
            <p className="text-lg text-blue-700 dark:text-blue-300 mb-2">
              🛒 Buyer Dashboard: AlgoTITANS Importer UI
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              EXACT AlgoTITANS ImporterDashboard • Stellar wallet • Create trades • My purchases
            </p>
          </>
        ) : phase === 'seller' ? (
          <>
            <p className="text-lg text-purple-700 dark:text-purple-300 mb-2">
              🏭 Seller Dashboard: AlgoTITANS Exporter UI
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              EXACT AlgoTITANS ExporterDashboard • Stellar wallet • My instruments • Escrowed trades
            </p>
          </>
        ) : (
          <>
            <p className="text-lg text-stellar-700 dark:text-stellar-300 mb-2">
              🚀 Production-Ready Application
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Real data persistence • Unified interface • Complete workflow • Analytics dashboard
            </p>
          </>
        )}
      </div>
      
      {phase === 'marketplace' ? (
        <WalletProvider>
          <MarketplaceApp />
        </WalletProvider>
      ) : phase === 'phase1' ? (
        <WalletProvider>
          <ContractProvider>
            <ProcurementApp />
          </ContractProvider>
        </WalletProvider>
      ) : phase === 'phase2' ? (
        <VLEIProvider>
          <PasskeyWalletProvider>
            <ContractProvider>
              <Phase2App />
            </ContractProvider>
          </PasskeyWalletProvider>
        </VLEIProvider>
      ) : phase === 'phase3' ? (
        <VLEIProvider>
          <PasskeyWalletProvider>
            <PaymentProvider>
              <ContractProvider>
                <Phase3App />
              </ContractProvider>
            </PaymentProvider>
          </PasskeyWalletProvider>
        </VLEIProvider>
      ) : phase === 'buyer' ? (
        <WalletProvider>
          <BuyerApp 
            marketplaceService={new MarketplaceService()}
            onNavigateToMarketplace={() => setPhase('marketplace')}
          />
        </WalletProvider>
      ) : phase === 'seller' ? (
        <WalletProvider>
          <SellerApp />
        </WalletProvider>
      ) : (
        <ProductionApp />
      )}
    </main>
  )
}
