// Librarys 
import React, { useContext } from "react"

// Imports
import { ThemeContext } from "../../Contexts/Contexts"

// Component 
export const Test = () => {
    const { URL, theme } = useContext(ThemeContext)
        
    return (
        <div>
            <h1>Test Component</h1>
            <p>This is a simple test component.</p>
            <p>Current API URL: {URL}</p>
            <p>Current Theme: {theme}</p>
        </div>
    )
}