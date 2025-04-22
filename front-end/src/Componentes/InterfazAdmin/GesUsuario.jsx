// Librarys 
import React, { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
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
        setUsersAlmac(data)
        setUsers(divideList(data,4))
        setLoading(false)
      } else window.location.href = "/34"
    } catch (err) {
      console.log(err)
    }
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
                <h1 className="textogesusuario">Gestión de personal</h1>
                <span className="subtitulogesusuario">/ Administración</span>
              </div>
              <button className="botongesmascota" onClick={() => window.location.href = "/admin/usuario/registro"}>
                <Plus size={16} className="iconoplusadminhome" />
                Registrar personal
              </button>
            </header>
            

            {/* Table  */}
            <GlobalTable 
              subtitle={'Personal vinculado a la veterinaria: Petsheaven'}
              data={users}
              fullData={usersAlmac}
              headersSearch={['nom_usu', 'email_usu', 'cel_usu', 'ape_usu']}
              headers={headers}
            /> 

          </div>
        </section>
      </section>
      <Outlet />
    </main>
  )
}
