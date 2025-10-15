export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'agent'
  avatar?: string
  createdAt: Date
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  type: 'buyer' | 'seller' | 'both'
  budget?: {
    min: number
    max: number
  }
  preferences: {
    propertyType: string[]
    location: string[]
    features: string[]
  }
  status: 'active' | 'inactive' | 'potential'
  notes: string
  assignedAgent: string
  createdAt: Date
  updatedAt: Date
}

export interface Property {
  id: string
  title: string
  description: string
  type: 'apartment' | 'house' | 'land' | 'commercial'
  price: number
  area: number
  rooms?: number
  bathrooms?: number
  location: {
    address: string
    city: string
    prefecture: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  features: string[]
  images: string[]
  status: 'available' | 'sold' | 'rented' | 'pending'
  owner: string
  agent: string
  createdAt: Date
  updatedAt: Date
}

export interface Contract {
  id: string
  propertyId: string
  customerId: string
  agentId: string
  type: 'sale' | 'rent' | 'management'
  status: 'draft' | 'pending' | 'signed' | 'completed' | 'cancelled'
  price: number
  commission: number
  startDate: Date
  endDate?: Date
  terms: string
  documents: string[]
  createdAt: Date
  updatedAt: Date
}

export interface DashboardStats {
  totalCustomers: number
  totalProperties: number
  activeContracts: number
  monthlyRevenue: number
  newCustomersThisMonth: number
  propertiesSoldThisMonth: number
}

export interface Activity {
  id: string
  type: 'customer_created' | 'property_added' | 'contract_signed' | 'meeting_scheduled'
  title: string
  description: string
  userId: string
  userName: string
  timestamp: Date
  metadata?: Record<string, any>
}

