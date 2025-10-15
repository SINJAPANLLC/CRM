import { create } from 'zustand'
import { Customer, Property, Contract, DashboardStats, Activity } from '../types'

interface DataState {
  // Customers
  customers: Customer[]
  addCustomer: (customer: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateCustomer: (id: string, updates: Partial<Customer>) => void
  deleteCustomer: (id: string) => void

  // Properties
  properties: Property[]
  addProperty: (property: Omit<Property, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateProperty: (id: string, updates: Partial<Property>) => void
  deleteProperty: (id: string) => void

  // Contracts
  contracts: Contract[]
  addContract: (contract: Omit<Contract, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateContract: (id: string, updates: Partial<Contract>) => void
  deleteContract: (id: string) => void

  // Dashboard Stats
  dashboardStats: DashboardStats
  updateDashboardStats: () => void

  // Activities
  activities: Activity[]
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void
}

// サンプルデータ
const sampleCustomers: Customer[] = [
  {
    id: '1',
    name: '田中太郎',
    email: 'tanaka@example.com',
    phone: '090-1234-5678',
    address: '東京都渋谷区',
    type: 'buyer',
    budget: { min: 30000000, max: 50000000 },
    preferences: {
      propertyType: ['apartment', 'house'],
      location: ['渋谷区', '新宿区'],
      features: ['駅近', 'ペット可']
    },
    status: 'active',
    notes: '家族向けの物件を探している',
    assignedAgent: '1',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: '佐藤花子',
    email: 'sato@example.com',
    phone: '090-9876-5432',
    address: '東京都港区',
    type: 'seller',
    budget: undefined,
    preferences: {
      propertyType: ['apartment'],
      location: ['港区'],
      features: []
    },
    status: 'active',
    notes: '高級マンションを売却予定',
    assignedAgent: '1',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
]

const sampleProperties: Property[] = [
  {
    id: '1',
    title: '新宿駅徒歩5分の高級マンション',
    description: '新宿駅から徒歩5分の立地に位置する高級マンション。最上階の角部屋で眺望抜群。',
    type: 'apartment',
    price: 85000000,
    area: 85.5,
    rooms: 3,
    bathrooms: 2,
    location: {
      address: '東京都新宿区新宿3-1-1',
      city: '新宿区',
      prefecture: '東京都',
      coordinates: { lat: 35.6909, lng: 139.7005 }
    },
    features: ['駅近', 'オートロック', '宅配ボックス', '駐車場'],
    images: ['/api/placeholder/400/300'],
    status: 'available',
    owner: '2',
    agent: '1',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10'),
  },
  {
    id: '2',
    title: '渋谷区の一戸建て住宅',
    description: '閑静な住宅街にある築10年の一戸建て。庭付きで子育てファミリーにおすすめ。',
    type: 'house',
    price: 65000000,
    area: 120.0,
    rooms: 4,
    bathrooms: 2,
    location: {
      address: '東京都渋谷区恵比寿2-2-2',
      city: '渋谷区',
      prefecture: '東京都',
      coordinates: { lat: 35.6467, lng: 139.7100 }
    },
    features: ['庭付き', '駐車場2台', '角地'],
    images: ['/api/placeholder/400/300'],
    status: 'available',
    owner: '3',
    agent: '1',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12'),
  },
]

const sampleContracts: Contract[] = [
  {
    id: '1',
    propertyId: '1',
    customerId: '1',
    agentId: '1',
    type: 'sale',
    status: 'pending',
    price: 85000000,
    commission: 2550000,
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-04-30'),
    terms: '3ヶ月以内の売却契約',
    documents: ['/api/placeholder/contract1.pdf'],
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
  },
]

const sampleActivities: Activity[] = [
  {
    id: '1',
    type: 'customer_created',
    title: '新しい顧客が登録されました',
    description: '田中太郎様が新規登録されました',
    userId: '1',
    userName: '管理者',
    timestamp: new Date('2024-01-15T10:30:00'),
    metadata: { customerId: '1' }
  },
  {
    id: '2',
    type: 'property_added',
    title: '新しい物件が追加されました',
    description: '新宿駅徒歩5分の高級マンションが登録されました',
    userId: '1',
    userName: '管理者',
    timestamp: new Date('2024-01-10T14:20:00'),
    metadata: { propertyId: '1' }
  },
  {
    id: '3',
    type: 'contract_signed',
    title: '契約が締結されました',
    description: '新宿マンションの売却契約が締結されました',
    userId: '1',
    userName: '管理者',
    timestamp: new Date('2024-01-25T16:45:00'),
    metadata: { contractId: '1' }
  },
]

export const useDataStore = create<DataState>((set, get) => ({
  customers: sampleCustomers,
  properties: sampleProperties,
  contracts: sampleContracts,
  activities: sampleActivities,
  dashboardStats: {
    totalCustomers: 0,
    totalProperties: 0,
    activeContracts: 0,
    monthlyRevenue: 0,
    newCustomersThisMonth: 0,
    propertiesSoldThisMonth: 0,
  },

  addCustomer: (customerData) => {
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    set((state) => ({ customers: [...state.customers, newCustomer] }))
    get().updateDashboardStats()
  },

  updateCustomer: (id, updates) => {
    set((state) => ({
      customers: state.customers.map((customer) =>
        customer.id === id
          ? { ...customer, ...updates, updatedAt: new Date() }
          : customer
      ),
    }))
    get().updateDashboardStats()
  },

  deleteCustomer: (id) => {
    set((state) => ({
      customers: state.customers.filter((customer) => customer.id !== id),
    }))
    get().updateDashboardStats()
  },

  addProperty: (propertyData) => {
    const newProperty: Property = {
      ...propertyData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    set((state) => ({ properties: [...state.properties, newProperty] }))
    get().updateDashboardStats()
  },

  updateProperty: (id, updates) => {
    set((state) => ({
      properties: state.properties.map((property) =>
        property.id === id
          ? { ...property, ...updates, updatedAt: new Date() }
          : property
      ),
    }))
    get().updateDashboardStats()
  },

  deleteProperty: (id) => {
    set((state) => ({
      properties: state.properties.filter((property) => property.id !== id),
    }))
    get().updateDashboardStats()
  },

  addContract: (contractData) => {
    const newContract: Contract = {
      ...contractData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    set((state) => ({ contracts: [...state.contracts, newContract] }))
    get().updateDashboardStats()
  },

  updateContract: (id, updates) => {
    set((state) => ({
      contracts: state.contracts.map((contract) =>
        contract.id === id
          ? { ...contract, ...updates, updatedAt: new Date() }
          : contract
      ),
    }))
    get().updateDashboardStats()
  },

  deleteContract: (id) => {
    set((state) => ({
      contracts: state.contracts.filter((contract) => contract.id !== id),
    }))
    get().updateDashboardStats()
  },

  updateDashboardStats: () => {
    const { customers, properties, contracts } = get()
    const now = new Date()
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    
    const newCustomersThisMonth = customers.filter(
      (customer) => customer.createdAt >= thisMonth
    ).length

    const propertiesSoldThisMonth = properties.filter(
      (property) => property.status === 'sold' && property.updatedAt >= thisMonth
    ).length

    const activeContracts = contracts.filter(
      (contract) => contract.status === 'pending' || contract.status === 'signed'
    ).length

    const monthlyRevenue = contracts
      .filter((contract) => contract.createdAt >= thisMonth)
      .reduce((sum, contract) => sum + contract.commission, 0)

    set({
      dashboardStats: {
        totalCustomers: customers.length,
        totalProperties: properties.length,
        activeContracts,
        monthlyRevenue,
        newCustomersThisMonth,
        propertiesSoldThisMonth,
      },
    })
  },

  addActivity: (activityData) => {
    const newActivity: Activity = {
      ...activityData,
      id: Date.now().toString(),
      timestamp: new Date(),
    }
    set((state) => ({ activities: [newActivity, ...state.activities] }))
  },
}))
