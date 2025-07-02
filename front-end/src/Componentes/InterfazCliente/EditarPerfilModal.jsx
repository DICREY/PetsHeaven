import React from "react"
import { useState } from "react"
import { X, Save, Upload, User, Mail, MapPin } from "lucide-react"
import "../../styles/InterfazCliente/EditarPerfilModal.css"

const EditarPerfilModal = ({ usuario, onGuardar, onCerrar }) => {
  const [formData, setFormData] = useState({
    nombres: usuario.nombres || "María",
    apellidos: usuario.apellidos || "González",
    fechaNacimiento: usuario.fechaNacimiento || "1990-05-15",
    tipoDocumento: usuario.tipoDocumento || "Cédula",
    documento: usuario.documento || "12345678",
    direccion: usuario.direccion || "Calle Principal 123, Madrid",
    celular: usuario.celular || "+34 612 345 678",
    celular2: usuario.celular2 || "+34 612 345 679",
    email: usuario.email || "maria.gonzalez@email.com",
    genero: usuario.genero || "Femenino",
    avatar: usuario.avatar || "/placeholder.svg?height=120&width=120",
  })

  const [fotoPreview, setFotoPreview] = useState(usuario.avatar || "/placeholder.svg?height=120&width=120")

  const tiposDocumento = ["Cédula", "Pasaporte", "Tarjeta de Identidad", "DNI"]
  const generos = ["Masculino", "Femenino", "Otro", "Prefiero no decir"]

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
        manejarCambio("avatar", nuevaFoto)
      }
      reader.readAsDataURL(file)
    }
  }

  const manejarGuardar = (e) => {
    e.preventDefault()
    onGuardar({ ...usuario, ...formData })
  }

  return (
    <div className="overlay-editar-perfil-modal">
      <div className="modal-editar-perfil">
        <div className="header-editar-perfil">
          <div className="titulo-header-perfil">
            <User size={24} color="#00BCD4" />
            <h3 className="titulo-editar-perfil">Editar Perfil</h3>
          </div>
          <button className="boton-cerrar-editar-perfil" onClick={onCerrar}>
            <X size={20} />
          </button>
        </div>

        <form className="formulario-editar-perfil" onSubmit={manejarGuardar}>
          <div className="seccion-foto-perfil">
            <div className="header-seccion-perfil">
              <Upload size={20} color="#00BCD4" />
              <h4 className="titulo-seccion-perfil">Foto de Perfil</h4>
            </div>

            <div className="contenedor-foto-perfil">
              <div className="foto-actual-perfil">
                <img
                  src={fotoPreview || "/placeholder.svg"}
                  alt={`${formData.nombres} ${formData.apellidos}`}
                  className="imagen-editar-perfil"
                />
                <label className="boton-cambiar-foto-perfil" htmlFor="foto-perfil-input">
                  <Upload size={16} />
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
                <User size={20} color="#00BCD4" />
                <h4 className="titulo-seccion-perfil">Información Personal</h4>
              </div>

              <div className="campo-perfil-modal">
                <label className="label-perfil-modal">Nombres:</label>
                <input
                  type="text"
                  className="input-perfil-modal"
                  value={formData.nombres}
                  onChange={(e) => manejarCambio("nombres", e.target.value)}
                  placeholder="Ingresa tus nombres"
                  required
                />
              </div>

              <div className="campo-perfil-modal">
                <label className="label-perfil-modal">Apellidos:</label>
                <input
                  type="text"
                  className="input-perfil-modal"
                  value={formData.apellidos}
                  onChange={(e) => manejarCambio("apellidos", e.target.value)}
                  placeholder="Ingresa tus apellidos"
                  required
                />
              </div>

              <div className="campo-perfil-modal">
                <label className="label-perfil-modal">Fecha de Nacimiento:</label>
                <input
                  type="date"
                  className="input-perfil-modal"
                  value={formData.fechaNacimiento}
                  onChange={(e) => manejarCambio("fechaNacimiento", e.target.value)}
                  required
                />
              </div>

              <div className="campo-perfil-modal">
                <label className="label-perfil-modal">Tipo de Documento:</label>
                <select
                  className="select-perfil-modal"
                  value={formData.tipoDocumento}
                  onChange={(e) => manejarCambio("tipoDocumento", e.target.value)}
                  required
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
                  value={formData.documento}
                  onChange={(e) => manejarCambio("documento", e.target.value)}
                  placeholder="Número de documento"
                  required
                />
              </div>
            </div>

            <div className="columna-derecha-perfil">
              <div className="header-seccion-perfil">
                <Mail size={20} color="#00BCD4" />
                <h4 className="titulo-seccion-perfil">Información de Contacto</h4>
              </div>

              <div className="campo-perfil-modal">
                <label className="label-perfil-modal">Email:</label>
                <input
                  type="email"
                  className="input-perfil-modal"
                  value={formData.email}
                  onChange={(e) => manejarCambio("email", e.target.value)}
                  placeholder="tu@email.com"
                  required
                />
              </div>

              <div className="campo-perfil-modal">
                <label className="label-perfil-modal">Celular:</label>
                <input
                  type="tel"
                  className="input-perfil-modal"
                  value={formData.celular}
                  onChange={(e) => manejarCambio("celular", e.target.value)}
                  placeholder="+34 600 000 000"
                  required
                />
              </div>

              <div className="campo-perfil-modal">
                <label className="label-perfil-modal">Celular 2:</label>
                <input
                  type="tel"
                  className="input-perfil-modal"
                  value={formData.celular2}
                  onChange={(e) => manejarCambio("celular2", e.target.value)}
                  placeholder="+34 600 000 000"
                />
              </div>

              <div className="campo-perfil-modal">
                <label className="label-perfil-modal">Género:</label>
                <select
                  className="select-perfil-modal"
                  value={formData.genero}
                  onChange={(e) => manejarCambio("genero", e.target.value)}
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
              <MapPin size={20} color="#00BCD4" />
              <h4 className="titulo-seccion-perfil">Dirección</h4>
            </div>

            <div className="campo-perfil-modal">
              <label className="label-perfil-modal">Dirección Completa:</label>
              <textarea
                className="textarea-perfil-modal"
                value={formData.direccion}
                onChange={(e) => manejarCambio("direccion", e.target.value)}
                placeholder="Ingresa tu dirección completa"
                rows="3"
                required
              />
            </div>
          </div>

          <div className="botones-editar-perfil">
            <button type="button" className="boton-cancelar-editar-perfil" onClick={onCerrar}>
              <X size={16} />
              Cancelar
            </button>
            <button type="submit" className="boton-guardar-editar-perfil">
              <Save size={16} />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditarPerfilModal
