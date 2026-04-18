import { Routes, Route } from "react-router-dom"
import { createContext, useContext, useState, useEffect } from 'react'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth } from './config/firebase'
import Login from "./pages/Login"
import SignUp from './pages/SignUp'
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

  async function handleLogOut() {
      try {
        await signOut(auth)
        setUser(null)
        window.alert("User signed out successfully.")
      } catch (error) {
        console.error("Error signing out:", error)
      }
    }
  
    return (
      <AuthContext.Provider value={{ user, logout: handleLogOut }}>
        <Routes>
          <Route path="/" element={user ? <Chat /> : <SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthContext.Provider>
    )
  
}

export default App
