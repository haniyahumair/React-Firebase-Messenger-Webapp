import { createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase'
import Auth from './pages/Auth'
import Chat from './pages/Chat'
import './App.css'

const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return unsubscribe
  }, [])
  
  if (loading) return null
  
  return (
    <AuthContext.Provider value={{ user }}>
      {user ? <Chat /> : <Auth />}
    </AuthContext.Provider>
  )
  
}

export default App
