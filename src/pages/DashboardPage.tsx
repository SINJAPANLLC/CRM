import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users,
  Building2,
  FileText,
  TrendingUp,
  UserPlus,
  Home,
  Activity,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { useDataStore } from '../stores/dataStore'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { formatCurrency, formatRelativeTime } from '../lib/utils'

const DashboardPage: React.FC = () => {
  const { dashboardStats, activities, updateDashboardStats } = useDataStore()

  useEffect(() => {
    updateDashboardStats()
  }, [updateDashboardStats])

  const stats = [
    {
      title: '総顧客数',
      value: dashboardStats.totalCustomers,
      icon: Users,
      change: dashboardStats.newCustomersThisMonth,
      changeLabel: '今月の新規',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      changeColor: 'text-green-600',
      changeIcon: ArrowUpRight,
    },
    {
      title: '総物件数',
      value: dashboardStats.totalProperties,
      icon: Building2,
      change: dashboardStats.propertiesSoldThisMonth,
      changeLabel: '今月の売却',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      changeColor: 'text-green-600',
      changeIcon: ArrowUpRight,
    },
    {
      title: '進行中契約',
      value: dashboardStats.activeContracts,
      icon: FileText,
      change: 12,
      changeLabel: '先月比',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      changeColor: 'text-green-600',
      changeIcon: ArrowUpRight,
    },
    {
      title: '今月の売上',
      value: formatCurrency(dashboardStats.monthlyRevenue),
      icon: TrendingUp,
      change: 15.3,
      changeLabel: '先月比',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      changeColor: 'text-green-600',
      changeIcon: ArrowUpRight,
    },
  ]

  const recentActivities = activities.slice(0, 5)

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'customer_created':
        return <UserPlus className="h-4 w-4 text-blue-600" />
      case 'property_added':
        return <Home className="h-4 w-4 text-green-600" />
      case 'contract_signed':
        return <FileText className="h-4 w-4 text-purple-600" />
      default:
        return <Activity className="h-4 w-4 text-gray-600" />
    }
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'customer_created':
        return 'bg-blue-50'
      case 'property_added':
        return 'bg-green-50'
      case 'contract_signed':
        return 'bg-purple-50'
      default:
        return 'bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">ダッシュボード</h1>
        <p className="text-gray-600 mt-2">
          不動産CRMシステムの概要と最新のアクティビティ
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon
          const ChangeIcon = stat.changeIcon

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
            >
              <Card hover>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900">
                        {stat.value}
                      </p>
                      <div className="flex items-center mt-2">
                        <ChangeIcon className={`h-3 w-3 mr-1 ${stat.changeColor}`} />
                        <span className={`text-xs font-medium ${stat.changeColor}`}>
                          {typeof stat.change === 'number' ? `${stat.change}%` : `+${stat.change}`} {stat.changeLabel}
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>最近のアクティビティ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    className="flex items-start space-x-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                  >
                    <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">
                        {activity.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatRelativeTime(activity.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>クイックアクション</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <UserPlus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">新規顧客</p>
                </motion.button>
                
                <motion.button
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Home className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">新規物件</p>
                </motion.button>
                
                <motion.button
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">新規契約</p>
                </motion.button>
                
                <motion.button
                  className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <TrendingUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">レポート</p>
                </motion.button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>パフォーマンス概要</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {Math.round((dashboardStats.propertiesSoldThisMonth / dashboardStats.totalProperties) * 100)}%
                </div>
                <p className="text-sm text-gray-600">売却率</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {Math.round((dashboardStats.activeContracts / dashboardStats.totalCustomers) * 100)}%
                </div>
                <p className="text-sm text-gray-600">契約率</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {formatCurrency(dashboardStats.monthlyRevenue / dashboardStats.activeContracts || 0)}
                </div>
                <p className="text-sm text-gray-600">契約あたりの平均売上</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default DashboardPage
