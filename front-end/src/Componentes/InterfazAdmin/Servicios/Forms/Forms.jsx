// Librarys 
import React, { useEffect, useState } from "react"
import { X, FileText, Target, AlertTriangle, Clock } from "lucide-react"

// Imports 
import { DataFilter, errorStatusHandler, formatDate } from "../../../Varios/Util"
import { formatPrice } from "../../../../Utils/Utils"
import { GetData } from "../../../Varios/Requests"

// Component 
export const FormularioVacuna = ({ onGuardar, onCancelar, initialData = {} }) => {
  const [form, setForm] = useState({
    nombre: initialData.nombre || "",
    descripcion: initialData.descripcion || "",
    descripcionPro: initialData.descripcionPro || "",
    precio: initialData.precio || "",
    frecuencia: initialData.frecuencia || "",
    tipoAnimal: initialData.tipoAnimal || "perro",
    disponible: initialData.disponible ?? true,
    categoria: initialData.categoria || "Esencial",
    efectosSecundarios: initialData.efectosSecundarios || "",
    lote: initialData.lote || "",
    fechaVencimiento: formatDate(initialData.fechaVencimiento) || "",
    fechaCreacion: formatDate(initialData.fechaCreacion) || "",
    nombreProcedimiento: initialData.nombreProcedimiento || "",
    dosis: {
      cachorro: initialData.dosis?.cachorro || "",
      adulto: initialData.dosis?.adulto || "",
      senior: initialData.dosis?.senior || "",
    },
  })

  const [errores, setErrores] = useState({})

  const categorias = ["Obligatoria", "Esencial", "Recomendada", "Opcional"]

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name.startsWith("dosis.")) {
      const key = name.split(".")[1]
      setForm((prev) => ({
        ...prev,
        dosis: { ...prev.dosis, [key]: value }
      }))
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }))
    }
  }

  const validar = () => {
    const err = {}
    if (!form.nombre) err.nombre = "El nombre es obligatorio"
    if (!form.descripcion) err.descripcion = "La descripción es obligatoria"
    if (!form.precio || isNaN(form.precio) || Number(form.precio) <= 0) err.precio = "Precio válido obligatorio"
    if (!form.frecuencia) err.frecuencia = "La frecuencia es obligatoria"
    if (!form.lote) err.lote = "El lote es obligatorio"
    if (!form.fechaVencimiento) err.fechaVencimiento = "La fecha de vencimiento es obligatoria"
    if (!form.fechaCreacion) err.fechaCreacion = "La fecha de creación es obligatoria"
    if (!form.efectosSecundarios) err.efectosSecundarios = "Los efectos secundarios son obligatorios"
    if (!form.dosis.cachorro) err.dosisCachorro = "Dosis para cachorro obligatoria"
    if (!form.dosis.adulto) err.dosisAdulto = "Dosis para adulto obligatoria"
    if (!form.dosis.senior) err.dosisSenior = "Dosis para senior obligatoria"
    if (!form.nombreProcedimiento) err.nombreProcedimiento = "El nombre del procedimiento es obligatorio"
    if (!form.descripcionPro) err.descripcionPro = "La descripción del procedimiento es obligatoria"
    return err? err: {}
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = validar()
    setErrores(err)
    if (Object.keys(err).length === 0) {
      onGuardar(form)
    }
  }

  return (
    <form className="formulario-vacunas" onSubmit={handleSubmit} autoComplete="off">
      <section className="seccion-formulario-vacunas">
        <h4 className="titulo-seccion-formulario">Información General</h4>
        <div className="campos-formulario-vacunas">
          <div className="campo-vacunas">
            <label className="etiqueta-campo-vacunas">Nombre de la Vacuna</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className="input-vacunas"
              placeholder="Ej: Rabia"
              required
            />
            {errores.nombre && <span className="mensaje-error">{errores.nombre}</span>}
          </div>
          <div className="campo-vacunas">
            <label className="etiqueta-campo-vacunas">Descripción General</label>
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              className="textarea-vacunas"
              rows={2}
              placeholder="Breve descripción de la vacuna"
              required
            />
            {errores.descripcion && <span className="mensaje-error">{errores.descripcion}</span>}
          </div>
        </div>
      </section>

      <section className="seccion-formulario-vacunas">
        <h4 className="titulo-seccion-formulario">Procedimiento de aplicación</h4>
        <div className="campos-formulario-vacunas">
          <div className="campo-vacunas">
            <label className="etiqueta-campo-vacunas">Nombre del Procedimiento</label>
            <input
              name="nombreProcedimiento"
              value={form.nombreProcedimiento}
              onChange={handleChange}
              className="input-vacunas"
              placeholder="Nombre del procedimiento"
              required
            />
            {errores.nombreProcedimiento && <span className="mensaje-error">{errores.nombreProcedimiento}</span>}
          </div>
          <div className="campo-vacunas">
            <label className="etiqueta-campo-vacunas">Descripción del Procedimiento</label>
            <textarea
              name="descripcionPro"
              value={form.descripcionPro}
              onChange={handleChange}
              className="textarea-vacunas"
              rows={2}
              placeholder="Información sobre el procedimiento"
              required
            />
            {errores.descripcionPro && <span className="mensaje-error">{errores.descripcionPro}</span>}
          </div>
        </div>
      </section>

      <div className="seccion-formulario-vacunas">
        <h4 className="titulo-seccion-formulario">Detalles y Clasificación</h4>
        <div className="campos-formulario-vacunas">
          <div className="campos-dobles-vacunas">
            <div className="campo-vacunas">
              <label className="etiqueta-campo-vacunas">Precio (COP)</label>
              <input
                type="number"
                name="precio"
                value={form.precio}
                onChange={handleChange}
                className="input-vacunas"
                placeholder="Ej: 85000"
                required
                min="0"
              />
              {errores.precio && <span className="mensaje-error">{errores.precio}</span>}
            </div>
            <div className="campo-vacunas">
              <label className="etiqueta-campo-vacunas">Frecuencia</label>
              <input
                type="text"
                name="frecuencia"
                value={form.frecuencia}
                onChange={handleChange}
                className="input-vacunas"
                placeholder="Ej: Anual"
                required
              />
              {errores.frecuencia && <span className="mensaje-error">{errores.frecuencia}</span>}
            </div>
          </div>
          <div className="campos-dobles-vacunas">
            {/* <div className="campo-vacunas">
              <label className="etiqueta-campo-vacunas">Tipo de Animal</label>
              <select
                name="tipoAnimal"
                value={form.tipoAnimal}
                onChange={handleChange}
                className="select-vacunas"
              >
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
                <option value="ambos">Ambos</option>
              </select>
            </div> */}
            <div className="campo-vacunas">
              <label className="etiqueta-campo-vacunas">Categoría</label>
              <select
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
                className="select-vacunas"
              >
                {categorias.map((categoria) => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
            </div>
            <div className="campo-vacunas">
              <label className="etiqueta-campo-vacunas">Número de Lote</label>
              <input
                type="text"
                name="lote"
                value={form.lote}
                onChange={handleChange}
                className="input-vacunas"
                placeholder="Ej: RB-2023-45678"
                required
              />
              {errores.lote && <span className="mensaje-error">{errores.lote}</span>}
            </div>
          </div>
          <div className="campos-dobles-vacunas">
            <div className="campo-vacunas">
              <label className="etiqueta-campo-vacunas">Fecha de Creación</label>
              <input
                type="date"
                name="fechaCreacion"
                value={form.fechaCreacion}
                onChange={handleChange}
                className="input-vacunas"
                required
              />
              {errores.fechaCreacion && <span className="mensaje-error">{errores.fechaCreacion}</span>}
            </div>
            <div className="campo-vacunas">
              <label className="etiqueta-campo-vacunas">Fecha de Vencimiento</label>
              <input
                type="date"
                name="fechaVencimiento"
                value={form.fechaVencimiento}
                onChange={handleChange}
                className="input-vacunas"
                required
              />
              {errores.fechaVencimiento && <span className="mensaje-error">{errores.fechaVencimiento}</span>}
            </div>
          </div>
        </div>
      </div>

      <section className="seccion-formulario-vacunas">
        <h4 className="titulo-seccion-formulario">Información Médica</h4>
        <div className="campos-formulario-vacunas">
          <div className="campo-vacunas">
            <label className="etiqueta-campo-vacunas">Efectos Secundarios</label>
            <textarea
              name="efectosSecundarios"
              value={form.efectosSecundarios}
              onChange={handleChange}
              className="textarea-vacunas"
              rows={2}
              placeholder="Posibles efectos secundarios"
              required
            />
            {errores.efectosSecundarios && <span className="mensaje-error">{errores.efectosSecundarios}</span>}
          </div>
          <div className="subseccion-formulario-vacunas">
            <h5 className="subtitulo-seccion-formulario">Dosis Recomendadas</h5>
            <div className="campo-vacunas">
              <label className="etiqueta-campo-vacunas">Cachorros</label>
              <input
                type="text"
                name="dosis.cachorro"
                value={form.dosis.cachorro}
                onChange={handleChange}
                className="input-vacunas"
                placeholder="Ej: 1 ml subcutáneo a partir de los 3 meses"
                required
              />
              {errores.dosisCachorro && <span className="mensaje-error">{errores.dosisCachorro}</span>}
            </div>
            <div className="campo-vacunas">
              <label className="etiqueta-campo-vacunas">Adultos</label>
              <input
                type="text"
                name="dosis.adulto"
                value={form.dosis.adulto}
                onChange={handleChange}
                className="input-vacunas"
                placeholder="Ej: 1 ml subcutáneo anual"
                required
              />
              {errores.dosisAdulto && <span className="mensaje-error">{errores.dosisAdulto}</span>}
            </div>
            <div className="campo-vacunas">
              <label className="etiqueta-campo-vacunas">Senior</label>
              <input
                type="text"
                name="dosis.senior"
                value={form.dosis.senior}
                onChange={handleChange}
                className="input-vacunas"
                placeholder="Ej: 1 ml subcutáneo anual, evaluación previa recomendada"
                required
              />
              {errores.dosisSenior && <span className="mensaje-error">{errores.dosisSenior}</span>}
            </div>
          </div>
          <div className="campo-checkbox-vacunas">
            <input
              type="checkbox"
              name="disponible"
              checked={form.disponible}
              onChange={handleChange}
              className="checkbox-vacunas"
            />
            <label className="etiqueta-checkbox-vacunas">Disponible</label>
          </div>
        </div>
      </section>

      <div className="botones-formulario-vacunas">
        <button type="submit" className="boton-guardar-vacunas">
          Guardar
        </button>
        <button type="button" onClick={onCancelar} className="boton-cancelar-vacunas">
          Cancelar
        </button>
      </div>
    </form>
  )
}

// Componente RegisterService
export const FormularioServicio = ({ onGuardar, onCancelar, initialData = {}, modoEdicion = null, URL = '', mainName = null }) => {
  // Dynamic Vars
  const [categoriasList, setCategoriasList] = useState([])
  const [tiposServiciosList, setTiposServiciosList] = useState([])
  const [proceduresList, setProceduresList] = useState([])
  const [errores, setErrores] = useState({})
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
  const [tipoSeleccionado, setTipoSeleccionado] = useState('')
  const [procedimientoSeleccionado, setProcedimientoSeleccionado] = useState('')
  const [form, setForm] = useState({
    nom_cat: mainName ? mainName : initialData.nom_cat || "",
    slug: initialData.slug || "",
    img_cat: initialData.img_cat || "",
    des_cat: initialData.des_cat || "",
    col_hex: initialData.col_hex || "#4b8ef5",
    nom_tip_ser: initialData.nom_tip_ser || "",
    des_tip_ser: initialData.des_tip_ser || "",
    tec_des_cat: initialData.tec_des_cat || "",
    dur_min_tip_ser: initialData.dur_min_tip_ser || "",
    req_equ_esp: initialData.req_equ_esp ?? false,
    nom_ser: initialData.nom_ser || "",
    pre_ser: initialData.pre_ser || 0,
    des_ser: initialData.des_ser || "",
    pre_act_ser: initialData.pre_act_ser || 0,
    cos_est_ser: initialData.cos_est_ser || 0,
    sta_ser: initialData.sta_ser || "DISPONIBLE",
    req: initialData.req || "",
    nom_pro: initialData.nom_pro || "",
    des_pro: initialData.des_pro || "",
    cat_pro: initialData.cat_pro || "",
    niv_rie_pro: initialData.niv_rie_pro || "BAJO",
    dur_min_pro: initialData.dur_min_pro || "",
    pro_pro: initialData.pro_pro || "",
    con_esp_pro: initialData.con_esp_pro || "",
  })

  // Vars
  const estados = ["DISPONIBLE", "NO_DISPONIBLE", "TEMPORAL"]
  const nivelesRiesgo = ["BAJO", "MODERADO", "ALTO", "CRITICO"]

  // Functions 
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }))
  }

  const handleCategoriaChange = (e) => {
    const value = e.target.value
    setCategoriaSeleccionada(value)
    if (value !== "nueva") {
      // Si selecciona una existente, autocompleta los campos y oculta los inputs de nueva
      setForm((prev) => ({
        ...prev,
        nom_cat: value,
        slug_cat: "",
        img_cat: "",
        des_cat: "",
        col_hex: "#4b8ef5"
      }))
    } else {
      setForm((prev) => ({
        ...prev,
        nom_cat: "",
        slug: "",
        img_cat: "",
        des_cat: "",
        col_hex: "#4b8ef5"
      }))
    }
  }

  const handleTipoChange = (e) => {
    const value = e.target.value
    setTipoSeleccionado(value)
    if (value !== "nuevo") {
      setForm((prev) => ({
        ...prev,
        nom_tip_ser: value,
        des_tip_ser: "",
        tec_des_cat: "",
        dur_min_tip_ser: "",
        req_equ_esp: false
      }))
    } else {
      setForm((prev) => ({
        ...prev,
        nom_tip_ser: "",
        des_tip_ser: "",
        tec_des_cat: "",
        dur_min_tip_ser: "",
        req_equ_esp: false
      }))
    }
  }

  const handleProcedimientoChange = (e) => {
    const value = e.target.value
    setProcedimientoSeleccionado(value)
    if (value !== "nuevo" && value !== "") {
      const proc = proceduresList.find(p => p.nom_pro === value)
      if (proc) {
        setForm((prev) => ({
          ...prev,
          nom_pro: proc.nom_pro,
          des_pro: proc.des_pro,
          cat_pro: proc.cat_pro,
          niv_rie_pro: proc.niv_rie_pro,
          dur_min_pro: proc.dur_min_pro,
          pro_pro: proc.pro_pro,
          con_esp_pro: proc.con_esp_pro
        }))
      }
    } else {
      setForm((prev) => ({
        ...prev,
        nom_pro: "",
        des_pro: "",
        cat_pro: "",
        niv_rie_pro: "BAJO",
        dur_min_pro: "",
        pro_pro: "",
        con_esp_pro: ""
      }))
    }
  }

  const validar = () => {
    const err = {}
    if (!form.nom_cat) err.nom_cat = "Nombre de la categoría requerido"
    if (!form.nom_tip_ser) err.nom_tip_ser = "Nombre del tipo de servicio requerido"
    if (!form.nom_ser) err.nom_ser = "Nombre del servicio requerido"
    if (!form.pre_ser || isNaN(form.pre_ser)) err.pre_ser = "Precio base válido requerido"
    if (!form.pre_act_ser || isNaN(form.pre_act_ser)) err.pre_act_ser = "Precio actual válido requerido"
    if (!form.nom_pro) err.nom_pro = "Nombre del procedimiento requerido"
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = validar()
    setErrores(err)
    if (Object.keys(err).length === 0) onGuardar(form)
  }

  useEffect(() => {
    const GetCategorias = async () => {
      try {
        const data = await GetData(`${URL}/global/services`)
        const mapData = mainName? data?.filter(item => item.nom_cat?.trim()?.toLowerCase() === mainName?.toLowerCase()) : data

        mainName && setCategoriaSeleccionada(mapData[0]?.nom_cat)
        setCategoriasList(mapData)

        GetTiposServicios(mainName?mapData[0]?.id_cat:null)
        GetProcedures(mainName?mapData[0]?.id_cat:null)
      } catch (error) {
        const message = errorStatusHandler(error)
      }
    }

    const GetTiposServicios = async (id) => {
      try {
        const data = await GetData(`${URL}/global/type/services`)
        const mapData = id ? data?.filter(item => item.cat_tip_ser === id) : data
        setTiposServiciosList(mapData)
      } catch (error) {
        const message = errorStatusHandler(error)
      }
    }

    const GetProcedures = async (id) => {
      try {
        const data = await GetData(`${URL}/global/procedures`)
        const mapData = id ? data?.filter(item => item.cat_pro === id) : data
        setProceduresList(mapData)
      } catch (error) {
        const message = errorStatusHandler(error)
      }
    }

    GetCategorias()

    if (initialData) {
      setTipoSeleccionado(initialData.nom_tip_ser || "")
      setProcedimientoSeleccionado(initialData.nom_pro || "")
    }
  },[])

  return (
    <aside className="modal-fondo-vacunas">
      <section className="modal-vacunas">
        <header className="modal-encabezado-vacunas">
          <h3 className="titulo-modal-vacunas">{modoEdicion ? "Editar Servicio" : "Agregar Nuevo Servicio"}</h3>
          <button onClick={onCancelar} className="cerrar-modal-vacunas">
            <X className="icon" />
          </button>
        </header>
        <form className="formulario-vacunas" onSubmit={handleSubmit} autoComplete="off">
          <section className="seccion-formulario-vacunas">
            <h4 className="titulo-seccion-formulario">Categoría</h4>
            <div className="campos-formulario-vacunas">
              <div className="campo-vacunas">
                {!categoriaSeleccionada && (<label className="etiqueta-campo-vacunas">Seleccionar Categoría</label>)}
                <select
                  name="categoriaSelect"
                  value={categoriaSeleccionada}
                  onChange={handleCategoriaChange}
                  className="select-vacunas"
                  disabled={mainName?1:0}
                >
                  <option value="" disabled>-- Seleccione --</option>
                  {categoriasList?.map((cat, index) => (
                    <option key={index} value={cat.nom_cat}>{cat.nom_cat}</option>
                  ))}
                  <option value="nueva">-- Nueva categoría --</option>
                </select>
              </div>
              {(categoriaSeleccionada === "nueva") && (
                <>
                  <div className="campo-vacunas">
                    <label className="etiqueta-campo-vacunas">Nombre</label>
                    <input name="nom_cat" value={form.nom_cat} onChange={handleChange} className="input-vacunas" />
                    {errores.nom_cat && <span className="mensaje-error">{errores.nom_cat}</span>}
                  </div>
                  <div className="campo-vacunas">
                    <label className="etiqueta-campo-vacunas">Slug</label>
                    <input name="slug_cat" value={form.slug_cat} onChange={handleChange} className="input-vacunas" />
                    {errores.slug_cat && <span className="mensaje-error">{errores.slug_cat}</span>}
                  </div>
                  <div className="campo-vacunas">
                    <label className="etiqueta-campo-vacunas">Imagen (URL)</label>
                    <input name="img_cat" value={form.img_cat} onChange={handleChange} className="input-vacunas" />
                  </div>
                  <div className="campo-vacunas">
                    <label className="etiqueta-campo-vacunas">Descripción</label>
                    <textarea name="des_cat" value={form.des_cat} onChange={handleChange} className="textarea-vacunas" />
                  </div>
                  <div className="campo-vacunas">
                    <label className="etiqueta-campo-vacunas">Color</label>
                    <input type="color" name="col_hex" value={form.col_hex} onChange={handleChange} className="input-vacunas" />
                  </div>
                </>
              )}
            </div>
          </section>

          <section className="seccion-formulario-vacunas">
            <h4 className="titulo-seccion-formulario">Tipo de Servicio</h4>
            <div className="campos-formulario-vacunas">
              <div className="campo-vacunas">
                <label className="etiqueta-campo-vacunas">Seleccionar Tipo</label>
                <select
                  name="tipoSelect"
                  value={tipoSeleccionado}
                  onChange={handleTipoChange}
                  className="select-vacunas"
                >
                  <option value="" disabled>-- Seleccione --</option>
                  {tiposServiciosList?.map((tipo, index) => (
                    <option key={index} value={tipo.nom_tip_ser}>{tipo.nom_tip_ser} ({tipo.dur_min_tip_ser} horas) ({categoriaSeleccionada})</option>
                  ))}
                  <option value="nuevo">-- Nuevo tipo de servicio --</option>
                </select>
              </div>
              {(tipoSeleccionado === "nuevo") && (
                <>
                  <div className="campo-vacunas">
                    <label className="etiqueta-campo-vacunas">Nombre</label>
                    <input name="nom_tip_ser" value={form.nom_tip_ser} onChange={handleChange} className="input-vacunas" />
                    {errores.nom_tip_ser && <span className="mensaje-error">{errores.nom_tip_ser}</span>}
                  </div>
                  <div className="campo-vacunas">
                    <label className="etiqueta-campo-vacunas">Descripción</label>
                    <textarea name="des_tip_ser" value={form.des_tip_ser} onChange={handleChange} className="textarea-vacunas" />
                  </div>
                  <div className="campo-vacunas">
                    <label className="etiqueta-campo-vacunas">Descripción Técnica</label>
                    <textarea name="tec_des_cat" value={form.tec_des_cat} onChange={handleChange} className="textarea-vacunas" />
                  </div>
                  <div className="campo-vacunas">
                    <label className="etiqueta-campo-vacunas">Duración mínima (minutos)</label>
                    <input type="number" name="dur_min_tip_ser" value={form.dur_min_tip_ser} onChange={handleChange} className="input-vacunas" />
                  </div>
                  <div className="campo-checkbox-vacunas">
                    <input type="checkbox" name="req_equ_esp" checked={form.req_equ_esp} onChange={handleChange} className="checkbox-vacunas" />
                    <label className="etiqueta-checkbox-vacunas">¿Requiere equipo especial?</label>
                  </div>
                </>
              )}
            </div>
          </section>

          <section className="seccion-formulario-vacunas">
            <h4 className="titulo-seccion-formulario">Servicio</h4>
            <div className="campos-formulario-vacunas">
              <div className="campo-vacunas">
                <label className="etiqueta-campo-vacunas">Nombre</label>
                <input name="nom_ser" value={form.nom_ser} onChange={handleChange} className="input-vacunas" />
                {errores.nom_ser && <span className="mensaje-error">{errores.nom_ser}</span>}
              </div>
              <div className="campo-vacunas">
                <label className="etiqueta-campo-vacunas">Descripción</label>
                <textarea name="des_ser" value={form.des_ser} onChange={handleChange} className="textarea-vacunas" />
              </div>
              <div className="campos-dobles-vacunas">
                <div className="campo-vacunas">
                  <label className="etiqueta-campo-vacunas">Precio base</label>
                  <input min={0} type="number" name="pre_ser" value={form.pre_ser} onChange={handleChange} className="input-vacunas" />
                  {errores.pre_ser && <span className="mensaje-error">{errores.pre_ser}</span>}
                </div>
                <div className="campo-vacunas">
                  <label className="etiqueta-campo-vacunas">Precio actual</label>
                  <input min={0} type="number" name="pre_act_ser" value={form.pre_act_ser} onChange={handleChange} className="input-vacunas" />
                  {errores.pre_act_ser && <span className="mensaje-error">{errores.pre_act_ser}</span>}
                </div>
              </div>
              <div className="campo-vacunas">
                <label className="etiqueta-campo-vacunas">Costo estimado</label>
                <input min={0} type="number" name="cos_est_ser" value={form.cos_est_ser} onChange={handleChange} className="input-vacunas" />
              </div>
              <div className="campo-vacunas">
                <label className="etiqueta-campo-vacunas">Estado</label>
                <select name="sta_ser" value={form.sta_ser} onChange={handleChange} className="select-vacunas">
                  {estados.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>
              <div className="campo-vacunas">
                <label className="etiqueta-campo-vacunas">Requisitos</label>
                <textarea name="req" value={form.req} onChange={handleChange} className="textarea-vacunas" />
              </div>
            </div>
          </section>

          <section className="seccion-formulario-vacunas">
            <h4 className="titulo-seccion-formulario">Procedimiento Principal</h4>
            <div className="campos-formulario-vacunas">
              <div className="campo-vacunas">
                <label className="etiqueta-campo-vacunas">Seleccionar Procedimiento</label>
                <select
                  name="procedimientoSelect"
                  value={procedimientoSeleccionado}
                  onChange={handleProcedimientoChange}
                  className="select-vacunas"
                >
                  <option value="" disabled>-- Seleccione --</option>
                  {proceduresList?.map((proc, index) => (
                    <option key={index} value={proc.nom_pro}>{proc.nom_pro} ({categoriaSeleccionada})</option>
                  ))}
                  <option value="nuevo">-- Nuevo procedimiento --</option>
                </select>
              </div>
              {(procedimientoSeleccionado === "nuevo") && (
                <>
                  <div className="campo-vacunas">
                    <label className="etiqueta-campo-vacunas">Nombre</label>
                    <input name="nom_pro" value={form.nom_pro} onChange={handleChange} className="input-vacunas" />
                    {errores.nom_pro && <span className="mensaje-error">{errores.nom_pro}</span>}
                  </div>
                  <div className="campo-vacunas">
                    <label className="etiqueta-campo-vacunas">Descripción</label>
                    <textarea name="des_pro" value={form.des_pro} onChange={handleChange} className="textarea-vacunas" />
                  </div>
                  <div className="campo-vacunas">
                    <label className="etiqueta-campo-vacunas">Nivel de riesgo</label>
                    <select name="niv_rie_pro" value={form.niv_rie_pro} onChange={handleChange} className="select-vacunas">
                      {nivelesRiesgo.map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div className="campo-vacunas">
                    <label className="etiqueta-campo-vacunas">Duración mínima (minutos)</label>
                    <input type="number" name="dur_min_pro" value={form.dur_min_pro} onChange={handleChange} className="input-vacunas" />
                    {errores.dur_min_pro && <span className="mensaje-error">{errores.dur_min_pro}</span>}
                  </div>
                  <div className="campo-vacunas">
                    <label className="etiqueta-campo-vacunas">Protocolo</label>
                    <textarea name="pro_pro" value={form.pro_pro} onChange={handleChange} className="textarea-vacunas" />
                  </div>
                  <div className="campo-vacunas">
                    <label className="etiqueta-campo-vacunas">Consideraciones especiales</label>
                    <textarea name="con_esp_pro" value={form.con_esp_pro} onChange={handleChange} className="textarea-vacunas" />
                  </div>
                </>
              )}
            </div>
          </section>

          <div className="botones-formulario-vacunas">
            <button type="submit" className="boton-guardar-vacunas">Guardar</button>
            <button type="button" onClick={onCancelar} className="boton-cancelar-vacunas">Cancelar</button>
          </div>
        </form>
      </section>
    </aside>
  )
}

// Component DetalleVacuna
export const ServicesDetails = ({
  setMostrarDetalle,
  mostrarDetalle = false,
  infoDetails = {},
  labels = {
    precio: "Precio Actual",
    frecuencia: "Duración",
    categoria: "Categoría",
    disponible: "Disponible",
    descripcion: "Descripción General",
    descripcionPro: "Descripción Técnica",
    efectosSecundarios: "Preparación",
    infoAdicional: "Información Adicional",
    lote: "Equipo requerido",
    vencimiento: "Precio anterior",
  }
}) => {
  if (!mostrarDetalle || !infoDetails) return null

  return (
    <section className="modal-fondo-laboratorio" role="dialog" aria-modal="true" aria-labelledby="titulo-detalle">
      <div className="modal-detalle-laboratorio">
        <header className="modal-encabezado-laboratorio">
          <h2 id="titulo-detalle" className="titulo-modal-laboratorio">
            {infoDetails.nombre}
          </h2>
          <button
            onClick={() => setMostrarDetalle(false)}
            className="cerrar-modal-laboratorio"
            aria-label="Cerrar modal de detalles"
          >
            <X className="icon" aria-hidden="true" />
          </button>
        </header>
        <div className="contenido-detalle-laboratorio">
          {/* Métricas principales */}
          <section className="metricas-principales-laboratorio" aria-label="Métricas del servicio">
            <div className="metrica-laboratorio">
              <div className="valor-metrica-laboratorio">{formatPrice(infoDetails.precio)}</div>
              <div className="etiqueta-metrica-laboratorio">{labels.precio}</div>
            </div>
            <div className="metrica-laboratorio">
              <div className="valor-metrica-laboratorio">{infoDetails.frecuencia || infoDetails.duracion || "-"}</div>
              <div className="etiqueta-metrica-laboratorio">{labels.frecuencia}</div>
            </div>
            <div className="metrica-laboratorio">
              <div className="valor-metrica-laboratorio">{infoDetails.categoria}</div>
              <div className="etiqueta-metrica-laboratorio">{labels.categoria}</div>
            </div>
            <div className="metrica-laboratorio">
              <div
                className={`valor-metrica-laboratorio ${infoDetails.disponible ? "texto-verde-laboratorio" : "texto-rojo-laboratorio"}`}
              >
                {infoDetails.disponible ? "SÍ" : "NO"}
              </div>
              <div className="etiqueta-metrica-laboratorio">{labels.disponible}</div>
            </div>
          </section>

          {/* Grid de información */}
          <section className="grid-detalle-laboratorio" aria-label="Información detallada del servicio">
            <article className="seccion-detalle-laboratorio">
              <header className="encabezado-seccion-laboratorio">
                <FileText className="icono-seccion-laboratorio icon" aria-hidden="true" />
                <h3 className="titulo-seccion-laboratorio">{labels.descripcion}</h3>
              </header>
              <p className="texto-seccion-laboratorio">{infoDetails.descripcion}</p>
            </article>

            <article className="seccion-detalle-laboratorio">
              <header className="encabezado-seccion-laboratorio">
                <Target className="icono-seccion-laboratorio icon" aria-hidden="true" />
                <h3 className="titulo-seccion-laboratorio">{labels.descripcionPro}</h3>
              </header>
              <p className="texto-seccion-laboratorio">{infoDetails.descripcionPro || infoDetails.preparacion}</p>
            </article>

            <article className="seccion-detalle-laboratorio">
              <header className="encabezado-seccion-laboratorio">
                <AlertTriangle className="icono-seccion-laboratorio icon" aria-hidden="true" />
                <h3 className="titulo-seccion-laboratorio">{labels.efectosSecundarios}</h3>
              </header>
              <p className="texto-seccion-laboratorio">{infoDetails.efectosSecundarios || infoDetails.complicaciones || infoDetails.preparacionRequerida}</p>
            </article>

            <article className="seccion-detalle-laboratorio">
              <header className="encabezado-seccion-laboratorio">
                <Clock className="icono-seccion-laboratorio icon" aria-hidden="true" />
                <h3 className="titulo-seccion-laboratorio">{labels.infoAdicional}</h3>
              </header>
              <dl className="contenedor-info-adicional-laboratorio">
                <div className="item-info-adicional-laboratorio">
                  <dt className="etiqueta-info-adicional-laboratorio">{labels.lote}:</dt>
                  <dd className="valor-info-adicional-laboratorio">{infoDetails.lote || infoDetails.equipo}</dd>
                </div>
                <div className="item-info-adicional-laboratorio">
                  <dt className="etiqueta-info-adicional-laboratorio">{labels.vencimiento}:</dt>
                  <dd className="valor-info-adicional-laboratorio">
                    {infoDetails.fechaVencimiento || infoDetails.min}
                  </dd>
                </div>
              </dl>
            </article>
          </section>

          {/* Dosis recomendadas o valores de referencia */}
          {infoDetails.procedimientos && (
            <section className="valores-referencia-laboratorio" aria-label='Procedimientos asociados'>
              <h3 className="titulo-valores-laboratorio">Procedimientos</h3>
              {infoDetails.procedimientos?.map((proc, index) => (
                <div className="contenido-valores-laboratorio" key={index}>
                  <>
                    <div className="item-info-adicional-laboratorio">
                      <dt className="etiqueta-info-adicional-laboratorio">Nombre:</dt>
                      <dd className="valor-info-adicional-laboratorio">{proc.nom_pro}</dd>
                    </div>
                    <div className="item-info-adicional-laboratorio">
                      <dt className="etiqueta-info-adicional-laboratorio">Descripción:</dt>
                      <dd className="valor-info-adicional-laboratorio">{proc.des_pro}</dd>
                    </div>
                    <div className="item-info-adicional-laboratorio">
                      <dt className="etiqueta-info-adicional-laboratorio">Nivel de riesgo:</dt>
                      <dd className="valor-info-adicional-laboratorio">{proc.niv_rie_pro}</dd>
                    </div>
                    <div className="item-info-adicional-laboratorio">
                      <dt className="etiqueta-info-adicional-laboratorio">Duración mínima:</dt>
                      <dd className="valor-info-adicional-laboratorio">{proc.dur_min_pro} minutos</dd>
                    </div>
                    <div className="item-info-adicional-laboratorio">
                      <dt className="etiqueta-info-adicional-laboratorio">Consideraciones especiales:</dt>
                      <dd className="valor-info-adicional-laboratorio">{proc.con_esp_pro} </dd>
                    </div>
                    <div className="item-info-adicional-laboratorio">
                      <dt className="etiqueta-info-adicional-laboratorio">Protocolo:</dt>
                      <dd className="valor-info-adicional-laboratorio">{proc.pro_pro} </dd>
                    </div>
                  </>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </section>
  )
}