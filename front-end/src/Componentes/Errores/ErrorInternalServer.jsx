import React from 'react'
import { Link } from 'react-router'
import '../../../public/styles/Errores/notfound.css'

export const ErrorInternalServer = () => {
  return (
    <section className="notfound-container">
      <div className="pet-glitch-container">
        <h1 className="title-num glitch" data-text="404">500</h1>
        <h2 className="sub-title">¡Error interno del server!</h2>
        <p className="text">
          La página que buscas se fue de paseo con las mascotas.
        </p>
        
        <div className="pet-elements">
          <span className="paw-icon">🐾</span>
          <span className="pet-icon">🐕</span>
          <span className="pet-icon">🐈</span>
        </div>
        
        <Link to="/main" className="pet-home-button">
          <i className="fas fa-bone"></i> Volver al hogar
        </Link>
      </div>
    </section>
  )
}