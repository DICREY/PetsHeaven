import React from "react"
import { useState } from "react"
import { InfoIcon } from "lucide-react"
import "../../../../public/styles/InterfazAdmin/FormuariosAdmin/RolPrivilegios.css"

const RolPrivilegios = () => {
  const [agendaAdmin, setAgendaAdmin] = useState(false)
  const [agendaPersonal, setAgendaPersonal] = useState(true)

  return (
    <div className="rol-privilegios-container">
      <h2>Perfil del usuario</h2>
      <div className="nota-admin">
        <InfoIcon size={16} className="info-icon" />
        <span>Esta configuración solo es editable por un rol administrador.</span>
      </div>

      <div className="seccion-rol">
        <div className="grupo-rol">
          <label className="etiqueta-rol">Rol</label>
          <div className="selector-rol">
            <select className="campo-selector">
              <option value="">Seleccione una opción</option>
              <option value="admin">Administrador</option>
              <option value="user">Usuario</option>
              <option value="guest">Invitado</option>
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