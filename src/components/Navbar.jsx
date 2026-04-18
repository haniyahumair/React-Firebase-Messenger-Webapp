import { useState, useEffect, useContext } from "react"
import { useAuth } from '../App'

export default function Navbar() {
    const { user, logout } = useAuth()
    return (
        <nav style={{backgroundColor: '#333', color: '#fff', padding: '10px'}}>
            <h2>Navbar</h2>
            <p>User logged in: {user?.email}</p>
            <button onClick={logout}>Logout</button>
        </nav>
    )
}