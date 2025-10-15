import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  Filter,
  // MoreVertical,
  Edit,
  Trash2,
  FileText,
  Calendar,
  // DollarSign,
  Eye,
  Download,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react'
import { useDataStore } from '../stores/dataStore'
import { Contract } from '../types'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { formatCurrency, formatDate } from '../lib/utils'

const ContractsPage: React.FC = () => {
  const { contracts, deleteContract } = useDataStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [filterType, setFilterType] = useState<'all' | 'sale' | 'rent' | 'management'>('all')
  const [filterStatus, setFilterStatus] = useState<'all' | 'draft' | 'pending' | 'signed' | 'completed' | 'cancelled'>('all')

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesType = filterType === 'all' || contract.type === filterType
    const matchesStatus = filterStatus === 'all' || contract.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const getContractTypeColor = (type: string) => {
    switch (type) {
      case 'sale':
        return 'bg-blue-100 text-blue-800'
      case 'rent':
        return 'bg-green-100 text-green-800'
      case 'management':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getContractTypeLabel = (type: string) => {
    switch (type) {
      case 'sale':
        return '売買契約'
      case 'rent':
        return '賃貸契約'
      case 'management':
        return '管理契約'
      default:
        return '不明'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'signed':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'draft':
        return '下書き'
      case 'pending':
        return '審査中'
      case 'signed':
        return '契約済み'
      case 'completed':
        return '完了'
      case 'cancelled':
        return 'キャンセル'
      default:
        return '不明'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'draft':
        return <FileText className="h-4 w-4" />
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'signed':
        return <CheckCircle className="h-4 w-4" />
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'cancelled':
        return <XCircle className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const handleDeleteContract = (id: string) => {
    if (window.confirm('この契約を削除しますか？')) {
      deleteContract(id)
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
          <h1 className="text-3xl font-bold text-gray-900">契約管理</h1>
          <p className="text-gray-600 mt-2">
            {contracts.length}件の契約を管理しています
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            新規契約作成
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
              placeholder="契約IDで検索..."
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
            <option value="sale">売買契約</option>
            <option value="rent">賃貸契約</option>
            <option value="management">管理契約</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">すべてのステータス</option>
            <option value="draft">下書き</option>
            <option value="pending">審査中</option>
            <option value="signed">契約済み</option>
            <option value="completed">完了</option>
            <option value="cancelled">キャンセル</option>
          </select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            フィルター
          </Button>
        </div>
      </motion.div>

      {/* Contracts List */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <AnimatePresence>
          {filteredContracts.map((contract, index) => (
            <motion.div
              key={contract.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Card hover>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100">
                          {getStatusIcon(contract.status)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            契約 #{contract.id}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {formatDate(contract.startDate)}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-gray-600 mb-1">契約価格</p>
                          <p className="text-lg font-bold text-primary-600">
                            {formatCurrency(contract.price)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">手数料</p>
                          <p className="text-lg font-bold text-green-600">
                            {formatCurrency(contract.commission)}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1">契約期間</p>
                          <p className="text-sm font-medium">
                            {formatDate(contract.startDate)}
                            {contract.endDate && ` - ${formatDate(contract.endDate)}`}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Badge variant="secondary" className={getContractTypeColor(contract.type)}>
                          {getContractTypeLabel(contract.type)}
                        </Badge>
                        <Badge variant="secondary" className={getStatusColor(contract.status)}>
                          {getStatusLabel(contract.status)}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedContract(contract)
                          setShowModal(true)
                        }}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteContract(contract.id)}
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

      {filteredContracts.length === 0 && (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            契約が見つかりません
          </h3>
          <p className="text-gray-500">
            検索条件を変更するか、新しい契約を作成してください。
          </p>
        </motion.div>
      )}

      {/* Contract Detail Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={`契約 #${selectedContract?.id}`}
        size="lg"
      >
        {selectedContract && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">基本情報</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">契約タイプ:</span>
                    <Badge variant="secondary" className={getContractTypeColor(selectedContract.type)}>
                      {getContractTypeLabel(selectedContract.type)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">ステータス:</span>
                    <Badge variant="secondary" className={getStatusColor(selectedContract.status)}>
                      {getStatusLabel(selectedContract.status)}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">契約価格:</span>
                    <span className="text-sm font-medium">
                      {formatCurrency(selectedContract.price)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">手数料:</span>
                    <span className="text-sm font-medium text-green-600">
                      {formatCurrency(selectedContract.commission)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Dates */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">契約期間</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium">開始日</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(selectedContract.startDate)}
                      </p>
                    </div>
                  </div>
                  {selectedContract.endDate && (
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                      <div>
                        <p className="text-sm font-medium">終了日</p>
                        <p className="text-sm text-gray-600">
                          {formatDate(selectedContract.endDate)}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium">作成日</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(selectedContract.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Terms */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">契約条件</h3>
              <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                {selectedContract.terms}
              </p>
            </div>

            {/* Documents */}
            {selectedContract.documents.length > 0 && (
              <div>
                <h3 className="font-medium text-gray-900 mb-3">関連書類</h3>
                <div className="space-y-2">
                  {selectedContract.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-gray-400 mr-3" />
                        <span className="text-sm font-medium">{doc}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Related IDs */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">関連情報</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-600 mb-1">物件ID</p>
                  <p className="text-sm font-medium">{selectedContract.propertyId}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-green-600 mb-1">顧客ID</p>
                  <p className="text-sm font-medium">{selectedContract.customerId}</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-xs text-purple-600 mb-1">担当者ID</p>
                  <p className="text-sm font-medium">{selectedContract.agentId}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default ContractsPage
