// Librarys 
import React, { createContext, useContext, useEffect, useState } from "react"
import ReactDOM from 'react-dom'

// Imports
import { checkImage } from '../Varios/Util'
import { SmallLoader } from '../Errores/SmallLoader'

// Import styles 
import '../../styles/Global/notifys.css'

// Vars 
const NotificationContext = createContext()

// Component 
export const Notification = ({
    title = 'Cargando información...',
    message = 'Por favor espere un momento',
    img = 'https://github.com/Mogom/Imagenes_PetsHeaven/blob/main/Defaults/NotifyGanzo.jpg?raw=true',
    imgDefault = 'https://github.com/Mogom/Imagenes_PetsHeaven/blob/main/Defaults/NotifyCat.jpg?raw=true',
    load = false,
    time = 4000,
    close = null
}) => {
    // Dynamic vars
    const [isOpen,setIsOpen] = useState(true)

    // Effects
    // close then at time
    useEffect(() => {
        if(close) setTimeout(() => {
            close(null)
        },time)
    },[])
    
    return (
        <>
            {isOpen && (
                <section className="LoadingNotification">
                    <article className="LoadingContent">
                        <aside className="LoadingPaw">
                            {load && ( <SmallLoader /> )}
                        </aside> 
                        {/* <aside className="LoadingPawImg">
                            {checkImage(
                                img,
                                'ganzo antropomorfico con traje formal negro con una lupa antigua en la pata derecha y la cabeza inclinada 40grados a la izquierda',
                                imgDefault,
                                'LoadingImg'
                            )} 
                        </aside> */}
                        <aside className="LoadingText">
                            <p>{title}</p>
                            <p className="LoadingSubText">{message}</p>
                        </aside>
                        {load && (
                            <aside className="LoadingBar">
                                <div className="LoadingProgress"></div>
                            </aside>
                        )}
                        {close && (
                            <aside className="LoadingContainer">
                                <button
                                    className="DeleteBtn"
                                    onClick={() => close(null)}
                                >Cerrar</button>
                            </aside>
                        )}
                    </article>
                </section>)
            }
        </>
    )
}

const Load = ({
    title = 'Cargando información...',
    message = 'Por favor espere un momento',
    img = 'https://github.com/Mogom/Imagenes_PetsHeaven/blob/main/Defaults/NotifyGanzo.jpg?raw=true',
    imgDefault = 'https://github.com/Mogom/Imagenes_PetsHeaven/blob/main/Defaults/NotifyCat.jpg?raw=true',
    btnClose = false,
    load = false,
    time = 4000,
    onClose
}) => {

    useEffect(() => {
        if (time) {
            const timer = setTimeout(() => {
                onClose?.()
            }, time)
            return () => clearTimeout(timer)
        }
    }, [time, onClose])

    return ReactDOM.createPortal(
        <section className="LoadingNotification">
            <article className="LoadingContent">
                <aside className="LoadingPaw">
                    {checkImage(
                        img,
                        'ganzo antropomorfico con traje formal negro con una lupa antigua en la pata derecha y la cabeza inclinada 40grados a la izquierda',
                        imgDefault,
                        'LoadingImg'
                    )}
                </aside>
                <aside className="LoadingText">
                    <p>{title}</p>
                    <p className="LoadingSubText">{message}</p>
                </aside>
                {load && (
                    <aside className="LoadingBar">
                        <div className="LoadingProgress"></div>
                    </aside>
                )}
                {btnClose && (
                    <button
                        className=""
                        onClick={() => setIsOpen(false)}
                    >Close</button>
                )}
            </article>
        </section>,
        document.getElementById('notification-root')
    )
}

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([])
    // Precargar el componente antes de necesitarlo
  
    const showNotification = (props) => {
        const id = Date.now()
        setNotifications(prev => [...prev, { ...props, id }])
        return id
    }
    
    const hideNotification = (id) => setNotifications(prev => prev.filter(n => n.id !== id))

    return (
        <NotificationContext.Provider value={{ showNotification, hideNotification }}>
            {children}
            {notifications.map(notification => (
                <Load
                    key={notification.id}
                    {...notification}
                    onClose={() => hideNotification(notification.id)}
                />
            ))}
        </NotificationContext.Provider>
    )
}


export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) throw new Error('useNotification must be used within a NotificationProvider')
    return context
}