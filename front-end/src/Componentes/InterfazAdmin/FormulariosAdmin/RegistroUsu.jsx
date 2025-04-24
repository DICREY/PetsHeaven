// Librarys
import React from 'react'
import { useState, useRef } from 'react'
import { Pencil, ChevronLeft, User, Shield, FileText, Lock } from 'lucide-react'
import { useForm } from 'react-hook-form' // Importa useForm

// Imports
import RolPrivilegios from './RolPrivilegios'
import InformacionProfesional from './InformacionProfesional'
import Contrasena from './Contrasena'
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import { formatDate, errorStatusHandler, loadingAlert } from '../../Varios/Util'
import { PostData } from '../../Varios/Requests'

// Import styles
import '../../../../public/styles/InterfazAdmin/FormuariosAdmin/RegistroUsu.css'

// Component
export const ConfiguracionUsuario = ({ URL = '' }) => {
  // Vars
  const [activeTab, setActiveTab] = useState('personal')
  const [profileImage, setProfileImage] = useState(null)
  const profileInputRef = useRef(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue, // Si necesitas setear valores programáticamente
  } = useForm({ mode: 'onChange' })
  const mainUrl = `${URL}/user`

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
    const datas = {
      nombres: data.nombres,
      apellidos: data.apellidos,
      fec_nac_usu: data.fec_nac,
      tipDoc: data.tipoDocumento,
      doc: data.numeroDocumento,
      direccion: data.direccion,
      cel: data.celular,
      cel2: data.cel2, // Asumo que este campo estará en el formulario si es necesario
      email: data.email,
      cont: data.password, // Asumo que Contrasena gestionará esto
      genero: data.genero,
      rol: data.rol, // Asumo que RolPrivilegios pasará este valor
      esp: data.especialidad, // Asumo que InformacionProfesional pasará este valor
      numTargPro: data.numTargPro, // Asumo que InformacionProfesional pasará este valor
      fot_tar_vet: "no-registrado",
      fot_vet: "no-registrado",
      // Puedes incluir la imagen aquí si la guardaste en un estado o si la manejas con FormData
    }
    try {
      const token = localStorage.getItem('token')
      if (token) {
        loadingAlert('Validando...')
        const created = await PostData(`${mainUrl}/register/personal`, token, datas)
        created.ok && swal({
          icon: 'success',
          title: 'Registrado',
          text: 'Ha sido registrado correctamente',
        })
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

  return (
    <div className='contenedorgesusuario'>
      <NavBarAdmin />
      <main className="principalgesusuario">
        <div className="contenedor-regusuario">
          <div className="cabecera-regusuario">
            <div className="titulo-regusuario">
              <h1>Configuración del personal </h1>
              <span className="creacion-regusuario">| Creación</span>
            </div>
            <div className='acciones-regusuario'>
              <button className='atras-regusuario' onClick={() => window.location.href = '/admin/gestion/usuarios'}>
                <ChevronLeft size={16} />
                <span className='texto-btn-regusuario'>Atrás</span>
              </button>
              <button
                className='guardar-regusuario'
                onClick={handleSubmit(onSubmit)} // Usa handleSubmit de react-hook-form
              >Guardar</button>
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
              className={`tab-regusuario ${activeTab === 'roles' ? 'activo-regusuario' : ''}`}
              onClick={() => setActiveTab('roles')}
            >
              <Shield className='icono-regusuario' size={18} />
              <span className='texto-tab-regusuario'>Rol y privilegios</span>
            </div>
            <div
              className={`tab-regusuario ${activeTab === 'profesional' ? 'activo-regusuario' : ''}`}
              onClick={() => setActiveTab('profesional')}
            >
              <FileText className='icono-regusuario' size={18} />
              <span className='texto-tab-regusuario'>Información profesional</span>
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
              <div className='form-regusuario'>
                <h2>Información personal:</h2>

                <div className='grupo-regusuario'>
                  <label className='etiqueta-regusuario'>Imagen de perfil <span className="obligatorio">*</span></label>
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
                    <label className='etiqueta-regusuario'>Tipo de documento <span className="obligatorio">*</span></label>
                    <select
                      className={`campo-regusuario ${errors.tipoDocumento ? 'campo-error' : ''}`}
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
                    <label className='etiqueta-regusuario'>N° Documento<span className="obligatorio">*</span></label>
                    <input
                      type="text"
                      name="doc"
                      placeholder="Número de identificación"
                      className={`campo-regusuario ${errors.doc ? 'campo-error' : ''}`}
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
                    <label className="etiqueta-regusuario">Nombres <span className="obligatorio">*</span></label>
                    <input
                      type="text"
                      name="nombres"
                      placeholder="Nombres"
                      className={`campo-regusuario ${errors.nombres ? 'campo-error' : ''}`}
                      {...register("nombres", { required: "Los nombres son requeridos." })}
                    />
                    {errors.nombres && <p className="mensaje-error">{errors.nombres.message}</p>}
                  </div>
                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Apellidos <span className="obligatorio">*</span></label>
                    <input
                      type="text"
                      name="apellidos"
                      placeholder="Apellidos"
                      className={`campo-regusuario ${errors.apellidos ? 'campo-error' : ''}`}
                      {...register("apellidos", { required: "Los apellidos son requeridos." })}
                    />
                    {errors.apellidos && <p className="mensaje-error">{errors.apellidos.message}</p>}
                  </div>
                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Celular <span className="obligatorio">*</span></label>
                    <input
                      type="tetx"
                      name="cel"
                      placeholder="Número de celular"
                      className={`campo-regusuario ${errors.cel ? 'campo-error' : ''}`}
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
                    <label className="etiqueta-regusuario">Dirección <span className="obligatorio">*</span></label>
                    <input
                      type="text"
                      name="direccion"
                      placeholder="Dirección"
                      className={`campo-regusuario ${errors.direccion ? 'campo-error' : ''}`}
                      {...register("direccion", { required: "La dirección es requerida." })}
                    />
                    {errors.direccion && <p className="mensaje-error">{errors.direccion.message}</p>}
                  </div>
                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Genero <span className="obligatorio">*</span></label>
                    <select
                      className={`campo-regusuario ${errors.genero ? 'campo-error' : ''}`}
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
                    <label className="etiqueta-regusuario">Fecha de nacimiento <span className="obligatorio">*</span></label>
                    <input
                      type="date"
                      name="fecNac"
                      className={`campo-regusuario ${errors.fecNac ? 'campo-error' : ''}`}
                      {...register("fecNac", { required: "La fecha de nacimiento es requerida." })}
                    />
                    {errors.fecNac && <p className="mensaje-error">{errors.fecNac.message}</p>}
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Correo <span className="obligatorio">*</span></label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      className={`campo-regusuario ${errors.email ? 'campo-error' : ''}`}
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
                    <label className='etiqueta-regusuario'>Confirmación Correo<span className="obligatorio">*</span></label>
                    <input
                      name='verifyEmail'
                      type='email'
                      placeholder='Confirme su correo'
                      className={`campo-regusuario ${errors.verifyEmail ? 'campo-error' : ''}`}
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

            {activeTab === 'roles' && <RolPrivilegios register={register} errors={errors} />}
            {activeTab === 'profesional' && <InformacionProfesional register={register} errors={errors} />}
            {activeTab === 'password' && <Contrasena register={register} errors={errors} />}
          </div>
        </div>
      </main>
    </div>
  )
}