// Librarys 
import React, { useState } from "react"

// Imports
import { checkImage } from '../Varios/Util'

// Import styles 
import '../../styles/Global/notifys.css'

// Component 
export const Loading = ({
        title = 'Cargando información...',
        message = 'Por favor espere un momento',
        img = 'https://github.com/Mogom/Imagenes_PetsHeaven/blob/main/Defaults/NotifyGanzo.jpg?raw=true',
        imgDefault = 'https://github.com/Mogom/Imagenes_PetsHeaven/blob/main/Defaults/NotifyCat.jpg?raw=true',
        btnClose = false
    }) => {
    // Dynamic vars
    const [isOpen,setIsOpen] = useState(true)
    
    return (
        <>
            {isOpen && (
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
                        <aside className="LoadingBar">
                            <div className="LoadingProgress"></div>
                        </aside>
                        {btnClose && (
                            <button
                                className=""
                                onClick={() => setIsOpen(false)}
                            >Close</button>
                        )}
                    </article>
                </section>)
            }
        </>
    )
}