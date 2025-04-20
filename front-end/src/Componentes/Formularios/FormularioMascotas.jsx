// Librarys
import React, { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import { supabase } from "../../supabaseClient"
import swal from 'sweetalert'

// Import
import { PostData } from '../Varios/Requests'
import { loadingAlert } from '../Varios/Util'

// Import Styles
import "../../../public/styles/Formularios/FormularioMascotas.css"

// Main component
export const FormularioRegMascota = ({ onRegist, open = true, URL = "" }) => {
  // Estados
  const [imagen, setImagen] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(open)
  const fileInputRef = useRef(null)
  
  // Usa react-hook-form para manejar TODO el formulario
  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    reset 
  } = useForm({
    defaultValues: {
      nombre: "",
      especie: "",
      color: "",
      raza: "",
      alimento: "",
      edad: "",
      peso: "",
      propietario: "",
      sexo: ""
    }
  })

  // Elimina el useState para formData ya que react-hook-form lo manejará

  // Effects (se mantienen igual)
  useEffect(() => {
    if (imagen) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(imagen)
    } else {
      setPreviewUrl(null)
    }
  }, [imagen])

  // Handlers
  const handleIconClick = () => {
    fileInputRef.current.click()
  }

  const handleImagenChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setImagen(file)
    }
  }

  const handleRemoverImagen = () => {
    setImagen(null)
  }

  const sendData = async (data) => {
    // Vars 
    const token = localStorage.getItem("token")
    const mainURL = `${URL}/register`

    try {
      if (token) {

        loadingAlert("Validando...")
        
        const create = await PostData(mainURL,token,data)

        create.ok && swal({
          icon: 'success',
          title: 'Modificado',
          text: 'Los datos de la mascota han sido modificados',
        })
      }
    } catch (err) {
      err.message? swal({
          icon: "error",
          title: "Error",
          text: err.message
      }): console.log(err)
    }
  }

  // Función de submit modificada
  const onSubmit = async (data) => {
    if (!imagen) {
      alert("Por favor selecciona una imagen")
      return
    }

    setIsLoading(true)

    try {
      // 1. Subir la imagen a Supabase Storage
      const fileExt = imagen.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('mascotas')
        .upload(fileName, imagen)

      if (uploadError) throw uploadError

      // 2. Obtener URL pública de la imagen
      const { data: { publicUrl } } = supabase.storage
        .from('mascotas')
        .getPublicUrl(uploadData.path)
      
      
        const petData = {
          nom_mas: data.nombre,
          esp_mas: data.especie,
          col_mas: data.color,
          raz_mas: data.raza,
          ali_mas: data.alimento,
          fec_nac_mas: data.edad,
          pes_mas: data.peso,
          doc_usu: data.propietario,
          gen_mas: data.sexo,
          est_rep_mas: data.est_rep,
          fot_mas: publicUrl
        }
        sendData(petData)


      alert("Mascota registrada con éxito!")
      reset() // Limpia el formulario
      setImagen(null) // Limpia la imagen
      onRegist(false) // Cierra el formulario

    } catch (error) {
      console.log(error)
      alert(`Error al registrar: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isOpen && (
        <main className="loginContMascota">
          <section className="formContMascota">
            <article className="formCardMascota">
              <header className="formHeadMascota">
                <h1 className="formTituloMascota">Registrar Mascota</h1>
                <p className="formSubtituloMascota">Completa los datos de tu mascota</p>
              </header>

              {/* Contenedor superior para imagen y botones */}
              <div className="supContBotonesMascota">
                <div
                  className="imgPrevContMascota contenedor-preview-m"
                  onClick={handleIconClick}
                  style={{
                    backgroundImage: previewUrl ? `url(${previewUrl})` : null,
                  }}
                >
                  <input
                      id="imagen"
                      type="file"
                      accept="image/*"
                      disabled={isLoading}
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleImagenChange}
                    />
                  {!previewUrl && (
                    <div className="iconoCargaMascota icono-carga-m">
                      {/* Texto dentro del círculo */}
                      Subir foto
                    </div>
                    
                  )}
                </div>
                <div className="botonesMascota">
                  <button type="button" className="btn-container secundary" onClick={() => {
                      onRegist(false)
                      setIsOpen(false)
                    }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Cerrar
                  </button>
                  <button 
                    type="submit" 
                    className="btn-container primary" 
                    disabled={isLoading}
                    onClick={onSubmit}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-save-icon lucide-save">
                      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/>
                    </svg>
                    Guardar
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="contPasoMascota">
                  <legend className="sr-only">Información de la mascota</legend>

                  {/* Campos del formulario debajo de la imagen */}
                  <div className="grupoCampoMascota">
                    <label htmlFor="nombre">Nombre de la mascota <span className="obligatorio-m">*</span></label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      maxLength={50}
                      placeholder="Nombre"
                      className={errors.nombre ? "campoErrorMascota campo-error-m" : ""}
                      {...register("nombre", {
                        required: "Este campo es obligatorio",
                        minLength: {
                          value: 2,
                          message: "Debe contener al menos 2 caracteres",
                        },
                        maxLength: {
                          value: 50,
                          message: "Debe contener menos de 50 caracteres",
                        },
                      })}
                    />
                    {errors.nombre && <p className="msjErrorMascota mensaje-error-m">{errors.nombre.message}</p>}
                  </div>

                  <div className="grupoCampoMascota">
                    <label htmlFor="especie">Especie <span className="obligatorio-m">*</span></label>
                    <select
                      id="especie"
                      name="especie"
                      className={errors.especie ? "campoErrorMascota campo-error-m" : ""}
                      {...register("especie", {
                        required: "Este campo es obligatorio",
                      })}
                      defaultValue={""}
                    >
                      <option value="" disabled>Selecciona una especie</option>
                      <option value="Perro">Perro</option>
                      <option value="Gato">Gato</option>
                      <option value="Ave">Ave</option>
                      <option value="Roedor">Roedor</option>
                      <option value="Reptil">Reptil</option>
                      <option value="Otro">Otro</option>
                    </select>
                    {errors.especie && <p className="msjErrorMascota mensaje-error-m">{errors.especie.message}</p>}
                  </div>

                  <div className="grupoCampoMascota">
                    <label htmlFor="raza">Raza de la mascota <span className="obligatorio-m">*</span></label>
                    <input
                      id="raza"
                      name="raza"
                      type="text"
                      placeholder="Raza"
                      className={errors.raza ? "campoErrorMascota campo-error-m" : ""}
                      {...register("raza", {
                        required: "Este campo es obligatorio",
                      })}
                    />
                    {errors.raza && <p className="msjErrorMascota mensaje-error-m">{errors.raza.message}</p>}
                  </div>

                  <div className="grupoCampoMascota">
                    <label htmlFor="color">Color de la mascota <span className="obligatorio-m">*</span></label>
                    <input
                      id="color"
                      name="color"
                      type="text"
                      placeholder="Color"
                      className={errors.color ? "campoErrorMascota campo-error-m" : ""}
                      {...register("color", {
                        required: "Este campo es obligatorio",
                      })}
                    />
                    {errors.color && <p className="msjErrorMascota mensaje-error-m">{errors.color.message}</p>}
                  </div>

                  <div className="grupoCampoMascota">
                    <label htmlFor="alimento">Alimento preferido <span className="obligatorio-m">*</span></label>
                    <input
                      id="alimento"
                      name="alimento"
                      type="text"
                      placeholder="alimento"
                      className={errors.alimento ? "campoErrorMascota campo-error-m" : ""}
                      {...register("alimento", {
                        required: "Este campo es obligatorio",
                      })}
                    />
                    {errors.alimento && <p className="msjErrorMascota mensaje-error-m">{errors.alimento.message}</p>}
                  </div>

                  <div className="grupoCampoMascota">
                    <label htmlFor="edad">Edad de la mascota <span className="obligatorio-m">*</span></label>
                    <input
                      id="edad"
                      name="edad"
                      type="date"
                      placeholder="Edad (en años)"
                      className={errors.edad ? "campoErrorMascota campo-error-m" : ""}
                      {...register("edad", {
                        required: "Este campo es obligatorio",
                        min: {
                          value: 0,
                          message: "La edad debe ser mayor o igual a 0",
                        },
                      })}
                    />
                    {errors.edad && <p className="msjErrorMascota mensaje-error-m">{errors.edad.message}</p>}
                  </div>

                  <div className="grupoCampoMascota">
                    <label htmlFor="peso">Peso de la mascota <span className="obligatorio-m">*</span></label>
                    <input
                      id="peso"
                      name="peso"
                      type="number"
                      placeholder="Peso (en kg)"
                      className={errors.peso ? "campoErrorMascota campo-error-m" : ""}
                      {...register("peso", {
                        required: "Este campo es obligatorio",
                        min: {
                          value: 0,
                          message: "El peso debe ser mayor o igual a 0",
                        },
                      })}
                    />
                    {errors.peso && <p className="msjErrorMascota mensaje-error-m">{errors.peso.message}</p>}
                  </div>

                  <div className="grupoCampoMascota">
                    <label htmlFor="sexo">Sexo de la mascota <span className="obligatorio-m">*</span></label>
                    <select
                      id="sexo"
                      name="sexo"
                      className={errors.sexo ? "campoErrorMascota campo-error-m" : ""}
                      {...register("sexo", {
                        required: "Este campo es obligatorio",
                      })}
                    >
                      <option value="">Selecciona el sexo</option>
                      <option value="Femenino">Femenino</option>
                      <option value="Masculino">Masculino</option>
                    </select>
                    {errors.sexo && <p className="msjErrorMascota mensaje-error-m">{errors.sexo.message}</p>}
                  </div>

                  <div className="grupoCampoMascota">
                    <label htmlFor="est_rep">Estado Reproductivo de la mascota <span className="obligatorio-m">*</span></label>
                    <select
                      id="est_rep"
                      name="est_rep"
                      className={errors.est_rep ? "campoErrorMascota campo-error-m" : ""}
                      {...register("est_rep", {
                        required: "Este campo es obligatorio",
                      })}
                    >
                      <option value="">Selecciona el estado Reproductivo</option>
                      <option value="Esterilizado">Esterilizado</option>
                      <option value="No esterilizado">No esterilizado</option>
                    </select>
                    {errors.est_rep && <p className="msjErrorMascota mensaje-error-m">{errors.est_rep.message}</p>}
                  </div>

                  <div className="grupoCampoMascota">
                    <label htmlFor="idPropietario">Propietario<span className="obligatorio-m">*</span></label>
                    <input
                      id="idPropietario"
                      name="propietario"
                      type="text"
                      placeholder="Email o Documento del propietario"
                      className={errors.idPropietario ? "campoErrorMascota campo-error-m" : ""}
                      {...register("propietario", {
                        required: "Este campo es obligatorio",
                      })}
                    />
                    {errors.idPropietario && <p className="msjErrorMascota mensaje-error-m">{errors.idPropietario.message}</p>}
                  </div>

                </fieldset>
                <button 
                    type="submit" 
                    className="btn-container primary" 
                    disabled={isLoading}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-save-icon lucide-save">
                      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/>
                    </svg>
                    Guardar
                  </button>
              </form>
            </article>
          </section>
        </main>)
      } 
    </>
  )
}