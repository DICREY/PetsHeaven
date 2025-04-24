import React from "react"
import { useState } from "react"
import "../../../../public/styles/InterfazAdmin/FormuariosAdmin/Contrasena.css";

export const ContrasenaCrud = ({ userData, isEditing, onChange }) => {
  const [verPassword, setVerPassword] = useState(false)
  const [verConfirmarPassword, setVerConfirmarPassword] = useState(false)

  const cambiarVisibilidadPassword = () => setVerPassword(!verPassword)
  const cambiarVisibilidadConfirmarPassword = () => setVerConfirmarPassword(!verConfirmarPassword)

  return (
    <section className="contrasena-container" aria-labelledby="titulo-contrasena">
      <h2 id="titulo-contrasena">Contraseña</h2>

      <fieldset className="grid-contrasena">
        <legend className="sr-only">Formulario de contraseña</legend>

        <div className="grupo-contrasena">
          <label htmlFor="password" className="etiqueta-contrasena">
            Contraseña
            <span className="obligatorio" aria-hidden="true">
              *
            </span>
          </label>
          <div className="contenedor-input-password">
            {isEditing ? (
              <>
                <input
                  id="password"
                  name="password"
                  type={verPassword ? "text" : "password"}
                  placeholder="Nueva contraseña"
                  className="campo-contrasena"
                  value={userData.password}
                  onChange={(e) => onChange("password", e.target.value)}
                />
                <button
                  type="button"
                  className="boton-toggle-password"
                  onClick={cambiarVisibilidadPassword}
                  aria-label={verPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  aria-expanded={verPassword}
                  aria-controls="password"
                >
                  {verPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icono-ojo"
                      aria-hidden="true"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="icono-ojo"
                      aria-hidden="true"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </>
            ) : (
              <div className="valor-contrasena">••••••••</div>
            )}
          </div>
        </div>

        {isEditing && (
          <div className="grupo-contrasena">
            <label htmlFor="verifyPassword" className="etiqueta-contrasena">
              Confirme la contraseña
              <span className="obligatorio" aria-hidden="true">
                *
              </span>
            </label>
            <div className="contenedor-input-password">
              <input
                id="verifyPassword"
                name="verifyPassword"
                type={verConfirmarPassword ? "text" : "password"}
                placeholder="Confirme la contraseña"
                className="campo-contrasena"
                value={userData.verifyPassword}
                onChange={(e) => onChange("verifyPassword", e.target.value)}
              />
              <button
                type="button"
                className="boton-toggle-password"
                onClick={cambiarVisibilidadConfirmarPassword}
                aria-label={
                  verConfirmarPassword ? "Ocultar confirmación de contraseña" : "Mostrar confirmación de contraseña"
                }
                aria-expanded={verConfirmarPassword}
                aria-controls="verifyPassword"
              >
                {verConfirmarPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icono-ojo"
                    aria-hidden="true"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="icono-ojo"
                    aria-hidden="true"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
          </div>
        )}
      </fieldset>
    </section>
  )
}

