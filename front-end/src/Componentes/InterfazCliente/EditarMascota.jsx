import React from "react"
import { useState } from "react"
import { X, Save, Upload, User, Calendar, Heart } from "lucide-react"
import "../../styles/InterfazCliente/EditarMascota.css"

const EditarMascota = ({ mascota, onGuardar, onCerrar }) => {
  const [formData, setFormData] = useState({
    nombre: mascota.nombre,
    especie: mascota.especie,
    raza: mascota.raza,
    edad: mascota.edad,
    peso: mascota.peso,
    color: mascota.color,
    genero: mascota.genero,
    esterilizado: mascota.esterilizado,
    foto: mascota.foto,
  })

  const [fotoPreview, setFotoPreview] = useState(mascota.foto)

  const especies = ["Perro", "Gato", "Conejo", "Ave", "Reptil", "Pez", "Roedor"]
  const generos = ["Macho", "Hembra"]

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
        manejarCambio("foto", nuevaFoto)
      }
      reader.readAsDataURL(file)
    }
  }

  const manejarGuardar = (e) => {
    e.preventDefault()
    onGuardar({ ...mascota, ...formData })
  }

  return (
    <div className="overlay-editar-mascota">
      <div className="modal-editar-mascota">
        <div className="header-editar-mascota">
          <div className="titulo-header-mascota">
            <Heart size={24} color="#00BCD4" />
            <h3 className="titulo-editar-mascota">Editar Mascota</h3>
          </div>
          <button className="boton-cerrar-editar-mascota" onClick={onCerrar}>
            <X size={20} />
          </button>
        </div>

        <form className="formulario-editar-mascota" onSubmit={manejarGuardar}>
          <div className="seccion-foto-mascota">
            <div className="header-seccion-mascota">
              <Upload size={20} color="#00BCD4" />
              <h4 className="titulo-seccion-mascota">Foto de la Mascota</h4>
            </div>

            <div className="contenedor-foto-mascota">
              <div className="foto-actual-mascota">
                <img
                  src={fotoPreview || "/placeholder.svg?height=120&width=120"}
                  alt={formData.nombre}
                  className="imagen-editar-mascota"
                />
                <label className="boton-cambiar-foto" htmlFor="foto-input">
                  <Upload size={16} />
                  Cambiar Foto
                </label>
                <input
                  id="foto-input"
                  type="file"
                  accept="image/*"
                  onChange={manejarCambioFoto}
                  className="input-foto-oculto"
                />
              </div>
            </div>
          </div>

          <div className="seccion-informacion-mascota">
            <div className="columna-izquierda-mascota">
              <div className="header-seccion-mascota">
                <User size={20} color="#00BCD4" />
                <h4 className="titulo-seccion-mascota">Información Básica</h4>
              </div>

              <div className="campo-mascota">
                <label className="label-mascota">Nombre:</label>
                <input
                  type="text"
                  className="input-mascota"
                  value={formData.nombre}
                  onChange={(e) => manejarCambio("nombre", e.target.value)}
                  placeholder="Nombre de la mascota"
                  required
                />
              </div>

              <div className="campo-mascota">
                <label className="label-mascota">Especie:</label>
                <select
                  className="select-mascota"
                  value={formData.especie}
                  onChange={(e) => manejarCambio("especie", e.target.value)}
                  required
                >
                  <option value="">Seleccionar especie</option>
                  {especies.map((especie) => (
                    <option key={especie} value={especie}>
                      {especie}
                    </option>
                  ))}
                </select>
              </div>

              <div className="campo-mascota">
                <label className="label-mascota">Raza:</label>
                <input
                  type="text"
                  className="input-mascota"
                  value={formData.raza}
                  onChange={(e) => manejarCambio("raza", e.target.value)}
                  placeholder="Raza de la mascota"
                  required
                />
              </div>

              <div className="campo-mascota">
                <label className="label-mascota">Género:</label>
                <select
                  className="select-mascota"
                  value={formData.genero}
                  onChange={(e) => manejarCambio("genero", e.target.value)}
                  required
                >
                  <option value="">Seleccionar género</option>
                  {generos.map((genero) => (
                    <option key={genero} value={genero}>
                      {genero}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="columna-derecha-mascota">
              <div className="header-seccion-mascota">
                <Calendar size={20} color="#00BCD4" />
                <h4 className="titulo-seccion-mascota">Características Físicas</h4>
              </div>

              <div className="campo-mascota">
                <label className="label-mascota">Edad (años):</label>
                <input
                  type="number"
                  className="input-mascota"
                  value={formData.edad}
                  onChange={(e) => manejarCambio("edad", Number.parseInt(e.target.value))}
                  min="0"
                  max="30"
                  placeholder="Edad en años"
                  required
                />
              </div>

              <div className="campo-mascota">
                <label className="label-mascota">Peso (kg):</label>
                <input
                  type="number"
                  step="0.1"
                  className="input-mascota"
                  value={formData.peso}
                  onChange={(e) => manejarCambio("peso", Number.parseFloat(e.target.value))}
                  min="0"
                  placeholder="Peso en kilogramos"
                  required
                />
              </div>

              <div className="campo-mascota">
                <label className="label-mascota">Color:</label>
                <input
                  type="text"
                  className="input-mascota"
                  value={formData.color}
                  onChange={(e) => manejarCambio("color", e.target.value)}
                  placeholder="Color de la mascota"
                  required
                />
              </div>

              <div className="campo-checkbox-mascota">
                <label className="checkbox-editar-mascota">
                  <input
                    type="checkbox"
                    checked={formData.esterilizado}
                    onChange={(e) => manejarCambio("esterilizado", e.target.checked)}
                  />
                  <span className="checkmark-editar-mascota"></span>
                  Esterilizado/a
                </label>
              </div>
            </div>
          </div>

          <div className="botones-editar-mascota">
            <button type="button" className="boton-cancelar-editar-mascota" onClick={onCerrar}>
              <X size={16} />
              Cancelar
            </button>
            <button type="submit" className="boton-guardar-editar-mascota">
              <Save size={16} />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditarMascota
