import MessageInput from "./MessageInput"
import Navbar from "./Navbar"
import { useState, useEffect, useContext } from "react"

export default function MessageList(props) {
  const messageBlock = props.messages.map((message) => (
    <div key={message.id} className="message-block">
      <p><strong>{message.senderName}</strong>: {message.text}</p>
    </div>
  ))

  return (
    <div className="message-list">
        <Navbar currentUserName={props.currentUserName} />
        <div className="data-display" style={{backgroundColor: "grey", padding:"22px", height: "250px"}}>{messageBlock}</div>
        <MessageInput recipientId={props.recipientId} recipientEmail={props.recipientEmail} recipientName={props.recipientName}/>
    </div>
  )
}   