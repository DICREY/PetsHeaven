// Librarys 
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, PawPrint, ArrowLeft, Trash2, Edit, Save, X, Calendar } from 'lucide-react'
import { useForm } from 'react-hook-form'

// Imports 
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { formatDate, getAge, errorStatusHandler, checkImage, uploadImg } from '../Varios/Util'
import { ModifyData, PostData } from '../Varios/Requests'
import { Description } from '../Global/Description'
import { Notification } from '../Global/Notifys'
import { HeaderUser } from '../BarrasNavegacion/HeaderUser'
import { HeaderAdmin } from '../BarrasNavegacion/HeaderAdmin'
import { AuthContext } from '../../Contexts/Contexts'
import Footer from '../Varios/Footer2'
import RolPrivilegios from '../InterfazAdmin/FormulariosAdmin/RolPrivilegios'
import InformacionProfesional from '../InterfazAdmin/FormulariosAdmin/InformacionProfesional'

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
  const [modPro, setModPro] = useState(userSelect)
  const [rol, setRol] = useState(0)
  const [profileImage, setProfileImage] = useState(null)

  // Vars 
  const mainUrl = `${URL}/people`
  const imgDefault = imgUserDefault
  const imgDefaultPet = imgPetDefault
  const { admin } = useContext(AuthContext)
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
    Email: 'email_per',
    Genero: 'gen_per'
  }

  // Form configuration
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      rol: 0,
    }
  })

  const AssigRol = async (datas) => {
    const data = {
      doc_per: userData.doc_per,
      rol_per: datas.rol,
      hor_vet: datas.horVet,
      esp_vet: datas.especialidad,
      num_tar_vet: datas.numTargPro,
      fot_tar_vet: datas.tarjetaProfesional,
    }
    console.log(data)
    try {
      const assign = await PostData(`${mainUrl}/assign-rol`,data)
      if (assign?.assigned) {
        setNotify({
          title: 'Rol Asignado',
          message: 'El rol fue asignado correctamente.',
          close: setNotify
        })
      }
    } catch (err) {
      setNotify(null)
      const message = errorStatusHandler(err)
      setNotify({
        title: 'Error',
        message: `${message}`,
        close: setNotify
      })
    }
  }

  // Functions 
  const verHistorial = (data) => {
    setPetSelect({
      nom_per: userSelect.nom_per,
      ape_per: userSelect.ape_per,
      doc_per: userSelect.doc_per,
      dir_per: userSelect.dir_per,
      cel_per: userSelect.cel_per,
      email_per: userSelect.email_per,
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
      const imgUrl = await uploadImg(modPro.img,'users')
      const mod = await ModifyData(`${mainUrl}/modify`, {...modPro, img_per: imgUrl})
      setNotify(null)
      if (mod?.modified) {
        setNotify({
          title: 'Modificado',
          message: 'Los datos del usuario han sido modificados',
          close: setNotify
        })
        setTimeout(() => navigate(-1), 2000)
      } 
    } catch (err) {
      setNotify(null)
      const message = errorStatusHandler(err)
      setNotify({
        title: 'Error',
        message: `${message}`,
        close: setNotify
      })
    }
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    if (name === 'img') handleProfileImageChange(e)
    setModPro(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleProfileImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target.result)
        setModPro(prev => ({
        ...prev,
        img: file,
      })) 
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDeleteClick = async () => {
    // Vars
    setNotify({
      title: 'Desactivando...',
      message: 'Por favor, espere mientras se desactiva al usuario.',
      load: 1
    })
    try {
      if (admin) {
        const deleted = await ModifyData(`${mainUrl}/delete`, { doc: userData.doc_per })
        setNotify(null)
        if (deleted?.deleted) {
          setNotify({
            title: 'Desactivada',
            message: 'La persona ha sido desactivada correctamente.',
            close: setNotify
          })
          setTimeout(() => navigate(-1),2000)
        }
      }
    } catch (err) {
      setNotify(null)
      const message = errorStatusHandler(err)
      setNotify({
        title: 'Error',
        message: message,
        close: setNotify
      })
    }
  }

  const handleTabChange = (tab) => {
    if (isEditing) {
      setNotify({
          title: 'Atencion',
          message: 'Tiene cambios sin guardar. ¿Desea salir sin guardar?',
          firstOption: () => setNotify(null),
          secondOption: () => {setIsEditing(false); setActiveTab(tab); setNotify(null)},
          secondOptionName: 'Salir',
      })
    } else setActiveTab(tab)
  }

  // Effects
  useEffect(() => {
    setModPro({
      nom_per: userData.nom_per,
      ape_per: userData.ape_per,
      fec_nac_per: formatDate(userData.fec_nac_per),
      tip_doc_per: userData.tip_doc_per,
      doc_per: userData.doc_per,
      dir_per: userData.dir_per,
      cel_per: userData.cel_per,
      cel2_per: userData.cel2_per,
      email_per: userData.email_per,
      cont_per: userData.cont_per,
      gen_per: userData.gen_per,
    })
    setPetsData(userData.mascotas)
  }, [petsData])

  useEffect(() => {
    // Vars
    if (!userSelect) navigate('/consultorio')
    setUserData(userSelect)
    setFormData(userSelect)

    admin? setIsAdmin(true) : setIsAdmin(false)
  }, [])

  return (
    <main className='contenedorpageProps'>
      <NavBarAdmin />
      <main className='principalpageProp'>
        {admin ? (<HeaderAdmin URL={URL} />) : (<HeaderUser />)}

        <section className='tarjetagesusuario'>
          <section className='contenedorProps'>
            <header className='cabeceraProps'>
              <h1 className='tituloProps'>
                Configuración de usuario <span className='subtituloProps'> | Edición</span>
              </h1>
              <nav className='botonesAccionProps'>
                <button 
                  className='BackBtn'
                  onClick={() => navigate(-1)}
                  >
                  <ArrowLeft className='icon' />
                  Atrás
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
                        <button className='EditBtn' onClick={handleSaveEdit}>
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
                {activeTab === 'rol' && (
                  <button
                    className='EditBtn'
                    type='submit'
                    onClick={handleSubmit(AssigRol)}
                  >
                    Assignar
                  </button>
                )}
              </nav>
            </header>

            {admin && (
              <nav className='pestanasProps'>
                <button
                  className={`pestanaProps ${activeTab === 'propietario' ? 'activaProps' : ''}`}
                  onClick={() => handleTabChange('propietario')}
                >
                  <User className='icon' />
                  <span>Usuario</span>
                </button>
                {owner && (
                  <button
                    className={`pestanaProps ${activeTab === 'mascotas' ? 'activaProps' : ''}`}
                    onClick={() => handleTabChange('mascotas')}
                  >
                    <PawPrint className='icon' />
                    <span>Mascotas</span>
                  </button>)
                }
                <button
                  className={`pestanaProps ${activeTab === 'rol' ? 'activaProps' : ''}`}
                  onClick={() => handleTabChange('rol')}
                >
                  <User className='icon' />
                  <span>Roles</span>
                </button>
              </nav>
            )}

            <section className='contenidoProps'>
              {activeTab === 'propietario' && userSelect &&(
                <Description
                  handleChange={handleChange}
                  headers={headers}
                  dataHeaders={Object.values(headers)}
                  datas={userSelect}
                  headerImg={'fot_per'}
                  imgDefault={imgDefault}
                  navigate={navigate}
                  isEditing={isEditing}
                  disabled={['doc_per', 'tip_doc_per']}
                />
              )}

              {activeTab === 'mascotas' && userSelect && (
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
                            <button className='EditBtn expandBtn' onClick={() => verHistorial(mascota)}>
                              <Calendar className='icon' />
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

              {activeTab === 'rol' && userSelect && (
                <form>
                  <RolPrivilegios register={register} errors={errors} setVet={setRol} />
                  <hr className='lineH' />
                  <InformacionProfesional register={register} errors={errors} vet={rol} />
                </form>
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
