import { Link } from "react-router-dom"
import { auth, googleProvider } from '../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth"
import { db } from "../config/firebase"
import { collection, addDoc, getDoc, serverTimestamp } from "firebase/firestore"
import { useState, useEffect } from "react"
import { useAuth } from "../App"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const { user } = useAuth()

  const userCollectionRef = collection(db, "users")

  const getEmail = (e) => setEmail(e.target.value)
  const getPassword = (e) => setPassword(e.target.value)
  const getName = (e) => setName(e.target.value)

  async function handleSignIn() {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(cred.user, { displayName: name  || cred.user.email.split('@')[0]})
      await addDoc(userCollectionRef, {
        uid: cred.user.uid,
        displayName: name || cred.user.email.split('@')[0],
        email: email || cred.user.email,
        createdAt: serverTimestamp()
      })
      window.alert("Sign up successful! You can now log in.")
    } catch (error) {
      console.error("Error signing in:", error)
    }
    finally {
      setLoading(false)
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
        <input 
        value={name} 
        onChange={getName} 
        placeholder="Your name" 
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