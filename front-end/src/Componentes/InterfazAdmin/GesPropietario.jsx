// Librarys
import React, { useState, useEffect } from "react"
import { Users, Eye, Plus } from "lucide-react"

// Imports
import "../../../public/styles/InterfazAdmin/GesPropietario.css"
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { GetData } from '../Varios/Requests'
import { divideList } from '../Varios/Util'
import { GlobalTable } from './GlobalTable'

// Main component 
export function GesPropietario({ URL = "" }) {
  const mainUrl = `${URL}/owner/all`
  const [users,setUsers] = useState([])
  const [headers,setHeaders] = useState([])
  const [usersAlmac,setUsersAlmac] = useState([])
  const [loading,setLoading] = useState(true)
  
  
  const GetUsers = async (url) => {
    const token = localStorage.getItem("token")
    try {
      if(token) {
        setHeaders({
          'Nombres': 'nom_usu',
          'Apellidos': 'ape_usu',
          'T. Doc': 'tip_doc_usu',
          'Documento': 'doc_usu',
          'Direccion': 'dir_usu',
          'Celular': 'cel_usu',
          'Correo': 'email_usu'
        })
        const data = await GetData(url,token)
        setUsers(divideList(data,4))
        setUsersAlmac(data)
        setLoading(false)
      } else window.location.href = "/34"
    } catch (err) {
      console.log(err)
    }
  }

  const handleSearch = term => {
    const termLower = term.toLowerCase()
  
    const find = usersAlmac.filter(user => {
      // Campos específicos donde buscar
      const searchFields = ['nom_usu', 'email_usu', 'cel_usu', 'ape_usu']
      return searchFields.some(field => 
        user[field]?.toLowerCase().includes(termLower)
      )
    })

    if(find) setUsers(divideList(find,4))
  }
  
  useEffect(() => {
    // Vars 
    const REFRESH_INTERVAL = 2 * 60 * 1000 // 2 minutos
    let intervalId

    // Execute the request
    GetUsers(mainUrl)

    // Configure interval
    intervalId = setInterval(() => GetUsers(mainUrl), REFRESH_INTERVAL)

    // Clean
    return () => clearInterval(intervalId)
  }, [])
  

  return (
    <main className="appgespropietario">
      <NavBarAdmin />

      <section className="contenedorgespropietario">
        <div className="panelgespropietario">
          <nav className="cabeceragespropietario">
            <h1 className="titulogespropietario">
              <Users className="iconotitulogespropietario" size={20} />
              Gestión de propietarios
            <span className="subtitulogespropietario">/ Administración</span>
            </h1>
            <button className="botongesmascota" onClick={() => setRegister(true)}>
              <Plus size={16} className="iconoplusadminhome" />
              Registrar Propietario
            </button>
          </nav>

          <GlobalTable 
            subtitle={'Propietarios registrados'}
            headers={headers}
            data={users}
          />
            
        </div>
      </section>
    </main>
  )
}

