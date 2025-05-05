// Librarys 
import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Search, ChevronUp, Plus, FileText, User, PawPrint } from 'lucide-react'
import swal from 'sweetalert'

// Imports 
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { GetData } from '../Varios/Requests'
import { errorStatusHandler, formatDate } from '../Varios/Util'

// Import styles 
import '../../../src/styles/InterfazAdmin/HomeAdmin.css'

export function HomeAdmin({ URL = '', setUserSelect, setOwner }) {
  const mainUrl = `${URL}/owner`
  const [datas, setDatas] = useState([])
  const [datasAlmac, setDatasAlmac] = useState([])
  const [page, setPage] = useState(1)
  const headersSearchUser = ['nom_per', 'email_per', 'cel_per', 'ape_per']
  const headersSearchPet = ['nom_mas']
  const navigate = useNavigate()

  const GetDataOwners = async () => {
    const token = localStorage.getItem('token')
    try {
      if (token) {
        const data = await GetData(`${mainUrl}/all`, token)
        if (data) formatDatas(data)
      }
    } catch (err) {
      if (err.status) {
        const message = errorStatusHandler(err.status)
        swal({
          icon: 'error',
          title: 'Error',
          text: message
        })
      } else if (err.message) {
        swal({
          icon: 'error',
          title: 'Error',
          text: err.message
        })
      } else console.log(err)
    }
  }

  const formatDatas = (data) => {
    const formattedData = data.map((item) => {
      if (!item.mascotas || typeof item.mascotas !== 'string') {
        return { ...item, mascotas: [] }
      }

      const petList = item.mascotas.split('---').filter(Boolean)
        .map(petString => {
          const petData = petString.split(',')
          return {
            nom_mas: petData[0] || '',
            esp_mas: petData[1] || '',
            col_mas: petData[2] || '',
            raz_mas: petData[3] || '',
            ali_mas: petData[4] || '',
            fec_nac_mas: petData[5] || '',
            pes_mas: petData[6] || '',
            gen_mas: petData[7] || '',
            est_rep_mas: petData[8] || '',
            fot_mas: petData[9] || '',
            fec_cre_mas: petData[11] || ''
          }
        })

      return { ...item, mascotas: petList }
    })
    setDatasAlmac(formattedData)
    setDatas(formattedData)
  }

  const handleSearch = (term = '', data = [], headers = []) => {
    const termLower = term.toLowerCase()
    const find = data.filter(pet => {
      return headers.some(field => 
        pet[field]?.toLowerCase().includes(termLower)
      )
    })
  
    if (find) setDatas(find)
  }

  useEffect(() => {
    const REFRESH_INTERVAL = 2 * 60 * 1000 // 2 minutes
    let intervalId


    GetDataOwners()

    intervalId = setInterval(() => {
      GetDataOwners()
    }, REFRESH_INTERVAL)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <main className='contenedoradminhome'>
      <NavBarAdmin />

      <div className='principaladminhome'>
        <article className='tarjetaadminhome' aria-labelledby='lista-usuarios-titulo'>
          <div className='contenidoadminhome'>
            <header className='encabezadoadminhome'>
              <div className='tituloadminhome'>
                <FileText className='iconoadminhome' aria-hidden='true' />
                <h1 id='lista-usuarios-titulo' className='textoadminhome'>Lista de usuarios y mascotas</h1>
                <div className='decoracionadminhome' aria-hidden='true'>
                  <PawPrint className='huellaadminhome' />
                </div>
              </div>

              <button 
                className='botonadminhome' 
                onClick={() => navigate('/propietario/registro')}
                aria-label='Registrar nuevo usuario'
              >
                <Plus size={16} className='iconoplusadminhome' aria-hidden='true' />
                Registrar usuario
              </button>
            </header>

            <section className='busquedaadminhome' aria-label='Búsqueda de usuarios y mascotas'>
              <div className='seccionadminhome'>
                <label htmlFor='busqueda-usuario' className='etiquetaadminhome'>Usuario</label>
                <div className='inputcontenedoradminhome'>
                  <User className='inputiconoadminhome' aria-hidden='true' />
                  <input
                    id='busqueda-usuario'
                    className='campoadminhome'
                    placeholder='Buscar por identificación o nombre de usuario'
                    type='search'
                    aria-label='Buscar usuarios'
                    onChange={e => handleSearch(e.target.value, datasAlmac, headersSearchUser)}
                  />
                </div>
              </div>

              <div className='seccionadminhome'>
                <label htmlFor='busqueda-mascota' className='etiquetaadminhome'>Mascota</label>
                <div className='inputcontenedoradminhome'>
                  <PawPrint className='inputiconoadminhome' aria-hidden='true' />
                  <input
                    id='busqueda-mascota'
                    className='campoadminhome'
                    placeholder='Buscar por nombre o identificador de la mascota'
                    type='search'
                    aria-label='Buscar mascotas'
                    onChange={e => handleSearch(e.target.value, datasAlmac, headersSearchPet)}
                  />
                </div>
              </div>
            </section>

            <div className='centradoadminhome'>
              <button 
                className='botonbuscaradminhome'
                aria-label='Buscar'
              >
                <Search size={16} className='iconobuscaradminhome' aria-hidden='true' />
                Buscar
              </button>
            </div>

            <div className='tablacontenedoradminhome'>
              <table className='tablaadminhome' aria-label='Tabla de usuarios y mascotas'>
                <thead>
                  <tr className='encabezadotablaadminhome'>
                    <th scope='col' className='celdaencabezadoadminhome'>Nombre</th>
                    <th scope='col' className='celdaencabezadoadminhome'>Identificador</th>
                    <th scope='col' className='celdaencabezadoadminhome'>Celular</th>
                    <th scope='col' className='celdaencabezadoadminhome'>
                      <div className='mascotasencabezadoadminhome'>Mascotas</div>
                    </th>
                    <th scope='col' className='celdaencabezadoadminhome'>
                      <div className='gestionencabezadoadminhome'>
                        Última gestión
                        <ChevronUp size={14} className='iconoordenadminhome' aria-hidden='true' />
                      </div>
                    </th>
                    <th scope='col' className='celdaencabezadoadminhome'>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {datas.map((propietario) => (
                    <tr key={propietario.doc_per} className='filaadminhome'>
                      <td className='celdaadminhome' data-label='Nombre'>
                        <div className='infoadminhome'>
                          <span className='nombreadminhome'>{propietario.nom_per}</span>
                          <span className='fechaadminhome'>Creado el {formatDate(propietario.fec_cre_per)}</span>
                        </div>
                      </td>
                      <td className='celdaadminhome' data-label='Identificador'>
                        {propietario.doc_per}
                      </td>
                      <td className='celdaadminhome' data-label='Teléfono'>
                        {propietario.cel_per}
                      </td>
                      <td className='celdaadminhome' data-label='Mascotas'>
                        {propietario.mascotas && propietario.mascotas.length > 0 ? (
                          <ul className='mascotasadminhome' aria-label='Mascotas del usuario'>
                            {propietario.mascotas.map((mascota, index) => (
                              <li key={index} className='mascotaitemadminhome'>
                                <span>
                                  {mascota.nom_mas} - {mascota.esp_mas}
                                </span>
                              </li>
                            ))}
                          </ul>
                        ) : '-- Empty --'}
                      </td>
                      <td className='celdaadminhome' data-label='Última gestión'>
                        {propietario.ultimaCita ? (
                          <div className='citaadminhome'>
                            <div className='fechacitaadminhome'>
                              <div className='puntoadminhome' aria-hidden='true'></div>
                              {propietario.ultimaCita.fecha} - {propietario.ultimaCita.hora}
                            </div>
                            <div className='tipocitaadminhome'>
                              {propietario.nom_per} - {propietario.ultimaCita.tipo}
                            </div>
                          </div>
                        ) : '-- Empty --'}
                      </td>
                      <td className='celdaadminhome' data-label='Acciones'>
                        <button 
                          className='accionadminhome' 
                          onClick={() => {
                            setUserSelect(propietario)
                            setOwner(true)
                            navigate('/admin/propietario/datos')
                          }}
                          aria-label={`Ver detalles de ${propietario.nom_per}`}
                        >
                          <FileText size={18} aria-hidden='true' />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> 
            </div>

            <footer className='paginacionadminhome'>
              <div className='resultadosadminhome'>
                <span className='contadoradminhome'>10</span>
                <ChevronUp size={14} className='flechaadminhome' aria-hidden='true' />
                <span className='textocontadoradminhome'>
                  Visualizando {page} - {datas.length || 1} de {datas.length} resultados
                </span>
              </div>
              <div className='huellasadminhome' aria-hidden='true'>
                <PawPrint className='huella1adminhome' />
                <PawPrint className='huella2adminhome' />
              </div>
            </footer>
          </div>
        </article>
      </div>

      <Outlet />
    </main>
  )
}