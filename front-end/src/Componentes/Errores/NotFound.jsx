// Librarys 
import React from 'react'
import { useNavigate } from 'react-router-dom' // Cambiamos el import

// Imports 
import '../../../public/styles/Errores/notfound.css'

// Main component 
export const NotFound = () => {
  const navigate = useNavigate() // Obtenemos la función de navegación

  return (
    <main className='body'>
      <section className="parent">
        <picture className="imagen"></picture>
        <div className="contenedor-button">
          <button 
            onClick={() => navigate(-1)} 
            className="pet-home-button"
          >
            <i className="fas fa-bone"></i> Volver al hogar
          </button>
        </div>
      </section>
    </main>
  )
}

