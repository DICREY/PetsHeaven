// Librarys 
import React from 'react'
import { useState, useRef } from 'react'
import { Pencil, ChevronLeft, User, Shield, FileText, Lock } from 'lucide-react'

// Imports 
import RolPrivilegios from './RolPrivilegios'
import InformacionProfesional from './InformacionProfesional'
import Contrasena from './Contrasena'
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import { formatDate,errorStatusHandler,loadingAlert } from '../../Varios/Util'
import { PostData } from '../../Varios/Requests'

// Import styles 
import '../../../../public/styles/InterfazAdmin/FormuariosAdmin/RegistroUsu.css'

// Component 
export const ConfiguracionUsuario = ({ URL = '' }) => {
  // Vars 
  const [activeTab, setActiveTab] = useState('personal')
  const [profileImage, setProfileImage] = useState(null)
  const [targetImage, setTargetImage] = useState(null)
  const [formData,setFormData] = useState({})
  const mainUrl = `${URL}/user`
  const profileInputRef = useRef(null)

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

  // Manejo de los datos proporcionados
  const handleChange = (e) => {
    let { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const sendData = async () => {
    const datas = {
      nombres: formData.nombres,
      apellidos: formData.apellidos,
      fec_nac_usu: formData.fec_nac,
      tipDoc: formData.tipoDocumento,
      doc: formData.numeroDocumento,
      direccion: formData.direccion,
      cel: formData.celular,
      cel2: formData.cel2,
      email: formData.email,
      cont: formData.password,
      genero: formData.genero,
      rol: formData.rol,
      esp: formData.especialidad,
      numTargPro: formData.numTargPro,
      fot_tar_vet: "no-registrado",
      fot_vet: "no-registrado",
      
    }
    try {
      const token = localStorage.getItem('token')
      if (token) {
        loadingAlert('Validando...',)
        const created = await PostData(`${mainUrl}/register/personal`, token, datas)
        created.ok && swal({
          icon: 'success',
          title: 'Registrado',
          text: 'Ha sido registrado correctamente',
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
      <main className="principalgesusuario">
        <div className="contenedor-regusuario">
          <div className="cabecera-regusuario">
            <div className="titulo-regusuario">
              <h1>Configuración del personal </h1>
              <span className="creacion-regusuario">Creación</span>
            </div>
            <div className='acciones-regusuario'>
              <button className='atras-regusuario' onClick={() => window.location.href = '/gestion/usuarios'}>
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
                  <label className='etiqueta-regusuario'>Imagen de perfil</label>
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
                      name=''
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
                    <label className='etiqueta-regusuario'>Tipo de documento</label>
                    <select className='campo-regusuario'
                      onChange={handleChange}
                      name='tipoDocumento'
                      defaultValue='Seleccione tipo'
                    >  
                      <option disabled>Seleccione tipo</option>
                      <option value='CC'>Cédula de Ciudadanía</option>
                      <option value='CE'>Cédula de Extranjería</option>
                      <option value='pasaporte'>Pasaporte</option>
                    </select>
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>N° Documento</label>
                    <input
                      name='numeroDocumento'
                      onChange={handleChange}
                     type='text' placeholder='Número de identificación' className='campo-regusuario' />
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Nombres</label>
                    <input
                      name='nombres'
                      onChange={handleChange}
                     type='text' placeholder='Nombres' className='campo-regusuario' />
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Apellidos</label>
                    <input
                      name='apellidos'
                      onChange={handleChange}
                     type='text' placeholder='Apellidos' className='campo-regusuario' />
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Teléfono</label>
                    <input
                      name='celular'
                      onChange={handleChange}
                     type='tel' placeholder='Número de celular' className='campo-regusuario' />
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Dirección</label>
                    <input
                      name='direccion'
                      onChange={handleChange}
                     type='text' placeholder='Dirección' className='campo-regusuario' />
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Genero</label>
                    <input
                      name='genero'
                      onChange={handleChange}
                      type='text' placeholder='Genero' className='campo-regusuario' />
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Fecha de nacimiento</label>
                    <input
                      name='fec_nac'
                      type='date'
                      onChange={handleChange}
                      className='campo-regusuario' />
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Correo</label>
                    <input
                      name='email'
                      onChange={handleChange}
                      type='email' 
                      placeholder='correo@ejemplo.com' 
                      className='campo-regusuario' />
                  </div>

                  <div className='grupo-regusuario'>
                    <label className='etiqueta-regusuario'>Confirmación Correo</label>
                    <input
                      name='verifyEmail'
                      onChange={handleChange}
                      type='email' 
                      placeholder='Confirme su correo' 
                      className='campo-regusuario' />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'roles' && <RolPrivilegios handleValue={handleChange}/>}
            {activeTab === 'profesional' && <InformacionProfesional handleValue={handleChange} />}
            {activeTab === 'password' && <Contrasena handleValue={handleChange} />}
          </div>
        </div>
      </main>
    </div>
  )
}
