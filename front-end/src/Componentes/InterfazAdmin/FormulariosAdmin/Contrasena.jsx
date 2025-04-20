import React from "react"
import "../../../../public/styles/InterfazAdmin/FormuariosAdmin/Contrasena.css"

const Contrasena = () => {
  return (
    <div className="contrasena-container">
      <h2>Crea una contraseña</h2>

      <div className="grid-contrasena">
        <div className="grupo-contrasena">
          <label className="etiqueta-contrasena">Contraseña</label>
          <input type="password" placeholder="Nueva contraseña" className="campo-contrasena" />
        </div>

        <div className="grupo-contrasena">
          <label className="etiqueta-contrasena">Confirme la contraseña</label>
          <input type="password" placeholder="Confirme la contraseña" className="campo-contrasena" />
        </div>
      </div>
    </div>
  )
}

export default Contrasena
