// Imports
import { GetData } from '../Varios/Requests'
import { decodeJWT, errorStatusHandler, getRoles, checkImage } from '../Varios/Util'
import { Loader } from '../Errores/Loader'
import { NotFound } from '../Errores/NotFound'
import { EditPetButton } from './EditPet'
import { PetDetails } from './PetDetails'

// Import Styles 
import '../../../src/styles/Pets/pets.css'

// Librarys 
import React, { useState, useEffect } from "react"

// Main component
export const Pets = ({URL = ""}) => {
    // Dynamic Vars
    const [petsData, setPetsData] = useState([])
    const [history, setHistory] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedPet, setSelectedPet] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [searchBy,setSearchBy] = useState("")
    const [found,setfound] = useState(false)
    const [editMode,setEditMode] = useState(false)
    const [isAdmin,setIsAdmin] = useState(false)
    const [validImage,setValidImage] = useState(false)
    
    // Vars 
    const mainURL = `${URL}/pet`
    const imgDefault = "https://raw.githubusercontent.com/Mogom/Imagenes_PetsHeaven/refs/heads/main/Defaults/petImg.default.webp"

    // fetch para traer datos
    const fetchData = async (url = "", token = "") => {
        setfound(false)
        setLoading(true)
        try {
            const pets = await GetData(url,token)
            setLoading(false)
            setPetsData(pets)
            setfound(true)
            if(pets[0]) setfound(true)
        } catch (err) {
            setLoading(false)
            if (err.status){
                const message = errorStatusHandler(err.status)
                swal({
                    icon: 'error',
                    title: 'Error',
                    text: message,
                    button: 'Aceptar'
                })
            }
        }
    }

    const openModal = (pet) => {
        setSelectedPet(pet)
        setShowModal(true)
        document.body.style.overflow = 'hidden' // Deshabilita el scroll del body
    }
    
    // Ejecutar el fetch para traer datos
    useEffect(() => {
        // Vars
        const token = localStorage.getItem("token")
        if(token) {
            // Vars
            const by = decodeJWT(token).names.toLowerCase()
            const roles =  getRoles(token)

            const admin = roles.some(role => role.toLowerCase() === "administrador")

            admin?setIsAdmin(true):setIsAdmin(false)

            const newUrl = admin? `${mainURL}/all`: `${mainURL}/all:${by}`

            fetchData(newUrl,token)
        } else window.location.href = "/user/login"
    }, [])

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <main className='main-pets-container'>
                    <nav className='nav-search-container'>
                        <span className='search-container'>
                            <input className='search-input input' type="search" placeholder='Buscar' onChange={e => setSearchBy(e.target.value)}/>
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
                                    {checkImage(i.fot_mas,setValidImage)}
                                    {
                                        validImage? (
                                            <img 
                                                className='pets-card-img'
                                                src={i.fot_mas}
                                                alt={`${i.esp_mas} de raza ${i.raz_mas} color ${i.col_mas} con nombre ${i.nom_mas}`}
                                            />
                                        ): (
                                        <img 
                                            className='pets-card-img' 
                                            src={imgDefault}
                                            alt={`${i.esp_mas} de raza ${i.raz_mas} color ${i.col_mas} con nombre ${i.nom_mas}`}
                                        />
                                        )
                                    }
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
                                        onClick={() => openModal(i)}
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

                    {/* Modal para mostrar detalles completos */}
                    {showModal && selectedPet && (
                        <PetDetails 
                            URL={mainURL}
                            datas={selectedPet} 
                            open={showModal} 
                            admin={isAdmin}
                            imgDefault={imgDefault}
                            ready={(state) => setShowModal(state)}
                            editMode={() => setEditMode(true)} />
                    )}

                    {editMode && (
                        <EditPetButton
                            URL={mainURL}
                            petData={selectedPet}
                            open={editMode}
                            onSave={(state) => setEditMode(state)}
                        />
                    )}
                </main>
            )}   
        </>
    )
}