// Librarys 
import React from "react"

// Imports 
import { checkImage } from "../../Varios/Util"

// Import styles 
import "../../../styles/InterfazAdmin/FormuariosAdmin/Consulta.css"

// Component 
export const FormularioConsulta = ({ mascota, imgDedault = '' }) => {
  return (
    <article className="LoadingNotification">
      <section className="contenedor-consul">
        <header className="cabecera-consul">
          <div className="contenido-cabecera-consul">
            <div className="avatar-consul">
              {checkImage(
                mascota.fot_mas,
                `${mascota.esp_mas} de raza ${mascota.raz_mas} color ${mascota.col_mas} con nombre ${mascota.nom_mas}`,
                imgDedault,
                'imagen-consul'
              )}
            </div>
            <div className="info-consul">
              <h1 className="nombre-consul">{mascota.nombre}</h1>
              <div className="etiquetas-consul">
                <span className="etiqueta-consul">{mascota.especie}</span>
                <span className="etiqueta-consul">{mascota.raza}</span>
                <span className="etiqueta-consul">{mascota.edad}</span>
              </div>
            </div>
          </div>
          <button className="EditBtn" onClick={() => alert("Consulta guardada")}>
            Guardar
          </button>
        </header>

        <aside className="seccion-consul">
          <h3 className="titulo-consul">Consulta</h3>

          <article className="grid-consul">
            <div className="item-consul">
              <label className="label-consul">Peso (kg)</label>
              <input type="text" className="input-consul" placeholder="Ej: 28.50" />
            </div>

            <div className="item-consul">
              <label className="label-consul">Temperatura (°C)</label>
              <input type="text" className="input-consul" placeholder="Ej: 38.5" />
            </div>
          </article>

          <article className="divisor-consul"></article>

          <article className="item-consul ancho-consul">
            <label className="label-consul">Motivo de la consulta</label>
            <textarea className="area-consul" placeholder="Describa el motivo de la consulta" rows={4}></textarea>
          </article>

          <div className="divisor-consul"></div>

          <article className="item-consul ancho-consul">
            <label className="label-consul">Tratamiento</label>
            <textarea className="area-consul" placeholder="Describa el tratamiento recomendado" rows={4}></textarea>
          </article>
        </aside>
      </section>
    </article>
  )
}
