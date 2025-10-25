/**
 * Enhanced Importer Dashboard Component
 * 
 * EXACT COPY from AlgoTITANS - Using Stellar wallet but Algorand code
 * WITH FULL DARK MODE SUPPORT
 * 
 * Two tabs:
 * 1. My Purchases - Shows purchased instruments from blockchain
 * 2. Create Trade - Create new trades in Escrow V5
 */
import React, { useState, useEffect } from 'react'
import { TradeInstrument } from '../types/v3-contract-types'
import { MarketplaceService } from '../services/MarketplaceService'
import { useContracts } from '../hooks/useContracts'
import { useWallet as useStellarWallet } from '@/contexts/WalletContext'
import { ConversionInfoBox } from './DemoCurrencyDisplay'
import { formatUsd, formatAlgo, usdToAlgo, usdToMicroAlgo } from '../utils/demoCurrencyConverter'

interface ImporterDashboardEnhancedProps {
  marketplaceService: MarketplaceService
  onNavigateToMarketplace: () => void
  onNavigateToEscrowMarketplace?: () => void
}

// Default seller/exporter address  
const DEFAULT_SELLER_EXPORTER = 'EWYZFEJLQOZV25XLSMU5TSNPU3LY4U36IWDPSRQXOKWYBOLFZEXEB6UNWE'
const DEFAULT_SELLER_NAME = 'Jupiter Knitting Company'

// Product types
const PRODUCT_TYPES = [
  { value: 'Textiles', label: 'Textiles', description: 'Cotton fabrics, synthetic materials, garments' },
  { value: 'Electronics', label: 'Electronics', description: 'Consumer electronics, semiconductors, components' },
  { value: 'Food-Tea', label: 'Food & Tea', description: 'Premium tea varieties, food products' },
  { value: 'Industrial', label: 'Industrial Equipment', description: 'Manufacturing machinery, tools' },
  { value: 'Raw Materials', label: 'Raw Materials', description: 'Base materials, chemicals, metals' },
  { value: 'Healthcare', label: 'Healthcare Products', description: 'Medical devices, pharmaceutical products' }
]

export const BuyerApp: React.FC<ImporterDashboardEnhancedProps> = ({ 
  marketplaceService,
  onNavigateToMarketplace,
  onNavigateToEscrowMarketplace
}) => {
  const { contracts } = useContracts()
  const walletContext = useStellarWallet() // Using Stellar wallet!
  const activeAddress = walletContext?.address // Stellar address
  
  const [currentTab, setCurrentTab] = useState<'purchases' | 'create-trade'>('create-trade')
  
  // Purchases state
  const [purchasedInstruments, setPurchasedInstruments] = useState<TradeInstrument[]>([])
  const [loading, setLoading] = useState(false)

  // Create trade state
  const [formData, setFormData] = useState({
    sellerName: DEFAULT_SELLER_NAME,
    sellerExporterAddress: DEFAULT_SELLER_EXPORTER,
    cargoDescription: 'Food Description',
    cargoValue: 100000,
    productType: 'Food-Tea',
    purchaseOrderFile: null as File | null
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [uploadedFileName, setUploadedFileName] = useState('')
  const [vLEILoaded, setVLEILoaded] = useState(false)
  const [isLoadingImporterVLEI, setIsLoadingImporterVLEI] = useState(false)
  const [importerVLEIData, setImporterVLEIData] = useState<string>('')
  const [isLoadingSellerVLEI, setIsLoadingSellerVLEI] = useState(false)
  const [sellerVLEIData, setSellerVLEIData] = useState<string>('')

  const showError = (message: string) => {
    setError(message)
    setTimeout(() => setError(''), 8000)
  }

  const showSuccess = (message: string) => {
    setSuccess(message)
    setTimeout(() => setSuccess(''), 12000)
  }

  const handleProductTypeChange = (productType: string) => {
    setFormData({
      ...formData,
      productType,
      cargoDescription: `${productType} Description`
    })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        setFormData({ ...formData, purchaseOrderFile: file })
        setUploadedFileName(file.name)
        setError('')
        setVLEILoaded(false)
      } else {
        showError('Please upload a JSON file for the Purchase Order')
        event.target.value = ''
      }
    }
  }

  const handleGetImporterVLEI = async () => {
    setIsLoadingImporterVLEI(true)
    setError('')
    
    try {
      const VLEI_API_URL = 'https://api.gleif.org/api/v1/lei-records?filter[entity.legalName]=TOMMY+HILFIGER+EUROPE+B.V.'
      
      const response = await fetch(VLEI_API_URL)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setImporterVLEIData(JSON.stringify(data, null, 2))
      showSuccess('✅ vLEI data retrieved successfully!')
      
    } catch (error) {
      console.error('❌ Error fetching vLEI data:', error)
      showError(`Failed to fetch vLEI data: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setImporterVLEIData('')
    } finally {
      setIsLoadingImporterVLEI(false)
    }
  }

  const handleGetSellerVLEI = async () => {
    setIsLoadingSellerVLEI(true)
    setError('')
    
    try {
      const VLEI_API_URL = 'https://api.gleif.org/api/v1/lei-records?filter[entity.legalName]=Jupiter+Knitting+Company'
      
      const response = await fetch(VLEI_API_URL)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setSellerVLEIData(JSON.stringify(data, null, 2))
      showSuccess('✅ Seller vLEI data retrieved successfully!')
      
    } catch (error) {
      console.error('❌ Error fetching seller vLEI data:', error)
      showError(`Failed to fetch seller vLEI data: ${error instanceof Error ? error.message : 'Unknown error'}`)
      setSellerVLEIData('')
    } finally {
      setIsLoadingSellerVLEI(false)
    }
  }

  const handleCreateTrade = async (e: React.FormEvent) => {
    e.preventDefault()
    alert('Create trade functionality - to be implemented with Algorand Escrow V5')
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header - DARK MODE */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Importer Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Manage blockchain purchases and create new trades</p>
      </div>

      {/* Importer Information Section - DARK MODE */}
      <div className="mb-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm dark:shadow-gray-900/50">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Importer Information</h2>
          <button
            onClick={handleGetImporterVLEI}
            disabled={isLoadingImporterVLEI}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              isLoadingImporterVLEI
                ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600'
            }`}
          >
            {isLoadingImporterVLEI ? (
              <span className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Loading...
              </span>
            ) : (
              'Get vLEI'
            )}
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Company Name</label>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">TOMMY HILFIGER EUROPE B.V.</p>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Legal Entity Identifier (LEI)</label>
              <p className="text-sm font-mono font-semibold text-blue-600 dark:text-blue-400">54930012QJWZMYHNJW95</p>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Legal Address</label>
              <p className="text-sm text-gray-900 dark:text-white">
                DANZIGERKADE 165<br />
                AMSTERDAM, NL-NH 1013 AP<br />
                Netherlands
              </p>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Registration Number</label>
              <p className="text-sm text-gray-900 dark:text-white">33290078</p>
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
          
          {importerVLEIData && (
            <div className="mt-6">
              <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-2">vLEI JSON Response</label>
              <textarea
                value={importerVLEIData}
                readOnly
                rows={8}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-xs bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(importerVLEIData);
                    showSuccess('JSON copied to clipboard!');
                  }}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  Copy to Clipboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success/Error Messages - DARK MODE */}
      {success && (
        <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-300 px-4 py-3 rounded-lg">
          ✅ {success}
        </div>
      )}

      {error && (
        <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg">
          ⚠️ {error}
        </div>
      )}

      {/* Tabs - DARK MODE */}
      <div className="mb-8 border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          <button
            onClick={() => setCurrentTab('create-trade')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              currentTab === 'create-trade'
                ? 'border-green-500 text-green-600 dark:text-green-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            ➕ Create Trade
          </button>
          <button
            onClick={() => setCurrentTab('purchases')}
            className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              currentTab === 'purchases'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
          >
            📦 My Purchases ({purchasedInstruments.length})
          </button>
        </nav>
      </div>

      {/* Tab Content - DARK MODE */}
      {currentTab === 'purchases' ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-900/50 border dark:border-gray-700">
          <div className="text-gray-400 dark:text-gray-500 text-lg mb-2">📦</div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No purchases yet</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Connected with Stellar wallet. Purchase data would come from Algorand blockchain.
          </p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 shadow dark:shadow-gray-900/50 rounded-lg p-6 border dark:border-gray-700">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Create New Trade in Escrow V5</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Create a new trade agreement on the blockchain. The seller/exporter will be notified to fulfill the order.
            </p>
          </div>
          
          <form onSubmit={handleCreateTrade} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                SELLER (Exporter) *
              </label>
              <input
                type="text"
                value={formData.sellerName}
                onChange={(e) => setFormData({...formData, sellerName: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Company name of the seller/exporter"
                required
              />
              <div className="mt-2 flex items-center gap-2">
                <p className="text-base text-gray-600 dark:text-gray-300" style={{fontSize: '1.1em'}}>
                  Default: {DEFAULT_SELLER_NAME}
                </p>
                <button
                  type="button"
                  onClick={handleGetSellerVLEI}
                  disabled={isLoadingSellerVLEI}
                  className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                    isLoadingSellerVLEI
                      ? 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600'
                  }`}
                >
                  {isLoadingSellerVLEI ? 'Loading...' : 'Get vLEI'}
                </button>
              </div>
              {sellerVLEIData && (
                <div className="mt-3">
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">Seller vLEI JSON Response</label>
                  <textarea
                    value={sellerVLEIData}
                    readOnly
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-xs bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Seller(Exporter) Address *
              </label>
              <input
                type="text"
                value={formData.sellerExporterAddress}
                onChange={(e) => setFormData({...formData, sellerExporterAddress: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent font-mono text-sm"
                placeholder="Algorand address of the seller/exporter"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Cargo Value (USD) *
              </label>
              <input
                type="number"
                value={formData.cargoValue}
                onChange={(e) => setFormData({...formData, cargoValue: Number(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="100000"
                min="1000"
                required
              />
              {formData.cargoValue > 0 && (
                <div className="mt-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">SETTLEMENT AMOUNT</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">ALGO Amount</div>
                      <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {formatAlgo(usdToAlgo(formData.cargoValue))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-gray-500 dark:text-gray-400">microALGO</div>
                      <div className="text-sm font-mono text-gray-700 dark:text-gray-300">
                        {usdToMicroAlgo(formData.cargoValue).toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center italic">
                    Demo rate: $100k USD = 1 ALGO
                  </div>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Type *
              </label>
              <select
                value={formData.productType}
                onChange={(e) => handleProductTypeChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                {PRODUCT_TYPES.map((product) => (
                  <option key={product.value} value={product.value}>
                    {product.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={formData.cargoDescription}
                onChange={(e) => setFormData({...formData, cargoDescription: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Purchase Order *
              </label>
              
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-green-500 dark:hover:border-green-400 transition-colors bg-white dark:bg-gray-900">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="purchase-order-upload"
                />
                <label htmlFor="purchase-order-upload" className="cursor-pointer block">
                  <div className="text-gray-600 dark:text-gray-300 mb-2">
                    {uploadedFileName ? (
                      <span className="text-green-600 dark:text-green-400">📄 {uploadedFileName}</span>
                    ) : (
                      <span>📄 Upload Purchase Order JSON</span>
                    )}
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !formData.purchaseOrderFile}
              className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-colors ${
                isSubmitting || !formData.purchaseOrderFile
                  ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600'
              }`}
            >
              {isSubmitting ? 'Creating...' : '🚀 Create Trade in Escrow V5'}
            </button>
          </form>
        </div>
      )}
    </div>
  )
}
