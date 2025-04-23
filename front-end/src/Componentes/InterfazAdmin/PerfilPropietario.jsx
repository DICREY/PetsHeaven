import React, { useState } from "react"
import { User, PawPrint, ArrowLeft, Trash2, Edit, Save, X, Calendar } from "lucide-react"

// Imports 
import {NavBarAdmin} from '../BarrasNavegacion/NavBarAdmi'
import { loadingAlert, getRoles, formatDate } from '../Varios/Util'
import { DeleteData } from '../Varios/Requests'
import "../../../public/styles/InterfazAdmin/PerfilPropietario.css"

// Component 
export const PerfilPropietario = ({ userSelect, URL = "" }) => {
  // Vars 
  const [activeTab, setActiveTab] = useState("propietario")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(userSelect)
  const [petsData,setPetsData] = useState([])
  const [userData,setUserData] = useState(userSelect)
  const mainUrl = `${URL}/owner`

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

  const handleSaveEdit = () => {
    setPropietario(formData)
    setIsEditing(false)
    const token = localStorage.getItem("token")
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
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
          const roles =  getRoles(token)
          const admin = roles.some(role => role.toLowerCase() === "administrador")
          if (admin) {
            loadingAlert("Validando...")
            const deleted = await DeleteData(`${mainUrl}/delete`,token,{
              doc: userData.doc_usu
            })
    
            deleted.deleted && swal({
              icon: 'success',
              title: 'Desactivada',
              text: 'La mascota han sido desactivada correctamente.',
            })
          }
        } else window.location.href = "/34"
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

  return (
    <main className="contenedorpageProps">
      <NavBarAdmin />
      <div className="principalpageProp">
        <div className="contenedorProps">
        
        <div className="cabeceraProps">
          <h1 className="tituloProps">
            Configuración de usuario <span className="subtituloProps">Creación</span>
          </h1>
          <div className="botonesAccionProps">
            <button className="botonAtrasProps" onClick={() => window.location.href = '/admin/consultorio'}>
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
                          value={formData.tip_doc_usu}
                          onChange={handleChange}
                          
                        >
                          <option disabled>Seleccione tipo</option>
                          <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                          <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                          <option value="Pasaporte">Pasaporte</option>
                          <option value="Cédula de Extranjería">Cédula de Extranjería</option>
                        </select>
                      ) : (
                        <div className="propietarioValorProps">{userData.tip_doc_usu}</div>
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
                          value={formData.doc_usu}
                          onChange={handleChange}
                          disabled
                        />
                      ) : (
                        <div className="propietarioValorProps">{userData.doc_usu}</div>
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
                          value={formData.nom_usu}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="propietarioValorProps">{userData.nom_usu}</div>
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
                          value={formData.ape_usu}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="propietarioValorProps">{userData.ape_usu}</div>
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
                          value={formData.fec_nac_usu}
                          onChange={handleChange}
                          disabled
                        />
                      ) : (
                        <div className="propietarioValorProps">{userData.fec_nac_usu}</div>
                      )}
                    </div>

                    {/* Género */}
                    <div className="propietarioCampoProps">
                      <div className="propietarioEtiquetaProps">Género</div>
                      {isEditing ? (
                        <select className="inputEditProps" name="genero" value={formData.gen_usu} onChange={handleChange}>
                          <option value="Masculino">Masculino</option>
                          <option value="Femenino">Femenino</option>
                          <option value="Otro">Otro</option>
                        </select>
                      ) : (
                        <div className="propietarioValorProps">{userData.gen_usu || "no-registrado"}</div>
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
                          value={formData.cel_usu}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="propietarioValorProps">{userData.cel_usu}</div>
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
                          value={formData.dir_usu}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="propietarioValorProps">{userData.dir_usu}</div>
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
                          value={formData.email_usu}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="propietarioValorProps">{userData.email_usu}</div>
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
                  <div key={mascota.id} className="mascotaTarjetaProps">
                    <div className="mascotaImagenProps">
                      <img src={mascota.foto || "/placeholder.svg"} alt={mascota.nombre} />
                    </div>
                    <div className="mascotaInfoProps">
                      <h3 className="mascotaNombreProps">{mascota.nombre}</h3>
                      <div className="mascotaDetallesProps">
                        <div className="mascotaDetalleProps">
                          <span className="mascotaEtiquetaProps">Especie:</span> {mascota.especie}
                        </div>
                        <div className="mascotaDetalleProps">
                          <span className="mascotaEtiquetaProps">Raza:</span> {mascota.raza}
                        </div>
                        <div className="mascotaDetalleProps">
                          <span className="mascotaEtiquetaProps">Edad:</span> {mascota.edad}
                        </div>
                        <div className="mascotaDetalleProps">
                          <span className="mascotaEtiquetaProps">Género:</span> {mascota.genero}
                        </div>
                      </div>
                      <div className="mascotaAccionesProps">
                        <button className="botonHistorialProps" onClick={() => verHistorial(mascota.id)}>
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
