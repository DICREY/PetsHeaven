// Librarys 
import React from "react"

// Imports
import { checkImage } from '../Varios/Util'

// Import styles 
import '../../styles/Global/notifys.css'

// Component 
export const Loading = ({
    title = 'Cargando información...',
    message = 'Por favor espere un momento'
}) => {
    const img = 'https://github.com/DICREY/PetsHeaven/blob/main/database/imgs/cat_incognita.png?raw=true'
    const imgDefault = 'https://github.com/DICREY/PetsHeaven/blob/main/database/imgs/Gemini_Generated_Image_rgakgyrgakgyrgak.jpeg?raw=true'
    return (
        <section className="LoadingNotification">
            <article className="LoadingContent">
                <aside className="LoadingPaw">
                    {checkImage(
                        img,
                        'gato y ganzo antropomorfico con traje formal negro con una lupa antigua en la pata derecha y la cabeza inclinada 40grados a la izquierda',
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
            </article>
        </section>
    )
}