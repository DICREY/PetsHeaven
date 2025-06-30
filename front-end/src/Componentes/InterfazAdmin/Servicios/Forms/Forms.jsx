// Librarys 
import React, { useState } from "react"
import { X, FileText, Target, AlertTriangle, Clock } from "lucide-react"

// Imports 
import { formatDate } from "../../../Varios/Util"
import { formatPrice } from "../../../../Utils/Utils"

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