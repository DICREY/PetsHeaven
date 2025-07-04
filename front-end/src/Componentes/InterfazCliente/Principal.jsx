// Librarys 
import React, { useContext, useEffect } from "react"
import { useState } from "react"

// Imports 
import { NavbarVertical } from "./NavBar/NavbarVertical" 
import NavbarHorizontal from "./NavBar/NavbarHorizontal"
import InicioCliente from "./InicioCliente"
import MascotasCliente from "./MascotaCliente"
import PerfilCliente from "./PerfilCliente"
import AgendarCita from "./AgendarCita"
import ProximasCitas from "./ProximasCitas"
import HistorialMascota from "./HistorialMascota"
import { AuthContext } from "../../Contexts/Contexts"

// Import styles 
import "../../styles/InterfazCliente/Principal.css"
import { errorStatusHandler } from "../Varios/Util"
import { PostData } from "../Varios/Requests"
import { Notification } from "../Global/Notifys"

// Component 
function Principal({ URL = '', imgPetDefault = '', imgUserDefault }) {
  // Dynamic vars 
  const [ vistaActual, setVistaActual ] = useState("inicio")
  const [ mascotaSeleccionada, setMascotaSeleccionada ] = useState(null)
  const [ mostrarPerfil, setMostrarPerfil ] = useState(false)
  const [ notify, setNotify ] = useState(null)
  const [ pets, setPets ] = useState()
  const [ appointment, setAppointment ] = useState()

  // Vars 
  const mainUrl = `${URL}/appointment/by`
  const { logout, user } = useContext(AuthContext)

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
      id: appointment.length + 1,
      ...nuevaCita,
      estado: "pendiente",
    }
    setAppointment([...appointment, cita])
  }

  const actualizarCita = (citaActualizada) => {
    setAppointment(appointment.map((cita) => (cita.id === citaActualizada.id ? citaActualizada : cita)))
  }

  const renderizarVista = () => {
    if (mostrarPerfil) {
      return <PerfilCliente URL={URL} imgDefault={imgUserDefault} />
    }

    switch (vistaActual) {
      case "inicio":
        return <InicioCliente usuario={user} pets={pets} appointments={appointment} onNavegar={navegarA} URL={URL} />
      case "mascotas":
        return <MascotasCliente pets={pets} imgDefault={imgPetDefault} onNavegar={navegarA} />
      case "agendar":
        return <AgendarCita mascotas={pets} setNotify={setNotify} URL={URL} imgDefault={imgPetDefault} onAgregarCita={agregarCita} onNavegar={navegarA} />
      case "citas":
        return <ProximasCitas citas={appointment} setCitas={setAppointment} onActualizarCita={actualizarCita} />
      case "historial":
        return <HistorialMascota setNotify={setNotify} URL={URL} imgDefault={imgPetDefault} mascota={mascotaSeleccionada} onNavegar={navegarA} />
      default:
        return <InicioCliente usuario={user} pets={pets} appointments={appointment} URL={URL} onNavegar={navegarA} />
    }
  }

  const getAppoint = async () => {
    try {
      const data = await PostData(`${mainUrl}`,{ by: user.doc })
      setNotify(null)
      if (data?.result) setAppointment(data.result)
    } catch (err) {
      setNotify(null)
      const message = errorStatusHandler(err)
    }
  }

  const getPets = async () => {
    try {
      const data = await PostData(`${URL}/pet/all/by`,{ by: user.doc })
      setNotify(null)
      if (data?.result) setPets(data.result)
    } catch (err) {
      setNotify(null)
      const message = errorStatusHandler(err)
    }
  }

  useEffect(() => {
    getAppoint()
    getPets()
  },[])

  return (
    <div className="app-veterinaria">
      <NavbarVertical vistaActual={vistaActual} onNavegar={navegarA} />
      <div className="contenido-principal">
        <NavbarHorizontal usuario={user} onMostrarPerfil={mostrarPerfilUsuario} />
        <main className="vista-principal">{renderizarVista()}</main>
      </div>
      {notify && (
        <Notification
            {...notify}
        />
      )}
    </div>
  )
}

export default Principal
