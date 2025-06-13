// Librarys
import React, { useState, useEffect, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pencil, ChevronLeft, User, Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'

// Imports
import Contrasena from './Contrasena'
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import { errorStatusHandler, LegalAge } from '../../Varios/Util'
import { Notification } from '../../Global/Notifys'
import { PostData } from '../../Varios/Requests'
import { HeaderUser } from '../../BarrasNavegacion/HeaderUser'
import { HeaderAdmin } from '../../BarrasNavegacion/HeaderAdmin'
import Footer from '../../Varios/Footer2'
import { AuthContext } from '../../../Contexts/Contexts'

// Import styles
import '../../../../src/styles/InterfazAdmin/FormuariosAdmin/RegistroPersonal.css'

export const RegistroPro = ({ URL = '', roles = ['Usuario'] }) => {
  // Dynamic vars
  const [activeTab, setActiveTab] = useState('personal')
  const [profileImage, setProfileImage] = useState(null)
  const [notify, setNotify] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const profileInputRef = useRef(null)
  const docRef = useRef(null)

  // Vars 
  const mainUrl = `${URL}/people`
  const navigate = useNavigate()
  const legalDate = LegalAge()
  const { admin } = useContext(AuthContext)

  // Form configuration
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    setValue,
    control
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      tipDoc: '--',
      genero: '--'
    }
  })

  // Functions
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target.result)
      }
      reader.readAsDataURL(file)
      setValue('profileImage', file)
    }
  }

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      setNotify({
        title: 'Cargando',
        message: 'Por favor, espere mientras se registra el usuario.',
        load: true
      })

      const formData = new FormData()
      formData.append('nombres', data.nombres)
      formData.append('apellidos', data.apellidos)
      formData.append('fechaNacimiento', data.fecNac)
      formData.append('tipoDocumento', data.tipDoc)
      formData.append('numeroDocumento', data.doc)
      formData.append('direccion', data.direccion)
      formData.append('celular', data.cel)
      formData.append('celular2', data.cel2 || '')
      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('genero', data.genero)
      if (data.profileImage) {
        formData.append('profileImage', data.profileImage)
      }

      const created = await PostData(`${mainUrl}/register`, formData)

      setNotify({
        title: 'Registrado',
        message: 'El usuario ha sido registrado correctamente',
        close: setNotify
      })

      setTimeout(() => navigate(-1), 2000)
    } catch (err) {
      setNotify(null)
      if (err.status) {
        const message = errorStatusHandler(err.status)
        setNotify({
          title: 'Error',
          message: `${message}`,
          close: setNotify
        })
      } else {
        console.error(err)
        setNotify({
          title: 'Error',
          message: 'Ocurrió un error inesperado',
          close: setNotify
        })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  // Validations
  const validateDocumentType = (value) => value !== '--' || 'Debe seleccionar un tipo de documento'
  const validateGender = (value) => value !== '--' || 'Debe seleccionar un género'

  // Focus effect
  useEffect(() => {
    setTimeout(() => {
      docRef.current?.focus()
    }, 0)
  }, [])

  return (
    <main className='contenedorgesusuario'>
      <NavBarAdmin roles={roles} />
      <main className='principalgesusuario'>
        {admin ? (<HeaderAdmin />) : (<HeaderUser />)}
        <div className='contenedor-regusuario'>
          <div className='cabecera-regusuario'>
            <div className='titulo-regusuario'>
              <h1>Registro usuario</h1>
              <span className='creacion-regusuario'>| Creación</span>
            </div>
            <div className='acciones-regusuario'>
              <button
                className='atras-regusuario'
                onClick={() => navigate(-1)}
                type="button"
              >
                <ChevronLeft size={16} />
                <span className='texto-btn-regusuario'>Atrás</span>
              </button>
              <button
                className='guardar-regusuario'
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? 'Guardando...' : 'Guardar'}
              </button>
            </div>
          </div>

          <div className='tabs-regusuario'>
            <div
              className={`tab-regusuario ${activeTab === 'personal' ? 'activo-regusuario' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              <User className='icon' />
              <span className='texto-tab-regusuario'>Información personal</span>
            </div>

            <div
              className={`tab-regusuario ${activeTab === 'password' ? 'activo-regusuario' : ''}`}
              onClick={() => setActiveTab('password')}
            >
              <Lock className='icon' />
              <span className='texto-tab-regusuario'>Contraseña</span>
            </div>
          </div>

          <div className='contenido-regusuario'>
            {activeTab === 'personal' && (
              <form className='form-regusuario'>
                <h2>Información personal:</h2>

                <div className='grupo-regusuario'>
                  <label className='etiqueta-regusuario'>Imagen de perfil</label>
                  <div className='perfil-regusuario'>
                    <div className='imagen-regusuario'>
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Imagen de perfil del usuario"
                          aria-describedby="profile-image-desc"
                        />
                      ) : (
                        <div className='placeholder-imagen' aria-hidden="true">
                          <User size={40} strokeWidth={1} />
                        </div>
                      )}
                    </div>
                    <button
                      className='editar-regusuario'
                      onClick={() => profileInputRef.current.click()}
                      type="button"
                      aria-label="Cambiar imagen de perfil"
                    >
                      <Pencil size={16} aria-hidden="true" />
                    </button>
                    <input
                      type='file'
                      ref={profileInputRef}
                      onChange={handleProfileImageChange}
                      accept='image/*'
                      className='input-file-hidden'
                      aria-describedby="profile-image-desc"
                    />
                    <span id="profile-image-desc" className="sr-only">Seleccione una imagen para el perfil del usuario</span>
                  </div>
                </div>

                <div className='grid-regusuario'>
                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario' htmlFor="tipDoc">
                      Tipo de documento <span className='obligatorio'>*</span>
                    </label>
                    <select
                      id="tipDoc"
                      className={`campo-regusuario ${errors.tipDoc ? 'campo-error' : ''}`}
                      aria-invalid={!!errors.tipDoc}
                      aria-describedby={errors.tipDoc ? 'tipDoc-error' : undefined}
                      {...register('tipDoc', {
                        required: 'El tipo de documento es requerido',
                        validate: validateDocumentType
                      })}
                    >
                      <option disabled value='--'>Seleccione tipo</option>
                      <option value='CC'>Cédula de Ciudadanía (CC)</option>
                      <option value='CE'>Cédula de Extranjería (CE)</option>
                      <option value='Pasaporte'>Pasaporte</option>
                    </select>
                    {errors.tipDoc && (
                      <p id="tipDoc-error" className='mensaje-error' role="alert">
                        {errors.tipDoc.message}
                      </p>
                    )}
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario' htmlFor="doc">
                      Número de documento <span className='obligatorio'>*</span>
                    </label>
                    <input
                      id="doc"
                      type='number'
                      inputMode="numeric"
                      ref={docRef}
                      placeholder='Número de identificación'
                      className={`campo-regusuario ${errors.doc ? 'campo-error' : ''}`}
                      aria-invalid={!!errors.doc}
                      aria-describedby={errors.doc ? 'doc-error' : undefined}
                      {...register('doc', {
                        required: 'El número de documento es requerido',
                        pattern: {
                          value: /^[0-9]+$/,
                          message: 'Solo se permiten números',
                        },
                        minLength: {
                          value: 6,
                          message: 'Mínimo 6 dígitos'
                        },
                        maxLength: {
                          value: 20,
                          message: 'Máximo 20 dígitos'
                        }
                      })}
                    />
                    {errors.doc && (
                      <p id="doc-error" className='mensaje-error' role="alert">
                        {errors.doc.message}
                      </p>
                    )}
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario' htmlFor="nombres">
                      Nombres <span className='obligatorio'>*</span>
                    </label>
                    <input
                      id="nombres"
                      type='text'
                      placeholder='Nombres'
                      className={`campo-regusuario ${errors.nombres ? 'campo-error' : ''}`}
                      aria-invalid={!!errors.nombres}
                      aria-describedby={errors.nombres ? 'nombres-error' : undefined}
                      {...register('nombres', {
                        required: 'Los nombres son requeridos',
                        minLength: {
                          value: 2,
                          message: 'Mínimo 2 caracteres'
                        },
                        maxLength: {
                          value: 50,
                          message: 'Máximo 50 caracteres'
                        },
                        pattern: {
                          value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                          message: 'Solo se permiten letras'
                        }
                      })}
                    />
                    {errors.nombres && (
                      <p id="nombres-error" className='mensaje-error' role="alert">
                        {errors.nombres.message}
                      </p>
                    )}
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario' htmlFor="apellidos">
                      Apellidos <span className='obligatorio'>*</span>
                    </label>
                    <input
                      id="apellidos"
                      type='text'
                      placeholder='Apellidos'
                      className={`campo-regusuario ${errors.apellidos ? 'campo-error' : ''}`}
                      aria-invalid={!!errors.apellidos}
                      aria-describedby={errors.apellidos ? 'apellidos-error' : undefined}
                      {...register('apellidos', {
                        required: 'Los apellidos son requeridos',
                        minLength: {
                          value: 2,
                          message: 'Mínimo 2 caracteres'
                        },
                        maxLength: {
                          value: 50,
                          message: 'Máximo 50 caracteres'
                        },
                        pattern: {
                          value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
                          message: 'Solo se permiten letras'
                        }
                      })}
                    />
                    {errors.apellidos && (
                      <p id="apellidos-error" className='mensaje-error' role="alert">
                        {errors.apellidos.message}
                      </p>
                    )}
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario' htmlFor="fecNac">
                      Fecha de nacimiento <span className='obligatorio'>*</span>
                    </label>
                    <input
                      id="fecNac"
                      type='date'
                      max={legalDate}
                      className={`campo-regusuario ${errors.fecNac ? 'campo-error' : ''}`}
                      aria-invalid={!!errors.fecNac}
                      aria-describedby={errors.fecNac ? 'fecNac-error' : undefined}
                      {...register('fecNac', {
                        required: 'La fecha de nacimiento es requerida',
                        validate: {
                          legalAge: (value) => {
                            const birthDate = new Date(value)
                            const today = new Date()
                            let age = today.getFullYear() - birthDate.getFullYear()
                            const monthDiff = today.getMonth() - birthDate.getMonth()

                            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                              age--
                            }

                            return age >= 18 || 'Debe ser mayor de 18 años'
                          }
                        }
                      })}
                    />
                    {errors.fecNac && (
                      <p id="fecNac-error" className='mensaje-error' role="alert">
                        {errors.fecNac.message}
                      </p>
                    )}
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario' htmlFor="genero">
                      Género <span className='obligatorio'>*</span>
                    </label>
                    <select
                      id="genero"
                      className={`campo-regusuario ${errors.genero ? 'campo-error' : ''}`}
                      aria-invalid={!!errors.genero}
                      aria-describedby={errors.genero ? 'genero-error' : undefined}
                      {...register('genero', {
                        required: 'El género es requerido',
                        validate: validateGender
                      })}
                    >
                      <option disabled value='--'>Seleccione</option>
                      <option value='Femenino'>Femenino</option>
                      <option value='Masculino'>Masculino</option>
                      <option value='Otro'>Otro</option>
                    </select>
                    {errors.genero && (
                      <p id="genero-error" className='mensaje-error' role="alert">
                        {errors.genero.message}
                      </p>
                    )}
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario' htmlFor="cel">
                      Celular <span className='obligatorio'>*</span>
                    </label>
                    <input
                      id="cel"
                      type='number'
                      inputMode="tel"
                      placeholder='Número de celular'
                      className={`campo-regusuario ${errors.cel ? 'campo-error' : ''}`}
                      aria-invalid={!!errors.cel}
                      aria-describedby={errors.cel ? 'cel-error' : undefined}
                      {...register('cel', {
                        required: 'El número de celular es requerido',
                        minLength: {
                          value: 7,
                          message: 'Mínimo 7 dígitos'
                        },
                        maxLength: {
                          value: 15,
                          message: 'Máximo 15 dígitos'
                        }
                      })}
                    />
                    {errors.cel && (
                      <p id="cel-error" className='mensaje-error' role="alert">
                        {errors.cel.message}
                      </p>
                    )}
                  </div>


                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario' htmlFor="direccion">
                      Dirección <span className='obligatorio'>*</span>
                    </label>
                    <input
                      id="direccion"
                      type='text'
                      placeholder='Dirección'
                      className={`campo-regusuario ${errors.direccion ? 'campo-error' : ''}`}
                      aria-invalid={!!errors.direccion}
                      aria-describedby={errors.direccion ? 'direccion-error' : undefined}
                      {...register('direccion', {
                        required: 'La dirección es requerida',
                        minLength: {
                          value: 5,
                          message: 'Mínimo 5 caracteres'
                        },
                        maxLength: {
                          value: 100,
                          message: 'Máximo 100 caracteres'
                        }
                      })}
                    />
                    {errors.direccion && (
                      <p id="direccion-error" className='mensaje-error' role="alert">
                        {errors.direccion.message}
                      </p>
                    )}
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario' htmlFor="email">
                      Correo <span className='obligatorio'>*</span>
                    </label>
                    <input
                      id="email"
                      type='email'
                      placeholder='Email'
                      className={`campo-regusuario ${errors.email ? 'campo-error' : ''}`}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      {...register('email', {
                        required: 'El correo electrónico es requerido',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Ingrese un correo electrónico válido'
                        },
                        maxLength: {
                          value: 100,
                          message: 'Máximo 100 caracteres'
                        }
                      })}
                    />
                    {errors.email && (
                      <p id="email-error" className='mensaje-error' role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario' htmlFor="verifyEmail">
                      Confirmación Correo <span className='obligatorio'>*</span>
                    </label>
                    <input
                      id="verifyEmail"
                      type='email'
                      placeholder='Confirme su correo'
                      className={`campo-regusuario ${errors.verifyEmail ? 'campo-error' : ''}`}
                      aria-invalid={!!errors.verifyEmail}
                      aria-describedby={errors.verifyEmail ? 'verifyEmail-error' : undefined}
                      {...register('verifyEmail', {
                        required: 'La confirmación del correo es requerida',
                        validate: (value) =>
                          value === watch('email') || 'Los correos electrónicos no coinciden',
                        maxLength: {
                          value: 100,
                          message: 'Máximo 100 caracteres'
                        }
                      })}
                    />
                    {errors.verifyEmail && (
                      <p id="verifyEmail-error" className='mensaje-error' role="alert">
                        {errors.verifyEmail.message}
                      </p>
                    )}
                  </div>
                </div>
              </form>
            )}

            {activeTab === 'password' &&
              <Contrasena
                watch={watch}
                register={register}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
              />
            }
          </div>
          <Footer />
        </div>
      </main>
      {notify && (
        <Notification
          {...notify}
        />
      )}
    </main>
  )
}