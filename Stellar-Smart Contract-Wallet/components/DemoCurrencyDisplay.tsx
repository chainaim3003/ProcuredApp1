/**
 * Demo Currency Display Components
 * 
 * EXACT COPY from AlgoTITANS - NO CHANGES
 * Reusable components for displaying amounts in both USD and ALGO
 */
import React from 'react'
import { 
  microAlgoToUsd, 
  formatUsd, 
  formatMicroAlgo, 
  formatAlgo,
  usdToAlgo,
  DEMO_CONFIG 
} from '../utils/demoCurrencyConverter'

/**
 * Conversion Info Box - Shows the demo rate explanation
 */
export const ConversionInfoBox: React.FC<{ className?: string }> = ({ className = '' }) => {
  if (!DEMO_CONFIG.DEMO_MODE) return null

  return (
    <div className={`bg-amber-50 border border-amber-200 rounded-lg p-4 ${className}`}>
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
  )
}
