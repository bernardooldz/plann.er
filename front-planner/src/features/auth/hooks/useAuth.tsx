import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { api } from '../../../shared/utils/api'
import { authService } from '../services/auth.service'
import type { User } from '../types'

interface AuthContextData {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>
  updateProfile: (data: { name?: string; email?: string; currentPassword?: string; newPassword?: string }) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = localStorage.getItem('@planner:token')
    
    if (storedToken) {
      setToken(storedToken)
      api.defaults.headers.authorization = `Bearer ${storedToken}`
      
      authService.getMe()
        .then(response => setUser(response.user))
        .catch(() => {
          localStorage.removeItem('@planner:token')
          setToken(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const response = await authService.login({ email, password })
    const { user, token } = response
    
    setUser(user)
    setToken(token)
    localStorage.setItem('@planner:token', token)
    api.defaults.headers.authorization = `Bearer ${token}`
  }

  const register = async (name: string, email: string, password: string, confirmPassword: string) => {
    const response = await authService.register({ name, email, password, confirmPassword })
    const { user, token } = response
    
    setUser(user)
    setToken(token)
    localStorage.setItem('@planner:token', token)
    api.defaults.headers.authorization = `Bearer ${token}`
  }

  const updateProfile = async (data: { name?: string; email?: string; currentPassword?: string; newPassword?: string }) => {
    const response = await authService.updateProfile(data)
    setUser(response.user)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('@planner:token')
    delete api.defaults.headers.authorization
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, updateProfile, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)