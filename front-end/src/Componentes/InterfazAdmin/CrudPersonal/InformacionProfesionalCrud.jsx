import { useRef } from "react"
import { Pencil } from "lucide-react"
import "../../../../public/styles/InterfazAdmin/FormuariosAdmin/InformacionProfesional.css"

export const InformacionProfesionalCrud = ({ userData, isEditing, onChange }) => {
  const cardInputRef = useRef(null)

  const handleCardImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        onChange("tarjetaProfesional", e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <section className="info-profesional-container" aria-labelledby="titulo-profesional">
      <h2 id="titulo-profesional">Información profesional (Si aplica)</h2>

      <div className="grupo-profesional">
        <label htmlFor="especialidad" className="etiqueta-profesional">
          Especialidades
        </label>
        <div className="selector-profesional">
          {isEditing ? (
            <select
              id="especialidad"
              name="especialidad"
              className="campo-selector-profesional"
              value={userData.especialidad}
              onChange={(e) => onChange("especialidad", e.target.value)}
            >
              <option value="--">Si aplica, seleccione una o varias</option>
              <option value="medicina">Medicina General</option>
              <option value="pediatria">Pediatría</option>
              <option value="cardiologia">Cardiología</option>
            </select>
          ) : (
            <div className="valor-profesional">
              {userData.especialidad === "medicina"
                ? "Medicina General"
                : userData.especialidad === "pediatria"
                  ? "Pediatría"
                  : userData.especialidad === "cardiologia"
                    ? "Cardiología"
                    : userData.especialidad}
            </div>
          )}
        </div>
      </div>

      <div className="grupo-profesional">
        <label htmlFor="numTargPro" className="etiqueta-profesional">
          Nº Tarjeta profesional
          <span className="obligatorio" aria-hidden="true">
            *
          </span>
        </label>
        {isEditing ? (
          <input
            id="numTargPro"
            name="numTargPro"
            type="text"
            placeholder="Número de tarjeta profesional"
            className="campo-profesional"
            value={userData.numTargPro}
            onChange={(e) => onChange("numTargPro", e.target.value)}
          />
        ) : (
          <div className="valor-profesional">{userData.numTargPro}</div>
        )}
      </div>

      <div className="grupo-profesional">
        <label className="etiqueta-profesional">Tarjeta profesional</label>
        <div className="tarjeta-container">
          <div className="tarjeta-placeholder" aria-hidden="true">
            {userData.tarjetaProfesional ? (
              <img
                src={userData.tarjetaProfesional || "/placeholder.svg"}
                alt=""
                className="tarjeta-imagen"
                role="presentation"
              />
            ) : (
              "Tarjeta N/D"
            )}
          </div>
          {isEditing && (
            <>
              <button
                type="button"
                className="editar-tarjeta"
                onClick={() => cardInputRef.current.click()}
                aria-label="Subir imagen de tarjeta profesional"
              >
                <Pencil size={16} aria-hidden="true" />
              </button>
              <input
                type="file"
                ref={cardInputRef}
                onChange={handleCardImageChange}
                accept="image/*"
                className="input-file-hidden"
              />
            </>
          )}
        </div>
      </div>
    </section>
  )
}

