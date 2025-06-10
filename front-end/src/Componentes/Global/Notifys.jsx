// Librarys 
import React, { createContext, useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

// Imports
import { checkImage } from '../Varios/Util'
import { SmallLoader } from '../Loaders/SmallLoader'

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
    close = null,
    firstOption = null,
    secondOption = null
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
                <section className='LoadingNotification'>
                    <article className='LoadingContent'>
                        {load?(
                            <aside className='LoadingPaw'>
                                <SmallLoader /> 
                            </aside> 
                        ):(
                            <aside className='LoadingPawImg'>
                                {checkImage(
                                    img,
                                    'ganzo antropomorfico con traje formal negro con una lupa antigua en la pata derecha y la cabeza inclinada 40grados a la izquierda',
                                    imgDefault,
                                    'LoadingImg'
                                )} 
                            </aside>
                        )}
                        <aside className='LoadingText'>
                            <p>{title}</p>
                            <p className='LoadingSubText'>{message}</p>
                        </aside>
                        {load && (
                            <aside className='LoadingBar'>
                                <div className='LoadingProgress'></div>
                            </aside>
                        )}
                        {close && (
                            <aside className='LoadingContainer'>
                                <button
                                    className='DeleteBtn'
                                    onClick={() => close(null)}
                                >Cerrar</button>
                            </aside>
                        )}
                        {firstOption && secondOption && (
                            <aside className='LoadingSelect'>
                                <button 
                                    className='DeleteBtn' 
                                    onClick={firstOption}
                                >Salir</button>
                                <button
                                    className='AddBtn' 
                                    onClick={secondOption}
                                >Continuar</button>
                            </aside>
                        )}
                    </article>
                </section>)
            }
        </>
    )
}
