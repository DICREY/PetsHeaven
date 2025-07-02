// Librarys 
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import emailjs from '@emailjs/browser'

// Imports 
import { PostData } from '../Varios/Requests'
import { errorStatusHandler } from '../Varios/Util'
import { Notification } from '../Global/Notifys'

// Import styles 
import '../../../src/styles/Formularios/ForgotPassword.css'

// Component 
const ForgotPassword = ({ URL = ''}) => {
  // Dynamic vars 
  const [enviando, setEnviando] = useState(false)
  const [notify, setNotify] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [userData, setUserData] = useState(null)
  const [emailEnviado, setEmailEnviado] = useState('')
  const [codigoGenerado, setCodigoGenerado] = useState('')
  const [codigoIngresado, setCodigoIngresado] = useState('')
  const [step, setStep] = useState(1)

  // Vars
  const imagenFondo = 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Fondos/fondo.png' 
  const logoUrl = 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/1.png' 
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: 'onChange',
  })

  // Segundo formulario para cambiar contraseña
  const {
    register: registerPass,
    handleSubmit: handleSubmitPass,
    formState: { errors: errorsPass }
  } = useForm({
    mode: 'onChange',
  })

  // Functions 
  // Generate random code 
  const generateCode = (length = 6) => {
    return Math.random().toString().slice(2, 2 + length)
  }

  const sendEmail = async (data) => {
    const Params = {
      name: data.name,
      email: data.email,
      codigoVerificacion: data.code
    }
    console.log('Datos a enviar:', Params)

    try {
      const send = await emailjs.send(
        'service_uxyihs4',
        'template_qro23i8',
        Params,
        'c_HuA2dqs1UP1L1J0'
      )
      if (send) console.log('Email enviado correctamente')
    } catch (err) {
      const message = errorStatusHandler(err)
      setNotify({
        title: 'Error',
        message: `${message}`,
        close: setNotify
      })
    }

  }

  // Paso 1: Verificar email y enviar código
  const onSubmit = async (datas) => {
    setNotify({
      title: 'Verificando...',
      message: 'Verificando que el correo exista en el sistema',
      load: 1
    })
    try {
      setEnviando(true)
      const logg = await PostData(`${URL}/global/verify-email`,{ email:datas.email })
      setNotify(null)
      setEnviando(false)
      if (logg?.success) {
        setUserData(logg.data)
        setEmailEnviado(datas.email)
        const code = await generateCode(6)
        setCodigoGenerado(code)
        setStep(2)
        await sendEmail({
          name: `${logg.data?.nombre} ${logg.data?.apellido}`,
          email: datas?.email,
          code: code
        }) // Generar código y "enviarlo"
        setNotify({
          title: 'Código enviado',
          message: `Hemos enviado un código de verificación al correo ${datas.email}`,
          close: setNotify
        })
      } else {
        setNotify({
          title: 'Error',
          message: logg?.message || 'No se encontró el usuario',
          close: setNotify
        })
      }
    } catch (err) {
      setNotify(null)
      setEnviando(false)
      const message = errorStatusHandler(err)
      setNotify({
        title: 'Error',
        message: `${message}`,
        close: setNotify
      })
    }
  }

  // Paso 2: Verificar código
  const onSubmitCode = (e) => {
    e.preventDefault()
    if (codigoIngresado === codigoGenerado) {
      setStep(3)
      setNotify({
        title: 'Código correcto',
        message: 'Ahora puedes cambiar tu contraseña.',
        close: setNotify
      })
    } else {
      setNotify({
        title: 'Código incorrecto',
        message: 'El código ingresado no es válido.',
        close: setNotify
      })
    }
  }

  // Paso 3: Cambiar contraseña
  const onChangePassword = async (data) => {
    setNotify({
      title: 'Actualizando...',
      message: 'Actualizando contraseña',
      load: 1
    })
    try {
      const changePass = await PostData(`${URL}/global/change-password`, { email: emailEnviado, password: data.password })
      setNotify(null)
      if (changePass?.success) {
        setUserData(null)
        reset()
        setStep(1)
        setCodigoGenerado('')
        setCodigoIngresado('')
        setNotify({
          title: 'Éxito',
          message: 'Contraseña actualizada correctamente',
          close: setNotify
        })
        setTimeout(() => navigate(-1),3000)
      }
    } catch (err) {
      setNotify(null)
      const message = errorStatusHandler(err)
      setNotify({
        title: 'Error',
        message: `${message}`,
        close: setNotify
      })
    }
  }

  return (
    <main className='forgot-container'>
      <section className='forgot-formulario-container'>
        <div className='contenedor-logo-externo'>
          <img src={logoUrl || '/placeholder.svg'} alt='Logo de Pets Heaven, clínica veterinaria.' className='logo-veterinaria' />
        </div>

        <div className='formulario-card-forgot' aria-live='polite'>
          <div className='contenido-formulario-forgot'>
            <div className='encabezado-formulario-forgot'>
              <h2 className='titulo-formulario-forgot'>Recuperar Contraseña</h2>
              <p className='subtitulo-formulario-forgot'>
                {step === 1 && <>Ingresa tu correo electrónico.</>}
                {step === 2 && userData && <>Hola, <strong>{userData.nombre} {userData.apellido}</strong>, ingresa el código que enviamos a tu correo.</>}
                {step === 3 && userData && <>Hola, <strong>{userData.nombre} {userData.apellido}</strong>, ingresa tu nueva contraseña.</>}
              </p>
            </div>

            {step === 1 && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='contenido-paso-forgot'>
                  <div className='grupo-campo-forgot'>
                    <label className='label' htmlFor='email'>
                      Correo Electrónico <span className='obligatorio'>*</span>
                    </label>
                    <input
                      autoFocus
                      id='email'
                      type='email'
                      placeholder='Ingresa tu correo electrónico'
                      className={errors.email ? 'campo-error-forgot input' : 'input'}
                      {...register('email', {
                        required: 'Este campo es obligatorio',
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: 'Ingresa un correo electrónico válido',
                        },
                      })}
                      aria-describedby={errors.email ? 'error-email' : undefined}
                    />
                    {errors.email && <p className='mensaje-error' aria-live='assertive' role='alert'>{errors.email.message}</p>}
                  </div>
                  <button type='submit' className='boton-recuperar' disabled={enviando}>
                    {enviando ? 'Enviando...' : 'Enviar'}
                  </button>
                </div>
              </form>
            )}

            {step === 2 && userData && (
              <form onSubmit={onSubmitCode}>
                <div className='contenido-paso-forgot'>
                  <div className='grupo-campo-forgot'>
                    <label className='label' htmlFor='codigo'>
                      Código de verificación <span className='obligatorio'>*</span>
                    </label>
                    <input
                      id='codigo'
                      type='text'
                      placeholder='Ingresa el código recibido'
                      className='input'
                      value={codigoIngresado}
                      onChange={e => setCodigoIngresado(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <button type='submit' className='boton-recuperar'>
                    Verificar Código
                  </button>
                </div>
              </form>
            )}

            {step === 3 && userData && (
              <form onSubmit={handleSubmitPass(onChangePassword)}>
                <div className='contenido-paso-forgot'>
                  <div className='grupo-campo-forgot'>
                    <label className='label' htmlFor='password'>
                      Nueva Contraseña <span className='obligatorio'>*</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                      <input
                        id='password'
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Ingresa tu nueva contraseña'
                        className={errorsPass.password ? 'campo-error-forgot input' : 'input'}
                        {...registerPass('password', {
                          required: true,
                          minLength: {
                            value: 8,
                            message: 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial',
                          },
                          maxLength: 64,
                          pattern: {
                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*?#|°%&]{8,}$/,
                            message:
                              'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial',
                          },
                        })}
                        aria-describedby={errorsPass.password ? 'error-password' : undefined}
                        autoFocus
                      />
                      <button
                        type='button'
                        className='boton-toggle-password'
                        onClick={() => setShowPassword(v => !v)}
                        aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                        aria-controls='password' // Relaciona con el input
                      >
                        {showPassword ? (
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
                          >
                            <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'></path>
                            <circle cx='12' cy='12' r='3'></circle>
                          </svg>
                        )}
                      </button>
                    </div>
                    {errorsPass.password && (
                    <p className='mensaje-error'
                      aria-live='assertive' // Solo anuncia este mensaje
                      role='alert'>
                      {errorsPass.password.type === 'required'
                        ? 'La contraseña es obligatoria'
                        : errorsPass.password.type === 'minLength'
                          ? 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una minúscula, un número y un carácter especial'
                          : 'La contraseña debe tener al menos una letra mayúscula, una minúscula, un número y un carácter especial'}
                    </p>
                  )}
                  </div> 
                  <button type='submit' className='boton-recuperar'>
                    Cambiar Contraseña
                  </button>
                </div>
              </form>
            )}

            <div className='enlaces-container-forgot'>
              <a href='/user/login' className='enlace'>
                Volver a Iniciar Sesión
              </a>
              <a href='/user/registro' className='enlace-forgot'>
                ¿No tienes una cuenta? Regístrate
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className='forgot-imagen-container'>
        <div className='imagen-fondo-contenedor-forgot'>
          <img src={imagenFondo || '/placeholder.svg'} alt='Una veterinaria sostiene con cuidado la pata de un perro tipo Border Collie mientras le colocan una inyección intravenosa.' className='imagen-fondo-forgot' />
        </div>
        <div className='contenedor-cita-forgot'>
          <h2 className='texto-cita-forgot'>'El amor por los animales es el reflejo de nuestra humanidad'</h2>
          <p className='subtexto-cita-forgot'>En PetsHeaven cuidamos de quienes más amas</p>
        </div>
      </section>
      {notify && (
        <Notification
          {...notify}
        />
      )}
    </main>
  )
}

export default ForgotPassword