import React, { useState } from 'react'
import { motion } from 'framer-motion'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  if (isLoggedIn) {
    return (
      <motion.div 
        className="min-h-screen bg-gray-50 p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            className="text-4xl font-bold text-gray-900 mb-8 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            諸葛商事CRMダッシュボード
          </motion.h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: '顧客管理', count: '125', color: 'bg-blue-500' },
              { title: '物件管理', count: '89', color: 'bg-green-500' },
              { title: '契約管理', count: '34', color: 'bg-purple-500' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                className="bg-white rounded-lg shadow-md p-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4`}>
                  <span className="text-white font-bold text-xl">{item.count}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600">管理中の{item.title.toLowerCase()}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <button 
              onClick={() => setIsLoggedIn(false)}
              className="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition-colors"
            >
              ログアウト
            </button>
          </motion.div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
      <motion.div 
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <span className="text-white font-bold text-2xl">諸</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">諸葛商事CRM</h1>
          <p className="text-gray-600">顧客・物件・契約を一元管理</p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl shadow-lg p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">ログイン</h2>
          <form className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">メールアドレス</label>
              <input 
                type="email" 
                defaultValue="admin@example.com" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <label className="block text-sm font-medium text-gray-700 mb-2">パスワード</label>
              <input 
                type="password" 
                defaultValue="password" 
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <button 
                type="button" 
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                ログイン
              </button>
            </motion.div>
          </form>
          
          <motion.div
            className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <h3 className="text-sm font-medium text-blue-900 mb-2">デモアカウント</h3>
            <div className="text-sm text-blue-700 space-y-1">
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
