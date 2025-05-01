import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { User, PawPrint, ArrowLeft, Trash2, Edit, Save, X, Calendar } from "lucide-react"

// Imports 
import {NavBarAdmin} from '../BarrasNavegacion/NavBarAdmi'
import { loadingAlert, getRoles, formatDate, getAge, errorStatusHandler } from '../Varios/Util'
import { DeleteData, ModifyData } from '../Varios/Requests'
import "../../../public/styles/InterfazAdmin/PerfilPropietario.css"

// Component 
export const PerfilPropietario = ({ userSelect, URL = "" }) => {
  // Vars dynamic
  const [activeTab, setActiveTab] = useState("propietario")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(userSelect)
  const [petsData,setPetsData] = useState([])
  const [userData,setUserData] = useState(userSelect)
  const [modPro,setModPro] = useState({})

  // Vars
  const mainUrl = `${URL}/owner`
  const secondUrl = `${URL}/user`
  const navigate = useNavigate()

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
    const token = localStorage.getItem("token")
    try {
      if (token) {
        loadingAlert("Validando...",)
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
    if (window.confirm("¿Está seguro que desea eliminar este propietario?")) {
      // Vars
      const token = localStorage.getItem("token")
      try {
        if(token) {
          const roles = getRoles(token)
          const admin = roles.some(role => role.toLowerCase() === "administrador")
          if (admin) {
            loadingAlert("Validando...")
            const deleted = await DeleteData(`${mainUrl}/delete`,token,{
              doc: userData.doc_per
            })
    
            deleted.deleted && swal({
              icon: 'success',
              title: 'Desactivada',
              text: 'La mascota han sido desactivada correctamente.',
            })
          }
        } else navigate("/34")
      } catch (err) {
        err.message? swal({
            icon: "error",
            title: "Error",
            text: err.message
        }): console.log(err)
      }
    }
  }

  const handleTabChange = (tab) => {
    if (isEditing) {
      if (window.confirm("Tiene cambios sin guardar. ¿Desea salir sin guardar?")) {
        setIsEditing(false)
        setActiveTab(tab)
      }
    } else {
      setActiveTab(tab)
    }
  }

  useEffect(() => {
    setModPro({
      nombres: userData.nom_per,
      apellidos: userData.ape_per,
      fechaNacimiento: formatDate(userData.fec_nac_per),
      tipoDocumento: userData.tip_doc_per,
      numeroDocumento: userData.doc_per,
      direccion: userData.dir_per,
      celular: userData.cel_per,
      celular2: userData.cel2_per,
      email: userData.email_per,
      password: userData.cont_per,
      genero: userData.gen_per,
    })
    setPetsData(userData.mascotas)
  },[petsData])

  return (
    <main className="contenedorpageProps">
      <NavBarAdmin />
      <div className="principalpageProp">
        <div className="contenedorProps">
        
        <div className="cabeceraProps">
          <h1 className="tituloProps">
            Configuración de usuario <span className="subtituloProps"> | Creación</span>
          </h1>
          <div className="botonesAccionProps">
            <button className="botonAtrasProps" onClick={() => navigate('/admin/consultorio')}>
              <ArrowLeft size={18} />
              <span>Atrás</span>
            </button>

            {/* Botones de Eliminar y Editar solo cuando estamos en la pestaña de Propietario */}
            {activeTab === "propietario" && (
              <>
                <button className="botonEliminarProps" onClick={handleDeleteClick}>
                  <Trash2 size={18} />
                  <span>Eliminar</span>
                </button>

                {isEditing ? (
                  <>
                    <button className="botonCancelarProps" onClick={handleCancelEdit}>
                      <X size={18} />
                      <span>Cancelar</span>
                    </button>
                    <button className="botonGuardarProps" onClick={handleSaveEdit}>
                      <Save size={18} />
                      <span>Guardar</span>
                    </button>
                  </>
                ) : (
                  <button className="botonEditarProps" onClick={handleEditClick}>
                    <Edit size={18} />
                    <span>Editar</span>
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        <div className="pestanasProps">
          <button
            className={`pestanaProps ${activeTab === "propietario" ? "activaProps" : ""}`}
            onClick={() => handleTabChange("propietario")}
          >
            <User size={18} />
            <span>Usuario</span>
          </button>
          <button
            className={`pestanaProps ${activeTab === "mascotas" ? "activaProps" : ""}`}
            onClick={() => handleTabChange("mascotas")}
          >
            <PawPrint size={18} />
            <span>Mascotas</span>
          </button>
        </div>

        <div className="contenidoProps">
          {activeTab === "propietario" && (
            <div className="propietarioSeccionProps">
              <h2 className="seccionTituloProps">Información personal:</h2>

              <div className="propietarioInfoProps">
                <div className="propietarioFotoInfoProps">
                  <div className="propietarioFotoProps">
                    <User size={100} />
                  </div>
                  <div className="propietarioDatosProps">
                    {/* Tipo de Documento */}
                    <div className="propietarioCampoProps">
                      <div className="propietarioEtiquetaProps">Tipo de Documento</div>
                      {isEditing ? (
                        <select
                          className="inputEditProps"
                          name="tipoDocumento"
                          defaultValue={formData.tip_doc_per}
                          onChange={handleChange}
                          
                        >
                          <option disabled>Seleccione tipo</option>
                          <option value="CC">Cédula de Ciudadanía</option>
                          <option value="TI">Tarjeta de Identidad</option>
                          <option value="Pasaporte">Pasaporte</option>
                          <option value="CE">Cédula de Extranjería</option>
                        </select>
                      ) : (
                        <div className="propietarioValorProps">{userData.tip_doc_per}</div>
                      )}
                    </div>

                    {/* Número de Documento */}
                    <div className="propietarioCampoProps">
                      <div className="propietarioEtiquetaProps">Número de Documento</div>
                      {isEditing ? (
                        <input
                          type="text"
                          className="inputEditProps"
                          name="numeroDocumento"
                          defaultValue={formData.doc_per}
                          onChange={handleChange}
                          disabled
                        />
                      ) : (
                        <div className="propietarioValorProps">{userData.doc_per}</div>
                      )}
                    </div>

                    {/* Nombres */}
                    <div className="propietarioCampoProps">
                      <div className="propietarioEtiquetaProps">Nombres</div>
                      {isEditing ? (
                        <input
                          type="text"
                          className="inputEditProps"
                          name="nombres"
                          defaultValue={formData.nom_per}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="propietarioValorProps">{userData.nom_per}</div>
                      )}
                    </div>

                    {/* Apellidos */}
                    <div className="propietarioCampoProps">
                      <div className="propietarioEtiquetaProps">Apellidos</div>
                      {isEditing ? (
                        <input
                          type="text"
                          className="inputEditProps"
                          name="apellidos"
                          defaultValue={formData.ape_per}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="propietarioValorProps">{userData.ape_per}</div>
                      )}
                    </div>

                    {/* Fecha de Nacimiento */}
                    <div className="propietarioCampoProps">
                      <div className="propietarioEtiquetaProps">Fecha de Nacimiento</div>
                      {isEditing ? (
                        <input
                          type="date"
                          className="inputEditProps"
                          name="fechaNacimiento"
                          defaultValue={formatDate(formData.fec_nac_per)}
                          onChange={handleChange}
                          disabled
                        />
                      ) : (
                        <div className="propietarioValorProps">{formatDate(userData.fec_nac_per)}</div>
                      )}
                    </div>

                    {/* Género */}
                    <div className="propietarioCampoProps">
                      <div className="propietarioEtiquetaProps">Género</div>
                      {isEditing ? (
                        <select className="inputEditProps" name="genero" defaultValue={formData.gen_per} onChange={handleChange}>
                          <option value="Masculino">Masculino</option>
                          <option value="Femenino">Femenino</option>
                          <option value="Otro">Otro</option>
                        </select>
                      ) : (
                        <div className="propietarioValorProps">{userData.gen_per || "no-registrado"}</div>
                      )}
                    </div>

                    {/* Teléfonos */}
                    <div className="propietarioCampoProps">
                      <div className="propietarioEtiquetaProps">Celular</div>
                      {isEditing ? (
                        <input
                          type="text"
                          className="inputEditProps"
                          name="celular"
                          defaultValue={formData.cel_per}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="propietarioValorProps">{userData.cel_per}</div>
                      )}
                    </div>

                    {/* Dirección */}
                    <div className="propietarioCampoProps">
                      <div className="propietarioEtiquetaProps">Dirección</div>
                      {isEditing ? (
                        <input
                          type="text"
                          className="inputEditProps"
                          name="direccion"
                          defaultValue={formData.dir_per}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="propietarioValorProps">{userData.dir_per}</div>
                      )}
                    </div>

                    {/* Correo */}
                    <div className="propietarioCampoProps">
                      <div className="propietarioEtiquetaProps">Correo</div>
                      {isEditing ? (
                        <input
                          type="email"
                          className="inputEditProps"
                          name="correo"
                          defaultValue={formData.email_per}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="propietarioValorProps">{userData.email_per}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "mascotas" && (
            <div className="mascotasContenedorProps">
              <div className="mascotasGrillaProps">
                {petsData.map((mascota) => (
                  <div key={mascota.doc_per} className="mascotaTarjetaProps">
                    <div className="mascotaImagenProps">
                      <img src={mascota.fot_mas || "/placeholder.svg"} alt={mascota.nom_mas} />
                    </div>
                    <div className="mascotaInfoProps">
                      <h3 className="mascotaNombreProps">{mascota.nom_mas}</h3>
                      <div className="mascotaDetallesProps">
                        <div className="mascotaDetalleProps">
                          <span className="mascotaEtiquetaProps">Especie:</span> {mascota.esp_mas}
                        </div>
                        <div className="mascotaDetalleProps">
                          <span className="mascotaEtiquetaProps">Raza:</span> {mascota.raz_mas}
                        </div>
                        <div className="mascotaDetalleProps">
                          <span className="mascotaEtiquetaProps">Edad:</span> {getAge(mascota.fec_nac_mas)}
                           {" Años"}
                        </div>
                        <div className="mascotaDetalleProps">
                          <span className="mascotaEtiquetaProps">Género:</span> {mascota.gen_mas}
                        </div>
                      </div>
                      <div className="mascotaAccionesProps">
                        <button className="botonHistorialProps" onClick={() => verHistorial(mascota.doc_per)}>
                          <Calendar size={16} />
                          <span>Ver historial</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {petsData.length === 0 && <div className="sinResultadosProps">No hay mascotas vinculadas</div>}
            </div>
          )}
        </div>
      </div>
      </div>      
    
    </main> 
  )
}
