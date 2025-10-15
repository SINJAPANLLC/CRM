import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  User,
  Eye
} from 'lucide-react'
import { useDataStore } from '../stores/dataStore'
import { Customer } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { formatCurrency, formatDate } from '../lib/utils'

const CustomersPage: React.FC = () => {
  const { customers, deleteCustomer } = useDataStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [filterType, setFilterType] = useState<'all' | 'buyer' | 'seller' | 'both'>('all')

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm)
    
    const matchesFilter = filterType === 'all' || customer.type === filterType
    
    return matchesSearch && matchesFilter
  })

  const getCustomerTypeColor = (type: string) => {
    switch (type) {
      case 'buyer':
        return 'bg-blue-100 text-blue-800'
      case 'seller':
        return 'bg-green-100 text-green-800'
      case 'both':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCustomerTypeLabel = (type: string) => {
    switch (type) {
      case 'buyer':
        return '購入希望'
      case 'seller':
        return '売却希望'
      case 'both':
        return '両方'
      default:
        return '不明'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'potential':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active':
        return 'アクティブ'
      case 'inactive':
        return '非アクティブ'
      case 'potential':
        return '潜在顧客'
      default:
        return '不明'
    }
  }

  const handleDeleteCustomer = (id: string) => {
    if (window.confirm('この顧客を削除しますか？')) {
      deleteCustomer(id)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">顧客管理</h1>
          <p className="text-gray-600 mt-2">
            {customers.length}名の顧客を管理しています
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            新規顧客追加
          </Button>
        </motion.div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="顧客名、メールアドレス、電話番号で検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">すべて</option>
            <option value="buyer">購入希望</option>
            <option value="seller">売却希望</option>
            <option value="both">両方</option>
          </select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            フィルター
          </Button>
        </div>
      </motion.div>

      {/* Customers Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <AnimatePresence>
          {filteredCustomers.map((customer, index) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Card hover>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                        <User className="h-5 w-5 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                      </div>
                    </div>
                    <div className="relative">
                      <button className="p-1 rounded-md hover:bg-gray-100">
                        <MoreVertical className="h-4 w-4 text-gray-400" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      {customer.phone}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      {customer.address}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex space-x-2">
                      <Badge variant="secondary" className={getCustomerTypeColor(customer.type)}>
                        {getCustomerTypeLabel(customer.type)}
                      </Badge>
                      <Badge variant="secondary" className={getStatusColor(customer.status)}>
                        {getStatusLabel(customer.status)}
                      </Badge>
                    </div>
                  </div>

                  {customer.budget && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-md">
                      <p className="text-sm text-gray-600 mb-1">予算</p>
                      <p className="text-sm font-medium">
                        {formatCurrency(customer.budget.min)} - {formatCurrency(customer.budget.max)}
                      </p>
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <span className="text-xs text-gray-500">
                      登録日: {formatDate(customer.createdAt)}
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedCustomer(customer)
                          setShowModal(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCustomer(customer.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredCustomers.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            顧客が見つかりません
          </h3>
          <p className="text-gray-500">
            検索条件を変更するか、新しい顧客を追加してください。
          </p>
        </motion.div>
      )}

      {/* Customer Detail Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedCustomer?.name}
        size="lg"
      >
        {selectedCustomer && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-3">基本情報</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm">{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm">{selectedCustomer.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-400 mr-3" />
                    <span className="text-sm">{selectedCustomer.address}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">詳細情報</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">タイプ:</span>
                    <Badge variant="secondary" className={getCustomerTypeColor(selectedCustomer.type)}>
                      {getCustomerTypeLabel(selectedCustomer.type)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">ステータス:</span>
                    <Badge variant="secondary" className={getStatusColor(selectedCustomer.status)}>
                      {getStatusLabel(selectedCustomer.status)}
                    </Badge>
                  </div>
                  {selectedCustomer.budget && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">予算:</span>
                      <span className="text-sm font-medium">
                        {formatCurrency(selectedCustomer.budget.min)} - {formatCurrency(selectedCustomer.budget.max)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {selectedCustomer.preferences && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">希望条件</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600 mb-2">物件タイプ</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedCustomer.preferences.propertyType.map((type) => (
                        <Badge key={type} variant="secondary" size="sm">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">希望エリア</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedCustomer.preferences.location.map((location) => (
                        <Badge key={location} variant="secondary" size="sm">
                          {location}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">希望設備</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedCustomer.preferences.features.map((feature) => (
                        <Badge key={feature} variant="secondary" size="sm">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedCustomer.notes && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">備考</h3>
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                  {selectedCustomer.notes}
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default CustomersPage
