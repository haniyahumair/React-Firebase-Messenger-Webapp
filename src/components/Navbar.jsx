import { useState, useEffect, useContext } from "react"
import { useAuth } from '../App'

export default function Navbar(props) {
    const { user, logout } = useAuth()
    return (
        <nav>
            <h2>Navbar</h2>
            <div className="nav-info">
                <p>User logged in: {props.currentUserName}</p>
                <button className="logout-btn" onClick={logout} style={{backgroundColor: "#eef2f6", color:"#111827", transform: "translateY(-30%)"}}>Logout</button>
            </div>
        </nav>
    )
}