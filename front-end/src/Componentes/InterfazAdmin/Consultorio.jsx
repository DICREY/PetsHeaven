// Librarys 
import React, { useState, useEffect, useRef } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Plus, FileText, User, PawPrint } from 'lucide-react'

// Imports 
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { GlobalTable } from '../Global/GlobalTable'
import { Notification } from '../Global/Notifys'
import { GetData } from '../Varios/Requests'
import { errorStatusHandler, formatDate, searchFilter } from '../Varios/Util'

// Import styles 
import '../../../src/styles/InterfazAdmin/Consultorio.css'
import HeaderUser from '../BarrasNavegacion/HeaderUser'
import Footer from '../Varios/Footer2'

export function HomeAdmin({ URL = '', setUserSelect, setOwner, setPetSelect }) {
  // Dynamic vars 
  const [datas, setDatas] = useState([])
  const [petsDataAlmc, setPetsDataAlmc] = useState([])
  const [datasAlmac, setDatasAlmac] = useState([])
  const [headers, setHeaders] = useState({})
  const [notify, setNotify] = useState(null)
  let didFetch = useRef(false)
  
  // Vars 
  const mainUrl = `${URL}/owner`
  const headersSearchUser = ['nom_per', 'email_per', 'cel_per', 'ape_per']
  const headersSearchPet = ['nom_mas','esp_mas','raz_mas','ali_mas','gen_mas']
  const navigate = useNavigate()

  // Functions
  const GetDataOwners = async () => {
    const token = localStorage.getItem('token')
    try {
      if (token) {
        const data = await GetData(`${mainUrl}/all`, token)
        setNotify(null)

        if (data) formatDatas(data)
        setHeaders({
          'Nombres': 'nom_per',
          'Documento': 'doc_per',
          'Celular': 'cel_per',
          'Mascotas': 'mascotas'
        })
      } else navigate('/user/login')
    } catch (err) {
      setNotify(null)
      if (err.status) {
        const message = errorStatusHandler(err.status)
        setNotify({
          title: 'Error',
          message: `${message}`,    
          close: setNotify
        })
      } else console.log(err)
    }
  }

  // fetch para traer datos
  const getPets = async () => {
    const token = localStorage.getItem('token')
      try {
        if(token) {
          const pets = await GetData(`${URL}/pet/all`,token)  
          setNotify(null)
          setPetsDataAlmc(pets)
        } else navigate('/user/login')
      } catch (err) {
        setNotify(null)
        if (err.status) {
          const message = errorStatusHandler(err.status)
          setNotify({
            title: 'Error',
            message: `${message}`,
            close: setNotify
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
            fec_cre_mas: petData[10] || ''
          }
        })
      return { ...item, mascotas: petList }
    })
    setDatasAlmac(formattedData)
    setDatas(formattedData)
  }

  const handleDataShow = (isPets) => {
    if (isPets) {
      setDatas(petsDataAlmc)
      setHeaders({
        Nombre: 'nom_mas',
        Especie: 'esp_mas',
        Raza: 'raz_mas',
        Edad: 'fec_nac_mas',
        Propietario: 'nom_per'
      })
    } else {
      setDatas(datasAlmac)
      setHeaders({
        'Nombres': 'nom_per',
        'Documento': 'doc_per',
        'Celular': 'cel_per',
        'Mascotas': 'mascotas'
      })
    }
  }

  const handleSearch = async (term = '', data = [], headers = []) => {
    if(!datasAlmac) await GetDataOwners()

    const termLower = term.toLowerCase()

    setHeaders({
      'Nombres': 'nom_per',
      'Documento': 'doc_per',
      'Celular': 'cel_per',
      'Mascotas': 'mascotas'
    })

    const find = data.filter(item => {
      return headers.some(field => 
        item[field]?.toLowerCase().includes(termLower)
      )
    })
  
    if (find) setDatas(find)
  }

  // Handle search pets 
  const handleSearchPets = async (term = '', data = [], headers = []) => {
    if(!petsDataAlmc) await getPets()

    setDatas(petsDataAlmc)
    setHeaders({
      Nombre: 'nom_mas',
      Especie: 'esp_mas',
      Raza: 'raz_mas',
      Edad: 'fec_nac_mas',
      Propietario: 'nom_per'
    })
    
    searchFilter(term, data, headers, setDatas)
  }

  const handleDescription = (data) => {
    const handler = data.nom_mas? handleDescriptionPet: handleDescriptionOwner
    return handler(data)
  }

  const handleDescriptionOwner = (data) => {
    setUserSelect(data)
    setOwner(true)
    navigate('/propietario/datos')
  }

  const handleDescriptionPet = (data) => {
    data.fec_nac_mas = formatDate(data.fec_nac_mas)
    data.fec_cre_mas = formatDate(data.fec_cre_mas)
    setPetSelect(data)
    navigate('/pets/details')
  }

  useEffect(() => {
    const REFRESH_INTERVAL = 2 * 60 * 1000 // 2 minutes
    let intervalId

    didFetch?didFetch:false
    GetDataOwners()
    getPets()
    
    intervalId = setInterval(() => {
      GetDataOwners()
      getPets()
    }, REFRESH_INTERVAL)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <main className='contenedoradminhome'>
      <NavBarAdmin />
      <div className='principaladminhome'>
      <HeaderUser/>
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

              <nav className='BtnsRegisters'>
                <button 
                  className='botonadminhome' 
                  onClick={() => navigate('/mascota/registro')}
                  aria-label='Registrar nueva mascota'
                >
                  <Plus size={16} className='iconoplusadminhome' aria-hidden='true' />
                  Registrar Mascota
                </button>
                <button 
                  className='botonadminhome' 
                  onClick={() => navigate('/propietario/registro')}
                  aria-label='Registrar nuevo usuario'
                >
                  <Plus size={16} className='iconoplusadminhome' aria-hidden='true' />
                  Registrar usuario
                </button>
              </nav>
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
                    onFocus={() => handleDataShow(0)}
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
                    onChange={e => handleSearchPets(e.target.value, petsDataAlmc, headersSearchPet)}
                    onFocus={() => handleDataShow(1)}
                  />
                </div>
              </div>
            </section>

            <GlobalTable 
              fullData={datas}
              headersSearch={['nom_per', 'doc_per', 'cel_per']}
              listHeader={'mascotas'}
              headers={headers}
              watch={handleDescription}
            /> 
          </div>
        </article>
        <Footer/>
      </div>

      {notify && (
        <Notification 
          {...notify}
        />
      )}

      <Outlet />
    </main>
  )
}