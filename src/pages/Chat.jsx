import { useState, useEffect, useContext, use } from "react"
import { useAuth } from '../App'

export default function Chat() {
    const { user } = useAuth()
    console.log("Chat user:", user)
  return (
    <div>
      <h1>Chat Page</h1>
      <p>This is where the chat interface will go.</p>
    </div>
  )
}