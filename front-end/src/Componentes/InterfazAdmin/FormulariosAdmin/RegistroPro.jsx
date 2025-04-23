// Librarys 
import React from "react"
import { useState, useRef } from "react"
import { Pencil, ChevronLeft, User, Lock } from "lucide-react"

// Imports 
// import RolPrivilegios from "./RolPrivilegios"
// import InformacionProfesional from "./InformacionProfesional"
import Contrasena from "./Contrasena"
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'

// Import styles
import "../../../../public/styles/InterfazAdmin/FormuariosAdmin/RegistroUsu.css"

export const RegistroPro = () => {
  // Vars 
  const [activeTab, setActiveTab] = useState("personal")
  const [profileImage, setProfileImage] = useState(null)
  const [formData, setFormData] = useState({})
  const profileInputRef = useRef(null)

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
          const created = await PostData(`${mainUrl}/register`, token, datas)
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
    <div className="contenedorgesusuario">
      <NavBarAdmin />
      <main className="principalgesusuario">
        <div className="contenedor-regusuario">
          <div className="cabecera-regusuario">
            <div className="titulo-regusuario">
              <h1>Registro usuario</h1>
              <span className="creacion-regusuario">Creación</span>
            </div>
            <div className="acciones-regusuario" onClick={() => window.location.href = "/consultorio" }>
              <button className="atras-regusuario">
                <ChevronLeft size={16} />
                <span className="texto-btn-regusuario">Atrás</span>
              </button>
              <button className="guardar-regusuario">Guardar</button>
            </div>
          </div>

          <div className="tabs-regusuario">
            <div
              className={`tab-regusuario ${activeTab === "personal" ? "activo-regusuario" : ""}`}
              onClick={() => setActiveTab("personal")}
            >
              <User className="icono-regusuario" size={18} />
              <span className="texto-tab-regusuario">Información personal</span>
            </div>
        
            <div
              className={`tab-regusuario ${activeTab === "password" ? "activo-regusuario" : ""}`}
              onClick={() => setActiveTab("password")}
            >
              <Lock className="icono-regusuario" size={18} />
              <span className="texto-tab-regusuario">Contraseña</span>
            </div>
          </div>

          <div className="contenido-regusuario">
            {activeTab === "personal" && (
              <div className="form-regusuario">
                <h2>Información personal:</h2>

                <div className="grupo-regusuario">
                  <label className="etiqueta-regusuario">Imagen de perfil</label>
                  <div className="perfil-regusuario">
                    <div className="imagen-regusuario">
                      {profileImage ? (
                        <img src={profileImage || "/placeholder.svg"} alt="Perfil" />
                      ) : (
                        <div className="placeholder-imagen">
                          <User size={40} strokeWidth={1} />
                        </div>
                      )}
                    </div>
                    <button className="editar-regusuario" onClick={() => profileInputRef.current.click()}>
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

                <div className="grid-regusuario">
                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Tipo de documento</label>
                    <select 
                      name="tipDoc"
                      className="campo-regusuario"
                      defaultValue='--'
                      onChange={handleChange}
                    >
                      <option disabled value='--'>Seleccione tipo</option>
                      <option value="cc">Cédula de Ciudadanía (CC)</option>
                      <option value="ce">Cédula de Extranjería (CE)</option>
                      <option value="pasaporte">Pasaporte</option>
                    </select>
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Número de documento</label>
                    <input
                      onChange={handleChange}
                      type="text" 
                      name="doc"
                      placeholder="Número de identificación" className="campo-regusuario" />
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Nombres</label>
                    <input
                      onChange={handleChange}
                      type="text" 
                      name="nombres"
                      placeholder="Nombres" className="campo-regusuario" />
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Apellidos</label>
                    <input
                      onChange={handleChange}
                      type="text" 
                      name="apellidos"
                      placeholder="Apellidos" className="campo-regusuario" />
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Fecha de nacimiento</label>
                    <input
                      onChange={handleChange}
                      type="date" 
                      name="fecNac"
                      className="campo-regusuario"
                      required  
                    />
                  </div>
                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Genero</label>
                    <select className="campo-regusuario"
                      defaultValue='--'
                      name="genero"
                      onChange={handleChange}
                    >
                      <option disabled value='--'>Seleccione</option>
                      <option value="">Femenino</option>
                      <option value="">Masculino</option>
                      <option value="">otro</option>
                    </select>
                  </div>
                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Celular</label>
                    <input
                      onChange={handleChange}
                      type="tel" 
                      name="cel"
                      placeholder="Número de celular" className="campo-regusuario" />
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Dirección</label>
                    <input
                      onChange={handleChange}
                      type="text" 
                      name="direccion"
                      placeholder="Dirección" className="campo-regusuario" />
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Correo</label>
                    <input
                      onChange={handleChange}
                      type="email" 
                      name="email"
                      placeholder="Email" className="campo-regusuario" />
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Confirmación Correo</label>
                    <input
                      onChange={handleChange}
                      type="email" 
                      name="verifyEmail"
                      placeholder="Confirme su correo" className="campo-regusuario" />
                  </div>
                </div>
              </div>
            )}
            {activeTab === "password" && <Contrasena />}
          </div>
        </div>
      </main>
    </div>
  )
}
