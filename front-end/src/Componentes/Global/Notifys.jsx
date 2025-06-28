// Librarys 
import React, { useEffect, useState } from 'react'

// Imports
import { SmallLoader } from '../Loaders/SmallLoader'

// Import styles 
import '../../styles/Global/notifys.css'
import { CheckImage } from '../../Utils/Utils'

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
    secondOption = null,
    firstOptionName = 'Cancelar',
    secondOptionName = 'Aceptar',
    input = null,
    btnClose = null,
}) => {
    // Dynamic vars
    const [isOpen, setIsOpen] = useState(true)
    const [inputValue, setInputValue] = useState('')

    // Effects
    // close then at time
    useEffect(() => {
        if (close) setTimeout(() => {
            close(null)
        }, time)
    }, [])

    return (
        <>
            {isOpen && (
                <section className='LoadingNotification'>
                    <article className='LoadingContent'>
                        {load ? (
                            <aside className='LoadingPaw'>
                                <SmallLoader />
                            </aside>
                        ) : (
                            <aside className='LoadingPawImg'>
                                <CheckImage 
                                    src={img}
                                    alt='ganzo antropomorfico con traje formal negro con una lupa antigua en la pata derecha y la cabeza inclinada 40grados a la izquierda'
                                    imgDefault={imgDefault}
                                    className='LoadingImg'
                                />
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
                        {input && (
                            <>
                                <aside className='LoadingContainer'>
                                    <input
                                        type='text'
                                        className='input'
                                        onChange={e => setInputValue(e.target.value)}
                                        // onClick={() => close(null)}
                                    />
                                </aside>
                                <aside className='LoadingSelect'>
                                    <button
                                        className='DeleteBtn'
                                        onClick={btnClose}
                                    >Cerrar</button>
                                    <button
                                        className='EditBtn'
                                        onClick={() => input(inputValue)}
                                    >Validar</button>
                                </aside>
                            </>
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
                                >{firstOptionName}</button>
                                <button
                                    className='AddBtn'
                                    onClick={secondOption}
                                >{secondOptionName}</button>
                            </aside>
                        )}
                    </article>
                </section>)
            }
        </>
    )
}
