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
    <section className="info-profesional-container" aria-labelledby="titulo-profesional">
      <h2 id="titulo-profesional">Información profesional (Si aplica)</h2>

      <div className="grupo-profesional">
        <label htmlFor="especialidad" className="etiqueta-profesional">Especialidades</label>
        <div className="selector-profesional">
          <select
            id="especialidad"
            name="especialidad"
            className={`campo-selector-profesional ${errors.especialidad ? 'campo-error' : ''}`}
            {...register("especialidad", { required: "Seleccione al menos una especialidad." })}
            defaultValue="--"
            aria-invalid={errors.especialidad ? "true" : "false"}
            aria-describedby={errors.especialidad ? "error-especialidad" : undefined}
          >
            <option disabled value="--">Si aplica, seleccione una o varias</option>
            <option value="medicina">Medicina General</option>
            <option value="pediatria">Pediatría</option>
            <option value="cardiologia">Cardiología</option>
          </select>
        </div>
        {errors.especialidad && (
          <p className="mensaje-error" id="error-especialidad" role="alert">
            {errors.especialidad.message}
          </p>
        )}
      </div>

      <div className="grupo-profesional">
        <label htmlFor="numTargPro" className="etiqueta-profesional">
          Nº Tarjeta profesional<span className="obligatorio" aria-hidden="true">*</span>
        </label>
        <input
          id="numTargPro"
          name="numTargPro"
          type='number'
          max='100'
          aria-valuemax='100'
          placeholder="Número de tarjeta profesional"
          className={`campo-profesional ${errors.numTargPro ? 'campo-error' : ''}`}
          {...register("numTargPro", {
            required: "El número de tarjeta profesional es requerido.",
            pattern: {
              value: /^[0-9]+$/,
              message: "El número de tarjeta profesional debe contener solo números.",
            },
          })}
          aria-invalid={errors.numTargPro ? "true" : "false"}
          aria-describedby={errors.numTargPro ? "error-numTargPro" : undefined}
        />
        {errors.numTargPro && (
          <p className="mensaje-error" id="error-numTargPro" role="alert">
            {errors.numTargPro.message}
          </p>
        )}
      </div>

      <div className="grupo-profesional">
        <label className="etiqueta-profesional">Tarjeta profesional</label>
        <div className="tarjeta-container">
          <div className="tarjeta-placeholder" aria-hidden="true">
            {cardImage ? (
              <img 
                src={cardImage || "/placeholder.svg"} 
                alt="" 
                className="tarjeta-imagen" 
                role="presentation"
              />
            ) : (
              "Tarjeta N/D"
            )}
          </div>
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
            {...register("tarjetaProfesional")}
            aria-describedby={errors.tarjetaProfesional ? "error-tarjetaProfesional" : undefined}
          />
        </div>
        {errors.tarjetaProfesional && (
          <p className="mensaje-error" id="error-tarjetaProfesional" role="alert">
            {errors.tarjetaProfesional.message}
          </p>
        )}
      </div>
    </section>
  )
}

export default InformacionProfesional