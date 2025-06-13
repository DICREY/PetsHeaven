// Librarys 
import React, { useState, useEffect, useContext } from 'react'
import { ArrowLeft, Trash2, Edit, Save, X, FilePlus } from 'lucide-react'
import { useNavigate } from 'react-router'

// Import
import { Description } from '../Global/Description'
import { HistoryTest } from './historyTest'
import { Notification } from '../Global/Notifys'
import { AuthContext } from '../../Contexts/Contexts'
import { DeleteData, ModifyData, PostData } from '../Varios/Requests'
import { checkImage, getAge, errorStatusHandler, divideList } from '../Varios/Util'
import { FormularioConsulta } from '../InterfazAdmin/FormulariosAdmin/Consulta'
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import Footer from '../Varios/Footer2'

// Import styles 
import '../../../src/styles/Pets/petDetails.css'
import { HeaderUser } from '../BarrasNavegacion/HeaderUser'
import { HeaderAdmin } from '../BarrasNavegacion/HeaderAdmin'

// Main component
export const PetDetails = ({ datas, imgPetDefault, URL = '', tab = 'Datos Generales' }) => {
    // Dynamic vars
    const [isAdmin, setIsAdmin] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [modPet, setModPet] = useState({ ...datas })
    const [currentTab, setCurrentTab] = useState(tab)
    const [appointment, setAppointment] = useState()
    const [appointmentAlmc, setAppointmentAlmc] = useState()
    const [mHSelected, setMHSelected] = useState()
    const [page, setPage] = useState(1)
    const [showMedicHistory, setShowMedicHistory] = useState(false)
    const [consult, setConsult] = useState(false)
    const [notify, setNotify] = useState(null)
    const { roles, admin } = useContext(AuthContext)
    const headers = {
        Nombre: 'nom_mas',
        Especie: 'esp_mas',
        Raza: 'raz_mas',
        Color: 'col_mas',
        Alimento: 'ali_mas',
        Peso: 'pes_mas',
        'Estado Reproductivo': 'est_rep_mas',
        Genero: 'gen_mas',
        'Fecha Nacimiento': 'fec_nac_mas'
    }

    // Vars 
    const navigate = useNavigate()
    const mainURL = `${URL}/pet`

    // Functions
    // Handle value change
    const handleChange = (e) => {
        const { name, value } = e.target
        setModPet((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Change tabs
    const handleTabChange = (tab) => {
        if (isEditing) {
            if (window.confirm('Tiene cambios sin guardar. ¿Desea salir sin guardar?')) {
                setIsEditing(false)
                setCurrentTab(tab)
            }
        } else setCurrentTab(tab)
    }

    // Handle search filter
    const handleSearch = (e) => {
        const termLower = e.target.value.toLowerCase()
        const headers = ['fec_cit', 'nom_ser', 'nom_per']

        const find = appointmentAlmc?.filter(item => {
            return headers.some(field =>
                item[field]?.toLowerCase().includes(termLower)
            )
        })

        if (find) setAppointment(divideList(find, 6))
    }

    // Show medic history
    const showHistory = (item) => {
        console.log(appointment)
        setShowMedicHistory(true)
        setMHSelected({ ...datas, ...item })
    }

    // Get pets history
    const getHistory = async () => {
        try {
            const data = await PostData(`${mainURL}/history`, {
                firstData: datas.nom_mas,
                secondData: datas.doc_per
            })
            if (data.data.result) {
                setAppointment(divideList(data.data.result.citas, 6))
                setAppointmentAlmc(data.data.result.citas)
            }
        } catch (err) {
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

    // Request for Modify Data
    const modifyData = async () => {
        setNotify({
            title: 'Validando...',
            message: 'Verificando datos proporcionados',
            load: 1
        })
        try {
            const mod = await ModifyData(`${mainURL}/modify`, modPet)
            setNotify(null)
            if (mod.data.modify) setNotify({
                title: 'Modificación exitosa',
                message: 'Los datos de la mascota han sido modificados exitosamente',
                close: setNotify
            })
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

    // Request for Delete pet 
    const deletePet = async () => {
        // Vars
        const deleteURL = `${mainURL}/delete`
        setNotify({
            title: 'Validando...',
            message: 'Verificando datos proporcionados',
            load: 1
        })
        try {
            const admin = roles.includes('Administrador')
            if (admin) {
                const deleted = await DeleteData(deleteURL, {
                    nom_mas: datas.nom_mas,
                    doc_per: datas.doc_per
                })
                setNotify(null)
                if (deleted.data.deleted) setNotify({
                    title: 'Mascota Desactivada',
                    message: 'La mascota ha sido desactivada correctamente.',
                    close: setNotify
                })
            }
        } catch (err) {
            setNotify(null)
            if (err.status) {
                const message = errorStatusHandler(err.status)
                setNotify({
                    title: 'Error',
                    message: message,
                    close: setNotify
                })
            } else console.log(err)
        }
    }

    // Change to prev Page
    const prevPage = () => {
        if (page != 1) setPage(page - 1)
    }

    // Change to next Page
    const nextPage = () => {
        if (page < appointment.length) setPage(page + 1)
    }

    // Effects 
    useEffect(() => {
        if (!datas) navigate(-1)

        getHistory()

        // Vars
        const admin = roles.includes('Administrador')
        admin ? setIsAdmin(true) : setIsAdmin(false)
    }, [])

    return (
        <>
            {datas && appointment ? (
                <main className='app-container-pet-details'>
                    <NavBarAdmin />
                    <main className='main-content-pet-details'>
                        {admin ? (<HeaderAdmin />) : (<HeaderUser />)}
                        <div className='pet-modal-overlay-pet-details'>
                            <div className='pet-modal-content-pet-details'>

                                {/* Barra de navegación superior */}
                                <header className='cabeceraProps'>
                                    <h1 className='tituloProps'>
                                        Configuración de Mascota<span className='subtituloProps'>| {currentTab}</span>
                                    </h1>
                                    <div className='botonesAccionProps'>
                                        <button className='BackBtn' onClick={() => navigate(-1)}>
                                            <ArrowLeft size={18} />
                                            <span>Atrás</span>
                                        </button>

                                        {currentTab === 'Historia Clinica' && (
                                            <button className='EditBtn' onClick={() => setConsult(true)}>
                                                <FilePlus size={18} />
                                                <span>Agregar Consulta</span>
                                            </button>
                                        )}
                                        {currentTab === 'Datos Generales' && (
                                            <>
                                                {isEditing ? (
                                                    <>
                                                        <button className='DeleteBtn' onClick={() => setIsEditing(false)}>
                                                            <X size={18} />
                                                            <span>Cancelar</span>
                                                        </button>
                                                        <button className='EditBtn' onClick={modifyData}>
                                                            <Save size={18} />
                                                            <span>Guardar</span>
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button className='EditBtn' onClick={() => setIsEditing(true)}>
                                                        <Edit size={18} />
                                                        <span>Editar</span>
                                                    </button>
                                                )}
                                                {isAdmin && !isEditing && (
                                                    <button className='DeleteBtn' onClick={deletePet}>
                                                        <Trash2 size={18} />
                                                        <span>Desactivar</span>
                                                    </button>)
                                                }
                                            </>
                                        )}
                                    </div>
                                </header>

                                {/* Navegación por pestañas */}
                                <nav className='pestanasProps'>
                                    <a
                                        className={`tab-active-pet-details ${currentTab === 'Datos Generales' ? 'link-active-pet-details' : ''}`}
                                        onClick={() => handleTabChange('Datos Generales')}
                                    >Datos Generales</a>
                                    <a
                                        className={`tab-active-pet-details ${currentTab === 'Historia Clinica' ? 'link-active-pet-details' : ''}`}
                                        onClick={() => handleTabChange('Historia Clinica')}
                                    >Historia Clinica</a>
                                </nav>

                                {/* <!-- Contenido principal --> */}
                                <section className='pet-content-pet-details-main'>
                                    <section className='pet-content-pet-details'>
                                        {currentTab === 'Datos Generales' && (
                                            <Description
                                                handleChange={handleChange}
                                                headers={headers}
                                                datas={{
                                                    image: datas.fot_mas,
                                                    alt_img: `${datas.esp_mas} de raza ${datas.raz_mas} color ${datas.col_mas} con nombre ${datas.nom_mas}`,
                                                    ...datas
                                                }}
                                                imgDefault={imgPetDefault}
                                                navigate={navigate}
                                                isEditing={isEditing}
                                                disabled={['esp_mas', 'raz_mas', 'col_mas', 'gen_mas']}
                                            />
                                        )}
                                    </section>
                                    {currentTab === 'Historia Clinica' && (
                                        <section className='pet-content-pet-details-main'>
                                            {/* Header con foto y datos principales */}
                                            <header className='pet-header-pet-details'>
                                                <aside className='pet-avatar-container-pet-details'>
                                                    {checkImage(
                                                        datas.fot_mas,
                                                        `${datas.esp_mas} de raza ${datas.raz_mas} color ${datas.col_mas} con nombre ${datas.nom_mas}`,
                                                        imgPetDefault,
                                                        'pet-avatar-pet-details'
                                                    )}
                                                </aside>

                                                <aside className='pet-main-info-pet-details'>
                                                    <h1 className='pet-main-info-h1-pet-details'>{datas.nom_mas}</h1>
                                                    <div className='pet-meta-pet-details'>
                                                        <span className='species-pet-details'>{datas.esp_mas}</span>
                                                        <span className='breed-pet-details'>{datas.raz_mas}</span>
                                                        <span className='pet-age-pet-details'>{`${getAge(datas.fec_nac_mas)} Años`}</span>
                                                    </div>
                                                </aside>
                                            </header>
                                            <div className='inputcontenedoradminhome'>
                                                <input
                                                    id='busqueda-usuario'
                                                    className='campoadminhome'
                                                    placeholder='Buscar por fecha de la cita (yyyy-mm-dd), nombre del servicio o nombre del veterinario'
                                                    type='search'
                                                    aria-label='Buscar usuarios'
                                                    onChange={handleSearch}
                                                />
                                            </div>
                                            <section className='pet-content-pet-details'>
                                                {appointment[page - 1]?.map((item, index) => (
                                                    <article
                                                        key={index}
                                                        className='info-card-pet-details'
                                                        onClick={() => showHistory(item)}
                                                    >
                                                        <h2 className='info-card-h2-pet-details'>
                                                            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                                                                <path d='M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z' fill='currentColor' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                                                                <path d='M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                                                                <path d='M16 2V6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                                                                <path d='M8 2V6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                                                                <path d='M3 10H21' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                                                            </svg>
                                                            Atencion Médica #{index + 959}
                                                        </h2>
                                                        <div className='info-grid-pet-details'>
                                                            <div className='info-item-pet-details'>
                                                                <span className='info-label-pet-details'>Fecha Cita</span>
                                                                <span className='info-value-pet-details'>{item.fec_cit || "No Registrado"}</span>
                                                            </div>
                                                            <div className='info-item-pet-details'>
                                                                <span className='info-label-pet-details'>Servicio</span>
                                                                <span className='info-value-pet-details'>{item.nom_ser}</span>
                                                            </div>
                                                            <div className='info-item-pet-details'>
                                                                <span className='info-label-pet-details'>Veterinario</span>
                                                                <span className='info-value-pet-details'>{`${item.nom_per} ${item.ape_per}`}</span>
                                                            </div>
                                                            <button className='EditBtn'>
                                                                <Edit size={18} />
                                                                <span>Ver</span>
                                                            </button>
                                                        </div>
                                                    </article>))
                                                }
                                            </section>
                                            <footer className='paginacion-gestion'>
                                                <div className='info-paginacion'>Mostrando registros del 1 al {appointment?.length || '1'} de un total de {appointmentAlmc?.length || '0'} registros.</div>
                                                <div className='btns-container-paginacion'>
                                                    <button
                                                        type='button'
                                                        className='btn-paginacion'
                                                        onClick={prevPage}
                                                    >
                                                        Anterior
                                                    </button>
                                                    <button
                                                        type='button'
                                                        className='btn-paginacion btn-active'
                                                    >{page}</button>
                                                    <button
                                                        type='button'
                                                        className='btn-paginacion'
                                                        onClick={nextPage}
                                                    >Siguiente</button>
                                                </div>
                                            </footer>
                                        </section>
                                    )}
                                </section>
                            </div>
                        </div>
                        <Footer />
                        {showMedicHistory && (
                            <HistoryTest
                                appointmentData={mHSelected}
                                imgDefault={imgPetDefault}
                                onClose={() => setShowMedicHistory(false)}
                            />
                        )}
                        {consult && (<FormularioConsulta
                            mascota={datas}
                            imgDedault={imgPetDefault}
                        />)}
                    </main>

                    {notify && (
                        <Notification
                            {...notify}
                        />
                    )}
                </main>
            ) : (
                <Notification
                    title='Cargando...'
                    message='Obteniendo datos'
                    load={1}
                />
            )}
        </>
    )
}