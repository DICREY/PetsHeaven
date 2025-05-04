// Librarys 
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { User, PawPrint, ArrowLeft, Trash2, Edit, Save, X, Calendar } from 'lucide-react'

// Imports 
import {NavBarAdmin} from '../BarrasNavegacion/NavBarAdmi'
import { loadingAlert, getRoles, formatDate, getAge, errorStatusHandler } from '../Varios/Util'
import { DescriptionPeople } from './DescriptionPeople'
import { DeleteData, ModifyData } from '../Varios/Requests'

// Import styles 
import '../../../src/styles/InterfazAdmin/PerfilPropietario.css'

// Component 
export const PerfilPropietario = ({ userSelect,user = false, owner = false, URL = '' }) => {
  // Vars dynamic
  const [activeTab, setActiveTab] = useState('propietario')
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [petsData,setPetsData] = useState([])
  const [userData,setUserData] = useState({})
  const [modPro,setModPro] = useState({})

  // Vars 
  const mainUrl = `${URL}/owner`
  const secondUrl = `${URL}/user`
  const navigate = useNavigate()
  const headers = {
    Nombres: 'nom_per',
    Apellidos: 'ape_per',
    'Fecha Nacimiento': 'fec_nac_per',
    'T. Doc': 'tip_doc_per',
    Documento: 'doc_per',
    Direccion: 'dir_per',
    Celular: 'cel_per',
    'Celular 2': 'cel2_per',
    Correo: 'email_per',
    Genero: 'gen_per'
  }

  // Functions 
  const verHistorial = (id) => {
    // Aquí se implementaría la lógica para mostrar el historial
    alert(`Mostrando historial de la mascota con ID: ${id}`)
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
        const mod = await ModifyData(`${secondUrl}/modify`, token, modPro)
        mod.ok && swal({
          icon: 'success',
          title: 'Modificado',
          text: 'Los datos de la mascota han sido modificados',
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
  
          deleted.deleted && swal({
            icon: 'success',
            title: 'Desactivada',
            text: 'La mascota han sido desactivada correctamente.',
          })
        }
      } else navigate('/34')
    } catch (err) {
      err.message? swal({
          icon: 'error',
          title: 'Error',
          text: err.message
      }): console.log(err)
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
    if (!userSelect) navigate('/admin/consultorio')
    setUserData(userSelect)
    setFormData(userSelect)
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
            <button className='botonAtrasProps' onClick={() => navigate('/admin/consultorio')}>
              <ArrowLeft size={18} />
              <span>Atrás</span>
            </button>

            {/* Botones de Eliminar y Editar solo cuando estamos en la pestaña de Propietario */}
            {activeTab === 'propietario' && (
              <>
                <button className='botonEliminarProps' onClick={handleDeleteClick}>
                  <Trash2 size={18} />
                  <span>Eliminar</span>
                </button>

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
                  <button className='botonEditarProps' onClick={handleEditClick}>
                    <Edit size={18} />
                    <span>Editar</span>
                  </button>
                )}
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
            <DescriptionPeople 
              handleChange={handleChange} 
              headers={headers}
              datas={userSelect}
              navigate={navigate}
              isEditing={isEditing}
              disabled={['doc_per', 'tip_doc_per']}
            />
          )}

          {activeTab === 'mascotas' && (
            <section className='mascotasContenedorProps'>
              <div className='mascotasGrillaProps'>
                {petsData.map((mascota) => (
                  <div key={mascota.doc_per} className='mascotaTarjetaProps'>
                    <div className='mascotaImagenProps'>
                      <img src={mascota.fot_mas || '/placeholder.svg'} alt={mascota.nom_mas} />
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
                        <button className='botonHistorialProps' onClick={() => verHistorial(mascota.doc_per)}>
                          <Calendar size={16} />
                          <span>Ver historial</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {petsData.length === 0 && <div className='sinResultadosProps'>No hay mascotas vinculadas</div>}
            </section>
          )}
        </section>
      </div>
      </div>      
    
    </main> 
  )
}
