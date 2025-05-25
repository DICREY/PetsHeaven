// Librarys 
import { useNavigate } from 'react-router-dom'
import React, { useState, useRef } from 'react';
import { Pencil, ChevronLeft, User } from 'lucide-react'

// Imports
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { formatDate, errorStatusHandler, checkImage } from '../Varios/Util'
import { Notification } from '../Global/Notifys'
import { PostData } from '../Varios/Requests'

// Import styles
import '../../../src/styles/Formularios/FormularioMascotas.css'

export const FormularioRegMascotas = ({ URL = '', imgDefault = ''}) => {
  // Dynamic vars
  const [activeTab, setActiveTab] = useState('personal')
  const [formData, setFormData] = useState({})
  const [profileImage, setProfileImage] = useState(null)
  const [notify, setNotify] = useState(null)

  // Vars 
  const profileInputRef = useRef(null)
  const maxDate = new Date().toLocaleDateString('en-CA')
  const navigate = useNavigate()
  const mainURL = `${URL}/pet`

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const sendData = async () => {
    setNotify({
      title:'Validando...',
      message:'Verificando datos proporcionados',
      load:1
    })
    try {
      const token = localStorage.getItem('token')
      
      if (token) {
        formData.fec_nac_mas = formatDate(formData.fec_nac_mas)

        const created = await PostData(`${mainURL}/register`, token, formData)

        setNotify(null)

        if(created.status === 201) setNotify({
          title: 'Registro Exitoso',
          message: 'La mascota ha sido registrada con exito',
          time: 2000,
          btnClose:1
        })
      }
    } catch (err) {
      setNotify(null)
      if(err.status) {
        const message = errorStatusHandler(err.status)
        setNotify({
          title: 'Error',
          message: `${message}`,
          time: 2000,
          btnClose:1
        })
      } else console.log(err)
    }
  }

  return (
    <div className='contenedorgesusuario'>
      <NavBarAdmin />
      <main className='principalgesusuario'>
        <main className='contenedor-regusuario'>
          <header className='cabecera-regusuario'>
            <div className='titulo-regusuario'>
              <h1>Registro mascota</h1>
              <span className='creacion-regusuario'>| Creación</span>
            </div>
            <address className='acciones-regusuario'>
              <button className='atras-regusuario' onClick={() => navigate(-1)}>
                <ChevronLeft size={16} />
                <span className='texto-btn-regusuario'>Atrás</span>
              </button>
              <button 
                className='guardar-regusuario'
                onClick={sendData}
                >Guardar</button>
            </address>
          </header>

          <nav className='tabs-regusuario'>
            <div
              className={`tab-regusuario ${activeTab === 'personal' ? 'activo-regusuario' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              <User className='icono-regusuario' size={18} />
              <span className='texto-tab-regusuario'>Información mascota</span>
            </div>
          </nav>

          <section className='contenido-regusuario'>
            {activeTab === 'personal' && (
              <section className='form-regusuario'>
                <h2>Datos Básicos de la Mascota:</h2>

                <div className='grupo-regusuario'>
                  <label className='etiqueta-regusuario'>Imagen de la mascota</label>
                  <div className='perfil-regusuario'>
                    <div className='imagen-regusuario'>
                      {profileImage?
                        checkImage(
                          profileImage,
                          'imagen de la mascota para guardar en el sistema',
                          imgDefault): 
                        checkImage(
                          imgDefault,
                          'imagen de la mascota para guardar en el sistema',
                          imgDefault)
                      }
                    </div>
                    <button className='editar-regusuario' onClick={() => profileInputRef.current.click()}>
                      <Pencil size={16} />
                    </button>
                    <input
                      type='file'
                      ref={profileInputRef}
                      onChange={handleProfileImageChange}
                      accept='image/*'
                      className='input-file-hidden'
                    />
                  </div>
                </div>

                <div className='grid-regusuario'>

                  <div className='grupo-regusuario'>
                  <label className='etiqueta-regusuario'>Nombre de la mascota</label>
                    <input 
                      onChange={handleChange}
                      type='text' 
                      name='nom_mas'
                      placeholder='Nombre' 
                      className='campo-regusuario'
                      maxLength={50}
                      minLength={3}
                      pattern='^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$' 
                      required 
                    />
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Especie</label>
                    <input 
                      name='esp_mas'
                      onChange={handleChange}
                      type='text' 
                      placeholder='Ej: Felino' 
                      className='campo-regusuario'
                      maxLength={50}
                      minLength={3}
                      pattern='^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$' 
                      required 
                    />
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Raza</label>
                    <input 
                      onChange={handleChange}
                      name='raz_mas'
                      type='text' 
                      placeholder='Ej: Siames' 
                      className='campo-regusuario'
                      maxLength={50}
                      minLength={3}
                      pattern='^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$' 
                      required 
                     />
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Color</label>
                    <input 
                      onChange={handleChange}
                      name='col_mas'
                      type='text' 
                      placeholder='Ej: Negro con blanco' 
                      className='campo-regusuario'
                      maxLength={50}
                      minLength={3}
                      pattern='^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$' 
                      required 
                    />
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Alimento</label>
                    <input
                      onChange={handleChange}
                      name='ali_mas'
                      type='text' 
                      placeholder='Ej: Royal Cannin' 
                      className='campo-regusuario'
                      maxLength={50}
                      minLength={3}
                      pattern='^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$' 
                      required  
                    />
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Fecha de nacimiento</label>
                    <input 
                      name='fec_nac_mas'
                      onChange={handleChange}
                      type='date'
                      max={maxDate}
                      className='campo-regusuario'
                      required  
                    />
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Peso (kg)</label>
                    <input type='text' 
                      name='pes_mas'
                      onChange={handleChange}
                      placeholder='Peso (en kg)' 
                      className='campo-regusuario' 
                      maxLength={7}
                      minLength={1}
                      pattern='^[0-9]+$'
                      required
                    />
                  </div>
        
                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Documento del propietario</label>
                    <input type='number' 
                      name='doc_per'
                      placeholder='Documento, persona encargada de la mascota' 
                      className='campo-regusuario' 
                      maxLength={20}
                      minLength={0}
                      pattern='^[0-9]+$'
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Sexo de la mascota</label>
                    <select 
                      name='gen_mas'
                      className='campo-regusuario'
                      defaultValue='--'
                      required
                      onChange={handleChange}
                      >
                    <option disabled value='--'>Seleccione tipo</option>
                    <option value='Femenino'>Hembra</option>
                    <option value='Masculino'>Macho</option>
                    </select>
                  </div>
                
                
                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Estado reproductivo</label>
                    <select className='campo-regusuario'
                      name='est_rep_mas'
                      defaultValue='--'
                      required
                      onChange={handleChange}
                      >
                    <option disabled value='--'>Seleccione tipo</option>
                    <option value='Esterilizado'>Esterilizado</option>
                    <option value='No esterilizado'>No esterilizado</option>
                    </select>
                  </div>
                </div>

                
              </section>
            )}
          </section>
        </main>
      </main>
      {notify && (
        <Notification 
          {...notify}
        />
      )}
    </div>
  )
}
