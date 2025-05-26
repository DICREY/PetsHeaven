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

// Component 
export const Services = ({ URL = '', imgDefault = '' }) => {
    // Dynamic vars 
    const [datas, setDatas] = useState([])
    const [headers, setHeaders] = useState({})
    const [notify, setNotify] = useState(null)
      
    // Vars 
    const mainUrl = `${URL}/owner`
    const headersSearch = ['nom_per', 'email_per', 'cel_per', 'ape_per']
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

    const handleSearch = async (term = '', data = [], headers = []) => {
        // if(!petsDataAlmc) await getPets()
    
        // setDatas(petsDataAlmc)
        setHeaders({
            Nombre: 'nom_mas',
            Especie: 'esp_mas',
            Raza: 'raz_mas',
            Edad: 'fec_nac_mas',
            Propietario: 'nom_per'
        })
        
        searchFilter(term, data, headers, setDatas)
    }

    const handleDescription = () => {
        console.log('asdad')
    }

    return (
        <main className='contenedoradminhome'>
        <NavBarAdmin />

        <div className='principaladminhome'>
            <article className='tarjetaadminhome' aria-labelledby='lista-usuarios-titulo'>
                <div className='contenidoadminhome'>
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
                </div>
                </article>
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