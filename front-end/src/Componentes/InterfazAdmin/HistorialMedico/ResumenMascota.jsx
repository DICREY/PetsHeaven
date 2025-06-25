import React from "react"
import { useState } from "react"
import { User, Phone, MapPin, Edit, Save, X } from "lucide-react"
import "../../../styles/InterfazAdmin/HistorialMedico/ResumenMascota.css"
import { CheckImage } from "../../../Utils/Utils"

export default function ResumenMascota({ petData, setPetData, imgDefault = '' }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(petData)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)

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

  return (
    <aside className="cabecera-masc">
      <section className="contenido-masc">
        <div className="titulo-sec-masc">
          <div className="nombre-sec-masc">
            <h1 className="nombre-masc">
              {isEditing ? (
                <input
                  value={editData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="input-nombre-masc"
                />
              ) : (
                petData.name
              )}
            </h1>
          </div>
          <div className="acciones-masc">
            {isEditing ? (
              <>
                <button onClick={handleSave} className="btn-guardar-masc">
                  <Save className="ico-masc" />
                  Guardar
                </button>
                <button onClick={handleCancel} className="btn-cancelar-masc">
                  <X className="ico-masc" />
                  Cancelar
                </button>
              </>
            ) : (
              <button onClick={() => setIsEditing(true)} className="btn-editar-masc">
                <Edit className="ico-masc" />
                Editar
              </button>
            )}
          </div>
        </div>

        <div className="perfil-masc">
          <div className="foto-sec-masc">
            <div className="contenedor-foto-masc">
              {petData.photo ? (
                <CheckImage 
                  src={petData.photo || "/placeholder.svg"} 
                  alt={petData.name} 
                  imgDefault={imgDefault}
                  className="foto-masc" 
                />
              ) : (
                <span className="avatar-masc">{petData.name.charAt(0)}</span>
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
                <span className="valor-masc">{petData.species}</span>
              </div>
              <div className="item-dato-masc">
                <span className="etiqueta-masc">Raza:</span>
                <span className="valor-masc">{petData.breed}</span>
              </div>
              <div className="item-dato-masc">
                <span className="etiqueta-masc">Color:</span>
                {isEditing ? (
                  <input
                    value={editData.color}
                    onChange={(e) => handleChange("color", e.target.value)}
                    className="input-masc"
                  />
                ) : (
                  <span className="valor-masc">{petData.color}</span>
                )}
              </div>
              <div className="item-dato-masc">
                <span className="etiqueta-masc">Peso:</span>
                {isEditing ? (
                  <input
                    value={editData.weight}
                    onChange={(e) => handleChange("weight", e.target.value)}
                    className="input-masc"
                  />
                ) : (
                  <span className="valor-masc">{petData.weight}</span>
                )}
              </div>
              <div className="item-dato-masc">
                <span className="etiqueta-masc">Género:</span>
                {isEditing ? (
                  <select
                    value={editData.gender}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="select-masc"
                  >
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                  </select>
                ) : (
                  <span className="valor-masc">{petData.gender}</span>
                )}
              </div>
              <div className="item-dato-masc">
                <span className="etiqueta-masc">Nacimiento:</span>
                <span className="valor-masc">{petData.birthDate}</span>
              </div>
              <div className="item-dato-masc">
                <span className="etiqueta-masc">Estado:</span>
                <span className="valor-masc">{petData.reproductiveStatus}</span>
              </div>
              <div className="item-dato-masc">
                <span className="etiqueta-masc">Alimento:</span>
                {isEditing ? (
                  <input
                    value={editData.food}
                    onChange={(e) => handleChange("food", e.target.value)}
                    className="input-masc"
                  />
                ) : (
                  <span className="valor-masc">{petData.food}</span>
                )}
              </div>
            </div>

            <div className="contacto-masc">
              <div className="seccion-prop-masc">
                <h3 className="titulo-prop-masc">
                  <User className="ico-masc" />
                  Propietario
                </h3>
                <div className="datos-prop-masc">
                  <div className="campo-prop-masc">
                    <span className="etiqueta-prop-masc">Nombre:</span>
                    {isEditing ? (
                      <input
                        value={editData.owner.name}
                        onChange={(e) => handleChange("owner.name", e.target.value)}
                        className="input-prop-masc"
                      />
                    ) : (
                      <p className="valor-prop-masc">{petData.owner.name}</p>
                    )}
                  </div>
                  <div className="campo-prop-masc">
                    <span className="etiqueta-prop-masc">Teléfono:</span>
                    {isEditing ? (
                      <input
                        value={editData.owner.phone}
                        onChange={(e) => handleChange("owner.phone", e.target.value)}
                        className="input-prop-masc"
                      />
                    ) : (
                      <p className="tel-prop-masc">
                        <Phone className="ico-tel-masc" />
                        {petData.owner.phone}
                      </p>
                    )}
                  </div>
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
                        value={editData.owner.email}
                        onChange={(e) => handleChange("owner.email", e.target.value)}
                        className="input-prop-masc"
                      />
                    ) : (
                      <p className="valor-prop-masc">{petData.owner.email}</p>
                    )}
                  </div>
                  <div className="campo-prop-masc">
                    <span className="etiqueta-prop-masc">Dirección:</span>
                    {isEditing ? (
                      <input
                        value={editData.owner.address}
                        onChange={(e) => handleChange("owner.address", e.target.value)}
                        className="input-prop-masc"
                      />
                    ) : (
                      <p className="valor-prop-masc">{petData.owner.address}</p>
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
