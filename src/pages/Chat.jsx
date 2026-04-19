import { useState, useEffect, useRef } from "react"
import { getDocs, collection, onSnapshot, query, orderBy } from "firebase/firestore"
import MessageList from "../components/MessageList"
import Navbar from "../components/Navbar"
import { useAuth } from '../App'
import { db } from "../config/firebase"

export default function Chat() {        
  const [chatTargetEmail, setChatTargetEmail] = useState("")
  const [chatTargetId, setChatTargetId] = useState("")     
  const [chatTargetName, setChatTargetName] = useState("") 
  const [messages, setMessages] = useState([])
  const [currentUserEmail, setCurrentUserEmail] = useState("")
  const [currentUserName, setCurrentUserName] = useState("")
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const inputRef = useRef(null)
  // db refs
  const messageCollectionRef = collection(db, "messages")
  const userCollectionRef = collection(db, "users")


  const handleEmailSubmit = (e) => {
    e.preventDefault()
    const candidate = (inputRef.current?.value || "").trim().toLowerCase()
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidate)
    if (!isValidEmail) {
      window.alert("Please enter a valid email address.")
      return
    }

    const resolveRecipient = async () => {
      try {
        const userData = await getDocs(userCollectionRef)
        const usersList = userData.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        const found = usersList.find(u => (u.email || "").toLowerCase() === candidate)
        if (found) {
          setChatTargetEmail(found.email)
          setChatTargetId(found.uid || found.id)
          setChatTargetName(found.displayName || "")
          if (inputRef.current) inputRef.current.value = "" // clear input
        } else {
          window.alert("No user with that email found.")
        }
      } catch (err) {
        console.error("Error resolving recipient:", err)
      }
    }
    resolveRecipient()
    inputRef.current.blur()
  }

  useEffect(() => {
    // populate current user profile (from users collection) once user is available
    const getCurrentUserDetails = async () => {
      if (!user) {
        setCurrentUserEmail("")
        setCurrentUserName("")
        return
      }
      try {
        const userData = await getDocs(userCollectionRef)
        const usersList = userData.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        const current = usersList.find(u => u.uid === user.uid || u.email === user.email)
        setCurrentUserEmail(current?.email || user.email || "")
        setCurrentUserName(
          current?.displayName || user.displayName || user.email?.split('@')[0] || ""
        )
      } catch (err) {
        console.error("Error fetching user details:", err)
      }
    }

    getCurrentUserDetails()
  }, [user])

  //use snapshot to update the page in real time
  useEffect(() => {
    if (!currentUserEmail) return
    if (!chatTargetEmail) return

    const q = query(messageCollectionRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      })
      setMessages(messages.filter(m => 
        (m.senderEmail === currentUserEmail && m.recipientEmail === chatTargetEmail) ||
        (m.senderEmail === chatTargetEmail && m.recipientEmail === currentUserEmail)
      ))
      console.log("Messages updated in real-time.")
       setLoading(false)
    });

    return () => unsubscribe()
  }, [currentUserEmail, chatTargetEmail]);


  return (
    <div>
      {!chatTargetId ? (
        <div>
          <h1>Chat page</h1>
          <p>
            Welcome, {currentUserName || currentUserEmail || "Guest"}!
            Please enter the email address of the person you want to chat with:
          </p>
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              placeholder="Enter email.."
              ref={inputRef}  
            />
            <button type="submit">Start Chat</button>
          </form>
        </div>
      ) : (
        <div>
          <MessageList
            messages={messages}
            currentUserName={currentUserName}
            currentUserEmail={currentUserEmail}
            recipientEmail={chatTargetEmail}
            recipientId={chatTargetId}
            recipientName={chatTargetName}
          />
        </div>
      )}
      {loading && <div>Loading...</div>}
    </div>
  )
}