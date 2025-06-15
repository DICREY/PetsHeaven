// Librarys 
import React from 'react'
import { useNavigate } from 'react-router-dom'

// Import styles
import '../../../src/styles/Errores/notfound.css'

// Main component
export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <main className='body'>
      <section className="parent">
        <picture className="imagen"></picture>
        <div className="contenedor-button">
          <button
            onClick={() => navigate(-1)}
            className="pet-home-button"
          >
            <i className="fas fa-bone"></i> Volver atrás
          </button>
        </div>
      </section>
    </main>
  )
}

