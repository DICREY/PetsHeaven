// Librarys 
import React, { useEffect, useState } from "react"
import { Key, Plus} from "lucide-react"

// Imports 
import '../../../public/styles/InterfazAdmin/GesUsuario.css'
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { GetData } from '../Varios/Requests'
import { Loader } from '../Errores/Loader'
import { GlobalTable } from './GlobalTable'

export function GesUsuario({ URL = "" }) {
  const mainUrl = `${URL}/user/all/all`
  const [users,setUsers] = useState([])
  const [usersAlmac,setUsersAlmac] = useState([])
  const [loading,setLoading] = useState(true)
  const [headers,setHeaders] = useState([])

  const GetUsers = async () => {
    const token = localStorage.getItem("token")
    try {
      if (token){
        const data = await GetData(mainUrl,token)
        setUsers(data)
        setUsersAlmac(data)
        setLoading(false)
        setHeaders({
          'Nombres': 'nom_usu',
          'Apellidos': 'ape_usu',
          'T. Doc': 'tip_doc_usu',
          'Documento': 'doc_usu',
          'Direccion': 'dir_usu',
          'Celular': 'cel_usu',
          'Correo': 'email_usu'
        })
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

    if (find) setUsers(find)
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
    <>
      {
        loading ? (
          <Loader />
        ) : (
          <div className="contenedorgesusuario">
          <NavBarAdmin />

          <div className="principalgesusuario">
            <div className="tarjetagesusuario">
              <div className="contenidogesusuario">
                <div className="encabezadogesusuario">
                  <div className="titulogesusuario">
                    <h1 className="textogesusuario">Gestión de usuarios</h1>
                    <span className="subtitulogesusuario">/ Administración</span>
                  </div>
                </div>

                <div className="subencabezadogesusuario">
                  <div className="veterinariagesusuario">
                    <h2 className="subtitulovegesusuario">Usuarios vinculados a la veterinaria: Petsheaven</h2>
                  </div>
                  <div className="accionesgesusuario">
                    <button className="botonregistrargesusuario">
                      <Plus size={16} className="iconoplusgesusuario" />
                      Registrar usuario
                    </button>
                  </div>
                </div>

                <div className="controlestablagesusuario">
                  <div className="mostrargesusuario">
                    <span>Mostrar</span>
                    <select className="selectgesusuario">
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    <span>registros</span>
                  </div>
                  <div className="buscargesusuario">
                    <span>Buscar:</span>
                    <input
                      type="text"
                      className="inputbuscargesusuario"
                      placeholder=""
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>
                </div>

                {/* Table  */}
                <GlobalTable 
                  data={users}
                  headers={headers} 
                /> 

                <div className="paginaciongesusuario">
                  <div className="infopaginaciongesusuario">
                    <span>Mostrando registros del 1 al 2 de un total de 2 registros.</span>
                  </div>
                  <div className="controlesgesusuario">
                    <button className="botonpaginaciongesusuario">Anterior</button>
                    <button className="botonpaginaciongesusuario activogesusuario">1</button>
                    <button className="botonpaginaciongesusuario">Siguiente</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
