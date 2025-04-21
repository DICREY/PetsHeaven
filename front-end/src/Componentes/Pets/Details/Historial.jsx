// Librarys
import React from "react"
import { formatDate } from '../../Varios/Util'

// Main component 
export const Historial = ({ datas }) => {
    return (
      <section className="pet-content">
        <article className="info-card">
          <h2>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Historial Médico
          </h2>
          
          {datas? (
            <aside className="info-grid">
                <div key={datas.doc_usu} className="info-item">
                  <span className="info-label">
                    {formatDate(datas.fec_his) || "No Registrado"}
                  </span>
                  <div className="info-value">
                    <p><strong>Veterinario:</strong> {datas.nom_usu}</p>
                    <p><strong>Tratamiento:</strong> {datas.tra_his || "No Registrado"}</p>
                    <p><strong>Descripción:</strong> {datas.des_his || "No Registrado"}</p>
                  </div>
                </div>
            </aside>
          ) : (
            <p>No hay registros médicos disponibles</p>
          )}
        </article>
      </section>
    )
}