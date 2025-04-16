// Librarys 
import React, { useState } from 'react'

// Import styles 
import '../../../public/styles/InterfazUsuario/petDetails.css'

// Main component
export const PetDetails = ({ datas, ready, editMode, open = false }) => {
    // Vars 
    const [isOpen,setIsOpen] = useState(open)

    // Functions
    const namePro = gen => {
        return gen === "Hombre" ? "Propietario" : "Propietaria"
    }

    // Cerrar sección de detalles
    const closeModal = () => {
        ready(false)
        setIsOpen(false)
        document.body.style.overflow = 'auto' // Habilita el scroll del body
    }

    const tabSelected = (e) => {
        const infoPetContainer = document.getElementById("info-pet-container")

        // remover la clase 'link-active' de todos los elementos
        document.querySelectorAll('.tab-active').forEach(tab => {
            tab.classList.remove('link-active')
        })
        infoPetContainer.children.remove()
        
        // Agregar la clase al elemento clickeado
        e.currentTarget.classList.add('link-active')
    }
    
    return (
        <main>
            {isOpen && (
                <section className="pet-modal-overlay" >
                    <div className="pet-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="pet-modal-close" onClick={closeModal}>Exit</button>
                        
                        {/* Header con foto y datos principales */}
                        <header className="pet-header">
                            <section className="pet-avatar-container">
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
                            </section>
                            
                            <aside className="pet-main-info">
                                <h1>{datas.nom_mas}</h1>
                                <div className="pet-meta">
                                    <span className="species">{datas.esp_mas}</span>
                                    <span className="breed">{datas.raz_mas}</span>
                                    <span className="gender">{datas.gen_mas === 'M' ? 'Macho' : 'Hembra'}</span>
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
                            </aside>
                        </header>

                        {/* Navegación por pestañas */}
                        <nav className="pet-tabs">
                            <a className='tab-active link-active' onClick={tabSelected} >Resumen</a>
                            <a className='tab-active' onClick={tabSelected} >Historial</a>
                            <a className='tab-active' onClick={tabSelected} >Consultas</a>    
                        </nav>

                        {/* Contenido principal organizado en tarjetas */}
                        <div id='info-pet-container' className="pet-content">
                        {/* Tarjeta de información básica */}
                        <section className="info-card">
                            <h2>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M3 10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Información Básica
                            </h2>
                            <div className="info-grid">
                                <div className="info-item">
                                    <span className="info-label">Genero</span>
                                    <span className="info-value">{datas.gen_mas || 'No especificado'}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Color</span>
                                    <span className="info-value">{datas.col_mas}</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">Raza</span>
                                    <span className="info-value">{datas.raz_mas || 'No registrado'}</span>
                                </div>
                            </div>
                        </section>

                        {/* Tarjeta de alimentación */}
                        <section className="info-card">
                            <h2>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2L4 7L12 12L20 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 14V19.5L12 22L16 19.5V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 11L4 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M16 11L20 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Alimentación
                            </h2>
                            <div className="info-grid">
                            <div className="info-item">
                                <span className="info-label">Alimento principal</span>
                                <span className="info-value">{datas.ali_mas || 'No especificado'}</span>
                            </div>
                            <div className="info-item">
                                <span className="info-label">Restricciones</span>
                                <span className="info-value">{datas.ali_rest || 'Ninguna'}</span>
                            </div>
                            </div>
                        </section>

                        {/* Tarjeta de propietario */}
                        <section className="info-card owner-card">
                            <h2>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Propietario
                            </h2>
                            <div className="owner-info">
                            <div className="owner-main">
                                <span className="owner-name">{datas.nom_usu} {datas.ape_usu}</span>
                                <span className="owner-type">{namePro(datas.gen_usu)}</span>
                            </div>
                            <div className="owner-contact">
                                <a href={`tel:${datas.cel_usu}`} className="contact-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 16.92V19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H16.93C16.3257 21 15.7462 20.7689 15.3029 20.3518C14.8596 19.9346 14.5858 19.3624 14.54 18.75C14.4367 17.2539 14.811 15.7729 15.61 14.5C16.3026 13.3957 17.3095 12.5345 18.49 12.04C19.0496 11.7999 19.6754 11.7733 20.2528 11.9649C20.8302 12.1565 21.3183 12.5535 21.62 13.08L22 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M2 16.92V19C2 19.5304 2.21071 20.0391 2.58579 20.4142C2.96086 20.7893 3.46957 21 4 21H7.07C7.6743 21 8.25379 20.7689 8.69706 20.3518C9.14033 19.9346 9.41414 19.3624 9.46 18.75C9.56334 17.2539 9.18896 15.7729 8.39 14.5C7.69744 13.3957 6.69053 12.5345 5.51 12.04C4.95042 11.7999 4.32458 11.7733 3.74721 11.9649C3.16984 12.1565 2.68166 12.5535 2.38 13.08L2 16.92Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M18 2C18.1978 3.1256 17.8471 4.26974 17.0197 5.1449C16.1923 6.02007 14.9634 6.53785 13.68 6.56C12.5374 6.49591 11.4683 5.99947 10.68 5.18C9.89166 4.36053 9.44339 3.28326 9.42 2.14C9.42 2.094 9.42 2.048 9.42 2C9.45363 1.20978 9.77528 0.459763 10.3266 -0.0926537C10.878 -0.64507 11.6224 -0.972191 12.4 -0.999999H12.48C14.16 -0.999999 15.6 0.239999 16.4 1.88C16.88 2.84 17.12 3.92 17 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                {datas.cel_usu}
                                </a>
                                <a href={`mailto:${datas.email_usu}`} className="contact-item">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                {datas.email_usu}
                                </a>
                            </div>
                            </div>
                        </section>
                        </div>
                    </div>
                </section>
            )}
        </main>

    )
}