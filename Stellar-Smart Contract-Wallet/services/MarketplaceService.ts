/**
 * Marketplace Service - Mock implementation
 * Keeps Algorand types but uses mock data
 */

import { TradeInstrument } from '../types/v3-contract-types'

export class MarketplaceService {
  constructor() {}

  async getInstrumentDetails(assetId: bigint): Promise<TradeInstrument | null> {
    // Return null for mock - component will handle empty state
    return null
  }
}
