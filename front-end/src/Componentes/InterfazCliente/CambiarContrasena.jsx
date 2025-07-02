import React from "react"
import { useState } from "react"
import { X, Save, Lock, Eye, EyeOff } from "lucide-react"
import "../../styles/InterfazCliente/CambiarContrasena.css"

const CambiarContrasena = ({ onGuardar, onCerrar }) => {
  const [formData, setFormData] = useState({
    contrasenaActual: "",
    nuevaContrasena: "",
    confirmarContrasena: "",
  })

  const [mostrarContrasenas, setMostrarContrasenas] = useState({
    actual: false,
    nueva: false,
    confirmar: false,
  })

  const [errores, setErrores] = useState({})

  const manejarCambio = (campo, valor) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }))
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errores[campo]) {
      setErrores((prev) => ({ ...prev, [campo]: "" }))
    }
  }

  const toggleMostrarContrasena = (campo) => {
    setMostrarContrasenas((prev) => ({ ...prev, [campo]: !prev[campo] }))
  }

  const validarFormulario = () => {
    const nuevosErrores = {}

    if (!formData.contrasenaActual) {
      nuevosErrores.contrasenaActual = "La contraseña actual es requerida"
    }

    if (!formData.nuevaContrasena) {
      nuevosErrores.nuevaContrasena = "La nueva contraseña es requerida"
    } else if (formData.nuevaContrasena.length < 8) {
      nuevosErrores.nuevaContrasena = "La contraseña debe tener al menos 8 caracteres"
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.nuevaContrasena)) {
      nuevosErrores.nuevaContrasena = "Debe contener al menos una mayúscula, una minúscula y un número"
    }

    if (!formData.confirmarContrasena) {
      nuevosErrores.confirmarContrasena = "Confirma tu nueva contraseña"
    } else if (formData.nuevaContrasena !== formData.confirmarContrasena) {
      nuevosErrores.confirmarContrasena = "Las contraseñas no coinciden"
    }

    if (formData.contrasenaActual === formData.nuevaContrasena) {
      nuevosErrores.nuevaContrasena = "La nueva contraseña debe ser diferente a la actual"
    }

    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  const manejarGuardar = (e) => {
    e.preventDefault()
    if (validarFormulario()) {
      onGuardar(formData)
    }
  }

  const obtenerFuerzaContrasena = (contrasena) => {
    if (!contrasena) return { nivel: 0, texto: "", color: "#e5e7eb" }

    let puntuacion = 0
    if (contrasena.length >= 8) puntuacion += 1
    if (/[a-z]/.test(contrasena)) puntuacion += 1
    if (/[A-Z]/.test(contrasena)) puntuacion += 1
    if (/\d/.test(contrasena)) puntuacion += 1
    if (/[^a-zA-Z\d]/.test(contrasena)) puntuacion += 1

    const niveles = [
      { nivel: 1, texto: "Muy débil", color: "#ef4444" },
      { nivel: 2, texto: "Débil", color: "#f97316" },
      { nivel: 3, texto: "Regular", color: "#eab308" },
      { nivel: 4, texto: "Fuerte", color: "#22c55e" },
      { nivel: 5, texto: "Muy fuerte", color: "#16a34a" },
    ]

    return niveles[puntuacion - 1] || niveles[0]
  }

  const fuerzaContrasena = obtenerFuerzaContrasena(formData.nuevaContrasena)

  return (
    <div className="overlay-cambiar-contrasena">
      <div className="modal-cambiar-contrasena">
        <div className="header-cambiar-contrasena">
          <div className="titulo-header-contrasena">
            <Lock size={24} color="#00BCD4" />
            <h3 className="titulo-cambiar-contrasena">Cambiar Contraseña</h3>
          </div>
          <button className="boton-cerrar-contrasena" onClick={onCerrar}>
            <X size={20} />
          </button>
        </div>

        <form className="formulario-cambiar-contrasena" onSubmit={manejarGuardar}>
          <div className="contenido-cambiar-contrasena">
            <div className="campo-contrasena">
              <label className="label-contrasena">Contraseña Actual:</label>
              <div className="input-contrasena-contenedor">
                <input
                  type={mostrarContrasenas.actual ? "text" : "password"}
                  className={`input-contrasena ${errores.contrasenaActual ? "error" : ""}`}
                  value={formData.contrasenaActual}
                  onChange={(e) => manejarCambio("contrasenaActual", e.target.value)}
                  placeholder="Ingresa tu contraseña actual"
                />
                <button
                  type="button"
                  className="boton-mostrar-contrasena"
                  onClick={() => toggleMostrarContrasena("actual")}
                >
                  {mostrarContrasenas.actual ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errores.contrasenaActual && <span className="error-mensaje">{errores.contrasenaActual}</span>}
            </div>

            <div className="campo-contrasena">
              <label className="label-contrasena">Nueva Contraseña:</label>
              <div className="input-contrasena-contenedor">
                <input
                  type={mostrarContrasenas.nueva ? "text" : "password"}
                  className={`input-contrasena ${errores.nuevaContrasena ? "error" : ""}`}
                  value={formData.nuevaContrasena}
                  onChange={(e) => manejarCambio("nuevaContrasena", e.target.value)}
                  placeholder="Ingresa tu nueva contraseña"
                />
                <button
                  type="button"
                  className="boton-mostrar-contrasena"
                  onClick={() => toggleMostrarContrasena("nueva")}
                >
                  {mostrarContrasenas.nueva ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.nuevaContrasena && (
                <div className="indicador-fuerza">
                  <div className="barra-fuerza">
                    <div
                      className="progreso-fuerza"
                      style={{
                        width: `${(fuerzaContrasena.nivel / 5) * 100}%`,
                        backgroundColor: fuerzaContrasena.color,
                      }}
                    ></div>
                  </div>
                  <span className="texto-fuerza" style={{ color: fuerzaContrasena.color }}>
                    {fuerzaContrasena.texto}
                  </span>
                </div>
              )}
              {errores.nuevaContrasena && <span className="error-mensaje">{errores.nuevaContrasena}</span>}
            </div>

            <div className="campo-contrasena">
              <label className="label-contrasena">Confirmar Nueva Contraseña:</label>
              <div className="input-contrasena-contenedor">
                <input
                  type={mostrarContrasenas.confirmar ? "text" : "password"}
                  className={`input-contrasena ${errores.confirmarContrasena ? "error" : ""}`}
                  value={formData.confirmarContrasena}
                  onChange={(e) => manejarCambio("confirmarContrasena", e.target.value)}
                  placeholder="Confirma tu nueva contraseña"
                />
                <button
                  type="button"
                  className="boton-mostrar-contrasena"
                  onClick={() => toggleMostrarContrasena("confirmar")}
                >
                  {mostrarContrasenas.confirmar ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errores.confirmarContrasena && <span className="error-mensaje">{errores.confirmarContrasena}</span>}
            </div>

            <div className="requisitos-contrasena">
              <h4 className="titulo-requisitos">Requisitos de la contraseña:</h4>
              <ul className="lista-requisitos">
                <li className={formData.nuevaContrasena.length >= 8 ? "cumplido" : ""}>Al menos 8 caracteres</li>
                <li className={/[a-z]/.test(formData.nuevaContrasena) ? "cumplido" : ""}>Una letra minúscula</li>
                <li className={/[A-Z]/.test(formData.nuevaContrasena) ? "cumplido" : ""}>Una letra mayúscula</li>
                <li className={/\d/.test(formData.nuevaContrasena) ? "cumplido" : ""}>Un número</li>
                <li className={/[^a-zA-Z\d]/.test(formData.nuevaContrasena) ? "cumplido" : ""}>
                  Un carácter especial (opcional)
                </li>
              </ul>
            </div>
          </div>

          <div className="botones-cambiar-contrasena">
            <button type="button" className="boton-cancelar-contrasena" onClick={onCerrar}>
              <X size={16} />
              Cancelar
            </button>
            <button type="submit" className="boton-guardar-contrasena">
              <Save size={16} />
              Cambiar Contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CambiarContrasena
