// Librarys 
import React, { useEffect } from "react"
import { useState } from "react"
import { X, Save, Upload, User, Mail, MapPin } from "lucide-react"

// Imports 
import { CheckImage } from "../../Utils/Utils"
import { formatDate } from "../Varios/Util"

// Import styles 
import "../../styles/InterfazCliente/EditarPerfilModal.css"

// Component 
const EditarPerfilModal = ({ onGuardar, onCerrar, currentUser = {}, URL = '', imgDefault = '' }) => {
  // Dynamic vars 
  const [formData, setFormData] = useState()
  const [fotoPreview, setFotoPreview] = useState(currentUser.fot_per)

  // Vars 
  const tiposDocumento = ["Cédula", "Pasaporte", "Tarjeta de Identidad", "DNI"]
  const generos = ["Masculino", "Femenino", "Otro", "Prefiero no decir"]

  // Functions 
  const manejarCambio = (campo, valor) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }))
  }

  const manejarCambioFoto = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const nuevaFoto = e.target.result
        setFotoPreview(nuevaFoto)
        manejarCambio("fot_per", nuevaFoto)
      }
      reader.readAsDataURL(file)
    }
  }

  const manejarGuardar = (e) => {
    e.preventDefault()
    onGuardar(formData)
  }

  useEffect(() => {
    currentUser && setFormData({
      ...currentUser,
      fec_nac_per: formatDate(currentUser.fec_nac_per)
    })
  },[currentUser])

  return (
    <main className="overlay-editar-perfil-modal">
      {formData && (
        <main className="modal-editar-perfil">
          <header className="header-editar-perfil">
            <div className="titulo-header-perfil">
              <User size={24} color="#00BCD4" />
              <h3 className="titulo-editar-perfil">Editar Perfil</h3>
            </div>
            <button className="boton-cerrar-editar-perfil" onClick={onCerrar}>
              <X className="icon" />
            </button>
          </header>

          <form className="formulario-editar-perfil" onSubmit={manejarGuardar}>
            <div className="seccion-foto-perfil">
              <div className="header-seccion-perfil">
                <Upload className="icon" color="#00BCD4" />
                <h4 className="titulo-seccion-perfil">Foto de Perfil</h4>
              </div>

              <div className="contenedor-foto-perfil">
                <div className="foto-actual-perfil">
                  <CheckImage
                    src={fotoPreview}
                    alt={`${formData.nom_per} ${formData.ape_per}`}
                    className="imagen-editar-perfil"
                    imgDefault={imgDefault}
                  />
                  <label className="boton-cambiar-foto-perfil" htmlFor="foto-perfil-input">
                    <Upload className="icon" />
                    Cambiar Foto
                  </label>
                  <input
                    id="foto-perfil-input"
                    type="file"
                    accept="image/*"
                    onChange={manejarCambioFoto}
                    className="input-foto-oculto-perfil"
                  />
                </div>
              </div>
            </div>

            <div className="seccion-informacion-perfil">
              <div className="columna-izquierda-perfil">
                <div className="header-seccion-perfil">
                  <User className="icon" color="#00BCD4" />
                  <h4 className="titulo-seccion-perfil">Información Personal</h4>
                </div>

                <div className="campo-perfil-modal">
                  <label className="label-perfil-modal">Nombres:</label>
                  <input
                    type="text"
                    className="input-perfil-modal"
                    value={formData.nom_per}
                    onChange={(e) => manejarCambio("nom_per", e.target.value)}
                    placeholder="Ingresa tus nombres"
                    required
                  />
                </div>

                <div className="campo-perfil-modal">
                  <label className="label-perfil-modal">Apellidos:</label>
                  <input
                    type="text"
                    className="input-perfil-modal"
                    value={formData.ape_per}
                    onChange={(e) => manejarCambio("ape_per", e.target.value)}
                    placeholder="Ingresa tus apellidos"
                    required
                  />
                </div>

                <div className="campo-perfil-modal">
                  <label className="label-perfil-modal">Fecha de Nacimiento:</label>
                  <input
                    type="date"
                    className="input-perfil-modal"
                    value={formData.fec_nac_per}
                    onChange={(e) => manejarCambio("fec_nac_per", e.target.value)}
                    required
                  />
                </div>

                <div className="campo-perfil-modal">
                  <label className="label-perfil-modal">Tipo de Documento:</label>
                  <select
                    className="select-perfil-modal"
                    value={formData.tip_doc_per}
                    onChange={(e) => manejarCambio("tip_doc_per", e.target.value)}
                    disabled
                  >
                    {tiposDocumento.map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="campo-perfil-modal">
                  <label className="label-perfil-modal">Documento:</label>
                  <input
                    type="text"
                    className="input-perfil-modal"
                    value={formData.doc_per}
                    onChange={(e) => manejarCambio("doc_per", e.target.value)}
                    placeholder="Número de documento"
                    disabled
                  />
                </div>
              </div>

              <div className="columna-derecha-perfil">
                <div className="header-seccion-perfil">
                  <Mail className="icon" color="#00BCD4" />
                  <h4 className="titulo-seccion-perfil">Información de Contacto</h4>
                </div>

                <div className="campo-perfil-modal">
                  <label className="label-perfil-modal">Email:</label>
                  <input
                    type="email"
                    className="input-perfil-modal"
                    value={formData.email_per}
                    onChange={(e) => manejarCambio("email_per", e.target.value)}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className="campo-perfil-modal">
                  <label className="label-perfil-modal">Celular:</label>
                  <input
                    type="tel"
                    className="input-perfil-modal"
                    value={formData.cel_per}
                    onChange={(e) => manejarCambio("cel_per", e.target.value)}
                    placeholder="+34 600 000 000"
                    required
                  />
                </div>

                <div className="campo-perfil-modal">
                  <label className="label-perfil-modal">Celular 2:</label>
                  <input
                    type="tel"
                    className="input-perfil-modal"
                    value={formData.cel2_per}
                    onChange={(e) => manejarCambio("cel2_per", e.target.value)}
                    placeholder="+34 600 000 000"
                  />
                </div>

                <div className="campo-perfil-modal">
                  <label className="label-perfil-modal">Género:</label>
                  <select
                    className="select-perfil-modal"
                    value={formData.gen_per}
                    onChange={(e) => manejarCambio("gen_per", e.target.value)}
                    required
                  >
                    {generos.map((genero) => (
                      <option key={genero} value={genero}>
                        {genero}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="seccion-direccion-perfil">
              <div className="header-seccion-perfil">
                <MapPin className="icon" color="#00BCD4" />
                <h4 className="titulo-seccion-perfil">Dirección</h4>
              </div>

              <div className="campo-perfil-modal">
                <label className="label-perfil-modal">Dirección Completa:</label>
                <textarea
                  className="textarea-perfil-modal"
                  value={formData.dir_per}
                  onChange={(e) => manejarCambio("dir_per", e.target.value)}
                  placeholder="Ingresa tu dirección completa"
                  rows="3"
                  required
                />
              </div>
            </div>

            <div className="botones-editar-perfil">
              <button type="button" className="boton-cancelar-editar-perfil" onClick={onCerrar}>
                <X className="icon" />
                Cancelar
              </button>
              <button type="submit" className="boton-guardar-editar-perfil">
                <Save className="icon" />
                Guardar Cambios
              </button>
            </div>
          </form>
        </main>
    )}
    </main>
  )
}

export default EditarPerfilModal
