import { auth, googleProvider } from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { useState, useEffect } from "react"
import { useAuth } from "../App"

export default function Auth() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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

  async function handleLogOut() {
    try {
      await signOut(auth)
      setUser(null)
      window.alert("User signed out successfully.")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

//   console.log("Current user:", user ?"logged in" :"none")

  return (
    <div>
      {!user && (
        <div className="signup-form">
          <h1>Sign Up / Sign In</h1>
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

          <button onClick={handleSignIn}>Sign Up (email)</button>
          <button onClick={signInWithGoogle}>Sign in with Google</button>
        </div>
      )}

      <div className="login-form">
        <h1>Login Form</h1>
        <h4>Already a user? Login now!</h4>

         <input type="email" name="login-email" placeholder="john.smith1@gmail.com" />
      </div>
    </div>
  )
}