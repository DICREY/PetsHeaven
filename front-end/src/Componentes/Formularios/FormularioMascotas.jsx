import React from "react"
import "../../../public/styles/Formularios/FormularioMascotas.css"
import { useState, useRef } from 'react';
import { Pencil, ChevronLeft, User, Shield, FileText, Lock } from "lucide-react"
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'

export const FormularioRegMascotas = () => {
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
              <h1>Registro mascota</h1>
              <span className="creacion-regusuario">| Creación</span>
            </div>
            <div className="acciones-regusuario">
              <button className="atras-regusuario" onClick={() => window.location.href = "/gestion/mascotas"}>
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
              <span className="texto-tab-regusuario">Información mascota</span>
            </div>
          </div>

          <div className="contenido-regusuario">
            {activeTab === "personal" && (
              <div className="form-regusuario">
                <h2>Datos Básicos de la Mascota:</h2>

                <div className="grupo-regusuario">
                  <label className="etiqueta-regusuario">Imagen de la mascota</label>
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
                  <label className="etiqueta-regusuario">Nombre de la mascota</label>
                    <input 
                      type="text" 
                      placeholder="Ej: Mia" 
                      className="campo-regusuario"
                      maxLength={50}
                      minLength={3}
                      pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$" 
                      required 
                    />
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Especie</label>
                    <input 
                    type="text" 
                    placeholder="Ej: Felino" 
                    className="campo-regusuario"
                    maxLength={50}
                    minLength={3}
                    pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$" 
                    required 
                    />
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Raza</label>
                    <input 
                    type="text" 
                    placeholder="Ej: Siames" 
                    className="campo-regusuario"
                    maxLength={50}
                    minLength={3}
                    pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$" 
                    required 
                     />
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Color</label>
                    <input 
                    type="text" 
                    placeholder="Ej: Negro con blanco" 
                    className="campo-regusuario"
                    maxLength={50}
                    minLength={3}
                    pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$" 
                    required 
                    />
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Alimento</label>
                    <input
                    type="text" 
                    placeholder="Ej: Royal Cannin" 
                    className="campo-regusuario"
                    maxLength={50}
                    minLength={3}
                    pattern="^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$" 
                    required  
                    />
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Fecha de nacimiento</label>
                    <input 
                    type="date"  
                    className="campo-regusuario"
                    required  
                    />
                  </div>

                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Peso (kg)</label>
                    <input type="text" 
                    placeholder="Peso (en kg)" 
                    className="campo-regusuario" 
                    maxLength={3}
                    minLength={1}
                    pattern="^[0-9]+$"
                    required
                    />
                  </div>
        
                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Sexo de la mascota</label>
                    <select className="campo-regusuario">
                    <option disabled selected>Seleccione tipo</option>
                    <option value="cc">Hembra</option>
                    <option value="cc">Macho</option>
                    </select>
                  </div>
                
                
                  <div className="grupo-regusuario">
                    <label className="etiqueta-regusuario">Estado reproductivo</label>
                    <select className="campo-regusuario">
                    <option disabled selected>Seleccione tipo</option>
                    <option value="">Esterilizado</option>
                    <option value="">No esterilizado</option>
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
