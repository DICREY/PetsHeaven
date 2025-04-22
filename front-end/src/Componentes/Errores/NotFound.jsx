// Librarys 
import React from 'react'
import { useNavigate } from 'react-router-dom' // Cambiamos el import

// Imports 
import '../../../public/styles/Errores/notfound.css'

// Main component 
export const NotFound = () => {
  const navigate = useNavigate() // Obtenemos la función de navegación

  return (
    <section className="notfound-container">
      <div className="pet-glitch-container">
        {/* <h2 className="sub-title">¡Huellita no encontrada!</h2> */}
          {/* <p className="text">
            La página que buscas se fue de paseo.
          </p> */}
        
        {/* <div className="pet-elements">
          <span className="pet-icond">🐕</span>
          <span className="paw-icon">🐾</span>
          <span className="pet-iconc">🐈</span>
        </div> */}
        
        <button 
          onClick={() => navigate(-1)} // Navegamos hacia atrás
          className="pet-home-button"
        >
          <i className="fas fa-bone"></i> Volver al hogar
        </button>
      </div>
    </section>
  )
}

// Secundary component (este permanece igual)
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