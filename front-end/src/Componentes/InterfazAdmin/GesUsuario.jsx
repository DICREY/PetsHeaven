// Librarys 
import React, { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import { Plus} from "lucide-react"

// Imports 
import '../../../public/styles/InterfazAdmin/GesUsuario.css'
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { GetData } from '../Varios/Requests'
import { divideList,errorStatusHandler, getName } from '../Varios/Util'
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
          'Nombres': 'nom_per',
          'Apellidos': 'ape_per',
          'T. Doc': 'tip_doc_per',
          'Documento': 'doc_per',
          'Direccion': 'dir_per',
          'Celular': 'cel_per',
          'Correo': 'email_per'
        })
        setUsersAlmac(data)
        setUsers(divideList(data,4))
        setLoading(false)
      } else window.location.href = "/34"
    } catch (err) {
      if (err.status) {
        const message = errorStatusHandler(err.status)
        swal({
          title: "Error",
          text: message,
          icon: "error",
          button: "Aceptar"
        })
      } else console.log(err)
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
              headersSearch={['nom_per', 'email_per', 'cel_per', 'ape_per']}
              headers={headers}
            /> 

          </div>
        </section>
      </section>
      <Outlet />
    </main>
  )
}
