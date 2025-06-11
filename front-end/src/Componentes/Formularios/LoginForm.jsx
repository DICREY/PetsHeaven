// Librarys 
import React, { use, useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'

// Imports 
import { errorStatusHandler, formatoTiempo, checkImage, useRoleRedirect } from '../Varios/Util'
import { AuthContext } from '../../Contexts/Contexts'

// Import styles
import '../../../src/styles/Formularios/login.css'
import { Notification } from '../Global/Notifys'

// Main component 
export const LoginForm = ({ URL = "", arriveTo = '', imgDefault = '' }) => {
  // Dynamic Vars 
  const [verPassword, setVerPassword] = useState(false)
  const [waitTime, setWaitTime] = useState(false)
  const [time, setTime] = useState()
  const [notify, setNotify] = useState(null)
  const { log, login, logout } = useContext(AuthContext)

  // Vars 
  const imagenFondo = 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Fondos/fondo.png'
  const logoUrl = 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/5.png'
  const navigate = useNavigate()

  // Configuración del formulario
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  })

  // Manejador de envío del formulario
  const onSubmit = async (datas) => {
    // Vars
    const url = `${URL}/global/login`
    const firstData = datas.docEmail
    const secondData = datas.password

    setNotify({
      title: 'Validando...',
      message: 'Verificando datos de inicio de sesión',
      load: true
    })

    try {
      const logg = await login(url, firstData, secondData)
      setNotify(null)
      if (logg) {
        setNotify({
          title: 'Bienvenido',
          message: `Hola, ${logg.data?.names} ${logg.data?.lastNames} Feliz día`,
          close: setNotify
        })

        arriveTo = arriveTo ? arriveTo : useRoleRedirect(logg.data?.roles?.split(', '))

        setTimeout(() => {
          navigate(arriveTo)
        }, 2000)
      }
    } catch (err) {
      setNotify(null)
      if (err.status) {
        if (err.status === 429) {
          setWaitTime(true)
        } else setWaitTime(false)
        const message = errorStatusHandler(err.status)
        setNotify({
          title: 'Error',
          message: `${message}`,
          close: setNotify
        })
      } else console.log(err)
    }
  }

  // Función para cambiar la visibilidad de la contraseña
  const cambiarVisibilidadPassword = () => {
    setVerPassword(!verPassword)
  }

  useEffect(() => {
    let intervalo = null

    if (waitTime) {
      // Inicia el contador
      intervalo = setInterval(() => {
        setTime(prev => {
          if (prev <= 0) {
            clearInterval(intervalo)
            setWaitTime(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (intervalo) clearInterval(intervalo)
    }
  }, [waitTime])

  // Resetear a 20 cuando waitTime cambia a true
  useEffect(() => {
    if (waitTime) {
      setTime(20)
    }
  }, [waitTime])

  useEffect(() => {
    if (log) logout
  }, [log])

  return (
    <main className='login-container'>
      <section className='login-formulario-container'>
        <div
          className='contenedor-logo-externo-login'
          onClick={() => navigate('/main')}>
          {checkImage(
            logoUrl,
            'Logo de PetsHeaven con la palabra Pets en celeste y Heaven en negro, en una tipografía moderna.',
            imgDefault,
            'logo-veterinaria-login'
          )}
        </div>

        {/* Contenedor del formulario */}
        <section className='formulario-card-login'>
          <section className='contenido-formulario-login'>
            <header className='encabezado-formulario-login'>
              <h2 className='titulo-formulario-login'>Iniciar Sesión</h2>
              <p className='subtitulo-formulario-login'>Ingresa tus credenciales para acceder</p>
            </header>

            <form onSubmit={handleSubmit(onSubmit)}>
              <section className='contenido-paso-login'>
                <div className='grupo-campo-login'>
                  <label className='label' htmlFor="docEmail">
                    Email <span className='obligatorio-login'>*</span>
                  </label>
                  <input
                    id="docEmail"
                    type='email'
                    placeholder='Número de documento o email'
                    className={errors.docEmail ? 'campo-error-login input' : 'input'}
                    {...register('docEmail', {
                      required: 'Este campo es obligatorio',
                      minLength: {
                        value: 6,
                        message: 'Debe contener al menos 6 caracteres',
                      },
                      maxLength: {
                        value: 100,
                        message: 'Debe contener menos de 100 caracteres',
                      },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'El correo electrónico es inválido',
                      },
                    })}
                    aria-describedby={errors.docEmail ? "docEmail-error" : undefined}
                    aria-invalid={!!errors.docEmail}
                    autoFocus
                    onFocus={(e) => e.target.focus()} // Refuerza el enfoque
                  />
                  {errors.docEmail && (
                    <p id="docEmail-error" className='mensaje-error-login' role="alert" aria-live="assertive">
                      {errors.docEmail.message}
                    </p>
                  )}
                </div>

                <div className='grupo-campo-login'>
                  <label className='label' htmlFor="password">
                    Contraseña <span className='obligatorio-login'>*</span>
                  </label>
                  <div className='contenedor-input-password-login'>
                    <input
                      id="password"
                      type={verPassword ? 'text' : 'password'}
                      placeholder='Contraseña'
                      className={errors.password ? 'campo-error-login input' : 'input'}
                      {...register('password', {
                        required: 'Este campo es obligatorio',
                        minLength: {
                          value: 8,
                          message: 'La contraseña debe tener al menos 8 caracteres',
                        },
                        maxLength: {
                          value: 100,
                          message: 'Debe contener menos de 100 caracteres',
                        },
                      })}
                      aria-describedby={errors.password ? "password-error" : undefined}
                      aria-invalid={!!errors.password}
                    />
                    <button
                      type='button'
                      className='boton-toggle-password-login'
                      onClick={cambiarVisibilidadPassword}
                      aria-label={verPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                      aria-controls="password"
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
                          className='icono-ojo-login'
                          aria-hidden="true"
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
                          className='icono-ojo-login'
                          aria-hidden="true"
                        >
                          <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
                          <circle cx='12' cy='12' r='3'></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p id="password-error" className='mensaje-error-login' role="alert" aria-live="assertive">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  type='submit'
                  className='boton-login'
                  aria-label="Iniciar sesión"
                >
                  Entrar
                </button>
                {
                  waitTime && (
                    <span>
                      Tiempo de espera: {formatoTiempo(time)}
                    </span>
                  )
                }

                <div className='enlaces-container-login'>
                  <Link
                    to='/user/recuperar'
                    className='enlace-login'
                    aria-label="Recuperar contraseña"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                  <Link
                    to='/user/register'
                    className='enlace-login'
                    aria-label="Registrarse como nuevo usuario"
                  >
                    ¿No tienes una cuenta?
                  </Link>
                </div>
              </section>
            </form>
          </section>
        </section>
      </section>

      {/* Sección derecha - Imagen y cita */}
      <section className='login-imagen-container'>
        <picture className='imagen-fondo-contenedor-login'>
          <img src={imagenFondo || '/placeholder.svg'} alt='Una veterinaria sostiene con cuidado la pata de un perro tipo Border Collie mientras le colocan una inyección intravenosa. La persona lleva puesto un uniforme azul y guantes médicos, y tiene dos trenzas largas. El perro está recostado sobre una mesa blanca, mirando directamente a la cámara con expresión tranquila.' className='imagen-fondo-login' />
        </picture>
        <aside className='contenedor-cita-login'>
          <h2 className='texto-cita-login'>'El amor por los animales es el reflejo de nuestra humanidad'</h2>
          <p className='subtexto-cita-login'>En PetsHeaven cuidamos de quienes más amas</p>
        </aside>
      </section>
      {notify && (
        <Notification
          {...notify}
        />)
      }
    </main>
  )
}


