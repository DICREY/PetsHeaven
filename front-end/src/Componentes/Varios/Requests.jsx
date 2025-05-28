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
            {
                headers: {
                    "Content-Type": 'application/json',
                    'x-api-key': 'pets_heaven_vite',
                    'user': 'Unknow'
                },
                withCredentials: true,
            }
        )

        if (response.statusText !== 'OK') {
            throw response
        }
        
        return response
    } catch (error) {
        throw error
    }
}
export async function PostDataGlobal(URL = '', data = {}) {
    try {
        const response = await axios.post(
            URL,
            {...data},
            {
                headers: {
                    "Content-Type": 'application/json',
                    'x-api-key': 'pets_heaven_vite',
                    'user': 'Unknow'
                },
                withCredentials: true,
            }
        )

        if (response.statusText !== 'OK') {
            throw response
        }
        
        return response
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
            },
            withCredentials: true,
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
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'User': getName(token),
                    'Roles': decodeJWT(token).roles,
                    'Content-Type': 'application/json',
                    'x-api-key': 'pets_heaven_vite',
                },
                withCredentials: true,
            }
        )
  
        // Manejar diferentes códigos de estado
        if(200 >= response.status <= 299) {
            return response
        } else throw response

  
    } catch (error) {
        throw error
    }
}
export async function Register(URL = '', datas = {}) {
    try {
        const response = await axios.post(
            URL,
            {...datas},
            {
                headers: {
                    'User': 'Unknow',
                    'Content-Type': 'application/json',
                    'x-api-key': 'pets_heaven_vite',
                },
                withCredentials: true,
            }
        )
  
        // Manejar diferentes códigos de estado
        if(200 >= response.status <= 299) {
            return response
        } else throw response

  
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
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'User': getName(token),
                    'Roles': decodeJWT(token).roles,
                    'Content-Type': 'application/json',
                    'x-api-key': 'pets_heaven_vite',
                },
                withCredentials: true,
            }
        )

        if (response.statusText !== 'OK') {
            throw response
        }

        return response

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
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'User': getName(token),
                    'Roles': decodeJWT(token).roles,
                    'Content-Type': 'application/json',
                    'x-api-key': 'pets_heaven_vite'
                },
                withCredentials: true,
            }
        )

        if (response.statusText !== 'OK') {
            throw response
        }

        return response

    } catch (error) {
        throw error
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
                },
                withCredentials: true,
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