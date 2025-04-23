import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../../../public/styles/InterfazAdmin/FormuariosAdmin/Contrasena.css";

const Contrasena = ({ /* handleValue */ }) => { // Elimina handleValue de las props
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const password = watch("password");
  const [verPassword, setVerPassword] = useState(false);
  const [verConfirmarPassword, setVerConfirmarPassword] = useState(false);

  const cambiarVisibilidadPassword = () => setVerPassword(!verPassword);
  const cambiarVisibilidadConfirmarPassword = () => setVerConfirmarPassword(!verConfirmarPassword);

  const onSubmit = (data) => {
    // Aquí puedes manejar la lógica cuando el formulario es válido
    console.log("Contraseñas válidas:", data);
    // Si necesitas pasar los valores al componente padre,
    // deberías usar otra forma, como una función de callback específica.
  };

  return (
    <div className="contrasena-container">
      <h2>Crea una contraseña</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid-contrasena">
          <div className="grupo-contrasena">
            <label className="etiqueta-contrasena">Contraseña<spam className='obligatorio'>*</spam></label>
            <div className="contenedor-input-password">
              <input
                name="password"
                type={verPassword ? "text" : "password"}
                placeholder="Nueva contraseña"
                className={`campo-contrasena ${errors.password ? "campo-error" : ""}`}
                {...register("password", {
                  required: "La contraseña es requerida.",
                  minLength: {
                    value: 8,
                    message: "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial.",
                  },
                  pattern: {
                    value: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message: "La contraseña debe contener al menos una letra, un número y un carácter especial.",
                  },
                })}
                aria-invalid={errors.password ? "true" : "false"}
                aria-describedby={errors.password ? "error-password" : undefined}
                // Elimina onChange={handleValue}
              />
              <button
                type="button"
                className="boton-toggle-password"
                onClick={cambiarVisibilidadPassword}
                aria-label={verPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
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
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mensaje-error" role="alert" id="error-password">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="grupo-contrasena">
            <label className="etiqueta-contrasena">Confirme la contraseña<spam className='obligatorio'>*</spam></label>
            <div className="contenedor-input-password">
              <input
                name="verifyPassword"
                type={verConfirmarPassword ? "text" : "password"}
                placeholder="Confirme la contraseña"
                className={`campo-contrasena ${errors.verifyPassword ? "campo-error" : ""}`}
                {...register("verifyPassword", {
                  required: "La confirmación de la contraseña es requerida.",
                  validate: (value) =>
                    value === password || "Las contraseñas no coinciden.",
                })}
                aria-invalid={errors.verifyPassword ? "true" : "false"}
                aria-describedby={errors.verifyPassword ? "error-verifyPassword" : undefined}
                // Elimina onChange={handleValue}
              />
              <button
                type="button"
                className="boton-toggle-password"
                onClick={cambiarVisibilidadConfirmarPassword}
                aria-label={verConfirmarPassword ? "Ocultar confirmar contraseña" : "Mostrar confirmar contraseña"}
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
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                )}
              </button>
            </div>
            {errors.verifyPassword && (
              <p className="mensaje-error" role="alert" id="error-verifyPassword">
                {errors.verifyPassword.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Contrasena;