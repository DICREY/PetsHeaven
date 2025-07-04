// Librarys 
import React, { useContext, useState } from "react"
import { User, Phone, MapPin, Edit, Save, X, Trash2 } from "lucide-react"
import { useNavigate } from "react-router"

// Imports 
import { CheckImage } from "../../../Utils/Utils"
import { errorStatusHandler, formatDate } from "../../Varios/Util"
import { AuthContext } from "../../../Contexts/Contexts"
import { ModifyData } from "../../Varios/Requests"

// Import styles 
import "../../../styles/InterfazAdmin/HistorialMedico/ResumenMascota.css"

// Component 
export default function ResumenMascota({ petData, setPetData, imgDefault = '', URL = '', setNotify }) {
  // Dynamic vars 
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(petData)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)

  // Vars 
  const { admin } = useContext(AuthContext)
  const navigate = useNavigate()

  // Functions 
  const handleSave = () => {
    setPetData(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(petData)
    setIsEditing(false)
  }

  const handleChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setEditData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setEditData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      setIsUploadingPhoto(true)
      // Simular subida de archivo
      const reader = new FileReader()
      reader.onload = (e) => {
        handleChange("photo", e.target.result)
        setIsUploadingPhoto(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const deletePet = async () => {
    // Vars
    const deleteURL = `${URL}/pet/delete`
    setNotify({
        title: 'Validando...',
        message: 'Verificando datos proporcionados',
        load: 1
    })
    try {
        const deleted = await ModifyData(deleteURL, {
            nom_mas: petData.nom_mas,
            doc_per: petData.doc_per
        })
        setNotify(null)
        if (deleted?.deleted) {
            setNotify({
                title: 'Mascota Desactivada',
                message: 'La mascota ha sido desactivada correctamente.',
                close: setNotify
            })
            setTimeout(() => navigate(-1),2000)
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

  return (
    <aside className="cabecera-masc">
      <section className="contenido-masc">
        <div className="titulo-sec-masc">
          <div className="nombre-sec-masc">
            <h1 className="nombre-masc">
              {isEditing ? (
                <input
                  value={editData.nom_mas}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="input-nombre-masc"
                />
              ) : (
                petData.nom_mas
              )}
            </h1>
          </div>
          <div className="acciones-masc">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="EditBtn">
                  <Save className="ico-masc" />
                  Guardar
                </button>
                <button onClick={handleCancel} className="DeleteBtn">
                  <X className="ico-masc" />
                  Cancelar
                </button>
              </>
            ) : (
              <>
                { admin && (
                  <button className='DeleteBtn' onClick={deletePet}>
                    <Trash2 className='icon' />
                    <span>Desactivar</span>
                  </button>
                )}
                <button onClick={() => setIsEditing(true)} className="EditBtn">
                  <Edit className="ico-masc" />
                  Editar
                </button>
              </>
            )}
          </div>
        </div>

        <div className="perfil-masc">
          <div className="foto-sec-masc">
            <div className="contenedor-foto-masc">
              {petData.fot_mas ? (
                <CheckImage 
                  src={petData.fot_mas || "/placeholder.svg"} 
                  alt={petData.nom_mas} 
                  imgDefault={imgDefault}
                  className="foto-masc" 
                />
              ) : (
                <span className="avatar-masc">{petData.nom_mas?.charAt()}</span>
              )}
              {isEditing && (
                <div className="overlay-foto-masc">
                  <label className="etiqueta-foto-masc">
                    {isUploadingPhoto ? "Subiendo..." : "Cambiar"}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="input-foto-masc"
                      disabled={isUploadingPhoto}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="info-masc">
            <div className="datos-basicos-masc">
              <div className="item-dato-masc">
                <span className="etiqueta-masc">Especie:</span>
                <span className="valor-masc">{petData.esp_mas}</span>
              </div>
              <div className="item-dato-masc">
                <span className="etiqueta-masc">Raza:</span>
                <span className="valor-masc">{petData.raz_mas}</span>
              </div>
              <div className="item-dato-masc">
                <span className="etiqueta-masc">Color:</span>
                {isEditing ? (
                  <input
                    value={editData.col_mas}
                    onChange={(e) => handleChange("color", e.target.value)}
                    className="input-masc"
                  />
                ) : (
                  <span className="valor-masc">{petData.col_mas}</span>
                )}
              </div>
              <div className="item-dato-masc">
                <span className="etiqueta-masc">Peso:</span>
                {isEditing ? (
                  <input
                    value={editData.pes_mas}
                    onChange={(e) => handleChange("weight", e.target.value)}
                    className="input-masc"
                  />
                ) : (
                  <span className="valor-masc">{petData.pes_mas}</span>
                )}
              </div>
              <div className="item-dato-masc">
                <span className="etiqueta-masc">Género:</span>
                {isEditing ? (
                  <select
                    value={editData.gen_mas}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="select-masc"
                  >
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                  </select>
                ) : (
                  <span className="valor-masc">{petData.gen_mas}</span>
                )}
              </div>
              <div className="item-dato-masc">
                <span className="etiqueta-masc">Nacimiento:</span>
                <span className="valor-masc">{formatDate(petData.fec_nac_mas)}</span>
              </div>
              <div className="item-dato-masc">
                <span className="etiqueta-masc">Estado:</span>
                <span className="valor-masc">{petData.est_rep_mas}</span>
              </div>
              <div className="item-dato-masc">
                <span className="etiqueta-masc">Alimento:</span>
                {isEditing ? (
                  <input
                    value={editData.ali_mas}
                    onChange={(e) => handleChange("food", e.target.value)}
                    className="input-masc"
                  />
                ) : (
                  <span className="valor-masc">{petData.ali_mas}</span>
                )}
              </div>
            </div>

            <div className="contacto-masc">
              <div className="seccion-prop-masc">
                <h3 className="titulo-prop-masc">
                  <User className="ico-masc" />
                  Propietario
                </h3>
                <div className="datos-prop-masc-line">
                  <div className="campo-prop-masc">
                    <span className="etiqueta-prop-masc">Nombre:</span>
                    {isEditing ? (
                      <input
                        value={editData.nom_per}
                        onChange={(e) => handleChange("nom_per", e.target.value)}
                        className="input-prop-masc"
                      />
                    ) : (
                      <p className="valor-prop-masc">{petData.nom_per}</p>
                    )}
                  </div>
                  <div className="campo-prop-masc">
                    <span className="etiqueta-prop-masc">Apellido:</span>
                    {isEditing ? (
                      <input
                        value={editData.ape_per}
                        onChange={(e) => handleChange("ape_per", e.target.value)}
                        className="input-prop-masc"
                      />
                    ) : (
                      <p className="valor-prop-masc">{petData.ape_per}</p>
                    )}
                  </div>
                </div>
                <div className="campo-prop-masc">
                    <span className="etiqueta-prop-masc">Documento:</span>
                    <p className="valor-prop-masc">{petData.doc_per}</p>
                  </div>
              </div>

              <div className="seccion-prop-masc">
                <h3 className="titulo-prop-masc">
                  <MapPin className="ico-masc" />
                  Contacto
                </h3>
                <div className="datos-prop-masc">
                  <div className="campo-prop-masc">
                    <span className="etiqueta-prop-masc">Email:</span>
                    {isEditing ? (
                      <input
                        value={editData.email_per}
                        onChange={(e) => handleChange("email_per", e.target.value)}
                        className="input-prop-masc"
                      />
                    ) : (
                      <p className="valor-prop-masc">{petData.email_per}</p>
                    )}
                  </div>
                  <div className="campo-prop-masc">
                    <span className="etiqueta-prop-masc">Celular:</span>
                    {isEditing ? (
                      <input
                        value={editData.cel_per}
                        onChange={(e) => handleChange("cel_per", e.target.value)}
                        className="input-prop-masc"
                      />
                    ) : (
                      <p className="tel-prop-masc">
                        <Phone className="ico-tel-masc" />
                        {petData.cel_per}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </aside>
  )
}
