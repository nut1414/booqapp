import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { decode } from 'jsonwebtoken'
import fetch from '@/utils/fetch'


const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // { id, email, name, role }
  const [status, setStatus] = useState('loading') // 'unauthenticated', 'loading',  'authenticated'
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        // console.log(token)
        const decoded = decode(token)
        const checkToken = fetch('/api/auth').then((res) => {
          if (decoded.exp * 1000 < Date.now() || !res.ok) {
            setStatus("unauthenticated");
            localStorage.removeItem("token");
          } else {
            // console.log(decoded)
            setUser(decoded);
            setStatus("authenticated");
            console.log("authenticated");
          }
        })
      } catch (err) {
        setStatus("unauthenticated");
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
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'You have been logged out',
      
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/')
      }
    })
    
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