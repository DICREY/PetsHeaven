// Librarys 
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, PawPrint, ArrowLeft, Trash2, Edit, Save, X, Calendar } from 'lucide-react'

// Imports 
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { loadingAlert, getRoles, formatDate, getAge, errorStatusHandler, checkImage } from '../Varios/Util'
import { Description } from '../Global/Description'
import { DeleteData, ModifyData } from '../Varios/Requests'

// Import styles 
import '../../../src/styles/InterfazAdmin/PerfilPropietario.css'

// Component 
export const PerfilPropietario = ({ 
    userSelect, 
    owner = false,
    URL = '', 
    imgPetDefault = '', 
    imgUserDefault = '',
    setPetSelect }) => {
  // Vars dynamic
  const [isEditing, setIsEditing] = useState(false)
  const [isAdmin,setIsAdmin] = useState(false)
  const [activeTab, setActiveTab] = useState('propietario')
  const [petsData,setPetsData] = useState([])
  const [formData, setFormData] = useState({})
  const [userData,setUserData] = useState({})
  const [modPro,setModPro] = useState({})

  // Vars 
  const mainUrl = `${URL}/owner`
  const imgDefault = imgUserDefault
  const imgDefaultPet = imgPetDefault
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
      ...data})
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
    setIsEditing(false)
    const token = localStorage.getItem('token')
    try {
      if (token) {
        loadingAlert('Validando...',)
        const mod = await ModifyData(`${mainUrl}/modify`, token, modPro)
        console.log(mod)
        mod.modified & swal({
          icon: 'success',
          title: 'Modificado',
          text: 'Los datos del usuario han sido modificados',
        })
      }
    } catch (err) {
      if(err.status) {
        const message = errorStatusHandler(err.status)
        swal({
          title: 'Error',
          text: `${message}`,
          icon: 'warning',
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
    const token = localStorage.getItem('token')
    try {
      if(token) {
        const roles = getRoles(token)
        const admin = roles.some(role => role.toLowerCase() === 'administrador')
        if (admin) {
          loadingAlert('Validando...')
          const deleted = await DeleteData(`${mainUrl}/delete`,token,{
            doc: userData.doc_per
          })
  
          deleted.deleted & swal({
            icon: 'success',
            title: 'Desactivada',
            text: 'La persona ha sido desactivada correctamente.',
          })
        }
      } else navigate('/user/login')
    } catch (err) {
      if(err.status) {
        const message = errorStatusHandler(err.status)
        swal({
          icon: 'error',
          title: 'Error',
          text: message
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
  },[petsData])

  useEffect(() => {
    // Vars
    const token = localStorage.getItem('token')

    if (!userSelect) navigate('/consultorio')
    setUserData(userSelect)
    setFormData(userSelect)

    if(token) {
      // Vars
      const roles =  getRoles(token)
      const admin = roles.some(role => role.toLowerCase() === 'administrador')

      admin?setIsAdmin(true):setIsAdmin(false)
    } else navigate('/user/login')
  },[])

  return (
    <main className='contenedorpageProps'>
      <NavBarAdmin />
      <div className='principalpageProp'>
        <div className='contenedorProps'>
        
        <header className='cabeceraProps'>
          <h1 className='tituloProps'>
            Configuración de usuario <span className='subtituloProps'> | Creación</span>
          </h1>
          <div className='botonesAccionProps'>
            <button className='BackBtn' onClick={() => navigate(-1)}>
              <ArrowLeft size={18} />
              <span>Atrás</span>
            </button>

            {/* Botones de Eliminar y Editar solo cuando estamos en la pestaña de Propietario */}
            {activeTab === 'propietario' && (
              <>
                {isEditing ? (
                  <>
                    <button className='botonCancelarProps' onClick={handleCancelEdit}>
                      <X size={18} />
                      <span>Cancelar</span>
                    </button>
                    <button className='botonGuardarProps' onClick={handleSaveEdit}>
                      <Save size={18} />
                      <span>Guardar</span>
                    </button>
                  </>
                ) : (
                  <button className='EditBtn' onClick={handleEditClick}>
                    <Edit size={18} />
                    <span>Editar</span>
                  </button>
                )}
                {isAdmin && !isEditing && (
                  <button className='DeleteBtn' onClick={handleDeleteClick}>
                    <Trash2 size={18} />
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
                <User size={18} />
                <span>Usuario</span>
              </button>
              <button
                className={`pestanaProps ${activeTab === 'mascotas' ? 'activaProps' : ''}`}
                onClick={() => handleTabChange('mascotas')}
              >
                <PawPrint size={18} />
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
                  <div key={index + 1293} className='mascotaTarjetaProps'>
                    <div className='mascotaImagenProps'>
                      {checkImage(
                        mascota.fot_mas,
                        `${mascota.esp_mas} de raza ${mascota.raz_mas} color ${mascota.col_mas} con nombre ${mascota.nom_mas}`,
                        imgDefaultPet
                      )}
                    </div>
                    <div className='mascotaInfoProps'>
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
                    </div>
                  </div>
                ))}
              </div>

              {petsData?.length === 0 && <div className='sinResultadosProps'>No hay mascotas vinculadas</div>}
            </section>
          )}
        </section>
      </div>
      </div>      
    
    </main> 
  )
}
