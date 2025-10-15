import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  MapPin,
  Home,
  Eye,
  Camera,
  Bed,
  Bath,
  Square,
  Yen
} from 'lucide-react'
import { useDataStore } from '../stores/dataStore'
import { Property } from '../types'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { formatCurrency, formatDate } from '../lib/utils'

const PropertiesPage: React.FC = () => {
  const { properties, deleteProperty } = useDataStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [filterType, setFilterType] = useState<'all' | 'apartment' | 'house' | 'land' | 'commercial'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'available' | 'sold' | 'rented' | 'pending'>('all')

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.city.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = filterType === 'all' || property.type === filterType
    const matchesStatus = filterStatus === 'all' || property.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getPropertyTypeColor = (type: string) => {
    switch (type) {
      case 'apartment':
        return 'bg-blue-100 text-blue-800'
      case 'house':
        return 'bg-green-100 text-green-800'
      case 'land':
        return 'bg-yellow-100 text-yellow-800'
      case 'commercial':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPropertyTypeLabel = (type: string) => {
    switch (type) {
      case 'apartment':
        return 'マンション'
      case 'house':
        return '一戸建て'
      case 'land':
        return '土地'
      case 'commercial':
        return '商業施設'
      default:
        return '不明'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'sold':
        return 'bg-red-100 text-red-800'
      case 'rented':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'available':
        return '販売中'
      case 'sold':
        return '売却済み'
      case 'rented':
        return '賃貸中'
      case 'pending':
        return '保留中'
      default:
        return '不明'
    }
  }

  const handleDeleteProperty = (id: string) => {
    if (window.confirm('この物件を削除しますか？')) {
      deleteProperty(id)
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
          <h1 className="text-3xl font-bold text-gray-900">物件管理</h1>
          <p className="text-gray-600 mt-2">
            {properties.length}件の物件を管理しています
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            新規物件追加
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
              placeholder="物件名、住所、市区町村で検索..."
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
            <option value="all">すべてのタイプ</option>
            <option value="apartment">マンション</option>
            <option value="house">一戸建て</option>
            <option value="land">土地</option>
            <option value="commercial">商業施設</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">すべてのステータス</option>
            <option value="available">販売中</option>
            <option value="sold">売却済み</option>
            <option value="rented">賃貸中</option>
            <option value="pending">保留中</option>
          </select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            フィルター
          </Button>
        </div>
      </motion.div>

      {/* Properties Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <AnimatePresence>
          {filteredProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Card hover>
                <div className="relative">
                  <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center">
                    <Camera className="h-12 w-12 text-gray-400" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary" className={getStatusColor(property.status)}>
                      {getStatusLabel(property.status)}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                      {property.title}
                    </h3>
                    <button className="p-1 rounded-md hover:bg-gray-100">
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="truncate">{property.location.address}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-lg font-bold text-primary-600">
                        <Yen className="h-5 w-5 mr-1" />
                        {formatCurrency(property.price)}
                      </div>
                      <Badge variant="secondary" className={getPropertyTypeColor(property.type)}>
                        {getPropertyTypeLabel(property.type)}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4 py-3 border-y border-gray-100">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Square className="h-4 w-4 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium">{property.area}m²</p>
                      <p className="text-xs text-gray-500">面積</p>
                    </div>
                    {property.rooms && (
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Bed className="h-4 w-4 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium">{property.rooms}LDK</p>
                        <p className="text-xs text-gray-500">間取り</p>
                      </div>
                    )}
                    {property.bathrooms && (
                      <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          <Bath className="h-4 w-4 text-gray-400" />
                        </div>
                        <p className="text-sm font-medium">{property.bathrooms}</p>
                        <p className="text-xs text-gray-500">浴室</p>
                      </div>
                    )}
                  </div>

                  {property.features.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">特徴</p>
                      <div className="flex flex-wrap gap-1">
                        {property.features.slice(0, 3).map((feature) => (
                          <Badge key={feature} variant="secondary" size="sm">
                            {feature}
                          </Badge>
                        ))}
                        {property.features.length > 3 && (
                          <Badge variant="secondary" size="sm">
                            +{property.features.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-xs text-gray-500">
                      登録日: {formatDate(property.createdAt)}
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedProperty(property)
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
                        onClick={() => handleDeleteProperty(property.id)}
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

      {filteredProperties.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <Home className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            物件が見つかりません
          </h3>
          <p className="text-gray-500">
            検索条件を変更するか、新しい物件を追加してください。
          </p>
        </motion.div>
      )}

      {/* Property Detail Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedProperty?.title}
        size="xl"
      >
        {selectedProperty && (
          <div className="space-y-6">
            {/* Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <Camera className="h-12 w-12 text-gray-400" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
                <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
                <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
                <div className="h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Camera className="h-8 w-8 text-gray-400" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">基本情報</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">価格:</span>
                    <span className="text-lg font-bold text-primary-600">
                      {formatCurrency(selectedProperty.price)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">面積:</span>
                    <span className="text-sm font-medium">{selectedProperty.area}m²</span>
                  </div>
                  {selectedProperty.rooms && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">間取り:</span>
                      <span className="text-sm font-medium">{selectedProperty.rooms}LDK</span>
                    </div>
                  )}
                  {selectedProperty.bathrooms && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">浴室:</span>
                      <span className="text-sm font-medium">{selectedProperty.bathrooms}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">物件タイプ:</span>
                    <Badge variant="secondary" className={getPropertyTypeColor(selectedProperty.type)}>
                      {getPropertyTypeLabel(selectedProperty.type)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">ステータス:</span>
                    <Badge variant="secondary" className={getStatusColor(selectedProperty.status)}>
                      {getStatusLabel(selectedProperty.status)}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">所在地</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 text-gray-400 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{selectedProperty.location.address}</p>
                      <p className="text-sm text-gray-500">
                        {selectedProperty.location.prefecture} {selectedProperty.location.city}
                      </p>
                    </div>
                  </div>
                  {selectedProperty.location.coordinates && (
                    <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm text-gray-500">地図表示</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">物件説明</h3>
              <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                {selectedProperty.description}
              </p>
            </div>

            {/* Features */}
            {selectedProperty.features.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">設備・特徴</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProperty.features.map((feature) => (
                    <Badge key={feature} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default PropertiesPage
