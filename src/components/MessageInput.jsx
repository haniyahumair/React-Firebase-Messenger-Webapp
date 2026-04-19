import { useState, useEffect, useContext } from "react"
import { getDocs, collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../config/firebase"
import { useAuth } from '../App'

export default function MessageInput({ recipientId, recipientEmail, recipientName }) {
  const [messageText, setMessageText] = useState("")
  const { user } = useAuth();

  const messageInput = (e) => setMessageText(e.target.value)
  console.log("MessageInput props:", { recipientId, recipientEmail, recipientName })

  const handleSend = async () => {
    const text = messageText.trim()
    if (!text) return
    if (!user) {
      window.alert("You must be signed in to send messages.")
      return
    }
    try {
      await addDoc(collection(db, "messages"), {
        senderId: user.uid,
        senderEmail: user.email,
        senderName: user.displayName || user.email.split("@")[0],
        recipientId: recipientId || null,
        recipientEmail: recipientEmail || null,
        recipientName: recipientName || null,
        text: text,
        timestamp: serverTimestamp()
      })
      setMessageText("")
      console.log("Message sent successfully.")
    } catch (err) {
      console.error("Error sending message:", err)
    }
  }

  return (
    <div style={{marginTop: "20px", backgroundColor: "#f0f0f0", padding: "10px", borderRadius: "5px", gap: "10px"}}>
        <h5>Message Input Component</h5>
        <input type="text" placeholder="Type your message here..." value={messageText} onChange={messageInput}/>
        <button onClick={handleSend} onKeyDown={(e) => e.key === 'Enter' && handleClick()}>Send</button>
    </div>
  )
}