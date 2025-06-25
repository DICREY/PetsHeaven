import React from "react"
import { useState } from "react"
import "../../styles/InterfazCliente/MascotaCliente.css"
import { FileText, Edit, Calendar, Plus } from "lucide-react"

export default function MascotasPage() {
  const [mostrarForm, setMostrarForm] = useState(false)

  const mascotas = [
    {
      id: 1,
      nombre: "Max",
      tipo: "Perro",
      raza: "Golden Retriever",
      edad: "3 años",
      peso: "28 kg",
      color: "Dorado",
      ultimaVisita: "2024-01-10",
      foto: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 2,
      nombre: "Luna",
      tipo: "Gato",
      raza: "Siamés",
      edad: "2 años",
      peso: "4 kg",
      color: "Blanco y negro",
      ultimaVisita: "2024-01-05",
      foto: "/placeholder.svg?height=200&width=200",
    },
    {
      id: 3,
      nombre: "Rocky",
      tipo: "Perro",
      raza: "Bulldog",
      edad: "5 años",
      peso: "22 kg",
      color: "Marrón",
      ultimaVisita: "2023-12-20",
      foto: "/placeholder.svg?height=200&width=200",
    },
  ]

  return (
    <div className="mascotas-contenedor">
      <div className="mascotas-header-principal">
        <h1 className="mascotas-titulo-principal">Mis Mascotas</h1>
      </div>

      <div className="mascotas-subheader">
        <div className="header-info">
          <p className="mascotas-subtitulo">Administra la información de tus compañeros</p>
        </div>
        <button className="btn-agregar-mascota" onClick={() => setMostrarForm(!mostrarForm)}>
          <Plus size={18} />
          Agregar Mascota
        </button>
      </div>

      {mostrarForm && (
        <div className="form-mascota-card">
          <h3 className="form-mascota-titulo">Nueva Mascota</h3>
          <form className="mascota-form">
            <div className="form-row">
              <div className="campo-mascota">
                <label className="label-mascota">Nombre</label>
                <input type="text" className="input-mascota" placeholder="Nombre de la mascota" />
              </div>
              <div className="campo-mascota">
                <label className="label-mascota">Tipo</label>
                <select className="input-mascota">
                  <option>Seleccionar tipo</option>
                  <option>Perro</option>
                  <option>Gato</option>
                  <option>Ave</option>
                  <option>Otro</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="campo-mascota">
                <label className="label-mascota">Raza</label>
                <input type="text" className="input-mascota" placeholder="Raza" />
              </div>
              <div className="campo-mascota">
                <label className="label-mascota">Edad</label>
                <input type="text" className="input-mascota" placeholder="Ej: 2 años" />
              </div>
            </div>
            <div className="form-botones">
              <button type="button" className="btn-cancelar-form" onClick={() => setMostrarForm(false)}>
                Cancelar
              </button>
              <button type="submit" className="btn-guardar-form">
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mascotas-grid">
        {mascotas.map((mascota) => (
          <div key={mascota.id} className="mascota-card">
            <div className="mascota-foto-contenedor">
              <img
                src={mascota.foto || "/placeholder.svg"}
                alt={`Foto de ${mascota.nombre}`}
                className="mascota-foto"
              />
            </div>

            <div className="mascota-info-contenedor">
              <div className="mascota-info-basica">
                <h3 className="mascota-nombre">{mascota.nombre}</h3>
                <p className="mascota-tipo-raza">
                  {mascota.tipo} - {mascota.raza}
                </p>
              </div>

              <div className="mascota-detalles">
                <div className="detalle-item">
                  <span className="detalle-label">Edad:</span>
                  <span className="detalle-valor">{mascota.edad}</span>
                </div>
                <div className="detalle-item">
                  <span className="detalle-label">Peso:</span>
                  <span className="detalle-valor">{mascota.peso}</span>
                </div>
                <div className="detalle-item">
                  <span className="detalle-label">Color:</span>
                  <span className="detalle-valor">{mascota.color}</span>
                </div>
                <div className="detalle-item">
                  <span className="detalle-label">Última visita:</span>
                  <span className="detalle-valor">{mascota.ultimaVisita}</span>
                </div>
              </div>

              <div className="mascota-acciones">
                <button className="btn-historial">
                  <FileText size={16} />
                  Historial
                </button>
                <button className="btn-editar-mascota">
                  <Edit size={16} />
                  Editar
                </button>
                <button className="btn-cita-rapida">
                  <Calendar size={16} />
                  Cita
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
