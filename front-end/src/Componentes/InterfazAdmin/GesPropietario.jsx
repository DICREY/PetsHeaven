// Librarys
import React, { useState, useEffect } from "react"
import { Users, Eye } from "lucide-react"

// Imports
import "../../../public/styles/InterfazAdmin/GesPropietario.css"
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { GetData } from '../Varios/Requests'

// Main component 
export function GesPropietario({ URL = "" }) {
  const mainUrl = `${URL}/user/owner/all`
  const [users,setUsers] = useState([])
  const [usersAlmac,setUsersAlmac] = useState([])
  const [loading,setLoading] = useState(true)
  
  
  const GetUsers = async (url) => {
    const token = localStorage.getItem("token")
    try {
      if(token) {
        const data = await GetData(url,token)
        setUsers(data)
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

    if(find) setUsers(find)
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
          <div className="cabeceragespropietario">
            <h1 className="titulogespropietario">
              <Users className="iconotitulogespropietario" size={20} />
              Gestión de propietarios
            </h1>
            <span className="subtitulogespropietario">/ Administración</span>
          </div>

          <h2 className="subtitulopanelgespropietario">Propietarios registrados</h2>

          <div className="controlesgespropietario">
            <div className="mostrargespropietario">
              <span>Mostrar</span>
              <select className="selectgespropietario">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <span>registros</span>
            </div>

            <div className="buscargespropietario">
              <span>Buscar:</span>
              <input 
                type="text" 
                className="inputgespropietario"
                onChange={e => handleSearch(e.target.value)} />
            </div>
          </div>

          <div className="tablacontgespropietario">
            <table className="tablagespropietario">
              <thead>
                <tr>
                  <th>Nombres</th>
                  <th>Apellidos</th>
                  <th>T Doc</th>
                  <th>Documento</th>
                  <th>Dirección</th>
                  <th>Celular</th>
                  <th>Correo</th>
                  <th>Opciones</th>
                </tr>
              </thead>
              <tbody>
                {
                  users.map(i => (
                    <tr key={i.doc_usu}>
                      <td className="nombrecontainergespropietario" data-label="Nombres">
                        <div className="infogespropietario">
                          <span className="nombregespropietario">{i.nom_usu}</span>
                          <span className="infogespropietario"> Creado el 
                            {new Date(i.fec_cre_usu).toLocaleDateString()}</span>
                        </div>
                      </td>
                      <td data-label="Apellidos">{i.ape_usu}</td>
                      <td data-label="T Doc">{i.tip_doc_usu}</td>
                      <td data-label="Documento">{i.doc_usu}</td>
                      <td data-label="Dirección">{i.dir_usu}</td>
                      <td data-label="Celular">{i.cel_usu}</td>
                      <td data-label="Correo">{i.email_usu}</td>
                      <td data-label="Opciones" className="opcionesgespropietario">
                        <Eye className="iconogespropietario" size={16} />
                      </td>
                  </tr>
                  ))
                }
              </tbody>
            </table>

            <div className="paginaciongespropietario">
              <div className="infogespropietario">Mostrando registros del 1 al 3 de un total de 3 registros.</div>
              <div className="botonesgespropietario">
                <button className="btngespropietario" disabled>
                  Anterior
                </button>
                <button className="btngespropietario btnactivogespropietario">1</button>
                <button className="btngespropietario">Siguiente</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

