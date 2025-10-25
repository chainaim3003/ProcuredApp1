/**
 * Demo Currency Converter
 * 
 * EXACT COPY from AlgoTITANS - NO CHANGES
 * Converts real USD amounts to small ALGO amounts for demonstration purposes
 * Exchange Rate: $100,000 USD = 1 ALGO
 */

export const DEMO_CONFIG = {
  // Exchange rate: How many USD equals 1 ALGO in demo mode
  USD_PER_ALGO: 100_000,
  
  // Micro conversion (1 ALGO = 1,000,000 microALGO)
  MICRO_ALGO_PER_ALGO: 1_000_000,
  
  // Whether demo mode is enabled
  DEMO_MODE: true,
}

/**
 * Convert USD to ALGO (for demo)
 */
export function usdToAlgo(usdAmount: number): number {
  if (!DEMO_CONFIG.DEMO_MODE) {
    throw new Error('Production mode not implemented - integrate price oracle')
  }
  
  return usdAmount / DEMO_CONFIG.USD_PER_ALGO
}

/**
 * Convert USD to microALGO (for transactions)
 */
export function usdToMicroAlgo(usdAmount: number): bigint {
  const algoAmount = usdToAlgo(usdAmount)
  const microAlgo = Math.round(algoAmount * DEMO_CONFIG.MICRO_ALGO_PER_ALGO)
  return BigInt(microAlgo)
}

/**
 * Convert ALGO to USD (for display)
 */
export function algoToUsd(algoAmount: number): number {
  if (!DEMO_CONFIG.DEMO_MODE) {
    throw new Error('Production mode not implemented - integrate price oracle')
  }
  
  return algoAmount * DEMO_CONFIG.USD_PER_ALGO
}

/**
 * Convert microALGO to USD (for display)
 */
export function microAlgoToUsd(microAlgoAmount: bigint): number {
  const algoAmount = Number(microAlgoAmount) / DEMO_CONFIG.MICRO_ALGO_PER_ALGO
  return algoToUsd(algoAmount)
}

/**
 * Format USD amount for display
 */
export function formatUsd(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format ALGO amount for display
 */
export function formatAlgo(amount: number, decimals: number = 2): string {
  return `${amount.toFixed(decimals)} ALGO`
}

/**
 * Format microALGO amount for display
 */
export function formatMicroAlgo(microAlgo: bigint): string {
  const algo = Number(microAlgo) / DEMO_CONFIG.MICRO_ALGO_PER_ALGO
  return formatAlgo(algo)
}

/**
 * Get conversion display text for forms
 */
export function getConversionDisplay(usdAmount: number): string {
  const algoAmount = usdToAlgo(usdAmount)
  
  if (!DEMO_CONFIG.DEMO_MODE) {
    return `≈ ${formatAlgo(algoAmount)}`
  }
  
  return `≈ ${formatAlgo(algoAmount)}\n*Demo rate: $${(DEMO_CONFIG.USD_PER_ALGO / 1000).toFixed(0)}k USD = 1 ALGO*`
}

/**
 * Calculate settlement amount with all conversions
 */
export function calculateSettlementAmount(cargoValueUsd: number, taxRate: number = 0): {
  usdTotal: number
  algoAmount: number
  microAlgoAmount: bigint
  taxAmount: number
  subtotal: number
} {
  const taxAmount = cargoValueUsd * taxRate
  const usdTotal = cargoValueUsd + taxAmount
  const algoAmount = usdToAlgo(usdTotal)
  const microAlgoAmount = usdToMicroAlgo(usdTotal)
  
  return {
    usdTotal,
    algoAmount,
    microAlgoAmount,
    taxAmount,
    subtotal: cargoValueUsd
  }
}

/**
 * Conversion examples for reference
 */
export const CONVERSION_EXAMPLES = {
  small: {
    usd: 50_000,
    algo: 0.5,
    microAlgo: 500_000n,
    display: '$50,000 USD = 0.5 ALGO = 500,000 microALGO'
  },
  medium: {
    usd: 100_000,
    algo: 1.0,
    microAlgo: 1_000_000n,
    display: '$100,000 USD = 1.0 ALGO = 1,000,000 microALGO'
  },
  large: {
    usd: 250_000,
    algo: 2.5,
    microAlgo: 2_500_000n,
    display: '$250,000 USD = 2.5 ALGO = 2,500,000 microALGO'
  },
  xlarge: {
    usd: 1_000_000,
    algo: 10.0,
    microAlgo: 10_000_000n,
    display: '$1,000,000 USD = 10.0 ALGO = 10,000,000 microALGO'
  }
}
