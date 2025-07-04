import React from "react"
import { useState } from "react"
import { X, Save, Upload, User, Calendar, Heart } from "lucide-react"
import "../../styles/InterfazCliente/EditarMascota.css"
import { CheckImage } from "../../Utils/Utils"
import { formatDate } from "../Varios/Util"

const EditarMascota = ({ mascota, onGuardar, onCerrar, imgDefault = '' }) => {
  const [formData, setFormData] = useState({
    nom_mas: mascota.nom_mas,
    esp_mas: mascota.esp_mas,
    raz_mas: mascota.raz_mas,
    fec_nac_mas: formatDate(mascota.fec_nac_mas) || '0000-00-00',
    pes_mas: mascota.pes_mas,
    col_mas: mascota.col_mas,
    gen_mas: mascota.gen_mas,
    est_rep_mas: mascota.est_rep_mas,
    fot_mas: mascota.fot_mas,
  })

  const [fotoPreview, setFotoPreview] = useState(mascota.fot_mas)

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
        manejarCambio("img_mas", nuevaFoto)
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
            <X className="icon" />
          </button>
        </div>

        <form className="formulario-editar-mascota" onSubmit={manejarGuardar}>
          <div className="seccion-foto-mascota">
            <div className="header-seccion-mascota">
              <Upload className="icon" color="#00BCD4" />
              <h4 className="titulo-seccion-mascota">Foto de la Mascota</h4>
            </div>

            <div className="contenedor-foto-mascota">
              <div className="foto-actual-mascota">
                <CheckImage
                  src={fotoPreview}
                  alt={formData.nom_mas}
                  className="imagen-editar-mascota"
                  imgDefault={imgDefault}
                />
                <label className="boton-cambiar-foto" htmlFor="foto-input">
                  <Upload className="icon" />
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
                <User className="icon" color="#00BCD4" />
                <h4 className="titulo-seccion-mascota">Información Básica</h4>
              </div>

              <div className="campo-mascota">
                <label className="label-mascota">Nombre:</label>
                <input
                  type="text"
                  className="input-mascota"
                  value={formData.nom_mas}
                  onChange={(e) => manejarCambio("nom_mas", e.target.value)}
                  placeholder="Nombre de la mascota"
                  required
                />
              </div>

              <div className="campo-mascota">
                <label className="label-mascota">Especie:</label>
                <select
                  className="select-mascota"
                  value={formData.esp_mas}
                  onChange={(e) => manejarCambio("esp_mas", e.target.value)}
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
                  value={formData.raz_mas}
                  onChange={(e) => manejarCambio("raz_mas", e.target.value)}
                  placeholder="Raza de la mascota"
                  required
                />
              </div>

              <div className="campo-mascota">
                <label className="label-mascota">Género:</label>
                <select
                  className="select-mascota"
                  value={formData.gen_mas}
                  onChange={(e) => manejarCambio("gen_mas", e.target.value)}
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
                <Calendar className="icon" color="#00BCD4" />
                <h4 className="titulo-seccion-mascota">Características Físicas</h4>
              </div>

              <div className="campo-mascota">
                <label className="label-mascota">Fecha de Nacimiento:</label>
                <input
                  type="date"
                  className="input-mascota"
                  value={formData.fec_nac_mas}
                  onChange={(e) => manejarCambio("fec_nac_mas", Number.parseInt(e.target.value))}
                  max={formatDate(new Date())}
                  placeholder="Fecha de nacimiento"
                  required
                />
              </div>

              <div className="campo-mascota">
                <label className="label-mascota">Peso (kg):</label>
                <input
                  type="number"
                  step="0.1"
                  className="input-mascota"
                  value={formData.pes_mas}
                  onChange={(e) => manejarCambio("pes_mas", Number.parseFloat(e.target.value))}
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
                  value={formData.col_mas}
                  onChange={(e) => manejarCambio("col_mas", e.target.value)}
                  placeholder="Color de la mascota"
                  required
                  />
              </div>

              <div className="campo-mascota">
                <label className="label-mascota">Esterilizado/a:</label>
                <select
                  className="select-mascota"
                  value={formData.est_rep_mas}
                  onChange={(e) => manejarCambio("est_rep_mas", e.target.value)}
                  required
                >
                  <option value="">Seleccionar estado reproductivo</option>
                  <option value="No esterilizado">No esterilizado/a</option>
                  <option value="Esterilizado">Esterilizado/a</option>
                </select>
              </div>
            </div>
          </div>

          <div className="botones-editar-mascota">
            <button type="button" className="boton-cancelar-editar-mascota" onClick={onCerrar}>
              <X className="icon" />
              Cancelar
            </button>
            <button type="submit" className="boton-guardar-editar-mascota">
              <Save className="icon" />
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditarMascota
