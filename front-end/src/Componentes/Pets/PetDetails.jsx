// Librarys 
import React, { useState } from 'react'
import swal from 'sweetalert'

// Import
import { Resumen } from './Details/Resumen'
import { Historial } from './Details/Historial'
import { Citas } from './Details/Citas'
import { DeleteData } from '../Varios/Requests'
import { getRoles,loadingAlert } from '../Varios/Util'

// Import styles 
import '../../../public/styles/Pets/petDetails.css'

// Main component
export const PetDetails = ({ datas, ready, editMode, open = false, admin = false, URL = ""}) => {
    // Vars 
    const [isOpen,setIsOpen] = useState(open)
    const [isAdmin,setIsAdmin] = useState(admin)
    const [currentTab,setCurrentTab] = useState("Resumen")

    // Functions
    // Cerrar sección de detalles
    const closeModal = () => {
        ready(false)
        setIsOpen(false)
        document.body.style.overflow = 'auto' // Habilita el scroll del body
    }

    const tabSelected = (e) => {
        // Vars 
        setCurrentTab(e.currentTarget.textContent)

        // remover la clase 'link-active' de todos los elementos
        document.querySelectorAll('.tab-active').forEach(tab => {
            tab.classList.remove('link-active')
        })
        
        // Agregar la clase al elemento clickeado
        e.currentTarget.classList.add('link-active')
    }

    const deletePet = async () => {
        // Vars
        const mainURL = `${URL}/delete`
        const token = localStorage.getItem("token")
        try {
            if(token) {
                const roles =  getRoles(token)
                const admin = roles.some(role => role.toLowerCase() === "administrador")
                if (admin) {
                loadingAlert("Validando...",)
        
                const deleted = await DeleteData(mainURL,token,{
                    nom_mas: datas.nom_mas,
                    doc_usu: datas.doc_usu
                })
                console.log(deleted)
        
                deleted.deleted && swal({
                    icon: 'success',
                    title: 'Eliminada',
                    text: 'La mascota han sido eliminada correctamente.',
                })
            }
    
          } else window.location.href = "/34"
        } catch (err) {
            err.message? swal({
                icon: "error",
                title: "Error",
                text: err.message
            }): console.log(err)
        }
    }
    
    return (
        <main>
            {isOpen && (
                <section className="pet-modal-overlay" >
                    <div className="pet-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="pet-modal-close" onClick={closeModal}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round"/>
                            </svg>
                        </button>
                        
                        {/* Header con foto y datos principales */}
                        <header className="pet-header">
                            <aside className="pet-avatar-container">
                                <img 
                                    className="pet-avatar"
                                    src={datas.fot_mas} 
                                    alt={`${datas.esp_mas} de raza ${datas.raz_mas} color ${datas.col_mas} con nombre ${datas.nom_mas}`} 
                                />
                                <div className="pet-status">
                                    <span className={`status-badge ${datas.est_rep_mas === 'Esterilizado' ? 'status-active' : ''}`}>
                                        {datas.est_rep_mas}
                                    </span>
                                    <span className="weight-badge">{datas.pes_mas} kg</span>
                                </div>
                            </aside>
                            
                            <aside className="pet-main-info">
                                <h1>{datas.nom_mas}</h1>
                                <div className="pet-meta">
                                    <span className="species">{datas.esp_mas}</span>
                                    <span className="breed">{datas.raz_mas}</span>
                                </div>
                                <span className="pet-age">
                                    {new Date(datas.fec_nac_mas).toLocaleDateString('es-ES')}
                                </span>
                            </aside>

                            {/* Acciones rápidas */}
                            <aside className="quick-actions">
                                <button className="action-btn secondary" onClick={editMode}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11 5H6C4.89543 5 4 5.89543 4 7V18C4 19.1046 4.89543 20 6 20H17C18.1046 20 19 19.1046 19 18V13M17.5858 3.58579C18.3668 2.80474 19.6332 2.80474 20.4142 3.58579C21.1953 4.36683 21.1953 5.63316 20.4142 6.41421L11.8284 15H9L9 12.1716L17.5858 3.58579Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Editar datos
                                </button>
                                <button className="action-btn primary">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                    Nueva cita
                                </button>
                                {
                                    isAdmin && (
                                        <button className="action-btn primary" onClick={deletePet}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            Desactivar
                                        </button>
                                    )
                                }
                            </aside>
                        </header>

                        {/* Navegación por pestañas */}
                        <nav className="pet-tabs">
                            <a className='tab-active link-active' onClick={tabSelected} >Resumen</a>
                            <a className='tab-active' onClick={tabSelected} >Historial</a>
                            <a className='tab-active' onClick={tabSelected} >Citas</a>    
                        </nav>

                        {/* Contenido principal organizado en tarjetas */}
                        {
                            currentTab === "Resumen"?(
                                <Resumen datas={datas} />
                            ):currentTab === "Historial"?(
                                <Historial datas={datas} />
                            ):(
                                <Citas datas={datas} />
                            )
                        }

                    </div>
                </section>
            )}
        </main>

    )
}