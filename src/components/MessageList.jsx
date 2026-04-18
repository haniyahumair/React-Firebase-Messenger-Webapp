import MessageInput from "./MessageInput"
import { useState, useEffect, useContext } from "react"

export default function MessageList() {
  return (
    <div>
        <h3>Message List Component</h3>
        <p>This is where the list of messages will be displayed.</p>
        <MessageInput />
    </div>
  )
}   