// Librarys 
import React from 'react'
import { useNavigate } from 'react-router-dom'

// Import styles 
import '../../../src/styles/Errores/notfound.css'

// Component
export const ErrorInternalServer = () => {
  // Vars 
  const navigate = useNavigate()

  return (
    <main className="body">
      <section className="parent">
        <picture className="imagen"></picture>
        <p>
          No eres tu soy yo, solo necesito tiempo para actulizarme
        </p>
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