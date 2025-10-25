/**
 * Demo Currency Converter for Stellar
 * Adapted from AlgoTITANS demoCurrencyConverter.ts
 * 
 * Converts USD amounts to USDC for demonstration purposes
 * Exchange Rate: $1 USD = 1 USDC (stablecoin)
 */

export const DEMO_CONFIG = {
  // Exchange rate: USDC is a 1:1 stablecoin with USD
  USD_PER_USDC: 1,
  
  // Stroop conversion (1 XLM = 10,000,000 stroops, same for USDC)
  STROOPS_PER_USDC: 10_000_000,
  
  // Whether demo mode is enabled
  DEMO_MODE: true,
}

/**
 * Convert USD to USDC (for demo)
 */
export function usdToUsdc(usdAmount: number): number {
  return usdAmount * DEMO_CONFIG.USD_PER_USDC
}

/**
 * Convert USD to stroops (for transactions)
 */
export function usdToStroops(usdAmount: number): bigint {
  const usdcAmount = usdToUsdc(usdAmount)
  const stroops = Math.round(usdcAmount * DEMO_CONFIG.STROOPS_PER_USDC)
  return BigInt(stroops)
}

/**
 * Convert USDC to USD (for display)
 */
export function usdcToUsd(usdcAmount: number): number {
  return usdcAmount / DEMO_CONFIG.USD_PER_USDC
}

/**
 * Convert stroops to USD (for display)
 */
export function stroopsToUsd(stroopsAmount: bigint): number {
  const usdcAmount = Number(stroopsAmount) / DEMO_CONFIG.STROOPS_PER_USDC
  return usdcToUsd(usdcAmount)
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
 * Format USDC amount for display
 */
export function formatUsdc(amount: number, decimals: number = 2): string {
  return `${amount.toFixed(decimals)} USDC`
}

/**
 * Format stroops amount for display
 */
export function formatStroops(stroops: bigint): string {
  const usdc = Number(stroops) / DEMO_CONFIG.STROOPS_PER_USDC
  return formatUsdc(usdc)
}

/**
 * Conversion examples for reference
 */
export const CONVERSION_EXAMPLES = {
  small: {
    usd: 50_000,
    usdc: 50_000,
    stroops: 500_000_000_000n,
    display: '$50,000 USD = 50,000 USDC'
  },
  medium: {
    usd: 100_000,
    usdc: 100_000,
    stroops: 1_000_000_000_000n,
    display: '$100,000 USD = 100,000 USDC'
  },
  large: {
    usd: 250_000,
    usdc: 250_000,
    stroops: 2_500_000_000_000n,
    display: '$250,000 USD = 250,000 USDC'
  }
}
