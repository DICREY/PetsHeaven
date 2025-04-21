import React from "react"
import { useState, useRef } from "react"
import { ImageOff, Import, Pencil } from "lucide-react"
import "../../../../public/styles/InterfazAdmin/FormuariosAdmin/InformacionProfesional.css"

const InformacionProfesional = () => {
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
          <select className="campo-selector-profesional">
            <option value="">Si aplica, seleccione una o varias</option>
            <option value="medicina">Medicina General</option>
            <option value="pediatria">Pediatría</option>
            <option value="cardiologia">Cardiología</option>
          </select>
        </div>
      </div>

      <div className="grupo-profesional">
        <label className="etiqueta-profesional">Nº Tarjeta profesional</label>
        <input type="text" placeholder="Número de tarjeta profesional" className="campo-profesional" />
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
          />
        </div>
      </div>
    </div>
  )
}

export default InformacionProfesional
