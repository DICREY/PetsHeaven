// Librarys 
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, PawPrint, ArrowLeft, Trash2, Edit, Save, X, Calendar } from 'lucide-react'

// Imports 
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { formatDate, getAge, errorStatusHandler, checkImage } from '../Varios/Util'
import { DeleteData, ModifyData } from '../Varios/Requests'
import { Description } from '../Global/Description'
import { Notification } from '../Global/Notifys'
import Footer from '../Varios/Footer2'
import { HeaderUser } from '../BarrasNavegacion/HeaderUser'
import { HeaderAdmin } from '../BarrasNavegacion/HeaderAdmin'
import { AuthContext } from '../../Contexts/Contexts'

// Import styles 
import '../../../src/styles/InterfazAdmin/PerfilPropietario.css'

// Component 
export const PerfilPropietario = ({
  userSelect,
  owner = false,
  URL = '',
  imgPetDefault = '',
  imgUserDefault = '',
  setPetDetailTab,
  setPetSelect }) => {
  // Vars dynamic
  const [isEditing, setIsEditing] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [activeTab, setActiveTab] = useState('propietario')
  const [petsData, setPetsData] = useState([])
  const [formData, setFormData] = useState({})
  const [notify, setNotify] = useState(null)
  const [userData, setUserData] = useState({})
  const [modPro, setModPro] = useState({})

  // Vars 
  const mainUrl = `${URL}/people`
  const imgDefault = imgUserDefault
  const imgDefaultPet = imgPetDefault
  const { admin, roles } = useContext(AuthContext)
  const navigate = useNavigate()
  const headers = {
    Nombres: 'nom_per',
    Apellidos: 'ape_per',
    'Fecha Nacimiento': 'fec_nac_per',
    'Tipo Documento': 'tip_doc_per',
    Documento: 'doc_per',
    Direccion: 'dir_per',
    Celular: 'cel_per',
    'Celular 2': 'cel2_per',
    Correo: 'email_per',
    Genero: 'gen_per'
  }

  // Functions 
  const verHistorial = (data) => {
    setPetSelect({
      nom_per: userSelect.doc_per,
      ape_per: userSelect.doc_per,
      doc_per: userSelect.doc_per,
      dir_per: userSelect.doc_per,
      cel_per: userSelect.doc_per,
      email_per: userSelect.doc_per,
      ...data
    })
    setPetDetailTab('Historia Clinica')
    navigate('/pets/details')
  }

  const handleEditClick = () => {
    setFormData(userData)
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const handleSaveEdit = async () => {
    setNotify({
      title: 'Guardando...',
      message: 'Por favor, espere mientras se guardan los cambios.',
      load: 1
    })
    setIsEditing(false)
    try {
      const mod = await ModifyData(`${mainUrl}/modify`, modPro)
      setNotify(null)
      mod.modified & setNotify({
        title: 'Modificado',
        message: 'Los datos del usuario han sido modificados',
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setModPro((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDeleteClick = async () => {
    // Vars
    setNotify({
      title: 'Desactivando...',
      message: 'Por favor, espere mientras se desactiva al usuario.',
      load: 1
    })
    try {
      const admin = roles.some(role => role.toLowerCase() === 'administrador')
      if (admin) {
        const deleted = await DeleteData(`${mainUrl}/delete`, { doc: userData.doc_per })
        setNotify(null)
        deleted.deleted & setNotify({
          title: 'Desactivada',
          message: 'La persona ha sido desactivada correctamente.',
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

  const handleTabChange = (tab) => {
    if (isEditing) {
      if (window.confirm('Tiene cambios sin guardar. ¿Desea salir sin guardar?')) {
        setIsEditing(false)
        setActiveTab(tab)
      }
    } else {
      setActiveTab(tab)
    }
  }

  // Effects
  useEffect(() => {
    setModPro({
      nombres: userData.Nombres,
      apellidos: userData.Apellidos,
      fechaNacimiento: formatDate(userData['Fecha Nacimiento']),
      tipoDocumento: userData['T. Doc'],
      numeroDocumento: userData.Documento,
      direccion: userData.Direccion,
      celular: userData.Celular,
      celular2: userData['Celular 2'],
      email: userData.Correo,
      password: userData.cont_per,
      genero: userData.Genero,
    })
    setPetsData(userData.mascotas)
  }, [petsData])

  useEffect(() => {
    // Vars

    if (!userSelect) navigate('/consultorio')
    setUserData(userSelect)
    setFormData(userSelect)

    const admin = roles.some(role => role.toLowerCase() === 'administrador')

    admin ? setIsAdmin(true) : setIsAdmin(false)
  }, [])

  return (
    <main className='contenedorpageProps'>
      <NavBarAdmin />
      <main className='principalpageProp'>
        {admin ? (<HeaderAdmin />) : (<HeaderUser />)}

        <section className='tarjetagesusuario'>
          <section className='contenedorProps'>
            <header className='cabeceraProps'>
              <h1 className='tituloProps'>
                Configuración de usuario <span className='subtituloProps'> | Creación</span>
              </h1>
              <div className='botonesAccionProps'>
                <button className='BackBtn' onClick={() => navigate(-1)}>
                  <ArrowLeft className='icon' />
                  <span>Atrás</span>
                </button>

                {/* Botones de Eliminar y Editar solo cuando estamos en la pestaña de Propietario */}
                {activeTab === 'propietario' && (
                  <>
                    {isEditing ? (
                      <>
                        <button className='DeleteBtn' onClick={handleCancelEdit}>
                          <X className='icon' />
                          <span>Cancelar</span>
                        </button>
                        <button className='AddBtn' onClick={handleSaveEdit}>
                          <Save className='icon' />
                          <span>Guardar</span>
                        </button>
                      </>
                    ) : (
                      <button className='EditBtn' onClick={handleEditClick}>
                        <Edit className='icon' />
                        <span>Editar</span>
                      </button>
                    )}
                    {isAdmin && !isEditing && (
                      <button className='DeleteBtn' onClick={handleDeleteClick}>
                        <Trash2 className='icon' />
                        <span>Desactivar</span>
                      </button>)
                    }
                  </>
                )}
              </div>
            </header>

            {
              owner && (
                <nav className='pestanasProps'>
                  <button
                    className={`pestanaProps ${activeTab === 'propietario' ? 'activaProps' : ''}`}
                    onClick={() => handleTabChange('propietario')}
                  >
                    <User className='icon' />
                    <span>Usuario</span>
                  </button>
                  <button
                    className={`pestanaProps ${activeTab === 'mascotas' ? 'activaProps' : ''}`}
                    onClick={() => handleTabChange('mascotas')}
                  >
                    <PawPrint className='icon' />
                    <span>Mascotas</span>
                  </button>
                </nav>
              )
            }

            <section className='contenidoProps'>
              {activeTab === 'propietario' && (
                <Description
                  handleChange={handleChange}
                  headers={headers}
                  datas={userSelect}
                  imgDefault={imgDefault}
                  navigate={navigate}
                  isEditing={isEditing}
                  disabled={['doc_per', 'tip_doc_per']}
                />
              )}

              {activeTab === 'mascotas' && (
                <section className='mascotasContenedorProps'>
                  <div className='mascotasGrillaProps'>
                    {petsData?.map((mascota, index) => (
                      <article key={index + 1293} className='mascotaTarjetaProps'>
                        <section className='mascotaImagenProps'>
                          {checkImage(
                            mascota.fot_mas,
                            `${mascota.esp_mas} de raza ${mascota.raz_mas} color ${mascota.col_mas} con nombre ${mascota.nom_mas}`,
                            imgDefaultPet
                          )}
                        </section>
                        <section className='mascotaInfoProps'>
                          <h3 className='mascotaNombreProps'>{mascota.nom_mas}</h3>
                          <div className='mascotaDetallesProps'>
                            <div className='mascotaDetalleProps'>
                              <span className='mascotaEtiquetaProps'>Especie:</span> {mascota.esp_mas}
                            </div>
                            <div className='mascotaDetalleProps'>
                              <span className='mascotaEtiquetaProps'>Raza:</span> {mascota.raz_mas}
                            </div>
                            <div className='mascotaDetalleProps'>
                              <span className='mascotaEtiquetaProps'>Edad:</span> {getAge(mascota.fec_nac_mas)}
                              {' Años'}
                            </div>
                            <div className='mascotaDetalleProps'>
                              <span className='mascotaEtiquetaProps'>Género:</span> {mascota.gen_mas}
                            </div>
                          </div>
                          <div className='mascotaAccionesProps'>
                            <button className='botonHistorialProps' onClick={() => verHistorial(mascota)}>
                              <Calendar size={16} />
                              <span>Ver historial</span>
                            </button>
                          </div>
                        </section>
                      </article>
                    ))}
                  </div>

                  {petsData?.length === 0 && <div className='sinResultadosProps'>No hay mascotas vinculadas</div>}
                </section>
              )}
            </section>
          </section>
        </section>
        <Footer />
      </main>
      {notify && (
        <Notification
          {...notify}
        />
      )}
    </main>
  )
}
