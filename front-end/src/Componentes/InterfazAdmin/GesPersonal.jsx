// Librarys 
import React, { useEffect, useState, useContext } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { Plus } from "lucide-react"

// Imports 
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { GetData } from '../Varios/Requests'
import { divideList, errorStatusHandler } from '../Varios/Util'
import { GlobalTable } from '../Global/GlobalTable'
import { Notification } from '../Global/Notifys'
import { AuthContext } from '../../Contexts/Contexts'
import { HeaderAdmin } from "../BarrasNavegacion/HeaderAdmin"
// import { Loader } from '../Errores/Loader'

// Import styles 
import '../../../src/styles/InterfazAdmin/GesPersonal.css'

// Component
export function GesPersonal({ setUserSelect, URL = "" }) {
  // Dynamic vars
  const mainUrl = `${URL}/staff/all`
  const [users, setUsers] = useState([])
  const [usersAlmac, setUsersAlmac] = useState([])
  const [headers, setHeaders] = useState([])
  const [notify, setNotify] = useState(null)
  const { logout } = useContext(AuthContext)

  // Vars 
  const navigate = useNavigate()

  // Functions
  const GetUsers = async () => {
    try {
      const data = await GetData(mainUrl)
      setNotify(null)
      setHeaders({
        'Nombres': 'nom_per',
        'Apellidos': 'ape_per',
        'T. Doc': 'tip_doc_per',
        'Documento': 'doc_per',
        'Direccion': 'dir_per',
        'Celular': 'cel_per',
        'Correo': 'email_per'
      })
      if (data) {
        setUsersAlmac(data)
        setUsers(divideList(data, 4))
      }
    } catch (err) {
      setNotify(null)
      const message = errorStatusHandler(err)
      setNotify({
        title: 'Error',
        message: `${message}`,
        close: setNotify
      })
      if (err.status === 403) setTimeout(() => {
        logout()
      }, 2000)
    }
  }

  const handleDescription = (user) => {
    setUserSelect(user)
    navigate("/propietario/datos")
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
    <main className="contenedoradminhome">
      <NavBarAdmin />

      <section className="principaladminhome">
        <HeaderAdmin URL={URL} />

        <section className="tarjetagesusuario">
          <div className="contenidogesusuario">
            <header className="encabezadogesusuario">
              <div className="titulogesusuario">
                <h1 className="textogesusuario">Gestión de personal</h1>
                <span className="subtitulogesusuario">/ Administración</span>
              </div>
              <button className="AddBtn" onClick={() => navigate("/admin/usuario/registro")}>
                <Plus className="icon" />
                Registrar personal
              </button>
            </header>


            {/* Table  */}
            <GlobalTable
              subtitle={'Personal vinculado a la veterinaria: Petsheaven'}
              filters='nombre, apellido, email, celular o documento'
              fullData={usersAlmac}
              headersSearch={['nom_per', 'email_per', 'cel_per', 'ape_per', 'doc_per']}
              headers={headers}
              watch={handleDescription}
            />

          </div>
        </section>
      </section>

      {notify && (
        <Notification
          {...notify}
        />
      )}

      <Outlet />
    </main>
  )
}
