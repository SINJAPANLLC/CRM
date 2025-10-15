import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuthStore } from './stores/authStore'
import { useDataStore } from './stores/dataStore'
import LoginPage from './pages/LoginPage'

function App() {
  const { isAuthenticated } = useAuthStore()
  const { updateDashboardStats } = useDataStore()

  useEffect(() => {
    if (isAuthenticated) {
      updateDashboardStats()
    }
  }, [isAuthenticated, updateDashboardStats])

  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        {!isAuthenticated ? (
          <Route path="*" element={<LoginPage />} />
        ) : (
          <Route path="*" element={
            <motion.div 
              className="p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-4">諸葛商事CRM</h1>
              <p className="text-gray-600 mb-6">ログイン成功！ダッシュボードが表示されます。</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <motion.div
                  className="bg-white rounded-lg shadow-md p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">顧客管理</h3>
                  <p className="text-gray-600">顧客情報の管理</p>
                </motion.div>
                
                <motion.div
                  className="bg-white rounded-lg shadow-md p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">物件管理</h3>
                  <p className="text-gray-600">物件情報の管理</p>
                </motion.div>
                
                <motion.div
                  className="bg-white rounded-lg shadow-md p-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">契約管理</h3>
                  <p className="text-gray-600">契約情報の管理</p>
                </motion.div>
              </div>
              
              <motion.button 
                onClick={() => useAuthStore.getState().logout()}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ログアウト
              </motion.button>
            </motion.div>
          } />
        )}
      </Routes>
    </div>
  )
}

export default App
