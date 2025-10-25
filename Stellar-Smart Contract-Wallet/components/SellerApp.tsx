'use client'

/**
 * Seller Dashboard Component
 * 
 * EXACT COPY from AlgoTITANS Exporter Dashboard - Using Stellar wallet
 * WITH FULL DARK MODE SUPPORT
 * Shows seller's trade instruments and escrowed trades
 */
import React, { useState, useEffect } from 'react'
import { useWallet as useStellarWallet } from '@/contexts/WalletContext'
import { ConversionInfoBox } from './DemoCurrencyDisplay'
import { formatUsd, formatAlgo, usdToAlgo } from '../utils/demoCurrencyConverter'

export const SellerApp: React.FC = () => {
  const walletContext = useStellarWallet() // Using Stellar wallet!
  const activeAddress = walletContext?.address // Stellar address
  
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'my-instruments' | 'escrowed-trades'>('my-instruments')

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header - DARK MODE */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Seller Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your trade instruments and escrowed trades</p>
        {activeAddress && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Connected: {activeAddress.slice(0, 8)}...{activeAddress.slice(-6)}
          </p>
        )}
      </div>

      {/* Seller/Exporter Information Section - DARK MODE */}
      <div className="mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm dark:shadow-gray-900/50">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Seller Information</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Company Name</label>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">Jupiter Knitting Company</p>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Legal Entity Identifier (LEI)</label>
              <p className="text-sm font-mono font-semibold text-blue-600 dark:text-blue-400">549300ABCDEFGHIJK123</p>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Legal Address</label>
              <p className="text-sm text-gray-900 dark:text-white">
                123 Textile Street<br />
                Mumbai, Maharashtra 400001<br />
                India
              </p>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Registration Number</label>
              <p className="text-sm text-gray-900 dark:text-white">U17110MH1995PTC088888</p>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Status</label>
              <p className="text-sm">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  ✓ ACTIVE
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Currency Info */}
      <ConversionInfoBox className="mb-8" />

      {/* Tabs - DARK MODE */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('my-instruments')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'my-instruments'
                ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            📄 My Instruments
          </button>
          <button
            onClick={() => setActiveTab('escrowed-trades')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'escrowed-trades'
                ? 'border-green-500 text-green-600 dark:text-green-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            💰 Escrowed Trades
          </button>
        </nav>
      </div>

      {/* Tab Content - DARK MODE */}
      {activeTab === 'my-instruments' ? (
        // MY INSTRUMENTS TAB
        <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-900/50 rounded-lg border dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">My Trade Instruments</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Trade instruments you own (eBLs, LCs, Invoices)
            </p>
          </div>

          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">📄</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No instruments yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Connected with Stellar wallet. Instrument data would come from Algorand blockchain.
              </p>
              <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4 max-w-md mx-auto">
                <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">💡 How to create instruments:</h4>
                <ol className="text-xs text-blue-800 dark:text-blue-400 text-left space-y-1">
                  <li>1. Receive trade created by buyer in escrow</li>
                  <li>2. Accept trade and receive payment</li>
                  <li>3. Create eBL instrument on blockchain</li>
                  <li>4. Transfer instrument to buyer</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // ESCROWED TRADES TAB
        <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-900/50 rounded-lg border dark:border-gray-700">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Escrowed Trades</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Trades created by buyers waiting for your fulfillment
            </p>
          </div>

          <div className="p-6">
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">💰</div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No escrowed trades</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                When buyers create trades with your address as seller, they will appear here.
              </p>
              <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-lg p-4 max-w-md mx-auto">
                <h4 className="text-sm font-semibold text-green-900 dark:text-green-300 mb-2">✅ Escrow Process:</h4>
                <ol className="text-xs text-green-800 dark:text-green-400 text-left space-y-1">
                  <li>1. Buyer creates trade with your address</li>
                  <li>2. Buyer or Financier funds the escrow</li>
                  <li>3. Funds are locked in smart contract</li>
                  <li>4. You fulfill order and create instrument</li>
                  <li>5. You transfer instrument to buyer</li>
                  <li>6. Payment automatically released to you</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats Summary - DARK MODE */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-900/50 rounded-lg p-6 border dark:border-gray-700">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Active Instruments</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-900/50 rounded-lg p-6 border dark:border-gray-700">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">0</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Escrowed Trades</p>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-900/50 rounded-lg p-6 border dark:border-gray-700">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatUsd(0)}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total Value</p>
          </div>
        </div>
      </div>

      {/* Info Box - DARK MODE */}
      <div className="mt-8 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-300 mb-3">📘 Seller Dashboard Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-purple-800 dark:text-purple-400">
          <div>
            <h4 className="font-semibold mb-2">My Instruments:</h4>
            <ul className="space-y-1 text-xs dark:text-purple-300">
              <li>• View all your trade instruments (eBLs, LCs)</li>
              <li>• List instruments for sale in marketplace</li>
              <li>• Track instrument status and ownership</li>
              <li>• Monitor maturity dates and settlements</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Escrowed Trades:</h4>
            <ul className="space-y-1 text-xs dark:text-purple-300">
              <li>• View trades created by buyers</li>
              <li>• Accept funded trades</li>
              <li>• Create and transfer instruments</li>
              <li>• Receive automatic payment on transfer</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
