import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  Filter,
  DollarSign,
  Users,
  Building2,
  FileText,
  PieChart,
  LineChart
} from 'lucide-react'
import { useDataStore } from '../stores/dataStore'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { formatCurrency, formatDate } from '../lib/utils'

const ReportsPage: React.FC = () => {
  const { dashboardStats, customers, properties, contracts } = useDataStore()
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [selectedReport, setSelectedReport] = useState<'overview' | 'sales' | 'customers' | 'properties'>('overview')

  // サンプルデータ（実際のアプリケーションではAPIから取得）
  const salesData = [
    { month: '1月', sales: 45000000, contracts: 3 },
    { month: '2月', sales: 52000000, contracts: 4 },
    { month: '3月', sales: 38000000, contracts: 2 },
    { month: '4月', sales: 61000000, contracts: 5 },
    { month: '5月', sales: 49000000, contracts: 3 },
    { month: '6月', sales: 67000000, contracts: 6 },
  ]

  const customerTypes = [
    { type: '購入希望', count: customers.filter(c => c.type === 'buyer').length, color: 'bg-blue-500' },
    { type: '売却希望', count: customers.filter(c => c.type === 'seller').length, color: 'bg-green-500' },
    { type: '両方', count: customers.filter(c => c.type === 'both').length, color: 'bg-purple-500' },
  ]

  const propertyTypes = [
    { type: 'マンション', count: properties.filter(p => p.type === 'apartment').length, color: 'bg-blue-500' },
    { type: '一戸建て', count: properties.filter(p => p.type === 'house').length, color: 'bg-green-500' },
    { type: '土地', count: properties.filter(p => p.type === 'land').length, color: 'bg-yellow-500' },
    { type: '商業施設', count: properties.filter(p => p.type === 'commercial').length, color: 'bg-purple-500' },
  ]

  const contractStatuses = [
    { status: '契約済み', count: contracts.filter(c => c.status === 'signed').length, color: 'bg-green-500' },
    { status: '審査中', count: contracts.filter(c => c.status === 'pending').length, color: 'bg-yellow-500' },
    { status: '完了', count: contracts.filter(c => c.status === 'completed').length, color: 'bg-blue-500' },
    { status: 'キャンセル', count: contracts.filter(c => c.status === 'cancelled').length, color: 'bg-red-500' },
  ]

  const topPerformers = [
    { name: '田中太郎', sales: 120000000, contracts: 8, rank: 1 },
    { name: '佐藤花子', sales: 98000000, contracts: 6, rank: 2 },
    { name: '鈴木一郎', sales: 85000000, contracts: 5, rank: 3 },
  ]

  const recentActivities = [
    { date: '2024-01-15', activity: '新宿マンション売却契約完了', amount: 85000000 },
    { date: '2024-01-14', activity: '渋谷一戸建て売却契約完了', amount: 65000000 },
    { date: '2024-01-13', activity: '港区マンション賃貸契約完了', amount: 1500000 },
  ]

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
          <h1 className="text-3xl font-bold text-gray-900">レポート</h1>
          <p className="text-gray-600 mt-2">
            売上・契約・顧客の詳細分析
          </p>
        </div>
        <motion.div
          className="flex gap-2 mt-4 sm:mt-0"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            期間選択
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            エクスポート
          </Button>
        </motion.div>
      </motion.div>

      {/* Period and Report Type Selector */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="flex gap-2">
          {(['7d', '30d', '90d', '1y'] as const).map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
            >
              {period === '7d' && '7日'}
              {period === '30d' && '30日'}
              {period === '90d' && '90日'}
              {period === '1y' && '1年'}
            </Button>
          ))}
        </div>
        <div className="flex gap-2">
          {[
            { key: 'overview', label: '概要', icon: BarChart3 },
            { key: 'sales', label: '売上', icon: DollarSign },
            { key: 'customers', label: '顧客', icon: Users },
            { key: 'properties', label: '物件', icon: Building2 },
          ].map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant={selectedReport === key ? 'primary' : 'outline'}
              size="sm"
              onClick={() => setSelectedReport(key as any)}
            >
              <Icon className="mr-2 h-4 w-4" />
              {label}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Overview Report */}
      {selectedReport === 'overview' && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">総売上</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatCurrency(salesData.reduce((sum, d) => sum + d.sales, 0))}
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                        <span className="text-xs text-green-600">+12.5%</span>
                      </div>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">総契約数</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {contracts.length}
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                        <span className="text-xs text-green-600">+8.2%</span>
                      </div>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">アクティブ顧客</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {customers.filter(c => c.status === 'active').length}
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                        <span className="text-xs text-green-600">+15.3%</span>
                      </div>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-lg">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">販売中物件</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {properties.filter(p => p.status === 'available').length}
                      </p>
                      <div className="flex items-center mt-2">
                        <TrendingDown className="h-3 w-3 text-red-600 mr-1" />
                        <span className="text-xs text-red-600">-3.1%</span>
                      </div>
                    </div>
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <Building2 className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sales Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>売上推移</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <LineChart className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">売上推移グラフ</p>
                    <p className="text-sm text-gray-400">（実際のアプリケーションではChart.jsなどを使用）</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Performers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>トップパフォーマー</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <div key={performer.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full text-white font-bold ${
                          index === 0 ? 'bg-yellow-500' : 
                          index === 1 ? 'bg-gray-400' : 
                          'bg-orange-600'
                        }`}>
                          {performer.rank}
                        </div>
                        <div>
                          <p className="font-medium">{performer.name}</p>
                          <p className="text-sm text-gray-500">{performer.contracts}件の契約</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary-600">
                          {formatCurrency(performer.sales)}
                        </p>
                        <p className="text-sm text-gray-500">売上</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Customer Report */}
      {selectedReport === 'customers' && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* Customer Types Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>顧客タイプ別分布</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {customerTypes.map((item, index) => (
                    <div key={item.type} className="text-center">
                      <div className={`h-4 w-4 rounded-full mx-auto mb-2 ${item.color}`}></div>
                      <p className="text-2xl font-bold">{item.count}</p>
                      <p className="text-sm text-gray-600">{item.type}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Customer Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>顧客ステータス</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">アクティブ</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {customers.filter(c => c.status === 'active').length}名
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">非アクティブ</span>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                      {customers.filter(c => c.status === 'inactive').length}名
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">潜在顧客</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      {customers.filter(c => c.status === 'potential').length}名
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Properties Report */}
      {selectedReport === 'properties' && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* Property Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>物件タイプ別分布</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {propertyTypes.map((item) => (
                    <div key={item.type} className="text-center">
                      <div className={`h-4 w-4 rounded-full mx-auto mb-2 ${item.color}`}></div>
                      <p className="text-2xl font-bold">{item.count}</p>
                      <p className="text-sm text-gray-600">{item.type}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Property Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>物件ステータス</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">販売中</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {properties.filter(p => p.status === 'available').length}件
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">売却済み</span>
                    <Badge variant="secondary" className="bg-red-100 text-red-800">
                      {properties.filter(p => p.status === 'sold').length}件
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">賃貸中</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {properties.filter(p => p.status === 'rented').length}件
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">保留中</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      {properties.filter(p => p.status === 'pending').length}件
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}

      {/* Sales Report */}
      {selectedReport === 'sales' && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {/* Monthly Sales */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>月別売上</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesData.map((data, index) => (
                    <div key={data.month} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{data.month}</p>
                        <p className="text-sm text-gray-500">{data.contracts}件の契約</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary-600">
                          {formatCurrency(data.sales)}
                        </p>
                        <p className="text-sm text-gray-500">売上</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contract Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>契約ステータス</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {contractStatuses.map((item) => (
                    <div key={item.status} className="text-center">
                      <div className={`h-4 w-4 rounded-full mx-auto mb-2 ${item.color}`}></div>
                      <p className="text-2xl font-bold">{item.count}</p>
                      <p className="text-sm text-gray-600">{item.status}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>最近の取引</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium">{activity.activity}</p>
                        <p className="text-sm text-gray-500">{formatDate(new Date(activity.date))}</p>
                      </div>
                      <p className="font-bold text-primary-600">
                        {formatCurrency(activity.amount)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default ReportsPage
