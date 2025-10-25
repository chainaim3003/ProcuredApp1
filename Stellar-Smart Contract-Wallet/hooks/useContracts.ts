'use client'

/**
 * useContracts Hook - Mock implementation
 * Uses Stellar wallet but returns Algorand-style contract structure
 */

import { useWallet } from '@/contexts/WalletContext'

export function useContracts() {
  const walletContext = useWallet()
  
  return {
    contracts: walletContext?.address ? {
      algorand: null, // Mock Algorand client
      registry: null, // Mock registry client
      marketplace: null, // Mock marketplace client
      config: null
    } : null
  }
}
