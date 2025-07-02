import React from "react"
import { useState } from "react"
import { X, Trash2, AlertTriangle, Eye, EyeOff } from "lucide-react"
import "../../styles/InterfazCliente/EliminarCuenta.css"

const EliminarCuenta = ({ usuario, onEliminar, onCerrar }) => {
  const [paso, setPaso] = useState(1)
  const [formData, setFormData] = useState({
    contrasena: "",
    confirmacion: "",
    motivo: "",
  })
  const [mostrarContrasena, setMostrarContrasena] = useState(false)
  const [errores, setErrores] = useState({})

  const motivos = [
    "Ya no necesito el servicio",
    "Problemas con la aplicación",
    "Preocupaciones de privacidad",
    "Cambio a otra clínica",
    "Servicio insatisfactorio",
    "Otro motivo",
  ]

  const manejarCambio = (campo, valor) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }))
    if (errores[campo]) {
      setErrores((prev) => ({ ...prev, [campo]: "" }))
    }
  }

  const validarPaso1 = () => {
    const nuevosErrores = {}

    if (!formData.motivo) {
      nuevosErrores.motivo = "Selecciona un motivo"
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const validarPaso2 = () => {
    const nuevosErrores = {}

    if (!formData.contrasena) {
      nuevosErrores.contrasena = "Ingresa tu contraseña"
    }

    const textoConfirmacion = `ELIMINAR ${usuario.nombre?.toUpperCase() || "CUENTA"}`
    if (formData.confirmacion !== textoConfirmacion) {
      nuevosErrores.confirmacion = `Debes escribir exactamente: ${textoConfirmacion}`
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const siguientePaso = () => {
    if (paso === 1 && validarPaso1()) {
      setPaso(2)
    }
  }

  const confirmarEliminacion = () => {
    if (validarPaso2()) {
      onEliminar(formData)
    }
  }

  const renderizarPaso1 = () => (
    <div className="paso-eliminar-cuenta">
      <div className="advertencia-eliminacion">
        <AlertTriangle size={48} color="#ef4444" />
        <h3 className="titulo-advertencia">¿Estás seguro?</h3>
        <p className="texto-advertencia">
          Esta acción eliminará permanentemente tu cuenta y todos los datos asociados. No podrás recuperar:
        </p>
        <ul className="lista-perdidas">
          <li>Información de tus mascotas</li>
          <li>Historial médico completo</li>
          <li>Citas programadas</li>
          <li>Configuraciones personalizadas</li>
        </ul>
      </div>

      <div className="campo-eliminar">
        <label className="label-eliminar">¿Por qué quieres eliminar tu cuenta?</label>
        <select
          className={`select-eliminar ${errores.motivo ? "error" : ""}`}
          value={formData.motivo}
          onChange={(e) => manejarCambio("motivo", e.target.value)}
        >
          <option value="">Selecciona un motivo</option>
          {motivos.map((motivo) => (
            <option key={motivo} value={motivo}>
              {motivo}
            </option>
          ))}
        </select>
        {errores.motivo && <span className="error-mensaje">{errores.motivo}</span>}
      </div>

      {formData.motivo === "Otro motivo" && (
        <div className="campo-eliminar">
          <label className="label-eliminar">Especifica el motivo:</label>
          <textarea
            className="textarea-eliminar"
            value={formData.otroMotivo || ""}
            onChange={(e) => manejarCambio("otroMotivo", e.target.value)}
            placeholder="Cuéntanos más sobre tu decisión..."
            rows="3"
          />
        </div>
      )}
    </div>
  )

  const renderizarPaso2 = () => {
    const textoConfirmacion = `ELIMINAR ${usuario.nombre?.toUpperCase() || "CUENTA"}`

    return (
      <div className="paso-eliminar-cuenta">
        <div className="confirmacion-final">
          <AlertTriangle size={48} color="#ef4444" />
          <h3 className="titulo-confirmacion">Confirmación Final</h3>
          <p className="texto-confirmacion">Para confirmar la eliminación de tu cuenta, necesitamos que:</p>
        </div>

        <div className="campo-eliminar">
          <label className="label-eliminar">Ingresa tu contraseña:</label>
          <div className="input-contrasena-contenedor">
            <input
              type={mostrarContrasena ? "text" : "password"}
              className={`input-eliminar ${errores.contrasena ? "error" : ""}`}
              value={formData.contrasena}
              onChange={(e) => manejarCambio("contrasena", e.target.value)}
              placeholder="Tu contraseña actual"
            />
            <button
              type="button"
              className="boton-mostrar-contrasena"
              onClick={() => setMostrarContrasena(!mostrarContrasena)}
            >
              {mostrarContrasena ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {errores.contrasena && <span className="error-mensaje">{errores.contrasena}</span>}
        </div>

        <div className="campo-eliminar">
          <label className="label-eliminar">
            Escribe exactamente: <strong>{textoConfirmacion}</strong>
          </label>
          <input
            type="text"
            className={`input-eliminar ${errores.confirmacion ? "error" : ""}`}
            value={formData.confirmacion}
            onChange={(e) => manejarCambio("confirmacion", e.target.value)}
            placeholder={textoConfirmacion}
          />
          {errores.confirmacion && <span className="error-mensaje">{errores.confirmacion}</span>}
        </div>

        <div className="advertencia-final">
          <p>
            <strong>⚠️ Esta acción es irreversible.</strong> Una vez eliminada tu cuenta, no podremos recuperar ningún
            dato.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="overlay-eliminar-cuenta">
      <div className="modal-eliminar-cuenta">
        <div className="header-eliminar-cuenta">
          <div className="titulo-header-eliminar">
            <Trash2 size={24} color="#ef4444" />
            <h3 className="titulo-eliminar-cuenta">Eliminar Cuenta</h3>
          </div>
          <button className="boton-cerrar-eliminar" onClick={onCerrar}>
            <X size={20} />
          </button>
        </div>

        <div className="contenido-eliminar-cuenta">
          <div className="progreso-eliminacion">
            <div className="paso-progreso">
              <div className={`numero-paso ${paso >= 1 ? "activo" : ""}`}>1</div>
              <span className="texto-paso">Motivo</span>
            </div>
            <div className="linea-progreso"></div>
            <div className="paso-progreso">
              <div className={`numero-paso ${paso >= 2 ? "activo" : ""}`}>2</div>
              <span className="texto-paso">Confirmación</span>
            </div>
          </div>

          {paso === 1 ? renderizarPaso1() : renderizarPaso2()}
        </div>

        <div className="botones-eliminar-cuenta">
          {paso === 1 ? (
            <>
              <button className="boton-cancelar-eliminar" onClick={onCerrar}>
                <X size={16} />
                Cancelar
              </button>
              <button className="boton-continuar-eliminar" onClick={siguientePaso}>
                Continuar
              </button>
            </>
          ) : (
            <>
              <button className="boton-volver-eliminar" onClick={() => setPaso(1)}>
                ← Volver
              </button>
              <button className="boton-confirmar-eliminar" onClick={confirmarEliminacion}>
                <Trash2 size={16} />
                Eliminar Cuenta
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default EliminarCuenta
