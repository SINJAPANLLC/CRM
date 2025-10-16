import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// 美しいアイコンコンポーネント
const DashboardIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v4a2 2 0 01-2 2H10a2 2 0 01-2-2V5z" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

const BuildingIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)

const ContractIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const ChartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const SettingsIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const LogoutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
)

const LoginIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
  </svg>
)

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [email, setEmail] = useState('admin@example.com')
  const [password, setPassword] = useState('password')
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleLogin = async () => {
    if (email === 'admin@example.com' && password === 'password') {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsAuthenticated(true)
      setIsLoading(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    } else {
      alert('ログイン情報が正しくありません')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setCurrentPage('dashboard')
  }

  const menuItems = [
    { id: 'dashboard', label: 'ダッシュボード', icon: <DashboardIcon /> },
    { id: 'customers', label: '顧客管理', icon: <UsersIcon /> },
    { id: 'properties', label: '物件管理', icon: <BuildingIcon /> },
    { id: 'contracts', label: '契約管理', icon: <ContractIcon /> },
    { id: 'reports', label: 'レポート', icon: <ChartIcon /> },
    { id: 'settings', label: '設定', icon: <SettingsIcon /> }
  ]

  const stats = [
    { 
      label: '総顧客数', 
      value: '1,247', 
      change: '+12%', 
      changeType: 'positive',
      icon: <UsersIcon />,
      description: '前月比'
    },
    { 
      label: 'アクティブ物件', 
      value: '89', 
      change: '+8%', 
      changeType: 'positive',
      icon: <BuildingIcon />,
      description: '空室率 12%'
    },
    { 
      label: '今月契約', 
      value: '34', 
      change: '+25%', 
      changeType: 'positive',
      icon: <ContractIcon />,
      description: '契約率 78%'
    },
    { 
      label: '売上', 
      value: '¥2.4M', 
      change: '+18%', 
      changeType: 'positive',
      icon: <ChartIcon />,
      description: '目標達成率 105%'
    }
  ]

  const recentActivities = [
    { id: 1, type: 'contract', message: '新規契約: 渋谷区マンション 3LDK', time: '2時間前', icon: <ContractIcon /> },
    { id: 2, type: 'customer', message: '新規顧客登録: 田中様', time: '4時間前', icon: <UsersIcon /> },
    { id: 3, type: 'property', message: '物件追加: 新宿区オフィスビル', time: '6時間前', icon: <BuildingIcon /> },
    { id: 4, type: 'contract', message: '契約更新: 港区マンション 2LDK', time: '1日前', icon: <ContractIcon /> },
    { id: 5, type: 'customer', message: '顧客情報更新: 佐藤様', time: '2日前', icon: <UsersIcon /> }
  ]

  // 顧客データ
  const customers = [
    { id: 1, name: '田中太郎', email: 'tanaka@example.com', phone: '090-1234-5678', status: 'active', lastContact: '2024-01-15', property: '渋谷区マンション 3LDK' },
    { id: 2, name: '佐藤花子', email: 'sato@example.com', phone: '090-2345-6789', status: 'active', lastContact: '2024-01-14', property: '港区マンション 2LDK' },
    { id: 3, name: '鈴木一郎', email: 'suzuki@example.com', phone: '090-3456-7890', status: 'prospect', lastContact: '2024-01-13', property: null },
    { id: 4, name: '高橋美咲', email: 'takahashi@example.com', phone: '090-4567-8901', status: 'active', lastContact: '2024-01-12', property: '新宿区オフィスビル' },
    { id: 5, name: '山田次郎', email: 'yamada@example.com', phone: '090-5678-9012', status: 'inactive', lastContact: '2024-01-10', property: null }
  ]

  // 物件データ
  const properties = [
    { id: 1, name: '渋谷区マンション 3LDK', address: '東京都渋谷区渋谷1-1-1', price: '¥180,000/月', area: '85㎡', rooms: '3LDK', status: 'occupied', tenant: '田中太郎' },
    { id: 2, name: '港区マンション 2LDK', address: '東京都港区六本木2-2-2', price: '¥220,000/月', area: '65㎡', rooms: '2LDK', status: 'occupied', tenant: '佐藤花子' },
    { id: 3, name: '新宿区オフィスビル', address: '東京都新宿区新宿3-3-3', price: '¥350,000/月', area: '120㎡', rooms: 'オフィス', status: 'occupied', tenant: '高橋美咲' },
    { id: 4, name: '品川区マンション 1LDK', address: '東京都品川区品川4-4-4', price: '¥150,000/月', area: '45㎡', rooms: '1LDK', status: 'vacant', tenant: null },
    { id: 5, name: '世田谷区戸建て', address: '東京都世田谷区世田谷5-5-5', price: '¥450,000/月', area: '180㎡', rooms: '4LDK', status: 'vacant', tenant: null }
  ]

  // 契約データ
  const contracts = [
    { id: 1, customer: '田中太郎', property: '渋谷区マンション 3LDK', startDate: '2024-01-01', endDate: '2024-12-31', rent: '¥180,000', status: 'active', deposit: '¥360,000' },
    { id: 2, customer: '佐藤花子', property: '港区マンション 2LDK', startDate: '2024-01-15', endDate: '2025-01-14', rent: '¥220,000', status: 'active', deposit: '¥440,000' },
    { id: 3, customer: '高橋美咲', property: '新宿区オフィスビル', startDate: '2024-02-01', endDate: '2025-01-31', rent: '¥350,000', status: 'pending', deposit: '¥700,000' },
    { id: 4, customer: '山田次郎', property: '品川区マンション 1LDK', startDate: '2023-06-01', endDate: '2024-05-31', rent: '¥150,000', status: 'expired', deposit: '¥300,000' }
  ]

  // 売上データ
  const salesData = [
    { month: '1月', revenue: 2400000, contracts: 12 },
    { month: '2月', revenue: 2800000, contracts: 15 },
    { month: '3月', revenue: 3200000, contracts: 18 },
    { month: '4月', revenue: 2900000, contracts: 14 },
    { month: '5月', revenue: 3500000, contracts: 20 },
    { month: '6月', revenue: 3100000, contracts: 16 }
  ]

  if (isAuthenticated) {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-100 to-blue-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 背景アニメーション */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 opacity-30"
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, 120, 240, 360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full blur-3xl"></div>
          </motion.div>
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-80 h-80 opacity-25"
            animate={{
              scale: [1.2, 1, 1.2],
              rotate: [360, 240, 120, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-sky-400/25 to-cyan-500/25 rounded-full blur-3xl"></div>
          </motion.div>
        </div>

        <div className="flex relative z-10">
          {/* サイドバー */}
          <motion.div 
            className="w-72 bg-white/20 backdrop-blur-xl border-r border-cyan-200/30 shadow-2xl"
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="p-8">
              <motion.div
                className="flex items-center space-x-3"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">諸</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800">諸葛商事CRM</h1>
                  <p className="text-slate-600 text-sm">不動産管理システム</p>
                </div>
              </motion.div>
            </div>
            
            <nav className="px-6">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${
                    currentPage === item.id 
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' 
                      : 'text-slate-700 hover:bg-cyan-50 hover:text-cyan-700'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-current">{item.icon}</span>
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              ))}
            </nav>

            <div className="absolute bottom-6 left-6 right-6">
              <motion.button
                onClick={handleLogout}
                className="w-full bg-gradient-to-r from-red-400 to-pink-500 text-white py-3 px-4 rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogoutIcon />
                <span>ログアウト</span>
              </motion.button>
            </div>
          </motion.div>
          
          {/* メインコンテンツ */}
          <div className="flex-1 p-8">
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-3xl font-bold text-slate-800 mb-2">
                {menuItems.find(item => item.id === currentPage)?.label || 'ダッシュボード'}
              </h2>
              <p className="text-slate-600">諸葛商事CRMシステムへようこそ</p>
            </motion.div>
            
            <AnimatePresence mode="wait">
              {currentPage === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                      <motion.div
                        key={stat.label}
                        className="bg-white/60 backdrop-blur-xl border border-cyan-200/50 rounded-2xl p-6 shadow-xl hover:shadow-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        style={{ transformStyle: 'preserve-3d' }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                            <span className="text-white">{stat.icon}</span>
                          </div>
                          <div className="text-right">
                            <span className={`text-sm font-medium ${
                              stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {stat.change}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-slate-600 text-sm font-medium mb-1">{stat.label}</h3>
                        <p className="text-slate-800 text-2xl font-bold mb-1">{stat.value}</p>
                        <p className="text-slate-500 text-xs">{stat.description}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* グラフエリア */}
                    <motion.div
                      className="bg-white/60 backdrop-blur-xl border border-cyan-200/50 rounded-2xl p-8 shadow-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                    >
                      <h3 className="text-slate-800 text-xl font-bold mb-6 flex items-center">
                        <ChartIcon />
                        <span className="ml-2">売上トレンド</span>
                      </h3>
                      <div className="h-64 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-xl flex items-center justify-center border border-cyan-200/50">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <ChartIcon />
                          </div>
                          <p className="text-slate-600 font-medium">グラフコンポーネント</p>
                          <p className="text-slate-500 text-sm">（実装予定）</p>
                        </div>
                      </div>
                    </motion.div>

                    {/* 最近のアクティビティ */}
                    <motion.div
                      className="bg-white/60 backdrop-blur-xl border border-cyan-200/50 rounded-2xl p-8 shadow-xl"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.1 }}
                    >
                      <h3 className="text-slate-800 text-xl font-bold mb-6 flex items-center">
                        <UsersIcon />
                        <span className="ml-2">最近のアクティビティ</span>
                      </h3>
                      <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                          <motion.div
                            key={activity.id}
                            className="flex items-center space-x-3 p-3 rounded-xl hover:bg-cyan-50/50 transition-colors"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 1.2 + index * 0.1 }}
                          >
                            <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm">{activity.icon}</span>
                            </div>
                            <div className="flex-1">
                              <p className="text-slate-700 text-sm font-medium">{activity.message}</p>
                              <p className="text-slate-500 text-xs">{activity.time}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {currentPage === 'customers' && (
                <motion.div
                  key="customers"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white/60 backdrop-blur-xl border border-cyan-200/50 rounded-2xl p-8 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-slate-800 text-xl font-bold flex items-center">
                        <UsersIcon />
                        <span className="ml-2">顧客管理</span>
                      </h3>
                      <motion.button
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        新規顧客追加
                      </motion.button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {customers.map((customer, index) => (
                        <motion.div
                          key={customer.id}
                          className="bg-white/80 border border-cyan-200/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-semibold text-slate-800">{customer.name}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              customer.status === 'active' ? 'bg-green-100 text-green-800' :
                              customer.status === 'prospect' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {customer.status === 'active' ? 'アクティブ' :
                               customer.status === 'prospect' ? '見込み' : '非アクティブ'}
                            </span>
                          </div>
                          <div className="space-y-2 text-sm text-slate-600">
                            <p>📧 {customer.email}</p>
                            <p>📱 {customer.phone}</p>
                            <p>📅 最終連絡: {customer.lastContact}</p>
                            {customer.property && <p>🏠 {customer.property}</p>}
                          </div>
                          <div className="flex space-x-2 mt-4">
                            <motion.button
                              className="flex-1 bg-cyan-50 text-cyan-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-cyan-100 transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              詳細
                            </motion.button>
                            <motion.button
                              className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              編集
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentPage === 'properties' && (
                <motion.div
                  key="properties"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white/60 backdrop-blur-xl border border-cyan-200/50 rounded-2xl p-8 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-slate-800 text-xl font-bold flex items-center">
                        <BuildingIcon />
                        <span className="ml-2">物件管理</span>
                      </h3>
                      <motion.button
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        新規物件追加
                      </motion.button>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {properties.map((property, index) => (
                        <motion.div
                          key={property.id}
                          className="bg-white/80 border border-cyan-200/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="font-semibold text-slate-800 text-lg">{property.name}</h4>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              property.status === 'occupied' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {property.status === 'occupied' ? '入居中' : '空室'}
                            </span>
                          </div>
                          
                          <div className="space-y-3 text-sm text-slate-600 mb-4">
                            <p>📍 {property.address}</p>
                            <div className="flex justify-between">
                              <span>💰 {property.price}</span>
                              <span>📐 {property.area}</span>
                            </div>
                            <p>🏠 {property.rooms}</p>
                            {property.tenant && (
                              <p className="text-cyan-700 font-medium">👤 入居者: {property.tenant}</p>
                            )}
                          </div>
                          
                          <div className="flex space-x-2">
                            <motion.button
                              className="flex-1 bg-cyan-50 text-cyan-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-cyan-100 transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              詳細
                            </motion.button>
                            <motion.button
                              className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              編集
                            </motion.button>
                            <motion.button
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                property.status === 'occupied' 
                                  ? 'bg-red-50 text-red-700 hover:bg-red-100' 
                                  : 'bg-green-50 text-green-700 hover:bg-green-100'
                              }`}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              {property.status === 'occupied' ? '退去' : '入居'}
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentPage === 'contracts' && (
                <motion.div
                  key="contracts"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white/60 backdrop-blur-xl border border-cyan-200/50 rounded-2xl p-8 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-slate-800 text-xl font-bold flex items-center">
                        <ContractIcon />
                        <span className="ml-2">契約管理</span>
                      </h3>
                      <motion.button
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        新規契約作成
                      </motion.button>
                    </div>
                    
                    <div className="space-y-4">
                      {contracts.map((contract, index) => (
                        <motion.div
                          key={contract.id}
                          className="bg-white/80 border border-cyan-200/50 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01 }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
                                <ContractIcon />
                              </div>
                              <div>
                                <h4 className="font-semibold text-slate-800">{contract.customer}</h4>
                                <p className="text-sm text-slate-600">{contract.property}</p>
                              </div>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              contract.status === 'active' ? 'bg-green-100 text-green-800' :
                              contract.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {contract.status === 'active' ? 'アクティブ' :
                               contract.status === 'pending' ? '承認待ち' : '期限切れ'}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center">
                              <p className="text-xs text-slate-500 mb-1">開始日</p>
                              <p className="font-medium text-slate-800">{contract.startDate}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-slate-500 mb-1">終了日</p>
                              <p className="font-medium text-slate-800">{contract.endDate}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-slate-500 mb-1">家賃</p>
                              <p className="font-medium text-slate-800">{contract.rent}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-xs text-slate-500 mb-1">敷金</p>
                              <p className="font-medium text-slate-800">{contract.deposit}</p>
                            </div>
                          </div>
                          
                          <div className="flex space-x-2">
                            <motion.button
                              className="flex-1 bg-cyan-50 text-cyan-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-cyan-100 transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              詳細
                            </motion.button>
                            <motion.button
                              className="flex-1 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              編集
                            </motion.button>
                            <motion.button
                              className="px-3 py-2 rounded-lg text-sm font-medium bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              契約書
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentPage === 'reports' && (
                <motion.div
                  key="reports"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white/60 backdrop-blur-xl border border-cyan-200/50 rounded-2xl p-8 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-slate-800 text-xl font-bold flex items-center">
                        <ChartIcon />
                        <span className="ml-2">レポート</span>
                      </h3>
                      <div className="flex space-x-2">
                        <motion.button
                          className="bg-cyan-50 text-cyan-700 px-4 py-2 rounded-xl font-medium hover:bg-cyan-100 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          エクスポート
                        </motion.button>
                        <motion.button
                          className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          印刷
                        </motion.button>
                      </div>
                    </div>
                    
                    {/* 売上グラフ */}
                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-slate-800 mb-4">月次売上レポート</h4>
                      <div className="bg-white/80 border border-cyan-200/50 rounded-xl p-6">
                        <div className="grid grid-cols-6 gap-4">
                          {salesData.map((data, index) => (
                            <motion.div
                              key={data.month}
                              className="text-center"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg p-3 mb-2">
                                <p className="text-white text-sm font-medium">{data.month}</p>
                                <p className="text-white text-xs">¥{(data.revenue / 1000000).toFixed(1)}M</p>
                              </div>
                              <p className="text-xs text-slate-600">{data.contracts}件</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 統計サマリー */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <motion.div
                        className="bg-white/80 border border-cyan-200/50 rounded-xl p-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h5 className="font-semibold text-slate-800 mb-3">収益性分析</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">月平均売上</span>
                            <span className="font-medium">¥2.98M</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">平均契約額</span>
                            <span className="font-medium">¥225K</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">利益率</span>
                            <span className="font-medium text-green-600">78%</span>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="bg-white/80 border border-cyan-200/50 rounded-xl p-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h5 className="font-semibold text-slate-800 mb-3">物件分析</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">入居率</span>
                            <span className="font-medium">88%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">空室率</span>
                            <span className="font-medium text-yellow-600">12%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">平均賃料</span>
                            <span className="font-medium">¥225K</span>
                          </div>
                        </div>
                      </motion.div>

                      <motion.div
                        className="bg-white/80 border border-cyan-200/50 rounded-xl p-6"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h5 className="font-semibold text-slate-800 mb-3">顧客分析</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">アクティブ顧客</span>
                            <span className="font-medium">89%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">新規獲得率</span>
                            <span className="font-medium text-green-600">+15%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">顧客満足度</span>
                            <span className="font-medium">4.8/5</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* 今後の予測 */}
                    <motion.div
                      className="bg-white/80 border border-cyan-200/50 rounded-xl p-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <h5 className="font-semibold text-slate-800 mb-4">今後の予測</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-slate-600 mb-2">来月の売上予測</p>
                          <p className="text-2xl font-bold text-slate-800">¥3.2M</p>
                          <p className="text-sm text-green-600">+8% 増加予測</p>
                        </div>
                        <div>
                          <p className="text-sm text-slate-600 mb-2">推奨アクション</p>
                          <div className="space-y-1">
                            <p className="text-sm text-slate-700">• 空室物件の営業強化</p>
                            <p className="text-sm text-slate-700">• 既存顧客の更新促進</p>
                            <p className="text-sm text-slate-700">• 新規物件の追加検討</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {currentPage === 'settings' && (
                <motion.div
                  key="settings"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-white/60 backdrop-blur-xl border border-cyan-200/50 rounded-2xl p-8 shadow-xl">
                    <h3 className="text-slate-800 text-xl font-bold mb-8 flex items-center">
                      <SettingsIcon />
                      <span className="ml-2">設定</span>
                    </h3>
                    
                    <div className="space-y-8">
                      {/* 会社情報 */}
                      <motion.div
                        className="bg-white/80 border border-cyan-200/50 rounded-xl p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h4 className="font-semibold text-slate-800 mb-4">会社情報</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">会社名</label>
                            <input 
                              type="text" 
                              defaultValue="諸葛商事株式会社"
                              className="w-full px-3 py-2 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">代表者名</label>
                            <input 
                              type="text" 
                              defaultValue="諸葛 亮"
                              className="w-full px-3 py-2 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">電話番号</label>
                            <input 
                              type="tel" 
                              defaultValue="03-1234-5678"
                              className="w-full px-3 py-2 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">メールアドレス</label>
                            <input 
                              type="email" 
                              defaultValue="info@zhuge-shouji.co.jp"
                              className="w-full px-3 py-2 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-2">住所</label>
                            <input 
                              type="text" 
                              defaultValue="東京都港区六本木1-1-1 六本木ヒルズ 10階"
                              className="w-full px-3 py-2 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </motion.div>

                      {/* システム設定 */}
                      <motion.div
                        className="bg-white/80 border border-cyan-200/50 rounded-xl p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h4 className="font-semibold text-slate-800 mb-4">システム設定</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-slate-800">メール通知</p>
                              <p className="text-sm text-slate-600">新しい契約や更新の通知を受け取る</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" defaultChecked className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-slate-800">自動バックアップ</p>
                              <p className="text-sm text-slate-600">毎日のデータバックアップを自動実行</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" defaultChecked className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                            </label>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-slate-800">ダークモード</p>
                              <p className="text-sm text-slate-600">画面を暗いテーマに切り替える</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input type="checkbox" className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                            </label>
                          </div>
                        </div>
                      </motion.div>

                      {/* ユーザー管理 */}
                      <motion.div
                        className="bg-white/80 border border-cyan-200/50 rounded-xl p-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-semibold text-slate-800">ユーザー管理</h4>
                          <motion.button
                            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            新規ユーザー追加
                          </motion.button>
                        </div>
                        <div className="space-y-3">
                          {[
                            { name: '諸葛 亮', role: '管理者', email: 'admin@zhuge-shouji.co.jp', status: 'アクティブ' },
                            { name: '関羽 雲長', role: '営業', email: 'kangyo@zhuge-shouji.co.jp', status: 'アクティブ' },
                            { name: '張飛 翼徳', role: '物件管理', email: 'chouhi@zhuge-shouji.co.jp', status: 'アクティブ' }
                          ].map((user, index) => (
                            <motion.div
                              key={index}
                              className="flex items-center justify-between p-3 bg-cyan-50/50 rounded-lg"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.4 + index * 0.1 }}
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                                  <span className="text-white font-medium text-sm">{user.name.split(' ')[0].charAt(0)}</span>
                                </div>
                                <div>
                                  <p className="font-medium text-slate-800">{user.name}</p>
                                  <p className="text-sm text-slate-600">{user.role} • {user.email}</p>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">{user.status}</span>
                                <motion.button
                                  className="text-slate-600 hover:text-slate-800 transition-colors"
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                >
                                  <SettingsIcon />
                                </motion.button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* 保存ボタン */}
                      <motion.div
                        className="flex justify-end space-x-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <motion.button
                          className="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          キャンセル
                        </motion.button>
                        <motion.button
                          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          設定を保存
                        </motion.button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 成功メッセージ */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="fixed top-6 right-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-xl shadow-xl z-50"
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 100, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">🎉</span>
                <span className="font-medium">ログイン成功！</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-sky-100 to-blue-200 flex items-center justify-center p-8 relative overflow-hidden">
      {/* 背景アニメーション */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-sky-400/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div 
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl mb-6 shadow-2xl"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-white font-bold text-3xl">諸</span>
          </motion.div>
          <motion.h1 
            className="text-4xl font-bold text-slate-800 mb-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            諸葛商事CRM
          </motion.h1>
          <motion.p 
            className="text-slate-600 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            顧客・物件・契約を一元管理
          </motion.p>
        </motion.div>

        <motion.div
          className="bg-white/60 backdrop-blur-xl border border-cyan-200/50 rounded-2xl shadow-2xl p-8"
          initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          whileHover={{ scale: 1.02 }}
        >
          <motion.h2 
            className="text-2xl font-bold text-slate-800 mb-8 text-center flex items-center justify-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <LoginIcon />
            <span className="ml-2">ログイン</span>
          </motion.h2>
          
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-slate-700 mb-3">メールアドレス</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/80 border border-cyan-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300" 
                placeholder="メールアドレスを入力"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <label className="block text-sm font-medium text-slate-700 mb-3">パスワード</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/80 border border-cyan-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300" 
                placeholder="パスワードを入力"
              />
            </motion.div>
            
            <motion.button 
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <motion.div
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>ログイン中...</span>
                </div>
              ) : (
                'ログイン'
              )}
            </motion.button>
          </div>
          
          <motion.div 
            className="mt-8 p-6 bg-gradient-to-r from-cyan-100/80 to-blue-100/80 border border-cyan-300/50 rounded-xl backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <h3 className="text-sm font-medium text-slate-700 mb-3 flex items-center">
              <span className="mr-2">🔑</span>
              デモアカウント
            </h3>
            <div className="text-sm text-slate-600 space-y-1">
              <p><strong>メール:</strong> admin@example.com</p>
              <p><strong>パスワード:</strong> password</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default App
