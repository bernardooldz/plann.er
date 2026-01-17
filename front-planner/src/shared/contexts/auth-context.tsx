import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { api } from '../utils/api'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextData {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>
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
      
      api.get('/auth/me')
        .then(response => setUser(response.data.user))
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
    const response = await api.post('/auth/login', { email, password })
    const { user, token } = response.data
    
    setUser(user)
    setToken(token)
    localStorage.setItem('@planner:token', token)
    api.defaults.headers.authorization = `Bearer ${token}`
  }

  const register = async (name: string, email: string, password: string, confirmPassword: string) => {
    const response = await api.post('/auth/register', { name, email, password, confirmPassword })
    const { user, token } = response.data
    
    setUser(user)
    setToken(token)
    localStorage.setItem('@planner:token', token)
    api.defaults.headers.authorization = `Bearer ${token}`
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('@planner:token')
    delete api.defaults.headers.authorization
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)