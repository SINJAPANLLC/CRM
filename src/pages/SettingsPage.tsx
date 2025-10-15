import React, { useState } from 'react'
import { motion } from 'framer-motion'
import {
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Mail,
  Phone,
  MapPin,
  Save,
  Eye,
  EyeOff,
  Upload
} from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'

const SettingsPage: React.FC = () => {
  const { user, updateUser } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'security' | 'appearance' | 'company'>('profile')
  // const [showPassword, setShowPassword] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    role: user?.role || 'admin'
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    contractUpdates: true,
    customerUpdates: true,
    propertyUpdates: true,
    systemAlerts: true
  })

  const [companyData, setCompanyData] = useState({
    name: '諸葛商事株式会社',
    address: '東京都渋谷区恵比寿1-1-1',
    phone: '03-1234-5678',
    email: 'info@shokatsu-shoji.com',
    website: 'https://shokatsu-shoji.com',
    license: '国土交通大臣免許（1）123456'
  })

  const tabs = [
    { id: 'profile', label: 'プロフィール', icon: User },
    { id: 'notifications', label: '通知設定', icon: Bell },
    { id: 'security', label: 'セキュリティ', icon: Shield },
    { id: 'appearance', label: '外観', icon: Palette },
    { id: 'company', label: '会社情報', icon: Database },
  ]

  const handleSaveProfile = () => {
    updateUser(profileData)
    // 実際のアプリケーションではAPIを呼び出します
    console.log('Profile saved:', profileData)
  }

  const handleSaveNotifications = () => {
    // 実際のアプリケーションではAPIを呼び出します
    console.log('Notification settings saved:', notificationSettings)
  }

  const handleSaveCompany = () => {
    // 実際のアプリケーションではAPIを呼び出します
    console.log('Company data saved:', companyData)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900">設定</h1>
        <p className="text-gray-600 mt-2">
          アカウントとシステムの設定を管理します
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-50 text-primary-700 border-r-2 border-primary-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className={`mr-3 h-5 w-5 ${activeTab === tab.id ? 'text-primary-600' : 'text-gray-400'}`} />
                      {tab.label}
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </motion.div>

        {/* Content */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <Card>
              <CardHeader>
                <CardTitle>プロフィール設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center space-x-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
                    <User className="h-10 w-10 text-primary-600" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      画像をアップロード
                    </Button>
                    <p className="text-sm text-gray-500 mt-1">
                      JPG, PNG形式、最大2MB
                    </p>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="名前"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    icon={<User className="h-4 w-4" />}
                  />
                  <Input
                    label="メールアドレス"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    icon={<Mail className="h-4 w-4" />}
                  />
                  <Input
                    label="電話番号"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    icon={<Phone className="h-4 w-4" />}
                  />
                  <Input
                    label="住所"
                    value={profileData.address}
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                    icon={<MapPin className="h-4 w-4" />}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-700">役職</p>
                    <Badge variant="secondary" className="mt-1">
                      {profileData.role === 'admin' ? '管理者' : 
                       profileData.role === 'manager' ? 'マネージャー' : 'エージェント'}
                    </Badge>
                  </div>
                  <Button onClick={handleSaveProfile}>
                    <Save className="mr-2 h-4 w-4" />
                    保存
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <Card>
              <CardHeader>
                <CardTitle>通知設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">メール通知</p>
                      <p className="text-sm text-gray-500">重要な更新をメールで受信</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        emailNotifications: e.target.checked
                      })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">プッシュ通知</p>
                      <p className="text-sm text-gray-500">ブラウザからの通知を許可</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.pushNotifications}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        pushNotifications: e.target.checked
                      })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS通知</p>
                      <p className="text-sm text-gray-500">緊急の通知をSMSで受信</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.smsNotifications}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        smsNotifications: e.target.checked
                      })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>

                  <hr className="my-4" />

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">契約更新通知</p>
                      <p className="text-sm text-gray-500">契約の更新や変更を通知</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.contractUpdates}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        contractUpdates: e.target.checked
                      })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">顧客更新通知</p>
                      <p className="text-sm text-gray-500">顧客情報の変更を通知</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.customerUpdates}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        customerUpdates: e.target.checked
                      })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">物件更新通知</p>
                      <p className="text-sm text-gray-500">物件情報の変更を通知</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.propertyUpdates}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        propertyUpdates: e.target.checked
                      })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">システムアラート</p>
                      <p className="text-sm text-gray-500">システムの重要な通知</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notificationSettings.systemAlerts}
                      onChange={(e) => setNotificationSettings({
                        ...notificationSettings,
                        systemAlerts: e.target.checked
                      })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveNotifications}>
                    <Save className="mr-2 h-4 w-4" />
                    保存
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <Card>
              <CardHeader>
                <CardTitle>セキュリティ設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Input
                    label="現在のパスワード"
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder="現在のパスワードを入力"
                    icon={<Shield className="h-4 w-4" />}
                    suffix={
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    }
                  />
                  <Input
                    label="新しいパスワード"
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="新しいパスワードを入力"
                    icon={<Shield className="h-4 w-4" />}
                    suffix={
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    }
                  />
                  <Input
                    label="パスワード確認"
                    type="showNewPassword ? 'text' : 'password'"
                    placeholder="新しいパスワードを再入力"
                    icon={<Shield className="h-4 w-4" />}
                  />
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">パスワードの要件</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• 最低8文字以上</li>
                    <li>• 大文字と小文字を含む</li>
                    <li>• 数字を含む</li>
                    <li>• 特殊文字を含む</li>
                  </ul>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    パスワードを更新
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <Card>
              <CardHeader>
                <CardTitle>外観設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <p className="font-medium mb-3">テーマ</p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border-2 border-primary-500 rounded-lg p-4 text-center cursor-pointer">
                        <div className="w-full h-8 bg-gray-100 rounded mb-2"></div>
                        <p className="text-sm font-medium">ライト</p>
                      </div>
                      <div className="border-2 border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400">
                        <div className="w-full h-8 bg-gray-800 rounded mb-2"></div>
                        <p className="text-sm font-medium">ダーク</p>
                      </div>
                      <div className="border-2 border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400">
                        <div className="w-full h-8 bg-gradient-to-r from-gray-100 to-gray-800 rounded mb-2"></div>
                        <p className="text-sm font-medium">自動</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="font-medium mb-3">言語</p>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="ja">日本語</option>
                      <option value="en">English</option>
                    </select>
                  </div>

                  <div>
                    <p className="font-medium mb-3">タイムゾーン</p>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500">
                      <option value="Asia/Tokyo">Asia/Tokyo (UTC+9)</option>
                      <option value="UTC">UTC (UTC+0)</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="mr-2 h-4 w-4" />
                    保存
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Company Tab */}
          {activeTab === 'company' && (
            <Card>
              <CardHeader>
                <CardTitle>会社情報</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="会社名"
                    value={companyData.name}
                    onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                    icon={<Database className="h-4 w-4" />}
                  />
                  <Input
                    label="電話番号"
                    value={companyData.phone}
                    onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                    icon={<Phone className="h-4 w-4" />}
                  />
                  <Input
                    label="メールアドレス"
                    type="email"
                    value={companyData.email}
                    onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                    icon={<Mail className="h-4 w-4" />}
                  />
                  <Input
                    label="ウェブサイト"
                    value={companyData.website}
                    onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                    icon={<Database className="h-4 w-4" />}
                  />
                </div>

                <Input
                  label="住所"
                  value={companyData.address}
                  onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}
                  icon={<MapPin className="h-4 w-4" />}
                />

                <Input
                  label="免許番号"
                  value={companyData.license}
                  onChange={(e) => setCompanyData({ ...companyData, license: e.target.value })}
                  icon={<Shield className="h-4 w-4" />}
                />

                <div className="flex justify-end">
                  <Button onClick={handleSaveCompany}>
                    <Save className="mr-2 h-4 w-4" />
                    保存
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default SettingsPage
