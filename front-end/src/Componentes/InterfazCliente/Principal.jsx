import React from "react"
import { useState } from "react"
import { NavbarVertical } from "./Navbar/NavbarVertical"
import NavbarHorizontal from "./Navbar/NavbarHorizontal"
import InicioCliente from "./InicioCliente"
import MascotasCliente from "./MascotaCliente"
import PerfilCliente from "./PerfilCliente"
import AgendarCita from "./AgendarCita"
import ProximasCitas from "./ProximasCitas"
import HistorialMascota from "./HistorialMascota"
import "../../styles/InterfazCliente/Principal.css"

function Principal() {
  const [vistaActual, setVistaActual] = useState("inicio")
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null)
  const [mostrarPerfil, setMostrarPerfil] = useState(false)

  const [usuario, setUsuario] = useState({
    id: 1,
    nombre: "María González",
    email: "maria.gonzalez@email.com",
    telefono: "+34 612 345 678",
    direccion: "Calle Principal 123, Madrid",
    fechaRegistro: "2023-01-15",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  const [mascotas] = useState([
    {
      id: 1,
      nombre: "Max",
      especie: "Perro",
      raza: "Golden Retriever",
      edad: 3,
      peso: 28.5,
      color: "Dorado",
      genero: "Macho",
      esterilizado: true,
      foto: "/placeholder.svg?height=200&width=200",
      historial: [
        { fecha: "2024-01-15", tipo: "Consulta", descripcion: "Revisión general", veterinario: "Dr. Pérez" },
        { fecha: "2024-02-20", tipo: "Vacunación", descripcion: "Vacuna antirrábica", veterinario: "Dra. López" },
        { fecha: "2024-03-10", tipo: "Tratamiento", descripcion: "Desparasitación", veterinario: "Dr. Pérez" },
        { fecha: "2024-04-05", tipo: "Consulta", descripcion: "Control de peso", veterinario: "Dr. Martín" },
        { fecha: "2024-05-12", tipo: "Vacunación", descripcion: "Refuerzo anual", veterinario: "Dra. López" },
      ],
    },
    {
      id: 2,
      nombre: "Luna",
      especie: "Gato",
      raza: "Siamés",
      edad: 2,
      peso: 4.2,
      color: "Blanco y Negro",
      genero: "Hembra",
      esterilizado: true,
      foto: "/placeholder.svg?height=200&width=200",
      historial: [
        { fecha: "2024-01-20", tipo: "Consulta", descripcion: "Chequeo rutinario", veterinario: "Dra. López" },
        { fecha: "2024-02-25", tipo: "Cirugía", descripcion: "Esterilización", veterinario: "Dr. Martín" },
        { fecha: "2024-03-15", tipo: "Consulta", descripcion: "Post-operatorio", veterinario: "Dr. Martín" },
      ],
    },
  ])

  const [citas, setCitas] = useState([
    {
      id: 1,
      fecha: "2024-01-15",
      hora: "10:00",
      servicio: "Consulta General",
      mascota: "Max",
      estado: "confirmada",
      veterinario: "Dr. Pérez",
    },
    {
      id: 2,
      fecha: "2024-01-20",
      hora: "15:30",
      servicio: "Vacunación",
      mascota: "Luna",
      estado: "pendiente",
      veterinario: "Dra. López",
    },
    {
      id: 3,
      fecha: "2024-01-25",
      hora: "09:00",
      servicio: "Revisión",
      mascota: "Max",
      estado: "confirmada",
      veterinario: "Dr. Martín",
    },
  ])

  const navegarA = (vista, mascota = null) => {
    setVistaActual(vista)
    setMostrarPerfil(false)
    if (mascota) {
      setMascotaSeleccionada(mascota)
    }
  }

  const mostrarPerfilUsuario = () => {
    setMostrarPerfil(true)
    setVistaActual("")
  }

  const agregarCita = (nuevaCita) => {
    const cita = {
      id: citas.length + 1,
      ...nuevaCita,
      estado: "pendiente",
    }
    setCitas([...citas, cita])
  }

  const actualizarCita = (citaActualizada) => {
    setCitas(citas.map((cita) => (cita.id === citaActualizada.id ? citaActualizada : cita)))
  }

  const renderizarVista = () => {
    if (mostrarPerfil) {
      return <PerfilCliente usuario={usuario} setUsuario={setUsuario} />
    }

    switch (vistaActual) {
      case "inicio":
        return <InicioCliente usuario={usuario} mascotas={mascotas} citas={citas} onNavegar={navegarA} />
      case "mascotas":
        return <MascotasCliente mascotas={mascotas} onNavegar={navegarA} />
      case "agendar":
        return <AgendarCita mascotas={mascotas} onAgregarCita={agregarCita} onNavegar={navegarA} />
      case "citas":
        return <ProximasCitas citas={citas} setCitas={setCitas} onActualizarCita={actualizarCita} />
      case "historial":
        return <HistorialMascota mascota={mascotaSeleccionada} onNavegar={navegarA} />
      default:
        return <InicioCliente usuario={usuario} mascotas={mascotas} citas={citas} onNavegar={navegarA} />
    }
  }

  return (
    <div className="app-veterinaria">
      <NavbarVertical vistaActual={vistaActual} onNavegar={navegarA} />
      <div className="contenido-principal">
        <NavbarHorizontal usuario={usuario} onMostrarPerfil={mostrarPerfilUsuario} />
        <main className="vista-principal">{renderizarVista()}</main>
      </div>
    </div>
  )
}

export default Principal
