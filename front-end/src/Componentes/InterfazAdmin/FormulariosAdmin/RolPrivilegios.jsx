import React from "react"
import { useState } from "react"
import { InfoIcon } from "lucide-react"
import "../../../../public/styles/InterfazAdmin/FormuariosAdmin/RolPrivilegios.css"

const RolPrivilegios = ({ handleValue }) => {
  const [agendaAdmin, setAgendaAdmin] = useState(false)
  const [agendaPersonal, setAgendaPersonal] = useState(true)

  return (
    <div className="rol-privilegios-container">
      <h2>Perfil del personal</h2>
      <div className="nota-admin">
        <InfoIcon size={16} className="info-icon" />
        <span>Esta configuración solo es editable por un rol administrador.</span>
      </div>

      <div className="seccion-rol">
        <div className="grupo-rol">
          <label className="etiqueta-rol">Rol</label>
          <div className="selector-rol">
            <select 
              name="rol"
              className="campo-selector"
              onChange={handleValue}
              defaultValue='--'
            >
              <option value="--" disabled>Seleccione una opción</option>
              <option value="Administrador">Administrador</option>
              <option value="Veterinario">Veterinario</option>
            </select>
          </div>
        </div>
        <p className="descripcion-rol">El rol determina los privilegios generales que tendrá el usuario.</p>
      </div>

      <div className="separador"></div>

      <div className="seccion-privilegios">
        <h3>Privilegios de agenda</h3>
        {/* Sección de privilegios de agenda vacía como solicitado */}
      </div>
    </div>
  )
}

export default RolPrivilegios;