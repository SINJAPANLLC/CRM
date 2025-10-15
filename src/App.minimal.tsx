import React, { useState } from 'react'
import { motion } from 'framer-motion'

function App() {
  const [showSuccess, setShowSuccess] = useState(false)

  const handleButtonClick = () => {
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <motion.div 
        className="bg-white p-8 rounded-lg shadow-md text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="text-3xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          諸葛商事CRM
        </motion.h1>
        
        <motion.p 
          className="text-gray-600 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          システムが正常に動作しています
        </motion.p>
        
        <motion.button 
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          onClick={handleButtonClick}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          テストボタン
        </motion.button>
        
        <motion.div 
          className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-sm text-green-700">
            ✅ Tailwind CSSが正常に動作しています
          </p>
        </motion.div>

        <motion.div 
          className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <p className="text-sm text-blue-700">
            ✨ Framer Motionアニメーションが動作しています
          </p>
        </motion.div>

        {showSuccess && (
          <motion.div
            className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-md"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm text-yellow-700">
              🎉 ボタンがクリックされました！
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default App
