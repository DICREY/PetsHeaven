// Librarys 
import axios from 'axios'
import { getName, decodeJWT } from './Util'

// Vars
const HeaderWeb = {
    'Content-Type': 'application/json',
    'x-api-key': 'pets_heaven_vite',
}

// Functions 
// Traer datos
export async function GetDataGlobal(URL = '') {
    try {
        const response = await axios.get(
            URL,
            {headers: {
                "Content-Type": 'application/json',
                'x-api-key': 'pets_heaven_vite',
                'user': 'Unknow'
            }}
        )

        if (response.statusText !== 'OK') {
            throw response
        }
        
        return response.data.result[0]
    } catch (error) {
        throw error
    }
}
export async function GetData(URL = '',token = '') {
    try {
        const response = await axios.get(URL,{
            headers: {
                'Authorization': `Bearer ${token}`,
                'User': getName(token),
                'Roles': decodeJWT(token).roles,
                'x-api-key': 'pets_heaven_vite',
            }
        })

        if (response.statusText !== 'OK') {
            throw response
        }

        return response.data.result[0]
    } catch (error) {
        throw error
    }
}
// Enviar datos 
export async function PostData(URL = '', token = '', datas = {}) {
    try {
        const response = await axios.post(
            URL,
            {...datas},
            {headers: {
                'Authorization': `Bearer ${token}`,
                'User': getName(token),
                'Roles': decodeJWT(token).roles,
                'Content-Type': 'application/json',
                'x-api-key': 'pets_heaven_vite',
            }}
        )
  
      // Manejar diferentes códigos de estado
      if (response.statusText !== 'OK') {
        throw response
    }

    return response.data.result[0]
  
    } catch (error) {
        throw error
    }
}
// Modificar datos
export async function ModifyData(URL = '', token = '', datas = {}) {
    try {
        const response = await axios.put(
            URL,
            {...datas},
            {headers: {
                'Authorization': `Bearer ${token}`,
                'User': getName(token),
                'Roles': decodeJWT(token).roles,
                'Content-Type': 'application/json',
                'x-api-key': 'pets_heaven_vite',
            }}
        )

        if (response.statusText !== 'OK') {
            throw response
        }

        return response.data.result[0]

    } catch (error) {
        throw error
    }
}
// Delete data
export async function DeleteData(URL = '', token = '', datas = {}) {
    try {
        const response = await axios.delete(
            URL,
            {...datas},
            {headers: {
                'Authorization': `Bearer ${token}`,
                'User': getName(token),
                'Roles': decodeJWT(token).roles,
                'Content-Type': 'application/json',
                'x-api-key': 'pets_heaven_vite',
            }},
        )

        if (response.statusText !== 'OK') {
            throw response
        }

        return response.data.result[0]

    } catch (error) {
        throw await error.json()
    }
}

export async function login(url = '', first = '', second = '') {
    try {
        const response = await axios.post(
            url, 
            {
              firstData: first, 
              secondData: second 
            },
            {
              headers: {
                'User': 'Desconocido',
                'Content-Type': 'application/json',
                'x-api-key': 'pets_heaven_vite',
                }
            }
        )
  
        if (response.statusText !== 'OK') {
            throw response
        }
  
        const data = response.data
        localStorage.setItem('token',data.token)

        return true
  
    } catch (error) {
        throw error
    }
}