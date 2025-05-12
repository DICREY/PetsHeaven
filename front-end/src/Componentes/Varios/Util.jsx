// Librays
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'
import { useNavigate } from 'react-router-dom'

//componente de cerrar sesion 
export const Logout = () => {
  const token = localStorage.getItem("token")
  if (token){
    localStorage.setItem('token','')
  }
  window.location.href = "/main"
}

// Back 
export const backUrl = () => {
  const navigate = useNavigate
  return navigate(-1)
}

// Convertir a hora
export const formatoTiempo = (segundos) => {
  const horas = Math.floor(segundos / 3600)
  const minutos = Math.floor((segundos % 3600) / 60)
  const segs = segundos % 60

  return `${horas.toString().padStart(2, '0')}:${minutos
    .toString()
    .padStart(2, '0')}:${segs.toString().padStart(2, '0')}`
}

// Dividir lista en partes 
export const divideList = (array = [], size = 5) => {
  const result = []
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size))
  }
  return result
}

// Verify if load img
export const checkImage = (src = '', alt, imgDefault = '', className = '') => {
  const img = new Image()
  let srcMod = src? src: imgDefault

  img.src = srcMod
  img.onload = () => srcMod
  img.onerror = () => srcMod = imgDefault

  return <img
    className={className}
    src={srcMod}
    alt={alt || "No Registrado"}
  />
}


// decodificar token
export const decodeJWT = (token = "") => {
  try {
    // Validación básica
    if (!token || typeof token !== "string") {
      console.error("Token no es un string válido")
      return null
    }

    // Dividir el token
    const parts = token.split(".")

    if (parts.length !== 3) {
      console.error("Formato JWT inválido (debe tener 3 partes)")
      return null
    }

    const base64Url = parts[1]
    if (!base64Url) {
      console.error("Payload vacío en el token")
      return null
    }

    // Decodificar
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")

    const payload = JSON.parse(atob(base64))

    return payload
  } catch (error) {
    console.error("Error decodificando el token:", error)
    return null
  }
}

export const getRoles = (token = "") => {
  const tokenData = decodeJWT(token)
  if (!tokenData || !tokenData.roles) {
    console.warn("No se encontraron roles en el token")
    return []
  }
  
  // Convierte el string de roles a array (si viene separado por comas)
  return typeof tokenData.roles === "string" 
    ? tokenData.roles.split(",").map(role => role.trim())
    : Array.isArray(tokenData.roles)
      ? tokenData.roles
      : []
}

export const getName = (token = "") => {
  const decodeToken = decodeJWT(token)
  if (!decodeToken) {
    console.warn("No se pudo decodificar el token para obtener nombre")
    return "Usuario"
  }
  
  const name = decodeToken.names || ""
  const lastName = decodeToken.lastNames || ""
  
  return `${name}${lastName ? "_" + lastName : ""}`
}

export const formatDate = (dateString = "") => {
  if(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-CA')
  }
  return false
}

export const getAge = (fec = "") => {
  const calcAge = (fechaNac) => {
    const hoy = new Date()
    const fechaNacDate = new Date(fechaNac)
    
    let edad = hoy.getFullYear() - fechaNacDate.getFullYear()
    const mes = hoy.getMonth() - fechaNacDate.getMonth()
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacDate.getDate())) edad--
    
    return edad
  }

  return calcAge(fec) 
}

export const errorStatusHandler = (status) => {
  const returnMessage = (errStatus) => {
    let message = 'Error interno'
    
    if (errStatus >= 500) return 'Error en el sistema. Intente nuevamente más tarde'
    
    switch (errStatus) {
      case 302:
        message = 'Ya existe en el sistema'
        break

      case 400:
        message = 'Contenido invalido'
        break

      case 401:
        message = 'Usuario o contraseña incorrectos'
        break
      
      case 403:
        message = 'Sesion expirada'
        break
      
      case 404:
        message = 'No se encontro lo que buscas'
        break

      case 409:
        message = 'Conflicto, datos duplicados'
        break

      case 423: 
        message = 'Bloqueado'
        break

      case 425:
        message = 'Demasiado temprano'
        break

      case 429: 
        message = 'Demasiados intentos espera 3 minutos'
        break

      case 498: 
        message = 'Usuario no autorizado'
        break
        
      default:
        message = errStatus
        break
    }
    
    return message
  }
  return returnMessage(status)
}

export const loadingAlert = (
    title = 'Cargando...',
    message= 'Procesando los datos recibidos',
    timeOut = true,
    time = 3000
  ) => {
  Swal.fire({
    title: title,
    html: message,
    timer: time,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
    },
    willClose: () => {
        clearInterval(timeOut)
    }
  })
}