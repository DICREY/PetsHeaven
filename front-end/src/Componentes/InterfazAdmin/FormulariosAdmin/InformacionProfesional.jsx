// Librarys
import React, { useState, useRef } from "react"
import { Pencil } from "lucide-react"

// Import styles
import "../../../../public/styles/InterfazAdmin/FormuariosAdmin/InformacionProfesional.css"

const InformacionProfesional = ({ register, errors }) => {
  const [cardImage, setCardImage] = useState(null)
  const cardInputRef = useRef(null)

  const handleCardImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setCardImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="info-profesional-container">
      <h2>Información profesional (Si aplica)</h2>

      <div className="grupo-profesional">
        <label className="etiqueta-profesional">Especialidades</label>
        <div className="selector-profesional">
          <select
            name="especialidad"
            className={`campo-selector-profesional ${errors.especialidad ? 'campo-error' : ''}`}
            {...register("especialidad", { required: "Seleccione al menos una especialidad." })}
            defaultValue='--'
          >
            <option disabled value="--">Si aplica, seleccione una o varias</option>
            <option value="medicina">Medicina General</option>
            <option value="pediatria">Pediatría</option>
            <option value="cardiologia">Cardiología</option>
          </select>
        </div>
        {errors.especialidad && <p className="mensaje-error">{errors.especialidad.message}</p>}
      </div>

      <div className="grupo-profesional">
        <label className="etiqueta-profesional">Nº Tarjeta profesional<spam className='obligatorio'>*</spam></label>
        <input
          name="numTargPro"
          type='number'
          max='100'
          aria-valuemax='100'
          placeholder="Número de tarjeta profesional"
          className={`campo-profesional ${errors.numTargPro ? 'campo-error' : ''}`}
          {...register("numTargPro", {
            required: "El número de tarjeta profecional es requerido.",
            pattern: {
              value: /^[0-9]+$/,
              message: "El número de tarjeta profecional debe contener solo números.",
            },
          })}
        />
        {errors.numTargPro && <p className="mensaje-error">{errors.numTargPro.message}</p>}
      </div>

      <div className="grupo-profesional">
        <label className="etiqueta-profesional">Tarjeta profesional</label>
        <div className="tarjeta-container">
          <div className="tarjeta-placeholder">
            {cardImage ? (
              <img src={cardImage || "/placeholder.svg"} alt="Tarjeta profesional" className="tarjeta-imagen" />
            ) : (
              "Tarjeta N/D"
            )}
          </div>
          <button className="editar-tarjeta" onClick={() => cardInputRef.current.click()}>
            <Pencil size={16} />
          </button>
          <input
            type="file"
            ref={cardInputRef}
            onChange={handleCardImageChange}
            accept="image/*"
            className="input-file-hidden"
            {...register("tarjetaProfesional")}
          />
        </div>
        {errors.tarjetaProfesional && <p className="mensaje-error">{errors.tarjetaProfesional.message}</p>}
      </div>
    </div>
  )
}

export default InformacionProfesional