import React, { useState } from "react";
import { User, PawPrint, ArrowLeft, Trash2, Edit, Save, X, Calendar } from "lucide-react"
import "../../../public/styles/InterfazAdmin/PerfilPropietario.css";
import {NavBarAdmin} from '../BarrasNavegacion/NavBarAdmi'; // Asegúrate que la ruta sea correcta

// Datos de ejemplo gay el que lo lea
const propietarioData = {
  foto: "/placeholder.svg?height=200&width=200",
  tipoDocumento: "Cédula de Ciudadanía",
  numeroDocumento: "45645645",
  nombres: "Critian",
  apellidos: "Gómez Pérez",
  fechaNacimiento: "1985-06-15",
  genero: "Masculino",
  celular: "+573012270041, 55554545, 5656565",
  direccion: "dfgdfgdfgdf, Soacha",
  correo: "critian@ejemplo.com",
  contacto: "Pipip",
};

const mascotasData = [
  {
    id: 1,
    nombre: "Firulais",
    especie: "Canino",
    raza: "Golden",
    genero: "Macho",
    reproductivo: "No esterilizado",
    edad: "3 años",
    foto: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 2,
    nombre: "Michi",
    especie: "Felino",
    raza: "Siamés",
    genero: "Hembra",
    reproductivo: "Esterilizada",
    edad: "2 años",
    foto: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 3,
    nombre: "Rocky",
    especie: "Canino",
    raza: "Criollo(a)",
    genero: "Macho",
    reproductivo: "No esterilizado",
    edad: "5 años",
    foto: "/placeholder.svg?height=120&width=120",
  },
]

export default function PerfilPropietario() {
  const [activeTab, setActiveTab] = useState("propietario")
  const [isEditing, setIsEditing] = useState(false)
  const [propietario, setPropietario] = useState(propietarioData)
  const [formData, setFormData] = useState(propietarioData)

  const verHistorial = (id) => {
    // Aquí se implementaría la lógica para mostrar el historial
    alert(`Mostrando historial de la mascota con ID: ${id}`)
  }

  const handleEditClick = () => {
    setFormData(propietario)
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  const handleSaveEdit = () => {
    setPropietario(formData)
    setIsEditing(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleDeleteClick = () => {
    if (window.confirm("¿Está seguro que desea eliminar este propietario?")) {
      alert("Propietario eliminado")
      // Aquí iría la lógica para eliminar el propietario
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
                          value={formData.tipoDocumento}
                          onChange={handleChange}
                          
                        >
                          <option disabled>Seleccione tipo</option>
                          <option value="Cédula de Ciudadanía">Cédula de Ciudadanía</option>
                          <option value="Tarjeta de Identidad">Tarjeta de Identidad</option>
                          <option value="Pasaporte">Pasaporte</option>
                          <option value="Cédula de Extranjería">Cédula de Extranjería</option>
                        </select>
                      ) : (
                        <div className="propietarioValorProps">{propietario.tipoDocumento}</div>
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
                          value={formData.numeroDocumento}
                          onChange={handleChange}
                          disabled
                        />
                      ) : (
                        <div className="propietarioValorProps">{propietario.numeroDocumento}</div>
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
                          value={formData.nombres}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="propietarioValorProps">{propietario.nombres}</div>
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
                          value={formData.apellidos}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="propietarioValorProps">{propietario.apellidos}</div>
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
                          value={formData.fechaNacimiento}
                          onChange={handleChange}
                          disabled
                        />
                      ) : (
                        <div className="propietarioValorProps">{propietario.fechaNacimiento}</div>
                      )}
                    </div>

                    {/* Género */}
                    <div className="propietarioCampoProps">
                      <div className="propietarioEtiquetaProps">Género</div>
                      {isEditing ? (
                        <select className="inputEditProps" name="genero" value={formData.genero} onChange={handleChange}>
                          <option value="Masculino">Masculino</option>
                          <option value="Femenino">Femenino</option>
                          <option value="Otro">Otro</option>
                        </select>
                      ) : (
                        <div className="propietarioValorProps">{propietario.genero}</div>
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
                          value={formData.celular}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="propietarioValorProps">{propietario.celular}</div>
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
                          value={formData.direccion}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="propietarioValorProps">{propietario.direccion}</div>
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
                          value={formData.correo}
                          onChange={handleChange}
                        />
                      ) : (
                        <div className="propietarioValorProps">{propietario.correo}</div>
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
                {mascotasData.map((mascota) => (
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

              {mascotasData.length === 0 && <div className="sinResultadosProps">No hay mascotas vinculadas</div>}
            </div>
          )}
        </div>
      </div>
      </div>      
    
    </main> 
  )
}
