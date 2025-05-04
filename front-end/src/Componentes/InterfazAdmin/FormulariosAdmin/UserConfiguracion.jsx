// Librarys 
import React from 'react'
import { useState, useEffect } from 'react'
import { Pencil, ChevronLeft } from 'lucide-react'

// Import styles 
import '../../../../src/styles/InterfazAdmin/FormuariosAdmin/UserConfiguration.css'

const UserConfiguration = () => {
  const [activeTab, setActiveTab] = useState('personal')
  const [isMobile, setIsMobile] = useState(false)

  // Detectar si es móvil para ajustes de UI
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    // Comprobar al cargar
    checkIfMobile()

    // Comprobar al cambiar el tamaño de la ventana
    window.addEventListener('resize', checkIfMobile)

    return () => {
      window.removeEventListener('resize', checkIfMobile)
    }
  }, [])

  return (
    <div className='user-config-container'>
      <div className='user-config-header'>
        <div className='header-title'>
          <h1>Configuración personal</h1>
          <span className='creation-label'>Creación</span>
        </div>
        <div className='header-actions'>
          <button className='btn-back'>
            <ChevronLeft size={isMobile ? 14 : 16} />
            {!isMobile && 'Atrás'}
          </button>
          <button className='btn-save'>Guardar</button>
        </div>
      </div>

      <div className='tabs-container'>
        <div className={`tab ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>
          <span className='tab-icon'>👤</span>
          {isMobile ? 'Personal' : 'Información personal'}
        </div>
        <div className={`tab ${activeTab === 'roles' ? 'active' : ''}`} onClick={() => setActiveTab('roles')}>
          <span className='tab-icon'>🔑</span>
          {isMobile ? 'Roles' : 'Rol y privilegios'}
        </div>
        <div
          className={`tab ${activeTab === 'professional' ? 'active' : ''}`}
          onClick={() => setActiveTab('professional')}
        >
          <span className='tab-icon'>📋</span>
          {isMobile ? 'Profesional' : 'Información profesional'}
        </div>
        <div className={`tab ${activeTab === 'password' ? 'active' : ''}`} onClick={() => setActiveTab('password')}>
          <span className='tab-icon'>🔒</span>
          Contraseña
        </div>
      </div>

      <div className='content-container'>
        {activeTab === 'personal' && (
          <div className='personal-info-form'>
            <h2>Información personal:</h2>

            <div className='form-group'>
              <label>Imagen de perfil</label>
              <div className='profile-image-container'>
                <div className='profile-image'>
                  <img src='/placeholder.svg?height=100&width=100' alt='Perfil' />
                </div>
                <button className='edit-button'>
                  <Pencil size={16} />
                </button>
              </div>
            </div>

            <div className='form-group'>
              <label>Documento</label>
              <input type='text' placeholder='Número de identificación' className='form-control' />
            </div>

            <div className='form-group'>
              <label>Nombres y apellidos</label>
              <input type='text' placeholder='Nombres y apellidos' className='form-control' />
            </div>

            <div className='form-group'>
              <label>Correo electrónico</label>
              <div className='email-input-group'>
                <div className='at-symbol'>@</div>
                <input type='email' placeholder='hola@gmail.com' className='form-control email-input' />
              </div>
              <small className='form-text'>Email de contacto para comunicaciones y recuperación de la cuenta</small>
            </div>

            <div className='form-group'>
              <label>Móvil / WhatsApp</label>
              <div className='phone-input-group'>
                <div className='country-code'>
                  <span className='flag'>🇪🇨</span>
                  <span>+57</span>
                </div>
                <input type='tel' placeholder='321 2345678' className='form-control phone-input' />
              </div>
              <small className='form-text'>Celular de contacto para alertas de la cuenta y recordatorios</small>
            </div>

            <div className='form-group'>
              <label>Firma</label>
              <div className='signature-container'>
                <div className='signature-box'>Firma N/D</div>
                <button className='edit-button'>
                  <Pencil size={16} />
                </button>
              </div>
              <small className='form-text'>Firma para impresión, sugerido 250x80px y fondo transparente</small>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UserConfiguration
