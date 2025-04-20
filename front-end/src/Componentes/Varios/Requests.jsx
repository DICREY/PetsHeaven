import { getName, decodeJWT } from './Util'

// Vars
const HeaderWeb = {
    "Content-Type": "application/json",
    "x-api-key": "pets_heaven_vite",
}

// Functions 
// Traer datos
export async function GetDataGlobal(URL = "") {
    try {
        const response = await fetch(URL,{
            method: "GET",
            headers: {
                'User': "Desconocido",
                ...HeaderWeb
            }
        })

        if (!response.ok) {
            throw await response.json()
        }

        const data = await response.json()
        return data.result[0]
    } catch (error) {
        throw error
    }
}
export async function GetData(URL = "",token = "") {
    try {
        const response = await fetch(URL,{
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'User': getName(token),
                'Roles': decodeJWT(token).roles,
                ...HeaderWeb
            }
        })

        if (!response.ok) {
            throw response
        }

        const data = await response.json()
        return data.result[0]
    } catch (error) {
        throw error
    }
}
// Enviar datos 
export async function PostData(URL = "", token = "", datas = {}) {
    try {
        const response = await fetch(URL, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'User': getName(token),
                'Roles': decodeJWT(token).roles,
                ...HeaderWeb
            },
            body: JSON.stringify(datas)
        })
  
      // Manejar diferentes códigos de estado
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const error = new Error(errorData.message || `HTTP error! status: ${response.status}`)
        error.status = response.status
        error.data = errorData
        throw error
      }
  
      // Parsear la respuesta como JSON
      const data = await response
      return data
  
    } catch (error) {
        throw error
    }
}
// Modificar datos
export async function ModifyData(URL = "", token = "", datas = {}) {
    try {
        const response = await fetch(URL,{
            method:"PUT",
            headers: {
                'Authorization': `Bearer ${token}`,
                'User': getName(token),
                'Roles': decodeJWT(token).roles,
                ...HeaderWeb
            },
            body: JSON.stringify(datas),
        })

        if (!response.ok) {
            throw response
        }

        // Parsear la respuesta como JSON
        const data = await response
        return data

    } catch (error) {
        throw error
    }
}
// Delete data
export async function DeleteData(URL = "", token = "", datas = {}) {
    try {
        const response = await fetch(URL,{
            method:"DELETE",
            headers: {
                'Authorization': `Bearer ${token}`,
                'User': getName(token),
                'Roles': decodeJWT(token).roles,
                ...HeaderWeb
            },
            body: JSON.stringify(datas),
        })

        if (!response.ok) {
            throw await response.json()
        }

        // Parsear la respuesta como JSON
        const data = await response.json()
        return data

    } catch (error) {
        throw await error.json()
    }
}

export async function login(url = "", first = "", second = "") {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'User': "Desconocido",
                ...HeaderWeb},
            body: JSON.stringify({
                firstData: first, 
                secondData: second 
            })
        })
  
        if (!response.ok) {
            throw await response
        }
  
        const data = await response.json()
        localStorage.setItem("token",data.token)

        return true
  
    } catch (error) {
        throw error
    }
}