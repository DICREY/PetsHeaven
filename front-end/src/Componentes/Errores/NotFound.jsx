// Librarys 
import React from 'react'
import { Link } from 'react-router'

// Imports 
import '../../../public/styles/Errores/notfound.css'

// Main component 
export const NotFound = () => {
  return (
    <section className="notfound-container">
      <div className="pet-glitch-container">
        <h1 className="title-num glitch" data-text="404">404</h1>
        <h2 className="sub-title">¡Huellita no encontrada!</h2>
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

// Secundary component
export const SubNotFound = () => {
  return (
    <section className="notfound-container">
      <div className="pet-glitch-container">
        <h1 className="title-num glitch" data-text="404">404</h1>
        <h2 className="sub-title">¡Huellita no encontrada!</h2>
        <p className="text-error-not">
          Lo que buscas se fue de paseo con las mascotas.
        </p>
        
        <address className="pet-elements">
          <span className="paw-icon">🐾</span>
          <span className="pet-icon">🐕</span>
          <span className="pet-icon">🐈</span>
        </address>
        
      </div>
    </section>
  )
}