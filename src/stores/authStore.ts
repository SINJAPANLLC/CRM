import { create } from 'zustand'
import { User } from '../types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  hasHydrated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (user: Partial<User>) => void
  setHasHydrated: (hasHydrated: boolean) => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  hasHydrated: true,

  setHasHydrated: (hasHydrated: boolean) => {
    set({ hasHydrated })
  },

  login: async (email: string, password: string) => {
    try {
      // 実際のアプリケーションでは、ここでAPIを呼び出します
      // デモ用のモックログイン
      if (email === 'admin@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          name: '管理者',
          email: 'admin@example.com',
          role: 'admin',
          createdAt: new Date(),
        }
        
        set({ user, isAuthenticated: true })
        return true
      }
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false })
  },

  updateUser: (userData: Partial<User>) => {
    const currentUser = get().user
    if (currentUser) {
      set({ user: { ...currentUser, ...userData } })
    }
  },
}))
