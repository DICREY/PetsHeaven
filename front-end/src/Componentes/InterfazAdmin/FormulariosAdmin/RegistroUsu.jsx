import React from "react"
import { useState, useRef } from "react"
import "../../../../public/styles/InterfazAdmin/FormuariosAdmin/RegistroUsu.css"
import { Pencil, ChevronLeft, User, Shield, FileText, Lock } from "lucide-react"
import RolPrivilegios from "./RolPrivilegios"
import InformacionProfesional from "./InformacionProfesional"
import Contrasena from "./Contrasena"
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'

export const ConfiguracionUsuario = () => {
  const [activeTab, setActiveTab] = useState("personal")
  const [profileImage, setProfileImage] = useState(null)
  const [signatureImage, setSignatureImage] = useState(null)

  const profileInputRef = useRef(null)
  const signatureInputRef = useRef(null)

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

  const handleSignatureImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setSignatureImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="contenedorgesusuario">
      <NavBarAdmin />
      <main className="principalgesusuario">
        <div className="contenedor-regusuario">
          <div className="cabecera-regusuario">
            <div className="titulo-regusuario">
              <h1>Configuración de usuario</h1>
              <span className="creacion-regusuario">Creación</span>
            </div>
            <div className="acciones-regusuario">
              <button className="atras-regusuario" onClick={() => window.location.href = "/gestion/usuarios"}>
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
              className={`tab-regusuario ${activeTab === "roles" ? "activo-regusuario" : ""}`}
              onClick={() => setActiveTab("roles")}
            >
              <Shield className="icono-regusuario" size={18} />
              <span className="texto-tab-regusuario">Rol y privilegios</span>
            </div>
            <div
              className={`tab-regusuario ${activeTab === "profesional" ? "activo-regusuario" : ""}`}
              onClick={() => setActiveTab("profesional")}
            >
              <FileText className="icono-regusuario" size={18} />
              <span className="texto-tab-regusuario">Información profesional</span>
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
                    <select className="campo-regusuario">
                      <option disabled selected>Seleccione tipo</option>
                      <option value="cc">Cédula de Ciudadanía</option>
                      <option value="ce">Cédula de Extranjería</option>
                      <option value="pasaporte">Pasaporte</option>
                    </select>
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">N° Documento</label>
                    <input type="text" placeholder="Número de identificación" className="campo-regusuario" />
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Nombres</label>
                    <input type="text" placeholder="Nombres" className="campo-regusuario" />
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Apellidos</label>
                    <input type="text" placeholder="Apellidos" className="campo-regusuario" />
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Teléfono</label>
                    <input type="tel" placeholder="Número de teléfono" className="campo-regusuario" />
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Dirección</label>
                    <input type="text" placeholder="Dirección" className="campo-regusuario" />
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Correo</label>
                    <input type="email" placeholder="correo@ejemplo.com" className="campo-regusuario" />
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Confirmación Correo</label>
                    <input type="email" placeholder="Confirme su correo" className="campo-regusuario" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "roles" && <RolPrivilegios />}
            {activeTab === "profesional" && <InformacionProfesional />}
            {activeTab === "password" && <Contrasena />}
          </div>
        </div>
      </main>
    </div>
  )
}
