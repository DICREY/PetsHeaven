// Librays
import { useNavigate } from 'react-router-dom'



// Utilidades
export const useRoleRedirect = (roles = []) => {
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

// Get current date
export const LegalAge = () => {
  const currentDate = new Date()

  currentDate.setFullYear(currentDate.getFullYear() - 18)

  return currentDate.toLocaleDateString('en-CA')
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
  img.onerror = () => srcMod = imgDefault

  return <img
    className={`${className}`}
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

export const getName = (token = "") => {
  const decodeToken = decodeJWT(token)
  if (!decodeToken) {
    console.warn("No se pudo decodificar el token para obtener nombre")
    return "Usuario"
  }
  
  const name = decodeToken.names || ""
  const lastName = decodeToken.lastNames || ""
  
  return `${name}${lastName ? " " + lastName : ""}`
}

export const formatDate = (dateString = "") => {
  if(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-CA')
  }
  return false
}

export const searchFilter = (term = '', data = [], headers = [], set = null) => {
  if (!term || !data || !headers || !Array.isArray(data) || !Array.isArray(headers)) return

  // const termLower = term == ''? term.toLowerCase(): term
  const termLower = term.toLowerCase().trim()

  const find = data?.filter(item => {
    return headers?.some(field => 
      item[field]?.toLowerCase().includes(termLower)
    )
  })

  if (find && set) set(find)
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
    
    if (errStatus >= 500) return 'No eres tu soy yo, solo necesito tiempo para actualizar'
    
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
        message = 'Demasiados intentos espera un momento'
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

export const getCookie = (name = '') => {
  const hasToken = document.cookie.split(';').some(item => item.trim().startsWith(`${name}=`));
  return hasToken
}