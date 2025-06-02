// Librarys 
import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'

// Imports 
import { ThemeContext } from '../Contexts/Contexts'
import { Test } from '../Componentes/Tests/Test.component'

// Module 
export default function App () {
    // Vars 
    const URL = 'http://localhost:3000'
    const theme = 'Dark'

    // Main component
    return (
        <ThemeContext.Provider value={{ URL, theme }}>
            <BrowserRouter>
                <Routes>
                    <Route path="/test" element={<Test />} />
                </Routes>
            </BrowserRouter>
        </ThemeContext.Provider>
    )
}