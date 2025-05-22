// Librarys 
import React,{ useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'
import swal from 'sweetalert'

// Imports 
import { login } from '../Varios/Requests'
import { getRoles, errorStatusHandler, formatoTiempo, checkImage } from '../Varios/Util'

// Import styles
import '../../../src/styles/Formularios/login.css'
import { Loading } from '../Global/Notifys'

// Main component 
export const LoginForm = ({ URL = "", arriveTo = '', imgDefault = ''}) => {
  // Dynamic Vars 
  const [verPassword, setVerPassword] =  useState(false)
  const [waitTime, setWaitTime] =  useState(false)
  const [time, setTime] = useState()
  const [validating, setValidating] = useState(false)
  
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

  const useRoleRedirect = (roles = []) => {
    const roleRoutes = {
      'Administrador': '/admin/gestion/usuarios',
      'Veterinario': '/gestion/mascotas',
      'default': '/user/pets'
    }
    
    // Determinar la ruta basada en jerarquía de roles
    const path = roles.includes('Administrador') 
    ? roleRoutes['Administrador']
    : roles.includes('Veterinario') 
    ? roleRoutes['Veterinario']
    : roleRoutes['default']

    return path
  }

  // Manejador de envío del formulario
  const onSubmit = async (datas) => {
    // Vars
    const url = `${URL}/global/login`
    const firstData = datas.docEmail
    const secondData = datas.password
    setValidating(true)
    
    try {
      const log = await login(url,firstData,secondData)

      setValidating(false)
      if (log) {
        const token = localStorage.getItem("token")
        const roles = getRoles(token)
        arriveTo = arriveTo? arriveTo: useRoleRedirect(roles)
        
        if(token){ 
          swal({
            title: 'Bienvenido',
            icon: 'success',
            text: 'Gracias por visitar nuestra pagina web',
            buttons: false
          })
          setTimeout(() => {
            navigate(arriveTo)
          },2000)
        } 
      } else console.log(log)
      

    } catch (err) {
      if(err.status) {
        if (err.status === 429) {
          setWaitTime(true)
        } else setWaitTime(false)
        const message = errorStatusHandler(err.status)
        swal({
          title: 'Error',
          text: `${message}`,
          icon: 'warning',
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
          if(prev <= 0) {
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
      setTime(180)
    }
  }, [waitTime])

  return (
    <div className='login-container'>
      <div className='login-formulario-container'>
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
        <div className='formulario-card-login'>
          <div className='contenido-formulario-login'>
            <div className='encabezado-formulario-login'>
              <h2 className='titulo-formulario-login'>Iniciar Sesión</h2>
              <p className='subtitulo-formulario-login'>Ingresa tus credenciales para acceder</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='contenido-paso-login'>
              <div className='grupo-campo-login'>
                <label className='label' htmlFor="docEmail">
                  Documento o Email <span className='obligatorio-login'>*</span>
                </label>
                <input
                  id="docEmail"
                  type='text'
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
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Sección derecha - Imagen y cita */}
      <div className='login-imagen-container'>
        <div className='imagen-fondo-contenedor-login'>
          <img src={imagenFondo || '/placeholder.svg'} alt='Una veterinaria sostiene con cuidado la pata de un perro tipo Border Collie mientras le colocan una inyección intravenosa. La persona lleva puesto un uniforme azul y guantes médicos, y tiene dos trenzas largas. El perro está recostado sobre una mesa blanca, mirando directamente a la cámara con expresión tranquila.' className='imagen-fondo-login' />
        </div>
        <div className='contenedor-cita-login'>
          <h2 className='texto-cita-login'>'El amor por los animales es el reflejo de nuestra humanidad'</h2>
          <p className='subtexto-cita-login'>En PetsHeaven cuidamos de quienes más amas</p>
        </div>
      </div>
      {validating && (
        <Loading 
          title='Validando...'
          message='Verificando datos de inicio de sesión'
        />)
      }
    </div>
  )
}


