// Librarys 
import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Pencil, ChevronLeft, User } from 'lucide-react'
import { useForm } from 'react-hook-form'

// Imports
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { formatDate, errorStatusHandler, checkImage, uploadImg, searchFilter } from '../Varios/Util'
import { Notification } from '../Global/Notifys'
import { GetData, PostData } from '../Varios/Requests'
import { HeaderAdmin } from '../BarrasNavegacion/HeaderAdmin'
import { HeaderUser } from '../BarrasNavegacion/HeaderUser'
import Footer from '../Varios/Footer2'
import { AuthContext } from '../../Contexts/Contexts'


// Import styles
import '../../../src/styles/Formularios/FormularioMascotas.css'

// Component 
export const FormularioRegMascotas = ({ URL = '', imgDefault = ''}) => {
  // Dynamic vars
  const [activeTab, setActiveTab] = useState('personal')
  const [profileImage, setProfileImage] = useState(null)
  const [notify, setNotify] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [ owners, setOwners ] = useState([])
  const [ almcOwners, setAlmcOwners ] = useState([])
  const [ showDropDown, setShowDropDown ] = useState(null)
  const [ ownerSelect, setOwnerSelect ] = useState({})

  // Vars 
  const profileInputRef = useRef(null)
  const maxDate = new Date().toLocaleDateString('en-CA')
  const navigate = useNavigate()
  const mainURL = `${URL}/pet`
  const { admin } = useContext(AuthContext)

  // Configuración de react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      esp_mas: '--',
      gen_mas: '--',
      est_rep_mas: '--'
    }
  })

  const validatePatientName = (value) => {
    return value.replace(/[0-9]/g, "")
  }

  const filter = (term) => {
    searchFilter(term,owners, ["nom_per", "doc_per", "ape_per"],setAlmcOwners)
    setShowDropDown(1)
  }

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target.result)
      }
      reader.readAsDataURL(file)
      setValue('fot_mas', file)
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setNotify({
      title:'Validando datos...',
      message:'Por favor espere mientras se suben los datos',
      load: true
    })
  
    try {
      data.fec_nac_mas = formatDate(data.fec_nac_mas)
      const imageUrl = await uploadImg(data.fot_mas,'mascotas')
  
      const created = await PostData(`${mainURL}/register`, {
        ...data,
        ...ownerSelect,
        fot_mas: imageUrl
      })
  
      setNotify(null)
  
      if (created.created) {
        setNotify({
          title: 'Registro Exitoso',
          message: 'La mascota ha sido registrada con éxito',
          close: setNotify
        })
        setTimeout(() => navigate(-1), 2000)
      }
  
    } catch (err) {
      setNotify(null)
      const message = errorStatusHandler(err)
  
      setNotify({
        title: 'Error',
        message: message,
        close: setNotify
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Funciones de validación
  const permitirSoloLetras = (e) => {
    const charCode = e.which || e.keyCode
    if (!(charCode >= 65 && charCode <= 90) && 
        !(charCode >= 97 && charCode <= 122) && 
        !(charCode === 32) && 
        !(charCode >= 192 && charCode <= 255)) {
      e.preventDefault()
    }
  }

  const permitirSoloNumeros = (e) => {
    const charCode = e.which || e.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      e.preventDefault()
    }
  }

  const GetOwners = async () => {
    try {
      const own = await GetData(`${URL}/global/owners`)
      if (own) {
        setOwners(own)
        setAlmcOwners(own)
      }
    } catch (err) {
      const message = errorStatusHandler(err)
      setNotify({
        title: 'Error',
        message: message,
        close: setNotify
      })
    }
  }

  useEffect(() => {
    GetOwners()
  },[])

  return (
    <main className='contenedorgesusuario'>
      <NavBarAdmin />
      <main className='principalgesusuario'>
        {admin? (<HeaderAdmin URL={URL} />): (<HeaderUser />)}
        <main className='main-contenedor-regusuario'>
          <main className='contenedor-regusuario'>
            <header className='cabecera-regusuario'>
              <div className='titulo-regusuario'>
                <h1>Registro mascota</h1>
                <span className='creacion-regusuario'>| Creación</span>
              </div>
              <address className='acciones-regusuario'>
                <button className='BackBtn' onClick={() => navigate(-1)}>
                  <ChevronLeft className='icon' />
                  <span className='texto-btn-regusuario'>Atrás</span>
                </button>
                <button 
                  className='EditBtn'
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Guardando...' : 'Guardar'}
                </button>
              </address>
            </header>

            <nav className='tabs-regusuario'>
              <div
                className={`tab-regusuario ${activeTab === 'personal' ? 'activo-regusuario' : ''}`}
                onClick={() => setActiveTab('personal')}
              >
                <User className='icon' />
                <span className='texto-tab-regusuario'>Información mascota</span>
              </div>
            </nav>

            <section className='contenido-regusuario'>
              {activeTab === 'personal' && (
                <section className='form-regusuario'>
                  <h2>Datos Básicos de la Mascota:</h2>

                  <div className='grupo-regusuario'>
                    <label className='label'>Imagen de la mascota</label>
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
                      <button 
                        type="button"
                        className='editar-regusuario' 
                        onClick={() => profileInputRef.current.click()}
                      >
                        <Pencil className='icon' />
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
                      <label className='label'>Nombre de la mascota<span className='obligatorio'>*</span></label>
                      <input 
                        {...register('nom_mas', {
                          required: 'El nombre es obligatorio',
                          minLength: {
                            value: 3,
                            message: 'El nombre debe tener al menos 3 caracteres'
                          },
                          maxLength: {
                            value: 50,
                            message: 'El nombre no puede exceder los 50 caracteres'
                          },
                          pattern: {
                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                            message: 'Solo se permiten letras y espacios'
                          }
                        })}
                        type='text' 
                        placeholder='Nombre' 
                        className={`input ${errors.nom_mas ? 'campo-error' : ''}`}
                        onKeyPress={permitirSoloLetras}
                        aria-invalid={!!errors.nom_mas}
                        aria-describedby={errors.nom_mas ? 'error-nom-mas' : undefined}
                      />
                      {errors.nom_mas && (
                        <p id="error-nom-mas" className='mensaje-error' role="alert">
                          {errors.nom_mas.message}
                        </p>
                      )}
                    </div>

                    <div className='grupo-regusuario'>
                      <label className='label'>Especie<span className='obligatorio'>*</span></label>
                      <select
                        {...register('esp_mas', {
                          required: 'La especie es obligatoria',
                          validate: value => value !== '--' || 'Debes seleccionar una especie'
                        })}
                        className={`select ${errors.esp_mas ? 'campo-error' : ''}`}
                        aria-invalid={!!errors.esp_mas}
                        aria-describedby={errors.esp_mas ? 'error-esp-mas' : undefined}
                      >
                        <option disabled value='--'>Seleccione tipo</option>
                        <option value='Felino'>Felino</option>
                        <option value='Canino'>Cánino</option>
                        <option value='Roedor'>Roedor</option>
                        <option value='Ave'>Ave</option>
                        <option value='Reptil'>Reptil</option>
                        <option value='Otro'>Otro</option>
                      </select>
                      {errors.esp_mas && (
                        <p id="error-esp-mas" className='mensaje-error' role="alert">
                          {errors.esp_mas.message}
                        </p>
                      )}
                    </div>

                    <div className='grupo-regusuario'>
                      <label className='label'>Raza<span className='obligatorio'>*</span></label>
                      <input 
                        {...register('raz_mas', {
                          required: 'La raza es obligatoria',
                          minLength: {
                            value: 3,
                            message: 'La raza debe tener al menos 3 caracteres'
                          },
                          maxLength: {
                            value: 50,
                            message: 'La raza no puede exceder los 50 caracteres'
                          },
                          pattern: {
                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                            message: 'Solo se permiten letras y espacios'
                          }
                        })}
                        type='text' 
                        placeholder='Ej: Siames' 
                        className={`input ${errors.raz_mas ? 'campo-error' : ''}`}
                        onKeyPress={permitirSoloLetras}
                        aria-invalid={!!errors.raz_mas}
                        aria-describedby={errors.raz_mas ? 'error-raz-mas' : undefined}
                      />
                      {errors.raz_mas && (
                        <p id="error-raz-mas" className='mensaje-error' role="alert">
                          {errors.raz_mas.message}
                        </p>
                      )}
                    </div>

                    <div className='grupo-regusuario'>
                      <label className='label'>Color<span className='obligatorio'>*</span></label>
                      <input 
                        {...register('col_mas', {
                          required: 'El color es obligatorio',
                          minLength: {
                            value: 3,
                            message: 'El color debe tener al menos 3 caracteres'
                          },
                          maxLength: {
                            value: 50,
                            message: 'El color no puede exceder los 50 caracteres'
                          },
                          pattern: {
                            value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                            message: 'Solo se permiten letras y espacios'
                          }
                        })}
                        type='text' 
                        placeholder='Ej: Negro con blanco' 
                        className={`input ${errors.col_mas ? 'campo-error' : ''}`}
                        onKeyPress={permitirSoloLetras}
                        aria-invalid={!!errors.col_mas}
                        aria-describedby={errors.col_mas ? 'error-col-mas' : undefined}
                      />
                      {errors.col_mas && (
                        <p id="error-col-mas" className='mensaje-error' role="alert">
                          {errors.col_mas.message}
                        </p>
                      )}
                    </div>

                    <div className='grupo-regusuario'>
                      <label className='label'>Alimento<span className='obligatorio'>*</span></label>
                      <input
                        {...register('ali_mas', {
                          required: 'El alimento es obligatorio',
                          minLength: {
                            value: 3,
                            message: 'El alimento debe tener al menos 3 caracteres'
                          },
                          maxLength: {
                            value: 50,
                            message: 'El alimento no puede exceder los 50 caracteres'
                          }
                        })}
                        type='text' 
                        placeholder='Ej: Royal Cannin' 
                        className={`input ${errors.ali_mas ? 'campo-error' : ''}`}
                        aria-invalid={!!errors.ali_mas}
                        aria-describedby={errors.ali_mas ? 'error-ali-mas' : undefined}
                      />
                      {errors.ali_mas && (
                        <p id="error-ali-mas" className='mensaje-error' role="alert">
                          {errors.ali_mas.message}
                        </p>
                      )}
                    </div>

                    <div className='grupo-regusuario'>
                      <label className='label'>Fecha de nacimiento<span className='obligatorio'>*</span></label>
                      <input 
                        {...register('fec_nac_mas', {
                          required: 'La fecha de nacimiento es obligatoria'
                        })}
                        type='date'
                        max={maxDate}
                        className={`input ${errors.fec_nac_mas ? 'campo-error' : ''}`}
                        aria-invalid={!!errors.fec_nac_mas}
                        aria-describedby={errors.fec_nac_mas ? 'error-fec-nac-mas' : undefined}
                      />
                      {errors.fec_nac_mas && (
                        <p id="error-fec-nac-mas" className='mensaje-error' role="alert">
                          {errors.fec_nac_mas.message}
                        </p>
                      )}
                    </div>

                    <div className='grupo-regusuario'>
                      <label className='label'>Peso (kg)<span className='obligatorio'>*</span></label>
                      <input 
                        {...register('pes_mas', {
                          required: 'El peso es obligatorio',
                          min: {
                            value: 0.1,
                            message: 'El peso debe ser mayor a 0'
                          },
                          max: {
                            value: 100,
                            message: 'El peso no puede exceder los 100 kg'
                          }
                        })}
                        type='number' 
                        step="0.1"
                        placeholder='Peso (en kg)' 
                        className={`input ${errors.pes_mas ? 'campo-error' : ''}`}
                        onKeyPress={permitirSoloNumeros}
                        aria-invalid={!!errors.pes_mas}
                        aria-describedby={errors.pes_mas ? 'error-pes-mas' : undefined}
                      />
                      {errors.pes_mas && (
                        <p id="error-pes-mas" className='mensaje-error' role="alert">
                          {errors.pes_mas.message}
                        </p>
                      )}
                    </div>
          
                    <div className='grupo-regusuario'>
                      <label className='label'>Propietario<span className='obligatorio'>*</span></label>
                      <div className='autocomplete'>
                        <input
                          type="text"
                          name="nom_mas"
                          placeholder="Elige nombre o documento del propietario"
                          value={ownerSelect.nom_per}
                          defaultValue={ownerSelect.nom_per || ''}
                          className="input"
                          onChange={(e) => {
                            const value = e.target.value
                            const filteredValue = validatePatientName(value)
                            if (filteredValue === value || value.length < ownerSelect.nom_per.length) {
                              setOwnerSelect({ ...ownerSelect, nom_per: value })
                              filter(value)
                            }
                          }}
                          onFocus={() => setShowDropDown(1)}
                          onKeyDown={(e) => {
                            if (e.key >= "0" && e.key <= "9") {
                              e.preventDefault()
                            }
                          }}
                        />
                        
                        {showDropDown && (
                          <div className="dropdown">
                            {almcOwners.map((prop, index) => (
                              <div
                                key={index + 9082}
                                className="dropdown-item"
                                onClick={() => {
                                  setOwnerSelect({
                                    ...ownerSelect,
                                    doc_per: prop.doc_per,
                                    nom_per: `${prop.nom_per} ${prop.ape_per} (${prop.doc_per})`,
                                  })
                                  setShowDropDown(false)
                                }}
                              >
                                <div className="dropdown-contenido">
                                  <div className="dropdown-nombre">{prop.nom_per} {prop.ape_per}</div>
                                  <div className="dropdown-dueno">
                                    {prop.doc_per}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className='grupo-regusuario'>
                      <label className='label'>Sexo de la mascota<span className='obligatorio'>*</span></label>
                      <select 
                        {...register('gen_mas', {
                          required: 'El sexo es obligatorio',
                          validate: value => value !== '--' || 'Debes seleccionar un sexo'
                        })}
                        className={`select ${errors.gen_mas ? 'campo-error' : ''}`}
                        aria-invalid={!!errors.gen_mas}
                        aria-describedby={errors.gen_mas ? 'error-gen-mas' : undefined}
                      >
                        <option disabled value='--'>Seleccione tipo</option>
                        <option value='Femenino'>Hembra</option>
                        <option value='Masculino'>Macho</option>
                      </select>
                      {errors.gen_mas && (
                        <p id="error-gen-mas" className='mensaje-error' role="alert">
                          {errors.gen_mas.message}
                        </p>
                      )}
                    </div>
                  
                    <div className='grupo-regusuario'>
                      <label className='label'>Estado reproductivo<span className='obligatorio'>*</span></label>
                      <select 
                        {...register('est_rep_mas', {
                          required: 'El estado reproductivo es obligatorio',
                          validate: value => value !== '--' || 'Debes seleccionar un estado'
                        })}
                        className={`select ${errors.est_rep_mas ? 'campo-error' : ''}`}
                        aria-invalid={!!errors.est_rep_mas}
                        aria-describedby={errors.est_rep_mas ? 'error-est-rep-mas' : undefined}
                      >
                        <option disabled value='--'>Seleccione tipo</option>
                        <option value='Esterilizado'>Esterilizado</option>
                        <option value='No esterilizado'>No esterilizado</option>
                      </select>
                      {errors.est_rep_mas && (
                        <p id="error-est-rep-mas" className='mensaje-error' role="alert">
                          {errors.est_rep_mas.message}
                        </p>
                      )}
                    </div>
                  </div>
                </section>
              )}
            </section>
          </main>
        </main>
        <Footer/>
      </main>
      {notify && (
        <Notification 
          {...notify}
        />
      )}
    </main>
  )
}