// Librarys 
import { useNavigate } from 'react-router-dom'
import React, { useState, useRef } from 'react';
import { Pencil, ChevronLeft, User } from 'lucide-react'
import swal from 'sweetalert'

// Imports
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { formatDate, errorStatusHandler, loadingAlert } from '../Varios/Util'
import { PostData } from '../Varios/Requests'

// Import styles
import '../../../src/styles/Formularios/FormularioMascotas.css'

export const FormularioRegMascotas = ({ URL = ''}) => {
  // Dynamic vars
  const [activeTab, setActiveTab] = useState('personal')
  const [profileImage, setProfileImage] = useState(null)
  const [signatureImage, setSignatureImage] = useState(null)
  const [formData, setFormData] = useState({})

  // Vars 
  const profileInputRef = useRef(null)
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
    console.log(formData)
  }

  const sendData = async () => {
    try {
      const token = localStorage.getItem('token')
      // if (profileImage)
      if (token) {
        loadingAlert('Validando...')
        formData.fec_nac_mas = formatDate(formData.fec_nac_mas)

        const created = await PostData(`${mainURL}/register`, token, formData)

        created.status === 201 & swal({
          icon: 'success',
          title: 'Registrada',
          text: 'La mascota ha sido registrada correctamente',
        })
      }
    } catch (err) {
      if(err.status) {
        const message = errorStatusHandler(err.status)
        swal({
          title: 'Error',
          text: `${message}`,
          icon: 'warning',
        })
      } else console.log(err)
    }
  }

  return (
    <div className='contenedorgesusuario'>
      <NavBarAdmin />
      <main className='principalgesusuario'>
        <div className='contenedor-regusuario'>
          <div className='cabecera-regusuario'>
            <div className='titulo-regusuario'>
              <h1>Registro mascota</h1>
              <span className='creacion-regusuario'>| Creación</span>
            </div>
            <div className='acciones-regusuario'>
              <button className='atras-regusuario' onClick={() => navigate(-1)}>
                <ChevronLeft size={16} />
                <span className='texto-btn-regusuario'>Atrás</span>
              </button>
              <button 
                className='guardar-regusuario'
                onClick={sendData}
                >Guardar</button>
            </div>
          </div>

          <div className='tabs-regusuario'>
            <div
              className={`tab-regusuario ${activeTab === 'personal' ? 'activo-regusuario' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              <User className='icono-regusuario' size={18} />
              <span className='texto-tab-regusuario'>Información mascota</span>
            </div>
          </div>

          <div className='contenido-regusuario'>
            {activeTab === 'personal' && (
              <div className='form-regusuario'>
                <h2>Datos Básicos de la Mascota:</h2>

                <div className='grupo-regusuario'>
                  <label className='etiqueta-regusuario'>Imagen de la mascota</label>
                  <div className='perfil-regusuario'>
                    <div className='imagen-regusuario'>
                      {profileImage ? (
                        <img src={profileImage || '/placeholder.svg'} alt='Perfil' />
                      ) : (
                        <div className='placeholder-imagen'>
                          <User size={40} strokeWidth={1} />
                        </div>
                      )}
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
                      maxLength={3}
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

                
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  )
}
