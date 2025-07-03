// Librarys
import React from "react"
import { Search, Filter, Heart } from "lucide-react"

// Imports 
import { CheckImage } from "../../Utils/Utils"
import { getAge } from "../Varios/Util"

// Import styles
import "../../styles/InterfazCliente/MascotasCliente.css"

// Component
const MascotasCliente = ({ pets = [], imgDefault = '', onNavegar }) => {
  const verHistorial = (mascota) => {
    onNavegar("historial", mascota)
  }

  const obtenerIconoEspecie = (especie) => {
    switch (especie.toLowerCase()) {
      case "perro":
        return "🐕"
      case "gato":
        return "🐱"
      case "conejo":
        return "🐰"
      case "ave":
        return "🐦"
      default:
        return "🐾"
    }
  }

  return (
    <main className="contenedor-mascotas-cliente">
      <header className="header-mascotas-cliente">
        <section className="titulo-seccion-mascotas-cliente">
          <h1 className="titulo-mascotas-cliente">Mis Mascotas</h1>
          <p className="subtitulo-mascotas-cliente">Gestiona la información de tus compañeros peludos</p>
        </section>
      </header>

      <section className="estadisticas-mascotas-cliente" aria-label="Estadísticas de mascotas">
        <article className="stat-mascotas-cliente">
          <div className="icono-stat-mascotas-cliente">
            <Heart className="icon" />
          </div>
          <div className="contenido-stat-mascotas-cliente">
            <span className="numero-stat-mascotas-cliente">{pets?.length}</span>
            <span className="label-stat-mascotas-cliente">Mascotas Registradas</span>
          </div>
        </article>

        <article className="stat-mascotas-cliente">
          <div className="icono-stat-mascotas-cliente">
            <Search className="icon" />
          </div>
          <div className="contenido-stat-mascotas-cliente">
            <span className="numero-stat-mascotas-cliente">
              {pets?.reduce((total, mascota) => total + (mascota.historial?.length || 0), 0)}
            </span>
            <span className="label-stat-mascotas-cliente">Consultas Totales</span>
          </div>
        </article>

        <article className="stat-mascotas-cliente">
          <div className="icono-stat-mascotas-cliente">
            <Filter className="icon" />
          </div>
          <div className="contenido-stat-mascotas-cliente">
            <span className="numero-stat-mascotas-cliente">2</span>
            <span className="label-stat-mascotas-cliente">Citas Próximas</span>
          </div>
        </article>
      </section>

      <section className="herramientas-mascotas-cliente" aria-label="Herramientas de búsqueda">
        <div className="buscador-mascotas-cliente">
          <Search className="icon" />
          <input
            type="text"
            placeholder="Buscar mascota..."
            className="input-buscar-mascotas-cliente"
            aria-label="Buscar mascota por nombre"
          />
        </div>

        <button className="boton-filtro-mascotas-cliente" aria-label="Abrir filtros">
          <Filter className='icon' />
          Filtros
        </button>
      </section>

      <section className="grid-mascotas-cliente" aria-label="Lista de mascotas">
        {pets?.map((mascota) => (
          <article key={mascota.id_mas} className="tarjeta-mascotas-cliente">
            <header className="header-tarjeta-mascotas-cliente">
              <figure className="foto-mascotas-cliente">
                <CheckImage
                  src={mascota.fot_mas}
                  alt={`Foto de ${mascota.nom_mas}`}
                  className="imagen-mascotas-cliente"
                  imgDefault={imgDefault}
                />
                <div className="overlay-foto-mascotas-cliente" aria-hidden="true">
                  <span className="icono-especie-mascotas-cliente">{obtenerIconoEspecie(mascota.esp_mas)}</span>
                </div>
              </figure>

              <div className="info-basica-mascotas-cliente">
                <h3 className="nombre-mascotas-cliente">{mascota.nom_mas}</h3>
                <p className="raza-mascotas-cliente">{mascota.raz_mas}</p>
                <span className="especie-mascotas-cliente">{mascota.esp_mas}</span>
              </div>
            </header>

            <section className="detalles-mascotas-cliente" aria-label={`Detalles de ${mascota.nom_mas}`}>
              <dl className="lista-detalles-mascotas">
                <div className="detalle-mascotas-cliente">
                  <dt className="label-detalle-mascotas-cliente">Edad</dt>
                  <dd className="valor-detalle-mascotas-cliente">{getAge(mascota.fec_nac_mas)} Años</dd>
                </div>

                <div className="detalle-mascotas-cliente">
                  <dt className="label-detalle-mascotas-cliente">Peso</dt>
                  <dd className="valor-detalle-mascotas-cliente">{mascota.pes_mas} kg</dd>
                </div>

                <div className="detalle-mascotas-cliente">
                  <dt className="label-detalle-mascotas-cliente">Color</dt>
                  <dd className="valor-detalle-mascotas-cliente">{mascota.col_mas}</dd>
                </div>

                <div className="detalle-mascotas-cliente">
                  <dt className="label-detalle-mascotas-cliente">Género</dt>
                  <dd className="valor-detalle-mascotas-cliente">{mascota.gen_mas}</dd>
                </div>

                <div className="detalle-mascotas-cliente">
                  <dt className="label-detalle-mascotas-cliente">Esterilizado</dt>
                  <dd className="valor-detalle-mascotas-cliente">{mascota.est_rep_mas ? "Sí" : "No"}</dd>
                </div>

                <div className="detalle-mascotas-cliente">
                  <dt className="label-detalle-mascotas-cliente">Consultas</dt>
                  <dd className="valor-detalle-mascotas-cliente">{mascota.historial?.length || 0}</dd>
                </div>
              </dl>
            </section>

            <footer className="acciones-mascotas-cliente">
              <button
                className="boton-historial-mascotas-cliente"
                onClick={() => verHistorial(mascota)}
                aria-label={`Ver historial completo de ${mascota.nom_mas}`}
              >
                Ver Historial Completo
              </button>
            </footer>
          </article>
        ))}
      </section>

      {pets?.length === 0 && (
        <section className="sin-mascotas-cliente" aria-label="Sin mascotas registradas">
          <div className="icono-sin-mascotas-cliente">
            <Heart size={64} />
          </div>
          <h3 className="titulo-sin-mascotas-cliente">No tienes mascotas registradas</h3>
          <p className="texto-sin-mascotas-cliente">Contacta con la clínica para registrar tu primera mascota</p>
        </section>
      )}
    </main>
  )
}

export default MascotasCliente
