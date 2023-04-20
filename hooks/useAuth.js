import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { decode } from 'jsonwebtoken'


const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // { id, email, name, role }
  const [status, setStatus] = useState('unauthenticated') // 'unauthenticated',  'authenticated'
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        // console.log(token)
        const decoded = decode(token)
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token')
        } else {
          // console.log(decoded)
          setUser(decoded)
          setStatus('authenticated')
          console.log('authenticated')
        }
      } catch (err) {
        localStorage.removeItem('token')
      }
      
    } else {
      setStatus('unauthenticated')
      setUser(null)
    }
  }, [])

  const login = async (username, password) => {
    const req = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }).then(res => res.json())
    // console.log(email, password)
    if (req.token) {
      localStorage.setItem('token', req.token)
      try {
        const decoded = decode(req.token)
        // console.log(decoded)
        if (decoded.exp * 1000 < Date.now()) {
          localStorage.removeItem('token')
        } else {
          setUser(decoded)
          setStatus('authenticated')
          console.log('authenticated')
        }
      } catch (err) {
        localStorage.removeItem('token')
      }
      router.push('/')
    } else {
      localStorage.removeItem('token')
      setUser(null)
      setStatus('unauthenticated')
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Wrong Username or Password',
      })
    }
  }

  const logout = async () => {
    localStorage.removeItem('token')
    setUser(null)
    setStatus('unauthenticated')
    router.push('/')
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