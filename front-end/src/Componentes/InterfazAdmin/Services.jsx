// Librarys 
import React, { useState, useEffect, useRef } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Plus, FileText, User, PawPrint } from 'lucide-react'

// Imports 
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { GlobalTable } from '../Global/GlobalTable'
import { Notification } from '../Global/Notifys'
import { GetData } from '../Varios/Requests'
import { errorStatusHandler, searchFilter } from '../Varios/Util'
import { HeaderAdmin } from '../BarrasNavegacion/HeaderAdmin'
import Footer from '../Varios/Footer2'
import { AuthContext } from '../../Contexts/Contexts'

// Component 
export const Services = ({ URL = '', imgDefault = '', currentTab = null }) => {
  // Dynamic vars 
  const [datas, setDatas] = useState([])
  const [notify, setNotify] = useState(null)
  const { roles } = useContext(AuthContext)

  // Vars 
  const mainUrl = `${URL}/service`
  const navigate = useNavigate()
  const headers = {
    Nombre: 'nom_ser',
    Precio: 'pre_ser',
    Categoria: 'nom_cat'
  }

  // Functions
  const GetDataServices = async () => {
    setNotify({
      title: 'Cargando...',
      message: 'Obteniendo datos',
      load: 1
    })
    const reqUrl = `${mainUrl}/all/${currentTab}`
    try {
      const data = await GetData(reqUrl)
      setNotify(null)

      if (data) setDatas(data)
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

  const handleSearch = async (term = '', data = [], headers = []) => {
    // if(!petsDataAlmc) await getPets()

    searchFilter(term, data, headers, setDatas)
  }

  const handleDescription = () => {
    console.log('asdad')
  }

  useEffect(() => {
    GetDataServices()
  }, [])

  return (
    <main className='contenedoradminhome'>
      <NavBarAdmin />

      <section className='principaladminhome'>
        <HeaderAdmin />
        <article className='tarjetaadminhome' aria-labelledby='lista-usuarios-titulo'>
          <article className='contenidoadminhome'>
            <header className='encabezadoadminhome'>
              <div className='tituloadminhome'>
                <FileText className='iconoadminhome' aria-hidden='true' />
                <h1 id='lista-usuarios-titulo' className='textoadminhome'>Lista de servicios</h1>
                <div className='decoracionadminhome' aria-hidden='true'>
                  <PawPrint className='huellaadminhome' />
                </div>
              </div>

              <nav className='BtnsRegisters'>
                <button
                  className='botonadminhome'
                  // onClick={() => navigate('/mascota/registro')}
                  aria-label='Registrar nueva mascota'
                >
                  <Plus size={16} className='iconoplusadminhome' aria-hidden='true' />
                  Registrar Servicio
                </button>
              </nav>
            </header>

            <GlobalTable
              fullData={datas}
              subtitle={'Servicios vinculados a la veterinaria: Petsheaven'}
              headersSearch={['nom_ser']}
              filters={'nombre o categoria'}
              headers={headers}
              watch={handleDescription}
            />
          </article>
        </article>
        <Footer />
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