// Librarys
import React, { useState } from "react"
import { ChevronLeft, User, Shield, FileText, Lock } from "lucide-react"

// Imports 
import { InformacionPersonalCrud } from "./InformacionPersonalCrud"
import { RolPrivilegiosCrud } from "./RolPrivilegioCrud"
import { InformacionProfesionalCrud } from "./InformacionProfesionalCrud"
import { ContrasenaCrud } from "./ContrasenaCrud"

// Component
export const ConfiguracionUsuarioCrud = () => {
  const [activeTab, setActiveTab] = useState("personal")
  const [isEditing, setIsEditing] = useState(false)
  const [userData, setUserData] = useState({

    // datos 
    profileImage: null,
    tipoDocumento: "CC",
    numeroDocumento: "1234567890",
    nombres: "Juan Carlos",
    apellidos: "Pérez Rodríguez",
    genero: "Masculino",
    fechaNacimiento: "1990-05-15",
    celular: "3211234567",
    direccion: "Calle 123 # 45-67",
    email: "juancarlos@ejemplo.com",

    // Rol y privilegios
    rol: "Veterinario",

    // Información profesional
    especialidad: "Medicina General",
    numTargPro: "TP-12345",
    tarjetaProfesional: null,

    // Contraseña
    password: "********",
    verifyPassword: "********",
  })

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const handleSaveEdit = () => {
    setIsEditing(false)
    // Aquí iría la lógica para guardar los cambios
    console.log("Guardando cambios:", userData)
  }

  const handleChange = (section, field, value) => {
    setUserData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleTabChange = (tab) => {
    if (isEditing) {
      if (window.confirm("Tiene cambios sin guardar. ¿Desea salir sin guardar?")) {
        setIsEditing(false)
        setActiveTab(tab)
      }
    } else {
      setActiveTab(tab)
    }
  }

  return (
    <div className="contenedor-config-usuario">
      <div className="cabecera-config-usuario">
        <div className="titulo-config-usuario">
          <h1>Configuración del personal</h1>
          <span className="creacion-config-usuario">| Creación</span>
        </div>
        <div className="acciones-config-usuario">
          <button className="atras-config-usuario">
            <ChevronLeft size={16} />
            <span className="texto-btn-config-usuario">Atrás</span>
          </button>

          {isEditing ? (
            <>
              <button className="cancelar-config-usuario" onClick={handleCancelEdit}>
                Cancelar
              </button>
              <button className="guardar-config-usuario" onClick={handleSaveEdit}>
                Guardar
              </button>
            </>
          ) : (
            <button className="editar-config-usuario" onClick={handleEditClick}>
              Editar
            </button>
          )}
        </div>
      </div>

      <div className="tabs-config-usuario">
        <div
          className={`tab-config-usuario ${activeTab === "personal" ? "activo-config-usuario" : ""}`}
          onClick={() => handleTabChange("personal")}
        >
          <User className="icono-config-usuario" size={18} />
          <span className="texto-tab-config-usuario">Información personal</span>
        </div>
        <div
          className={`tab-config-usuario ${activeTab === "roles" ? "activo-config-usuario" : ""}`}
          onClick={() => handleTabChange("roles")}
        >
          <Shield className="icono-config-usuario" size={18} />
          <span className="texto-tab-config-usuario">Rol y privilegios</span>
        </div>
        <div
          className={`tab-config-usuario ${activeTab === "profesional" ? "activo-config-usuario" : ""}`}
          onClick={() => handleTabChange("profesional")}
        >
          <FileText className="icono-config-usuario" size={18} />
          <span className="texto-tab-config-usuario">Información profesional</span>
        </div>
        <div
          className={`tab-config-usuario ${activeTab === "password" ? "activo-config-usuario" : ""}`}
          onClick={() => handleTabChange("password")}
        >
          <Lock className="icono-config-usuario" size={18} />
          <span className="texto-tab-config-usuario">Contraseña</span>
        </div>
      </div>

      <div className="contenido-config-usuario">
        {activeTab === "personal" && (
          <InformacionPersonalCrud
            userData={userData}
            isEditing={isEditing}
            onChange={(field, value) => handleChange("personal", field, value)}
          />
        )}
        {activeTab === "roles" && (
          <RolPrivilegiosCrud
            userData={userData}
            isEditing={isEditing}
            onChange={(field, value) => handleChange("roles", field, value)}
          />
        )}
        {activeTab === "profesional" && (
          <InformacionProfesionalCrud
            userData={userData}
            isEditing={isEditing}
            onChange={(field, value) => handleChange("profesional", field, value)}
          />
        )}
        {activeTab === "password" && (
          <ContrasenaCrud
            userData={userData}
            isEditing={isEditing}
            onChange={(field, value) => handleChange("password", field, value)}
          />
        )}
      </div>
    </div>
  )
}
