import React from "react"
import { Search, Filter, Heart } from "lucide-react"
import "../../styles/InterfazCliente/MascotasCliente.css"

const MascotasCliente = ({ mascotas, onNavegar }) => {
  const verHistorial = (mascota) => {
    onNavegar("historial", mascota)
  }

  const calcularEdadTexto = (edad) => {
    if (edad === 1) return "1 año"
    return `${edad} años`
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
            <Heart size={24} />
          </div>
          <div className="contenido-stat-mascotas-cliente">
            <span className="numero-stat-mascotas-cliente">{mascotas.length}</span>
            <span className="label-stat-mascotas-cliente">Mascotas Registradas</span>
          </div>
        </article>

        <article className="stat-mascotas-cliente">
          <div className="icono-stat-mascotas-cliente">
            <Search size={24} />
          </div>
          <div className="contenido-stat-mascotas-cliente">
            <span className="numero-stat-mascotas-cliente">
              {mascotas.reduce((total, mascota) => total + (mascota.historial?.length || 0), 0)}
            </span>
            <span className="label-stat-mascotas-cliente">Consultas Totales</span>
          </div>
        </article>

        <article className="stat-mascotas-cliente">
          <div className="icono-stat-mascotas-cliente">
            <Filter size={24} />
          </div>
          <div className="contenido-stat-mascotas-cliente">
            <span className="numero-stat-mascotas-cliente">2</span>
            <span className="label-stat-mascotas-cliente">Citas Próximas</span>
          </div>
        </article>
      </section>

      <section className="herramientas-mascotas-cliente" aria-label="Herramientas de búsqueda">
        <div className="buscador-mascotas-cliente">
          <Search size={20} />
          <input
            type="text"
            placeholder="Buscar mascota..."
            className="input-buscar-mascotas-cliente"
            aria-label="Buscar mascota por nombre"
          />
        </div>

        <button className="boton-filtro-mascotas-cliente" aria-label="Abrir filtros">
          <Filter size={18} />
          Filtros
        </button>
      </section>

      <section className="grid-mascotas-cliente" aria-label="Lista de mascotas">
        {mascotas.map((mascota) => (
          <article key={mascota.id} className="tarjeta-mascotas-cliente">
            <header className="header-tarjeta-mascotas-cliente">
              <figure className="foto-mascotas-cliente">
                <img
                  src={mascota.foto || "/placeholder.svg?height=80&width=80"}
                  alt={`Foto de ${mascota.nombre}`}
                  className="imagen-mascotas-cliente"
                />
                <div className="overlay-foto-mascotas-cliente" aria-hidden="true">
                  <span className="icono-especie-mascotas-cliente">{obtenerIconoEspecie(mascota.especie)}</span>
                </div>
              </figure>

              <div className="info-basica-mascotas-cliente">
                <h3 className="nombre-mascotas-cliente">{mascota.nombre}</h3>
                <p className="raza-mascotas-cliente">{mascota.raza}</p>
                <span className="especie-mascotas-cliente">{mascota.especie}</span>
              </div>
            </header>

            <section className="detalles-mascotas-cliente" aria-label={`Detalles de ${mascota.nombre}`}>
              <dl className="lista-detalles-mascotas">
                <div className="detalle-mascotas-cliente">
                  <dt className="label-detalle-mascotas-cliente">Edad</dt>
                  <dd className="valor-detalle-mascotas-cliente">{calcularEdadTexto(mascota.edad)}</dd>
                </div>

                <div className="detalle-mascotas-cliente">
                  <dt className="label-detalle-mascotas-cliente">Peso</dt>
                  <dd className="valor-detalle-mascotas-cliente">{mascota.peso} kg</dd>
                </div>

                <div className="detalle-mascotas-cliente">
                  <dt className="label-detalle-mascotas-cliente">Color</dt>
                  <dd className="valor-detalle-mascotas-cliente">{mascota.color}</dd>
                </div>

                <div className="detalle-mascotas-cliente">
                  <dt className="label-detalle-mascotas-cliente">Género</dt>
                  <dd className="valor-detalle-mascotas-cliente">{mascota.genero}</dd>
                </div>

                <div className="detalle-mascotas-cliente">
                  <dt className="label-detalle-mascotas-cliente">Esterilizado</dt>
                  <dd className="valor-detalle-mascotas-cliente">{mascota.esterilizado ? "Sí" : "No"}</dd>
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
                aria-label={`Ver historial completo de ${mascota.nombre}`}
              >
                Ver Historial Completo
              </button>
            </footer>
          </article>
        ))}
      </section>

      {mascotas.length === 0 && (
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
