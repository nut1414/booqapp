import { useContext, useState, createContext } from "react";

const GenreContext = createContext()

export function GenreProvider({ children }) {
  const [genre, setGenre] = useState(null) // [{id, name}]
  const [status, setStatus] = useState('loading') // 'loading',  'loaded'
  const router = useRouter()

  useEffect(() => {
  }, [])

  const login = async (email, password) => {
  }

  const logout = async () => {

  }

  const value = {
    genre,
    status,
  }

  return (
    <GenreContext.Provider value={value}>
      {children}
    </GenreContext.Provider>
  )
}

export function useGenre() {
  return useContext(GenreContext)
}