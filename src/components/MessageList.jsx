import MessageInput from "./MessageInput"
import { useState, useEffect, useContext } from "react"

export default function MessageList(props) {
  const messageBlock = props.messages.map((message) => (
    <div key={message.id} className="message-block">
      <p style={{backgroundColor:"blue", color:"white"}}><strong>{message.senderName}</strong>: {message.text}</p>
    </div>
  ))

  return (
    <div>
        <h3>Message List Component</h3>
        <p>This is where the list of messages will be displayed.</p>
        <div className="data-display">{messageBlock}</div>
        <MessageInput recipientId={props.recipientId} recipientEmail={props.recipientEmail} recipientName={props.recipientName}/>
    </div>
  )
}   