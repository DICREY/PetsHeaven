// Librarys
import React from "react"

// Imports 
import { formatDate } from '../../Varios/Util'

// Main component
export const Citas = ({ datas }) => {
    return (
      <section className="pet-content">
        <article className="info-card">
            <h2>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Citas Programadas
            </h2>
            
            {datas?(
                <div className="info-grid">
                    <div key={datas.doc_usu} className="info-item">
                    <span className="info-label">
                        {formatDate(datas.fec_cit) || "No Registrado"}
                    </span>
                    <div className="info-value">
                        <p><strong>Servicio:</strong> {datas.nom_usu_ser || "No registrado"}</p>
                        <p><strong>Veterinario:</strong> {datas.nom_usu}</p>
                        <p><strong>Estado:</strong> 
                        <span style={{
                            color: datas.estado === 'REALIZADO' ? 'green' : 
                                datas.estado === 'CANCELADO' ? 'red' : 
                                datas.estado === 'PENDIENTE' ? 'orange' : 'gray'
                        }}>
                            {datas.estado}
                        </span>
                        </p>
                    </div>
                    </div>
                </div>
            ) : (
                <p>No hay citas programadas</p>
            )}
        </article>
      </section>
    )
}