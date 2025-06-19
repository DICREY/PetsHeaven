// Librarys 
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'

// Import styles 
import '../../../../src/styles/InterfazAdmin/FormuariosAdmin/Contrasena.css'

// Component 
const Contrasena = ({ register, errors }) => {
  const {
    watch,
  } = useForm({ mode: 'onChange' })

  // Dynamic vars
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
        <fieldset className='grid-contrasena'>
          <legend className='sr-only'>Formulario de creación de contraseña</legend>

          <div className='grupo-contrasena'>
            <label htmlFor='password' className='label'>
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
                className={`input ${errors.password ? 'campo-error' : ''}`}
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
                  <Eye className='icon' />
                ) : (
                  <EyeOff className='icon' />
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
            <label htmlFor='verifyPassword' className='label'>
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
                className={`input ${errors.verifyPassword ? 'campo-error' : ''}`}
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
                  <Eye className='icon' />
                ) : (
                  <EyeOff className='icon' />
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