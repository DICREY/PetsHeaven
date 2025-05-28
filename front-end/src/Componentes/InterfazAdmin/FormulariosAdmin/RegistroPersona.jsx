// Librarys
import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pencil, ChevronLeft, User, Lock } from 'lucide-react'
import { useForm } from 'react-hook-form'

// Imports
import Contrasena from './Contrasena'
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import { errorStatusHandler, LegalAge, loadingAlert } from '../../Varios/Util'
import { PostData } from '../../Varios/Requests'

// Import styles
import '../../../../src/styles/InterfazAdmin/FormuariosAdmin/RegistroPersonal.css'
import HeaderUser from '../../BarrasNavegacion/HeaderUser'
import Footer from '../../Varios/Footer2'

export const RegistroPro = ({ URL = '' }) => {
  // Dynamic vars
  const [activeTab, setActiveTab] = useState('personal')
  const [profileImage, setProfileImage] = useState(null)
  const profileInputRef = useRef(null)
  const doc = useRef(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: 'onChange' })

  // Vars 
  const mainUrl = `${URL}/people`
  const navigate = useNavigate()
  const legalDate = LegalAge()

  // Functions
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

  const onSubmit = async (data) => {
    const finalData = { ...data}
    const datas = {
      nombres: finalData.nombres,
      apellidos: finalData.apellidos,
      fechaNacimiento: finalData.fecNac,
      tipoDocumento: finalData.tipDoc,
      numeroDocumento: finalData.doc,
      direccion: finalData.direccion,
      celular: finalData.cel,
      celular2: finalData.cel2,
      email: finalData.email,
      password: finalData.password,
      genero: finalData.genero
    }    

    try {
      const token = localStorage.getItem('token')
      if (token) {
        loadingAlert('Validando...')
        const created = await PostData(`${mainUrl}/register`, token, datas)
        created.data.created && swal({
          icon: 'success',
          title: 'Registrado',
          text: 'Ha sido registrado correctamente',
        })
        console.log(created)
      }
    } catch (err) {
      if (err.status) {
        const message = errorStatusHandler(err.status)
        swal({
          title: 'Error',
          text: `${message}`,
          icon: 'warning',
        })
      } else console.log(err)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      doc.current?.focus()
    },0)
  },[])

  return (
    <div className='contenedorgesusuario'>
      <NavBarAdmin />
      <main className='principalgesusuario'>
        <HeaderUser/>
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
                >
                <ChevronLeft size={16} />
                <span className='texto-btn-regusuario'>Atrás</span>
              </button>
              <button className='guardar-regusuario' onClick={handleSubmit(onSubmit)}>Guardar</button>
            </div>
          </div>

          <div className='tabs-regusuario'>
            <div
              className={`tab-regusuario ${activeTab === 'personal' ? 'activo-regusuario' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              <User className='icono-regusuario' size={18} />
              <span className='texto-tab-regusuario'>Información personal</span>
            </div>

            <div
              className={`tab-regusuario ${activeTab === 'password' ? 'activo-regusuario' : ''}`}
              onClick={() => setActiveTab('password')}
            >
              <Lock className='icono-regusuario' size={18} />
              <span className='texto-tab-regusuario'>Contraseña</span>
            </div>
          </div>

          <div className='contenido-regusuario'>
            {activeTab === 'personal' && (
              <form className='form-regusuario' onSubmit={handleSubmit(onSubmit)}>
                <h2>Información personal:</h2>

                <div className='grupo-regusuario'>
                  <label className='etiqueta-regusuario'>Imagen de perfil <span className='obligatorio'>*</span></label>
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
                      name='profileInputRef'
                      ref={profileInputRef}
                      onChange={handleProfileImageChange}
                      accept='image/*'
                      className='input-file-hidden'
                    />
                  </div>
                </div>

                <div className='grid-regusuario'>
                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Tipo de documento <span className='obligatorio'>*</span></label>
                    <select
                      name='tipDoc'
                      className={`campo-regusuario ${errors.tipDoc ? 'campo-error' : ''}`}
                      autoFocus
                      onFocus={(e) => e.target.focus()} // Refuerza el enfoque
                      defaultValue='--'
                      aria-describedby={errors.tipDoc}
                      {...register('tipDoc', { required: 'El tipo de documento es requerido.' })}
                    >
                      <option disabled value='--'>Seleccione tipo</option>
                      <option value='CC'>Cédula de Ciudadanía (CC)</option>
                      <option value='CE'>Cédula de Extranjería (CE)</option>
                      <option value='Pasaporte'>Pasaporte</option>
                    </select>
                    {errors.tipDoc && <p className='mensaje-error'>{errors.tipDoc.message}</p>}
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Número de documento <span className='obligatorio'>*</span></label>
                    <input
                      type='number'
                      name='doc'
                      max='100'
                      ref={doc}
                      aria-required
                      aria-describedby={errors.doc ? 'Error': undefined}
                      placeholder='Número de identificación'
                      className={`campo-regusuario ${errors.doc ? 'campo-error' : ''}`}
                      {...register('doc', {
                        required: 'El número de documento es requerido.',
                        pattern: {
                          value: /^[0-9]+$/,
                          message: 'El número de documento debe contener solo números.',
                        },
                      })}
                    />
                    {errors.doc && <p className='mensaje-error'>{errors.doc.message}</p>}
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Nombres <span className='obligatorio'>*</span></label>
                    <input
                      aria-describedby={errors.nombres ? 'Error': undefined}
                      type='text'
                      name='nombres'
                      aria-required
                      max='100'
                      placeholder='Nombres'
                      className={`campo-regusuario ${errors.nombres ? 'campo-error' : ''}`}
                      {...register('nombres', { required: 'Los nombres son requeridos.' })}
                    />
                    {errors.nombres && <p className='mensaje-error'>{errors.nombres.message}</p>}
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Apellidos <span className='obligatorio'>*</span></label>
                    <input
                      aria-describedby={errors.apellidos ? 'Error': undefined}
                      type='text'
                      name='apellidos'
                      aria-required
                      max='100'
                      aria-valuemax='100'
                      placeholder='Apellidos'
                      className={`campo-regusuario ${errors.apellidos ? 'campo-error' : ''}`}
                      {...register('apellidos', { required: 'Los apellidos son requeridos.' })}
                    />
                    {errors.apellidos && <p className='mensaje-error'>{errors.apellidos.message}</p>}
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Fecha de nacimiento <span className='obligatorio'>*</span></label>
                    <input
                      aria-describedby={errors.fecNac ? 'Error': undefined}
                      type='date'
                      max={legalDate}
                      name='fecNac'
                      className={`campo-regusuario ${errors.fecNac ? 'campo-error' : ''}`}
                      {...register('fecNac', { required: 'La fecha de nacimiento es requerida.' })}
                    />
                    {errors.fecNac && <p className='mensaje-error'>{errors.fecNac.message}</p>}
                  </div>
                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Genero <span className='obligatorio'>*</span></label>
                    <select
                      className={`campo-regusuario ${errors.genero ? 'campo-error' : ''}`}
                      defaultValue='--'
                      aria-describedby={errors.genero ? 'Error': undefined}
                      name='genero'
                      {...register('genero', { required: 'El género es requerido.' })}
                    >
                      <option disabled value='--'>Seleccione</option>
                      <option value='Femenino'>Femenino</option>
                      <option value='Masculino'>Masculino</option>
                      <option value='Otro'>Otro</option>
                    </select>
                    {errors.genero && <p className='mensaje-error'>{errors.genero.message}</p>}
                  </div>
                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Celular <span className='obligatorio'>*</span></label>
                    <input
                      aria-describedby={errors.cel ? 'Error': undefined}
                      type='tel'
                      name='cel'
                      min='7'
                      aria-valuemin='7'
                      max='20'
                      aria-valuemax='20'
                      aria-required
                      placeholder='Número de celular'
                      className={`campo-regusuario ${errors.cel ? 'campo-error' : ''}`}
                      {...register('cel', {
                        required: 'El número de celular es requerido.',
                        pattern: {
                          value: /^[0-9]+$/,
                          message: 'El número de celular debe contener solo números.',
                        },
                        minLength: {
                          value: 7,
                          message: 'El número de celular debe tener al menos 7 dígitos.',
                        },
                      })}
                    />
                    {errors.cel && <p className='mensaje-error'>{errors.cel.message}</p>}
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Dirección <span className='obligatorio'>*</span></label>
                    <input
                      aria-describedby={errors.direccion ? 'Error': undefined}
                      type='text'
                      name='direccion'
                      max='100'
                      aria-valuemax='100'
                      aria-required
                      placeholder='Dirección'
                      className={`campo-regusuario ${errors.direccion ? 'campo-error' : ''}`}
                      {...register('direccion', { required: 'La dirección es requerida.' })}
                    />
                    {errors.direccion && <p className='mensaje-error'>{errors.direccion.message}</p>}
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Correo <span className='obligatorio'>*</span></label>
                    <input
                      aria-describedby={errors.email ? 'Error': undefined}
                      type='email'
                      name='email'
                      max='100'
                      aria-valuemax='100'
                      aria-required
                      placeholder='Email'
                      className={`campo-regusuario ${errors.email ? 'campo-error' : ''}`}
                      {...register('email', {
                        required: 'El correo electrónico es requerido.',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Ingrese un correo electrónico válido.',
                        },
                      })}
                    />
                    {errors.email && <p className='mensaje-error'>{errors.email.message}</p>}
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Confirmación Correo <span className='obligatorio'>*</span></label>
                    <input
                      aria-describedby={errors.verifyEmail ? 'Error': undefined}
                      type='email'
                      name='verifyEmail'
                      max='100'
                      aria-valuemax='100'
                      aria-required
                      placeholder='Confirme su correo'
                      className={`campo-regusuario ${errors.verifyEmail ? 'campo-error' : ''}`}
                      {...register('verifyEmail', {
                        required: 'La confirmación del correo es requerida.',
                        validate: (value) =>
                          value === watch('email') || 'Los correos electrónicos no coinciden.',
                      })}
                    />
                    {errors.verifyEmail && <p className='mensaje-error'>{errors.verifyEmail.message}</p>}
                  </div>
                </div>
              </form>
            )}
            {
              activeTab === 'password' && 
              <Contrasena 
                watch={watch} 
                register={register} 
                handleSubmit={handleSubmit} 
                onSubmit={onSubmit} 
                errors={errors}
              />}
          </div>
          <Footer/>
        </div>
      </main>
    </div>
  )
}