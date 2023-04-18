import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'


const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // { id, email, name, role }
  const [status, setStatus] = useState('unauthenticated') // 'unauthenticated',  'authenticated'
  const router = useRouter()

  useEffect(() => {
  }, [])

  const login = async (email, password) => {
  }

  const logout = async () => {

  }

  const value = {
    user,
    status,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}