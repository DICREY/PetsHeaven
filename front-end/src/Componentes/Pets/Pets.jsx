// Librarys 
import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// Imports
import { GetData } from '../Varios/Requests'
import { errorStatusHandler, checkImage } from '../Varios/Util'
import { Notification } from '../Global/Notifys'
import { Loader } from '../Loaders/Loader'
import { NotFound } from '../Errores/NotFound'
import { AuthContext } from '../../Contexts/Contexts'
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'

// Import Styles 
import '../../../src/styles/Pets/pets.css'

// Main component
export const Pets = ({ URL = '', imgPetDefault = '', setPetSelect }) => {
    // Dynamic Vars
    const [petsData, setPetsData] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchBy, setSearchBy] = useState('')
    const [found, setfound] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [notify, setNotify] = useState(null)
    const { roles, user } = useContext(AuthContext)

    // Vars 
    const mainURL = `${URL}/pet`
    const imgDefault = imgPetDefault
    const navigate = useNavigate()

    // fetch para traer datos
    const fetchData = async (url = '') => {
        setfound(false)
        setNotify({
            title: 'Cargando...',
            message: 'Obteniendo datos',
            load: 1
        })
        try {
            const pets = await GetData(url)
            setNotify(null)
            setPetsData(pets)
            setfound(true)
            if (pets[0]) setfound(true)
        } catch (err) {
            setNotify(null)
            if (err.status) {
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
        const by = user.names?.split(' ')[0].toLowerCase()

        const admin = roles.includes('Administrador')

        admin ? setIsAdmin(true) : setIsAdmin(false)

        const newUrl = admin ? `${mainURL}/all` : `${mainURL}/all:${by}`

        fetchData(newUrl)

    }, [])

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <main className='main-pets-container'>
                    <NavBarAdmin/>
                    <div className='contenedor-de-las-cuasas'>
                        <nav className='nav-search-container'>
                            <span className='search-container'>
                                <input className='search-input input' type='search' placeholder='Buscar' onChange={e => setSearchBy(e.target.value)} />
                                <button className='boton-enviar' type='button' onClick={() => fetchData(`${mainURL}/all:${searchBy}`)} >Buscar</button>
                            </span>
                            <picture className='img-container'>

                            </picture>
                        </nav>
                        {
                            found ?
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
                                ) : (
                                    <NotFound />
                                )
                        }
                        {notify && (
                            <Notification
                                {...notify}
                            />
                        )}
                    </div>
                </main>
            )}
        </>
    )
}