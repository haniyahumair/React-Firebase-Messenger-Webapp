import { Link } from "react-router-dom"
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useState, useEffect } from "react"
import { useAuth } from "../App"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const { user } = useAuth()

  const getEmail = (e) => setEmail(e.target.value)
  const getPassword = (e) => setPassword(e.target.value)

  async function handleSignIn() {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (error) {
      console.error("Error signing in:", error)
    }
  }

  async function signInWithGoogle() {
    try {
      setLoading(true)
      const cred = await signInWithPopup(auth, googleProvider)
    } catch (error) {
      console.error("Error signing in with Google:", error)
    }
  }

  return (
    <div>
      <h1>Sign Up / Sign In</h1>
      <div className="signup-form">
        <input
          type="email"
          name="email-address"
          placeholder="john.smith1@gmail.com"
          value={email}
          onChange={getEmail}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={getPassword}
        />
        <div className="signup-buttons">
          <button onClick={handleSignIn}>Sign Up (email)</button>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
        <p className='link-to-login'>Already registered? 
          <Link to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  )
}