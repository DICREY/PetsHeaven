// Librarys 
import React, { useState, useEffect } from 'react'

// Imports 
import { decodeJWT, useRoleRedirect } from '../Componentes/Varios/Util'
import { Login, PostData } from '../Componentes/Varios/Requests'
import { AuthContext } from './Contexts'
import { Notification } from '../Componentes/Global/Notifys'

// Component
export const AuthProvider = ({ children }) => {
    // Dynamic vars
    const [ user, setUser ] = useState(null)
    const [ roles, setRoles ] = useState(null)
    const [ mainRol, setMainRol ] = useState(null)
    const [ log, setLog ] = useState(null)
    const [ admin, setAdmin ] = useState(false)
    const [ notify, setNotify ] = useState({
        title: 'Cargando...',
        message: 'Obteniendo datos',
        load: 1
    })

    // Functions
    // Iniciar sesion 
    const login = async (url = '', firstData, secondData) => {
        try {            
            const response = await Login(url, firstData, secondData)
            if (response) {
                const userData = decodeJWT(response.__cred)
                setUser(userData)
                setRoles(userData.roles?.split(', ') || ['Usuario'])
                setMainRol(userData.roles?.split(', ')[0] || ['Usuario'])
                setAdmin(userData.roles?.split(', ').includes('Administrador'))

                setLog(true)
                setNotify({
                    title: 'Bienvenido',
                    message: `Hola, ${userData.names} ${userData.lastNames} Feliz día`
                })
                
                const arriveTo = useRoleRedirect(userData.roles?.split(', '))
                
                setTimeout(() => {
                    window.location.href = arriveTo
                },2000)

                return {data: userData, logged: 1}
            }
            setNotify(null)
            return response
        } catch (err) {
            setNotify(null)
            throw err 
        }
    }

    // Cerrar sesion 
    const logout = async () => {
        try {
            const check = await PostData('http://localhost:3000/cookie/clear-cookies', {})
            if (check) {
                setUser(null)
                setRoles(null)
                setLog(false)
                setNotify(null)
                window.location.href = '/user/login'
            }
        } catch (err) {
            setUser(null)
            setNotify(null)
        }
    }

    // Verificar sesión al cargar
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const check = await PostData('http://localhost:3000/cookie/check-cookie', { name: '__cred' })
                if (check) {
                    const userData = decodeJWT(check.data.data)
                    setUser(userData)
                    setRoles(userData.roles?.split(', ') || ['Usuario'])
                    setMainRol(userData.roles?.split(', ')[0] || ['Usuario'])
                    setAdmin(userData.roles?.split(', ').includes('Veterinario'))
                    setLog(true)
                    setNotify(null)
                }
                setNotify(null)
            } catch (err) {
                setNotify(null)
                setUser(null)
                // if(err.status === 403) setLog(false)
            }
        }
        if(!log) checkAuth()
    }, [!log])

    return (
        <AuthContext.Provider value={{ admin, mainRol, user, roles, log, login, logout }}>
            {notify ? <Notification
                {...notify}
             /> : children}
        </AuthContext.Provider>
    )
}