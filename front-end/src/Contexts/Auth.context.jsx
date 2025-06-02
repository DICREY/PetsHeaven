// Librarys 
import React, { createContext, useState, useEffect } from 'react'

// Imports 
import { decodeJWT } from '../Componentes/Varios/Util' // Assuming you have a utility to decode JWT
import { Login, PostData } from '../Componentes/Varios/Requests'
import { AuthContext } from './Contexts'

// Component
export const AuthProvider = ({ children }) => {
    // Dynamic vars
    const [ user, setUser ] = useState(null)
    const [ roles, setRoles ] = useState(null)
    const [ loading, setLoading ] = useState(true)

    // Functions
    // Iniciar sesion 
    const login = async (url = '', firstData, secondData) => {
        try {
            setLoading(true)
            const response = await Login(url, firstData, secondData)
            if (response) {
                const userData = decodeJWT(response.token)
                setUser(userData)
                setLoading(false)
                return userData
            }
            setLoading(false)
            return response
        } catch (error) {
            setLoading(false)
            throw error
        }
    }

    // Cerrar sesion 
    const logout = () => {
        const clear = async () => {
            try {
                const check = await PostData('http://localhost:3000/global/clear-cookies', {})
                if (check) {
                    setUser(null)
                    setRoles(null)
                    setLoading(false)
                    window.location.href = '/user/login'
                }
            } catch (err) {
                setUser(null)
                setLoading(false)
            } finally {
                setLoading(false)
            }
        }
        clear()
    }

    // Verificar sesión al cargar
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const check = await PostData('http://localhost:3000/global/check-cookie', { name: '__cred' })
                if (check) {
                    const userData = decodeJWT(check.data.data)
                    setUser(userData)
                    setRoles(userData.roles?.split(', ') || ['Usuario'])
                }
            } catch (err) {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        if(!user || !roles ) checkAuth()
    }, [])

    return (
        <AuthContext.Provider value={{ user, roles, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}