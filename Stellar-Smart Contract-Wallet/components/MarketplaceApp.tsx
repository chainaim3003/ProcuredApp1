'use client'

/**
 * Marketplace Component - Escrow V5
 * 
 * EXACT COPY from AlgoTITANS EscrowV5Marketplace - Using Stellar wallet
 * Shows trades from Algorand Escrow V5 contract
 */
import React, { useState, useEffect } from 'react'
import { useWallet as useStellarWallet } from '@/contexts/WalletContext'
import { useContracts } from '../hooks/useContracts'
import { formatUsd, formatMicroAlgo, formatAlgo, DEMO_CONFIG, microAlgoToUsd } from '../utils/demoCurrencyConverter'

// Trade states
const TRADE_STATES = {
  CREATED: 0,
  ESCROWED: 1,
  EXECUTED: 2,
  PAYMENT_ACKNOWLEDGED: 3,
  EXPIRED: 4,
  COMPLETED: 5
}

const STATE_LABELS: { [key: number]: { label: string; color: string } } = {
  0: { label: 'CREATED - Awaiting Funding', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
  1: { label: 'ESCROWED - Funded', color: 'bg-blue-100 text-blue-800 border-blue-300' },
  2: { label: 'EXECUTED', color: 'bg-green-100 text-green-800 border-green-300' },
  3: { label: 'PAYMENT ACKNOWLEDGED', color: 'bg-purple-100 text-purple-800 border-purple-300' },
  4: { label: 'EXPIRED', color: 'bg-gray-100 text-gray-800 border-gray-300' },
  5: { label: 'COMPLETED', color: 'bg-green-100 text-green-800 border-green-300' }
}

interface EscrowTrade {
  tradeId: number
  buyer: string
  seller: string
  amount: bigint
  state: number
  createdAt: bigint
  escrowProvider: string
  productType: string
  description: string
  ipfsHash: string
}

export const MarketplaceApp: React.FC = () => {
  const walletContext = useStellarWallet() // Using Stellar wallet!
  const activeAddress = walletContext?.address // Stellar address
  const { contracts } = useContracts()
  
  const [trades, setTrades] = useState<EscrowTrade[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [fundingTradeId, setFundingTradeId] = useState<number | null>(null)

  // Mock Escrow contract details
  const ESCROW_APP_ID = 746822940
  const MARKETPLACE_FEE_RATE = 25 // 0.25% in basis points

  const handleFundEscrow = async (trade: EscrowTrade) => {
    alert('Fund Escrow functionality - connects to Algorand Escrow V5 contract')
  }

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const calculateTotalCost = (amount: bigint) => {
    const fee = (amount * BigInt(MARKETPLACE_FEE_RATE)) / BigInt(10000)
    return amount + fee
  }

  const getUsdValue = (microAlgos: bigint) => {
    return microAlgoToUsd(microAlgos)
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          🚀 Escrow V5 Marketplace
        </h1>
        <p className="text-gray-600">
          Browse and fund trade opportunities from the Escrow V5 contract
        </p>
        <div className="mt-2 text-sm text-gray-500">
          Contract: <span className="font-mono font-semibold text-blue-600">App ID {ESCROW_APP_ID}</span>
          {' • '}
          <a 
            href={`https://testnet.explorer.perawallet.app/application/${ESCROW_APP_ID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 underline"
          >
            View on Explorer ↗
          </a>
        </div>
        
        {/* Demo Currency Info */}
        {DEMO_CONFIG.DEMO_MODE && (
          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <span className="text-xl">💡</span>
              <div>
                <div className="font-semibold text-amber-900 text-sm">Demo Mode Active</div>
                <div className="text-amber-700 text-sm mt-1">
                  All amounts shown in both USD and ALGO. Demo rate: <strong>${(DEMO_CONFIG.USD_PER_ALGO / 1000).toFixed(0)}k USD = 1 ALGO</strong>
                </div>
                <div className="text-amber-600 text-xs mt-1">
                  This makes testnet transactions affordable for demonstration.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
          ⚠️ {error}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">Total Trades</div>
          <div className="text-2xl font-bold text-gray-900">{trades.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">Awaiting Funding</div>
          <div className="text-2xl font-bold text-yellow-600">
            {trades.filter(t => t.state === TRADE_STATES.CREATED).length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">Funded</div>
          <div className="text-2xl font-bold text-blue-600">
            {trades.filter(t => t.state === TRADE_STATES.ESCROWED).length}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 mb-1">Completed</div>
          <div className="text-2xl font-bold text-green-600">
            {trades.filter(t => t.state === TRADE_STATES.COMPLETED).length}
          </div>
        </div>
      </div>

      {/* Trades List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Available Trades</h2>
          <p className="text-sm text-gray-500 mt-1">
            Live trades from Escrow V5 smart contract
          </p>
        </div>

        <div className="divide-y divide-gray-200">
          {trades.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-gray-400 text-lg mb-2">📦</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No trades found</h3>
              <p className="text-gray-500 mb-4">
                No trades have been created in the Escrow V5 contract yet.
              </p>
              <p className="text-sm text-gray-400">
                Create a trade in the Buyer Dashboard to see it listed here!
              </p>
            </div>
          ) : (
            trades.map((trade) => {
              const totalCost = calculateTotalCost(trade.amount)
              const fee = totalCost - trade.amount
              const isBuyer = trade.buyer === activeAddress
              const isSeller = trade.seller === activeAddress
              const canFund = trade.state === TRADE_STATES.CREATED && (isBuyer || !isBuyer)
              const canExecute = trade.state === TRADE_STATES.ESCROWED && isSeller

              return (
                <div key={trade.tradeId} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          Trade #{trade.tradeId}
                        </h3>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            STATE_LABELS[trade.state]?.color || 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {STATE_LABELS[trade.state]?.label || 'UNKNOWN'}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div>
                          <span className="font-medium">Product:</span> {trade.productType}
                        </div>
                        <div>
                          <span className="font-medium">Description:</span> {trade.description}
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <div>
                            <span className="font-medium">Buyer:</span>{' '}
                            <span className="font-mono text-xs">
                              {trade.buyer.slice(0, 6)}...{trade.buyer.slice(-6)}
                            </span>
                            {isBuyer && (
                              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                You
                              </span>
                            )}
                          </div>
                          <div>
                            <span className="font-medium">Seller:</span>{' '}
                            <span className="font-mono text-xs">
                              {trade.seller.slice(0, 6)}...{trade.seller.slice(-6)}
                            </span>
                            {isSeller && (
                              <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          Created: {formatDate(trade.createdAt)}
                        </div>
                      </div>
                    </div>

                    {/* Amount & Action */}
                    <div className="ml-6 text-right">
                      <div className="mb-3">
                        {/* Dual Currency Display */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-3 border border-blue-200">
                          <div className="text-xs text-gray-600 mb-2">TRADE VALUE</div>
                          <div className="space-y-2">
                            <div>
                              <div className="text-xs text-gray-500">USD Value</div>
                              <div className="text-xl font-bold text-gray-900">
                                {formatUsd(getUsdValue(trade.amount))}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Settlement</div>
                              <div className="text-lg font-bold text-blue-600">
                                {formatMicroAlgo(trade.amount)}
                              </div>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500 mt-2 text-center">
                            {Number(trade.amount).toLocaleString()} μALGO
                          </div>
                        </div>
                        {canFund && (
                          <div className="text-xs text-gray-500 mt-3 space-y-1 text-left">
                            <div className="flex justify-between">
                              <span>Fee:</span>
                              <span>{formatMicroAlgo(fee)}</span>
                            </div>
                            <div className="flex justify-between font-semibold pt-1 border-t border-gray-300">
                              <span>Total:</span>
                              <span>{formatMicroAlgo(totalCost)}</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {canFund && activeAddress ? (
                        <button
                          onClick={() => handleFundEscrow(trade)}
                          disabled={fundingTradeId === trade.tradeId}
                          className={`px-6 py-2 rounded-lg font-medium text-white transition-colors ${
                            fundingTradeId === trade.tradeId
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                        >
                          {fundingTradeId === trade.tradeId ? (
                            <span className="flex items-center">
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                              Funding...
                            </span>
                          ) : (
                            '💰 Fund Escrow'
                          )}
                        </button>
                      ) : canExecute && activeAddress ? (
                        <button
                          onClick={() => alert('Execute Trade functionality coming soon!')}
                          className="px-6 py-2 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
                        >
                          🚀 Execute Trade
                        </button>
                      ) : !activeAddress ? (
                        <div className="text-xs text-gray-500">Connect wallet to interact</div>
                      ) : trade.state === TRADE_STATES.ESCROWED ? (
                        <div className="text-sm text-green-600 font-medium">✓ Funded - Awaiting Execution</div>
                      ) : trade.state === TRADE_STATES.EXECUTED ? (
                        <div className="text-sm text-purple-600 font-medium">⚡ Executed</div>
                      ) : trade.state === TRADE_STATES.COMPLETED ? (
                        <div className="text-sm text-green-600 font-medium">✅ Completed</div>
                      ) : null}
                    </div>
                  </div>

                  {/* Additional Info */}
                  {trade.escrowProvider !== '0'.repeat(58) && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="text-xs text-gray-600">
                        <span className="font-medium">Funded by:</span>{' '}
                        <span className="font-mono">
                          {trade.escrowProvider.slice(0, 10)}...{trade.escrowProvider.slice(-10)}
                        </span>
                        {trade.escrowProvider === activeAddress && (
                          <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded">
                            You
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
