// Librarys 
import React from 'react'

// Imports 
import { checkImage, formatDate } from '../Varios/Util'

// Imports styles
import './historyTest.css'

export const HistoryTest = ({ appointmentData, onClose, imgDefault }) => {

    return (
        <section className='floating-window-overlay'>
            <aside className='floating-window'>
                <button className='close-button' onClick={onClose}>
                    <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M18 6L6 18M6 6L18 18' stroke='#0097A7' strokeWidth='2' strokeLinecap='round' />
                    </svg>
                </button>

                <div className='window-header'>
                    <h2>Historial Medico</h2>
                    <span className={`status-badge ${appointmentData.estado}`}>{appointmentData.estado}</span>
                </div>

                <article className='window-content'>
                    <div className='pet-info-section'>
                        <div className='pet-avatar-container'>
                            {checkImage(
                                appointmentData.fot_mas,
                                `${appointmentData.nom_mas} - ${appointmentData.esp_mas}`,
                                imgDefault,
                                'pet-avatar'
                            )}
                        </div>
                        <div className='pet-details'>
                            <h3>{appointmentData.nom_mas}</h3>
                            <p>{appointmentData.esp_mas}</p>
                        </div>
                    </div>

                    <div className='appointment-details'>
                        <div className='detail-row'>
                            <span className='detail-label'>Fecha:</span>
                            <span className='detail-value'>{formatDate(appointmentData.fec_cit)}</span>
                        </div>
                        <div className='detail-row'>
                            <span className='detail-label'>Horario:</span>
                            <span className='detail-value'>{appointmentData.hor_ini_cit} - {appointmentData.hor_fin_cit}</span>
                        </div>
                        <div className='detail-row'>
                            <span className='detail-label'>Servicio:</span>
                            <span className='detail-value'>{appointmentData.nom_ser} ({appointmentData.nom_cat})</span>
                        </div>
                        <div className='detail-row'>
                            <span className='detail-label'>Descripción:</span>
                            <span className='detail-value'>{appointmentData.des_ser}</span>
                        </div>
                    </div>

                    <div className='owner-info-section'>
                        <h3>Datos del Propietario</h3>
                        <div className='detail-row'>
                            <span className='detail-label'>Nombre:</span>
                            <span className='detail-value'>{appointmentData.nom_per} {appointmentData.ape_per}</span>
                        </div>
                        <div className='detail-row'>
                            <span className='detail-label'>Celular:</span>
                            <span className='detail-value'>
                                <a href={`tel:${appointmentData.cel_per}`}>{appointmentData.cel_per}</a>
                            </span>
                        </div>
                    </div>

                    <div className='registration-info'>
                        <p>Cita registrada el: {formatDate(appointmentData.fec_reg_cit)}</p>
                    </div>
                </article>
            </aside>
        </section>
    )
}