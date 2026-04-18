import { useState, useEffect, useContext } from "react"
import MessageList from "../components/MessageList"
import Navbar from "../components/Navbar"
import { useAuth } from '../App'

export default function Chat() {
    const { user } = useAuth()
    console.log("Chat user:", user)
  return (
    <div>
      <h1>Chat Page</h1>
      <Navbar />
      <MessageList />
    </div>
  )
}