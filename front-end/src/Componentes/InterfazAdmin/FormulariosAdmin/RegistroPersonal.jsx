// Librarys
import React, { useEffect, useState, useRef, useContext } from 'react'
import { Pencil, ChevronLeft, User, Shield, FileText, Lock } from 'lucide-react'
import { useForm } from 'react-hook-form' // Importa useForm
import { useNavigate } from 'react-router-dom'

// Imports
import RolPrivilegios from './RolPrivilegios'
import InformacionProfesional from './InformacionProfesional'
import Contrasena from './Contrasena'
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import { errorStatusHandler, LegalAge } from '../../Varios/Util'
import { PostData } from '../../Varios/Requests'
import { Notification } from '../../Global/Notifys'
import { HeaderAdmin } from '../../BarrasNavegacion/HeaderAdmin'
import { AuthContext } from '../../../Contexts/Contexts'
import Footer from '../../Varios/Footer2'

// Import styles
import '../../../../src/styles/InterfazAdmin/FormuariosAdmin/RegistroPersonal.css'

// Component
export const ConfiguracionUsuario = ({ URL = '' }) => {
  // Dynamic vars
  const [activeTab, setActiveTab] = useState('personal')
  const [profileImage, setProfileImage] = useState(null)
  const [notify, setNotify] = useState(null)
  const [ vet, setVet ] = useState(null)
  const profileInputRef = useRef(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue, // Si necesitas setear valores programáticamente
  } = useForm({ mode: 'onChange' })

  // Vars 
  const mainUrl = `${URL}/staff`
  const navigate = useNavigate()
  const legalDate = LegalAge()
  const { admin } = useContext(AuthContext)

  // Manejo de la imagen
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
    console.log(data)
    const datas = {
      nom_per: data.nombres,
      ape_per: data.apellidos,
      fec_nac_per: data.fecNac,
      tip_doc_per: data.tipoDocumento,
      doc_per: data.doc,
      dir_per: data.direccion,
      cel_per: data.cel,
      cel2_per: data.cel2,
      email_per: data.email,
      cont_per: data.password,
      gen_per: data.genero,
      rol_per: data.rol,
      esp_per: data.especialidad,
      num_tar_per: data.numTargPro,
      fot_tar_vet: "no-registrado",
      fot_vet: "no-registrado",
    }
    try {
      setNotify({
        title: 'Cargando',
        message: 'Registrando usuario...',
        load: 1
      })
      const created = await PostData(`${mainUrl}/register`, datas)
      setNotify(null)
      if (created?.created) {
        setNotify({
          title: 'Registrado',
          message: 'Ha sido registrado correctamente',
          close: setNotify,
        })
        setTimeout(() => navigate(-1),2000)
      }
    } catch (err) {
      setNotify(null)
      if(err) {
        const message = errorStatusHandler(err)
        setNotify({
          title: 'Error',
          message: `${message}`,
          close: setNotify,
        })
      }
    }
  }

  useEffect(() => {
    // setTimeout(())
    profileInputRef.current?.focus()
  })

  return (
    <main className='contenedorgesusuario'>
      <NavBarAdmin />
      <main className="principaladminhome">
        <HeaderAdmin URL={URL} />
        <main className="main-contenedor-regusuario">
          <main className="contenedor-regusuario">
            <header className="cabecera-regusuario">
              <div className="titulo-regusuario">
                <h1>Configuración del personal </h1>
                <span className="creacion-regusuario">| Creación</span>
              </div>
              <div className='acciones-regusuario'>
                <button className='BackBtn' onClick={() => navigate('/admin/gestion/usuarios')}>
                  <ChevronLeft className='icon' />
                  <span className='texto-btn-regusuario'>Atrás</span>
                </button>
                <button
                  className='EditBtn'
                  onClick={handleSubmit(onSubmit)}
                >Guardar</button>
              </div>
            </header>

            <section className='tabs-regusuario'>
              <div
                className={`tab-regusuario ${activeTab === 'personal' ? 'activo-regusuario' : ''}`}
                onClick={() => setActiveTab('personal')}
              >
                <User className='icon' />
                <span className='texto-tab-regusuario'>Información personal</span>
              </div>
              <div
                className={`tab-regusuario ${activeTab === 'roles' ? 'activo-regusuario' : ''}`}
                onClick={() => setActiveTab('roles')}
              >
                <Shield className='icon' />
                <span className='texto-tab-regusuario'>Rol y privilegios</span>
              </div>
              <div
                className={`tab-regusuario ${activeTab === 'profesional' ? 'activo-regusuario' : ''}`}
                onClick={() => setActiveTab('profesional')}
              >
                <FileText className='icon' />
                <span className='texto-tab-regusuario'>Información profesional</span>
              </div>
              <div
                className={`tab-regusuario ${activeTab === 'password' ? 'activo-regusuario' : ''}`}
                onClick={() => setActiveTab('password')}
              >
                <Lock className='icon' />
                <span className='texto-tab-regusuario'>Contraseña</span>
              </div>
            </section>

            <section className='contenido-regusuario'>
              {activeTab === 'personal' && (
                <div className='form-regusuario'>
                  <h2>Información personal:</h2>

                  <div className='grupo-regusuario'>
                    <label className='label'>Imagen de perfil <span className="obligatorio">*</span></label>
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
                        <Pencil className='icon' />
                      </button>
                      <input
                        type="file"
                        name="profileInputRef"
                        ref={profileInputRef}
                        onChange={handleProfileImageChange}
                        accept="image/*"
                        className="input-file-hidden"
                      />
                    </div>
                  </div>

                  <div className='grid-regusuario'>
                    <div className='grupo-regusuario'>
                      <label className='label'>Tipo de documento <span className="obligatorio">*</span></label>
                      <select
                        className={`select ${errors.tipoDocumento ? 'campo-error' : ''}`}
                        {...register('tipoDocumento', { required: 'Seleccione un tipo de documento' })}
                        defaultValue='Seleccione tipo'
                      >
                        <option disabled>Seleccione tipo</option>
                        <option value='CC'>Cédula de Ciudadanía</option>
                        <option value='CE'>Cédula de Extranjería</option>
                        <option value='pasaporte'>Pasaporte</option>
                      </select>
                      {errors.tipoDocumento && <p className='mensaje-error'>{errors.tipoDocumento.message}</p>}
                    </div>

                    <div className='grupo-regusuario'>
                      <label className='label'>N° Documento<span className="obligatorio">*</span></label>
                      <input
                        type="number"
                        name="doc"
                        max='20'
                        aria-required
                        aria-valuemax='20'
                        placeholder="Número de identificación"
                        className={`input ${errors.doc ? 'campo-error' : ''}`}
                        {...register("doc", {
                          required: "El número de documento es requerido.",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "El número de documento debe contener solo números.",
                          },
                        })}
                      />
                      {errors.doc && <p className="mensaje-error">{errors.doc.message}</p>}
                    </div>

                    <div className="grupo-regusuario">
                      <label className="label">Nombres <span className="obligatorio">*</span></label>
                      <input
                        type="text"
                        name="nombres"
                        max='100'
                        aria-valuemax='100'
                        aria-required
                        placeholder="Nombres"
                        className={`input ${errors.nombres ? 'campo-error' : ''}`}
                        {...register("nombres", { required: "Los nombres son requeridos." })}
                      />
                      {errors.nombres && <p className="mensaje-error">{errors.nombres.message}</p>}
                    </div>
                    <div className="grupo-regusuario">
                      <label className="label">Apellidos <span className="obligatorio">*</span></label>
                      <input
                        type="text"
                        name="apellidos"
                        max='100'
                        aria-valuemax='100'
                        aria-required
                        placeholder="Apellidos"
                        className={`input ${errors.apellidos ? 'campo-error' : ''}`}
                        {...register("apellidos", { required: "Los apellidos son requeridos." })}
                      />
                      {errors.apellidos && <p className="mensaje-error">{errors.apellidos.message}</p>}
                    </div>
                    <div className="grupo-regusuario">
                      <label className="label">Celular <span className="obligatorio">*</span></label>
                      <input
                        type="tel"
                        name="cel"
                        max='20'
                        aria-valuemax='20'
                        aria-required
                        placeholder="Número de celular"
                        className={`input ${errors.cel ? 'campo-error' : ''}`}
                        {...register("cel", {
                          required: "El número de celular es requerido.",
                          pattern: {
                            value: /^[0-9]+$/,
                            message: "El número de celular debe contener solo números.",
                          },
                          minLength: {
                            value: 7,
                            message: "El número de celular debe tener al menos 7 dígitos.",
                          },
                        })}
                      />
                      {errors.cel && <p className="mensaje-error">{errors.cel.message}</p>}
                    </div>


                    <div className="grupo-regusuario">
                      <label className="label">Dirección <span className="obligatorio">*</span></label>
                      <input
                        type="text"
                        name="direccion"
                        max='100'
                        aria-valuemax='100'
                        aria-required
                        placeholder="Dirección"
                        className={`input ${errors.direccion ? 'campo-error' : ''}`}
                        {...register("direccion", { required: "La dirección es requerida." })}
                      />
                      {errors.direccion && <p className="mensaje-error">{errors.direccion.message}</p>}
                    </div>
                    <div className="grupo-regusuario">
                      <label className="label">Genero <span className="obligatorio">*</span></label>
                      <select
                        className={`select ${errors.genero ? 'campo-error' : ''}`}
                        defaultValue='--'
                        name="genero"
                        {...register("genero", { required: "El género es requerido." })}
                      >
                        <option disabled value='--'>Seleccione</option>
                        <option value="Femenino">Femenino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Otro">Otro</option>
                      </select>
                      {errors.genero && <p className="mensaje-error">{errors.genero.message}</p>}
                    </div>

                    <div className="grupo-regusuario">
                      <label className="label">Fecha de nacimiento <span className="obligatorio">*</span></label>
                      <input
                        type="date"
                        name="fecNac"
                        max={legalDate}
                        aria-required
                        className={`input ${errors.fecNac ? 'campo-error' : ''}`}
                        {...register("fecNac", { required: "La fecha de nacimiento es requerida." })}
                      />
                      {errors.fecNac && <p className="mensaje-error">{errors.fecNac.message}</p>}
                    </div>

                    <div className="grupo-regusuario">
                      <label className="label">Correo <span className="obligatorio">*</span></label>
                      <input
                        type="email"
                        name="email"
                        max='100'
                        aria-valuemax='100'
                        aria-required
                        placeholder="Email"
                        className={`input ${errors.email ? 'campo-error' : ''}`}
                        {...register("email", {
                          required: "El correo electrónico es requerido.",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Ingrese un correo electrónico válido.",
                          },
                        })}
                      />
                      {errors.email && <p className="mensaje-error">{errors.email.message}</p>}
                    </div>

                    <div className='grupo-regusuario'>
                      <label className='label'>Confirmación Correo<span className="obligatorio">*</span></label>
                      <input
                        name='verifyEmail'
                        type='email'
                        max='100'
                        aria-valuemax='100'
                        aria-required
                        placeholder='Confirme su correo'
                        className={`input ${errors.verifyEmail ? 'campo-error' : ''}`}
                        {...register('verifyEmail', {
                          required: 'La confirmación del correo es requerida',
                          validate: value =>
                            value === watch('email') || 'Los correos electrónicos no coinciden',
                        })}
                      />
                      {errors.verifyEmail && <p className='mensaje-error'>{errors.verifyEmail.message}</p>}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'roles' && <RolPrivilegios setVet={setVet} register={register} errors={errors} />}
              {activeTab === 'profesional' && <InformacionProfesional vet={vet} register={register} errors={errors} />}
              {activeTab === 'password' && <Contrasena register={register} errors={errors} />}
            </section>
          </main>
        </main>
        <Footer />
      </main>
      {notify && (
        <Notification
          {...notify}
        />
      )}
    </main>
  )
}