// Imports
import { GetData } from '../Varios/Requests'
import { decodeJWT, errorStatusHandler, getRoles, checkImage } from '../Varios/Util'
import { Notification } from '../Global/Notifys'
import { Loader } from '../Errores/Loader'
import { NotFound } from '../Errores/NotFound'

// Import Styles 
import '../../../src/styles/Pets/pets.css'

// Librarys 
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// Main component
export const Pets = ({URL = '', imgPetDefault = '', setPetSelect }) => {
    // Dynamic Vars
    const [petsData, setPetsData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchBy,setSearchBy] = useState('')
    const [found,setfound] = useState(false)
    const [isAdmin,setIsAdmin] = useState(false)
    const [notify, setNotify] = useState(null)
    
    // Vars 
    const mainURL = `${URL}/pet`
    const imgDefault = imgPetDefault
    const navigate = useNavigate()

    // fetch para traer datos
    const fetchData = async (url = '', token = '') => {
        setfound(false)

        setNotify({
            title: 'Cargando...',
            message: 'Obteniendo datos',
            load: 1
        })
        try {
            const pets = await GetData(url,token)

            setNotify(null)
            setPetsData(pets)
            setfound(true)
            if(pets[0]) setfound(true)
        } catch (err) {
            setNotify(null)
            if (err.status){
                const message = errorStatusHandler(err.status)
                setNotify({
                    title: 'Error',
                    message: `${message}`,    
                    close: setNotify
                })
            }
        }
    }
    
    // Ejecutar el fetch para traer datos
    useEffect(() => {
        // Vars
        const token = localStorage.getItem('token')
        if(token) {
            // Vars
            const by = decodeJWT(token).names.toLowerCase()

            const admin = getCookie('Nikola')

            admin? setIsAdmin(true): setIsAdmin(false)

            const newUrl = admin? `${mainURL}/all`: `${mainURL}/all:${by}`

            fetchData(newUrl,token)
        } else navigate('/user/login')
    }, [])

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <main className='main-pets-container'>
                    <nav className='nav-search-container'>
                        <span className='search-container'>
                            <input className='search-input input' type='search' placeholder='Buscar' onChange={e => setSearchBy(e.target.value)}/>
                            <button className='boton-enviar' type='button' onClick={() => fetchData(`${mainURL}/all:${searchBy}`)} >Buscar</button>
                        </span>
                        <picture className='img-container'>
                            
                        </picture>
                    </nav>
                    {
                        found?
                        (
                        <section className='pets-container'>
                            {petsData.map((i, index) => (
                                <aside key={index} className='pets-card'>
                                <div className='pets-img-container'>
                                    {checkImage(
                                        i.fot_mas,
                                        `${i.esp_mas} de raza ${i.raz_mas} color ${i.col_mas} con nombre ${i.nom_mas}`,
                                        imgDefault,
                                        'pets-card-img'
                                    )}
                                    <span className='pets-species-badge'>{i.esp_mas}</span>
                                </div>
                                
                                <section className='pets-info-wrapper'>
                                    <p className='pets-name'><strong>{i.nom_mas}</strong></p>
                                    <span className='pets-meta'>
                                        {i.raz_mas || 'Raza no especificada'} {i.col_mas || 'Color no especificado'}
                                    </span>
                                    
                                    <button 
                                        type='button' 
                                        className='boton-enviar pets-detail-btn'
                                        onClick={() => setPetSelect(i)}
                                    >Descripción
                                    </button>
                                </section>
                            </aside>
                            ))}
                        </section>
                        ):(
                            <NotFound />
                        )
                    }  
                    {notify && (
                        <Notification 
                            {...notify}
                        />
                    )}
                </main>
            )}   
        </>
    )
}