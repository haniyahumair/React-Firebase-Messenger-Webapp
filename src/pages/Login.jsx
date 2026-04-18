import { Link, useNavigate } from 'react-router-dom'
import { auth, googleProvider } from '../config/firebase'
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useState, useEffect } from "react"
import { useAuth } from "../App"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const { user } = useAuth()
    const navigate = useNavigate()

    const getEmail = (e) => setEmail(e.target.value)
    const getPassword = (e) => setPassword(e.target.value)

    async function handleLogin() {
      try {
        setLoading(true)
        const cred = await signInWithEmailAndPassword(auth, email, password)
        console.log("User signed in:", cred.user)
        window.alert("Login successful!")
        navigate("/") 
      } catch (error) {
        console.error("Error signing in:", error)
        throw error
      } finally {
        setLoading(false)
      }
    }

    async function logInWithGoogle() {
        try {
          setLoading(true)
          const cred = await signInWithPopup(auth, googleProvider)
        } catch (error) {
          console.error("Error signing in with Google:", error)
        }
      }

    return (
        <div>
            <h1>Login Page</h1>
            <div className="login-form">
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
            </div>
            <div className="signup-buttons">
                <button onClick={handleLogin}>Login</button>
                <button onClick={logInWithGoogle}>Sign in with Google</button>
            </div>
            <p className='link-to-sign-up'>Not registered? 
                <Link to="/">Sign Up here!</Link>
            </p>
        </div>
    )
}