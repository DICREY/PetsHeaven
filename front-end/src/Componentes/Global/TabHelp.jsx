// Librarys 
import React, { useState } from 'react'

// Import styles 
import '../../styles/Global/TabHelp.css'

// Component 
export const TabHelp = ({ onClose }) => {
    // Dynamic vars 
    const [activeTab, setActiveTab] = useState('contact')

    return (
        <article className="help-overlay">
            <article className="help-window">
                {/* Encabezado */}
                <header className="help-header">
                    <h2>
                        <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 16V12" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 8H12.01" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Centro de Ayuda
                    </h2>
                    <button className="close-btn" onClick={onClose}>
                        <svg width="1.3rem" height="1.3rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18M6 6L18 18" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>
                </header>

                {/* Pestañas de navegación */}
                <nav className="help-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'contact' ? 'active' : ''}`}
                        onClick={() => setActiveTab('contact')}
                    >
                        Contacto
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'manual' ? 'active' : ''}`}
                        onClick={() => setActiveTab('manual')}
                    >
                        Manuales
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'faq' ? 'active' : ''}`}
                        onClick={() => setActiveTab('faq')}
                    >
                        Preguntas Frecuentes
                    </button>
                </nav>

                {/* Contenido */}
                <main className="help-content">
                    {activeTab === 'contact' && (
                        <section className="contact-section">
                            <h3>Contacto con Administradores</h3>
                            <div className="contact-card">
                                <div className="contact-icon">
                                    <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22 16.92V19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21H16.93C16.3257 21 15.7462 20.7689 15.3029 20.3518C14.8596 19.9346 14.5858 19.3624 14.54 18.75C14.4367 17.2539 14.811 15.7729 15.61 14.5C16.3026 13.3957 17.3095 12.5345 18.49 12.04C19.0496 11.7999 19.6754 11.7733 20.2528 11.9649C20.8302 12.1565 21.3183 12.5535 21.62 13.08L22 16.92Z" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2 16.92V19C2 19.5304 2.21071 20.0391 2.58579 20.4142C2.96086 20.7893 3.46957 21 4 21H7.07C7.6743 21 8.25379 20.7689 8.69706 20.3518C9.14033 19.9346 9.41414 19.3624 9.46 18.75C9.56334 17.2539 9.18896 15.7729 8.39 14.5C7.69744 13.3957 6.69053 12.5345 5.51 12.04C4.95042 11.7999 4.32458 11.7733 3.74721 11.9649C3.16984 12.1565 2.68166 12.5535 2.38 13.08L2 16.92Z" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M18 2C18.1978 3.1256 17.8471 4.26974 17.0197 5.1449C16.1923 6.02007 14.9634 6.53785 13.68 6.56C12.5374 6.49591 11.4683 5.99947 10.68 5.18C9.89166 4.36053 9.44339 3.28326 9.42 2.14C9.42 2.094 9.42 2.048 9.42 2C9.45363 1.20978 9.77528 0.459763 10.3266 -0.0926537C10.878 -0.64507 11.6224 -0.972191 12.4 -0.999999H12.48C14.16 -0.999999 15.6 0.239999 16.4 1.88C16.88 2.84 17.12 3.92 17 5" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="contact-info">
                                    <h4>Soporte Técnico</h4>
                                    <p>Email: <a href="mailto:soporte@petsheaven.com">soporte@petsheaven.com</a></p>
                                    <p>Celular: <a href="tel:+123456788">+57 321 212 1209</a></p>
                                    <p>WhatsApp: <a href="tel:+123456788">+57 321 212 9109</a></p>
                                    <p>Horario: Lunes a Viernes, 8:00 - 18:00</p>
                                </div>
                            </div>

                            <div className="contact-card">
                                <div className="contact-icon">
                                    <svg width="1.5rem" height="1.5rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="#00BCD4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <div className="contact-info">
                                    <h4>Administración</h4>
                                    <p>Email: <a href="mailto:admin@petsheaven.com">admin@petsheaven.com</a></p>
                                    <p>Celular: <a href="tel:+123456788">+57 320 509 9009</a></p>
                                    <p>WhatsApp: <a href="tel:+123456788">+57 320 509 9009</a></p>
                                    <p>Horario: Lunes a Viernes, 9:00 - 17:00</p>
                                </div>
                            </div>
                        </section>
                    )}

                    {activeTab === 'manual' && (
                        <section className="manual-section">
                            <h3>Manuales de Uso</h3>
                            <div className="manual-card">
                                <h4>Guía de Usuario Básico</h4>
                                <p>Instrucciones para el uso general del sistema</p>
                                <button className="download-btn">
                                    Descargar PDF
                                    <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M7 10L12 15L17 10" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 15V3" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                            <div className="manual-card">
                                <h4>Guía de Veterinario</h4>
                                <p>Instrucciones para el uso del sistema como veterinario</p>
                                <button className="download-btn">
                                    Descargar PDF
                                    <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M7 10L12 15L17 10" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 15V3" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>

                            <div className="manual-card">
                                <h4>Guía de Administrador</h4>
                                <p>Instrucciones para el uso completo del sistema</p>
                                <button className="download-btn">
                                    Descargar PDF
                                    <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M7 10L12 15L17 10" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 15V3" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>

                            <div className="manual-card">
                                <h4>Manual de Citas</h4>
                                <p>Cómo programar y gestionar citas</p>
                                <button className="download-btn">
                                    Descargar PDF
                                    <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M7 10L12 15L17 10" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 15V3" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>

                            <div className="manual-card">
                                <h4>Guía de Historias Clínicas</h4>
                                <p>Cómo registrar y consultar historias médicas</p>
                                <button className="download-btn">
                                    Descargar PDF
                                    <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M7 10L12 15L17 10" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12 15V3" stroke="#0097A7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </section>
                    )}

                    {activeTab === 'faq' && (
                        <section className="faq-section">
                            <h3>Preguntas Frecuentes</h3>

                            <div className="faq-item">
                                <h4>¿Cómo programo una nueva cita?</h4>
                                <p>Dirígete a la sección "Agenda" en la barra de navegación, haz clic en "Agenda Personal" y luego clic en el dia que desea programar la "cita". Completa el formulario con los datos requeridos.</p>
                            </div>

                            <div className="faq-item">
                                <h4>¿Puedo cancelar una cita online?</h4>
                                <p>Sí, en la sección "Agenda" puedes ver tus citas programadas y cancelarlas con al menos 24 horas de anticipación.</p>
                            </div>

                            <div className="faq-item">
                                <h4>¿Cómo accedo al historial de mi mascota?</h4>
                                <p>En la sección "Mascotas", selecciona tu mascota y luego haz clic en "Historial Clínico". Allí encontrarás toda la información médica.</p>
                            </div>
                        </section>
                    )}
                </main>
            </article>
        </article>
    )
}