// Librarys 
import React, { useEffect, useState } from "react"
import { Plus} from "lucide-react"

// Imports 
import '../../../public/styles/InterfazAdmin/GesUsuario.css'
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { GetData } from '../Varios/Requests'
import { divideList } from '../Varios/Util'
import { Loader } from '../Errores/Loader'
import { GlobalTable } from './GlobalTable'

export function GesUsuario({ URL = "" }) {
  const mainUrl = `${URL}/user/all`
  const [users,setUsers] = useState([])
  const [usersAlmac,setUsersAlmac] = useState([])
  const [loading,setLoading] = useState(true)
  const [headers,setHeaders] = useState([])

  const GetUsers = async () => {
    const token = localStorage.getItem("token")
    try {
      if (token){
        const data = await GetData(mainUrl,token)
        setHeaders({
          'Nombres': 'nom_usu',
          'Apellidos': 'ape_usu',
          'T. Doc': 'tip_doc_usu',
          'Documento': 'doc_usu',
          'Direccion': 'dir_usu',
          'Celular': 'cel_usu',
          'Correo': 'email_usu'
        })
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

    if (find) setUsers(divideList(find,4))
  }

  useEffect(() => {
    // Vars 
    const REFRESH_INTERVAL = 2 * 60 * 1000 // 2 minutos
    let intervalId

    // Execute the request
    GetUsers()

    // Configure interval
    intervalId = setInterval(GetUsers, REFRESH_INTERVAL)

    // Clean
    return () => clearInterval(intervalId)
  }, [])


  return (
    <main className="contenedorgesusuario">
      <NavBarAdmin />

      <section className="principalgesusuario">
        <section className="tarjetagesusuario">
          <div className="contenidogesusuario">
            <header className="encabezadogesusuario">
              <div className="titulogesusuario">
                <h1 className="textogesusuario">Gestión de usuarios</h1>
                <span className="subtitulogesusuario">/ Administración</span>
              </div>
              <a href="/usuario/registro" className="botongesmascota">
                <Plus size={16} className="iconoplusadminhome" />
                Registrar Usuario
              </a>
            </header>
            

            {/* Table  */}
            <GlobalTable 
              subtitle={'Usuarios vinculados a la veterinaria: Petsheaven'}
              data={users}
              headers={headers}
            /> 

          </div>
        </section>
      </section>
    </main>
  )
}
