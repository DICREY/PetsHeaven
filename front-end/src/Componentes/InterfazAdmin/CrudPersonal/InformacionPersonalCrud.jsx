import React from "react"
import { useRef } from "react"
import { Pencil, User } from "lucide-react"


export const InformacionPersonalCrud = ({ userData, isEditing, onChange }) => {
  const profileInputRef = useRef(null)

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        onChange("profileImage", e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="info-personal-container">
      <h2>Información personal:</h2>

      <div className="info-personal-layout">
        <div className="perfil-info-personal">
          <div className="imagen-info-personal">
            {userData.profileImage ? (
              <img src={userData.profileImage || "/placeholder.svg"} alt="Perfil" />
            ) : (
              <div className="placeholder-imagen">
                <User size={80} strokeWidth={1} />
              </div>
            )}
          </div>
          {isEditing && (
            <>
              <button className="editar-imagen-info-personal" onClick={() => profileInputRef.current.click()}>
                <Pencil size={16} />
              </button>
              <input
                type="file"
                ref={profileInputRef}
                onChange={handleProfileImageChange}
                accept="image/*"
                className="input-file-hidden"
              />
            </>
          )}
        </div>

        <div className="datos-info-personal">
          <div className="grid-info-personal">
            <div className="grupo-info-personal">
              <label className="etiqueta-info-personal">Tipo de documento</label>
              {isEditing ? (
                <select
                  className="campo-info-personal"
                  value={userData.tipoDocumento}
                  onChange={(e) => onChange("tipoDocumento", e.target.value)}
                >
                  <option value="CC">Cédula de Ciudadanía</option>
                  <option value="CE">Cédula de Extranjería</option>
                  <option value="pasaporte">Pasaporte</option>
                </select>
              ) : (
                <div className="valor-info-personal">
                  {userData.tipoDocumento === "CC"
                    ? "Cédula de Ciudadanía"
                    : userData.tipoDocumento === "CE"
                      ? "Cédula de Extranjería"
                      : userData.tipoDocumento === "pasaporte"
                        ? "Pasaporte"
                        : userData.tipoDocumento}
                </div>
              )}
            </div>

            <div className="grupo-info-personal">
              <label className="etiqueta-info-personal">N° Documento</label>
              {isEditing ? (
                <input
                  type="text"
                  className="campo-info-personal"
                  value={userData.numeroDocumento}
                  onChange={(e) => onChange("numeroDocumento", e.target.value)}
                  placeholder="Número de identificación"
                />
              ) : (
                <div className="valor-info-personal">{userData.numeroDocumento}</div>
              )}
            </div>

            <div className="grupo-info-personal">
              <label className="etiqueta-info-personal">Nombres</label>
              {isEditing ? (
                <input
                  type="text"
                  className="campo-info-personal"
                  value={userData.nombres}
                  onChange={(e) => onChange("nombres", e.target.value)}
                  placeholder="Nombres"
                />
              ) : (
                <div className="valor-info-personal">{userData.nombres}</div>
              )}
            </div>

            <div className="grupo-info-personal">
              <label className="etiqueta-info-personal">Apellidos</label>
              {isEditing ? (
                <input
                  type="text"
                  className="campo-info-personal"
                  value={userData.apellidos}
                  onChange={(e) => onChange("apellidos", e.target.value)}
                  placeholder="Apellidos"
                />
              ) : (
                <div className="valor-info-personal">{userData.apellidos}</div>
              )}
            </div>

            <div className="grupo-info-personal">
              <label className="etiqueta-info-personal">Género</label>
              {isEditing ? (
                <select
                  className="campo-info-personal"
                  value={userData.genero}
                  onChange={(e) => onChange("genero", e.target.value)}
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
              ) : (
                <div className="valor-info-personal">{userData.genero}</div>
              )}
            </div>

            <div className="grupo-info-personal">
              <label className="etiqueta-info-personal">Fecha de nacimiento</label>
              {isEditing ? (
                <input
                  type="date"
                  className="campo-info-personal"
                  value={userData.fechaNacimiento}
                  onChange={(e) => onChange("fechaNacimiento", e.target.value)}
                />
              ) : (
                <div className="valor-info-personal">{userData.fechaNacimiento}</div>
              )}
            </div>

            <div className="grupo-info-personal">
              <label className="etiqueta-info-personal">Celular</label>
              {isEditing ? (
                <input
                  type="text"
                  className="campo-info-personal"
                  value={userData.celular}
                  onChange={(e) => onChange("celular", e.target.value)}
                  placeholder="Número de celular"
                />
              ) : (
                <div className="valor-info-personal">{userData.celular}</div>
              )}
            </div>

            <div className="grupo-info-personal">
              <label className="etiqueta-info-personal">Dirección</label>
              {isEditing ? (
                <input
                  type="text"
                  className="campo-info-personal"
                  value={userData.direccion}
                  onChange={(e) => onChange("direccion", e.target.value)}
                  placeholder="Dirección"
                />
              ) : (
                <div className="valor-info-personal">{userData.direccion}</div>
              )}
            </div>

            <div className="grupo-info-personal">
              <label className="etiqueta-info-personal">Correo</label>
              {isEditing ? (
                <input
                  type="email"
                  className="campo-info-personal"
                  value={userData.email}
                  onChange={(e) => onChange("email", e.target.value)}
                  placeholder="Email"
                />
              ) : (
                <div className="valor-info-personal">{userData.email}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


