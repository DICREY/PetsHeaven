// Librarys 
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

// Import styles 
import '../../../../src/styles/InterfazAdmin/FormuariosAdmin/Contrasena.css'

// Component 
const Contrasena = ({ register, errors }) => {
  const {
    watch,
  } = useForm({ mode: 'onChange' })

  // Vars 
  const password = watch('password')
  const [verPassword, setVerPassword] = useState(false)
  const [verConfirmarPassword, setVerConfirmarPassword] = useState(false)

  // Functions 
  const cambiarVisibilidadPassword = () => setVerPassword(!verPassword)
  const cambiarVisibilidadConfirmarPassword = () => setVerConfirmarPassword(!verConfirmarPassword)

  return (
    <section className='contrasena-container' aria-labelledby='titulo-contrasena'>
      <h2 id='titulo-contrasena'>Crea una contraseña</h2>
      <section>
        <fieldset className='grid-contrasena' border >
          <legend className='sr-only'>Formulario de creación de contraseña</legend>

          <div className='grupo-contrasena'>
            <label htmlFor='password' className='etiqueta-contrasena'>
              Contraseña<span className='obligatorio' aria-hidden='true'>*</span>
            </label>
            <div className='contenedor-input-password'>
              <input
                id='password'
                name='password'
                max='100'
                aria-valuemax='100'
                aria-required
                type={verPassword ? 'text' : 'password'}
                placeholder='Nueva contraseña'
                className={`campo-contrasena ${errors.password ? 'campo-error' : ''}`}
                {...register('password', {
                  required: 'La contraseña es requerida.',
                  minLength: {
                    value: 8,
                    message: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial.',
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?#|°%&]{8,}$/,
                    message: 'La contraseña debe contener al menos una letra, un número y un carácter especial.',
                  },
                })}
                aria-invalid={errors.password ? 'true' : 'false'}
                aria-describedby={errors.password ? 'error-password' : undefined}
              />
              <button
                type='button'
                className='boton-toggle-password'
                onClick={cambiarVisibilidadPassword}
                aria-label={verPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                aria-expanded={verPassword}
                aria-controls='password'
              >
                {verPassword ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='icono-ojo'
                    aria-hidden='true'
                  >
                    <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'></path>
                    <line x1='1' y1='1' x2='23' y2='23'></line>
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='icono-ojo'
                    aria-hidden='true'
                  >
                    <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
                    <circle cx='12' cy='12' r='3'></circle>
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className='mensaje-error' role='alert' id='error-password'>
                {errors.password.message}
              </p>
            )}
          </div>

          <div className='grupo-contrasena'>
            <label htmlFor='verifyPassword' className='etiqueta-contrasena'>
              Confirme la contraseña<span className='obligatorio' aria-hidden='true'>*</span>
            </label>
            <div className='contenedor-input-password'>
              <input
                id='verifyPassword'
                name='verifyPassword'
                max='100'
                aria-valuemax='100'
                aria-required
                type={verConfirmarPassword ? 'text' : 'password'}
                placeholder='Confirme la contraseña'
                className={`campo-contrasena ${errors.verifyPassword ? 'campo-error' : ''}`}
                {...register('verifyPassword', {
                  required: 'La confirmación de la contraseña es requerida.',
                  validate: (value) =>
                    value === password || 'Las contraseñas no coinciden.',
                })}
                aria-invalid={errors.verifyPassword ? 'true' : 'false'}
                aria-describedby={errors.verifyPassword ? 'error-verifyPassword' : undefined}
              />
              <button
                type='button'
                className='boton-toggle-password'
                onClick={cambiarVisibilidadConfirmarPassword}
                aria-label={verConfirmarPassword ? 'Ocultar confirmación de contraseña' : 'Mostrar confirmación de contraseña'}
                aria-expanded={verConfirmarPassword}
                aria-controls='verifyPassword'
              >
                {verConfirmarPassword ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='icono-ojo'
                    aria-hidden='true'
                  >
                    <path d='M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24'></path>
                    <line x1='1' y1='1' x2='23' y2='23'></line>
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='icono-ojo'
                    aria-hidden='true'
                  >
                    <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
                    <circle cx='12' cy='12' r='3'></circle>
                  </svg>
                )}
              </button>
            </div>
            {errors.verifyPassword && (
              <p className='mensaje-error' role='alert' id='error-verifyPassword'>
                {errors.verifyPassword.message}
              </p>
            )}
          </div>
        </fieldset>
      </section>
    </section>
  )
}

export default Contrasena