import '@/styles/globals.css'
import { AuthProvider } from '@/hooks/useAuth'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
