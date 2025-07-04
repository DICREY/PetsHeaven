import React, { useContext, useEffect } from "react"
import { useState } from "react"
import { Edit, User, Mail, Phone, MapPin, Calendar, Shield, Lock, Trash2 } from "lucide-react"

// Imports 
import EditarPerfilModal from "./EditarPerfilModal"
import CambiarContrasena from "./CambiarContrasena"
import EliminarCuenta from "./EliminarCuenta"
import { AuthContext } from "../../Contexts/Contexts"
import { errorStatusHandler } from "../Varios/Util"
import { ModifyData, PostData } from "../Varios/Requests"
import { CheckImage } from "../../Utils/Utils"
import { Notification } from "../Global/Notifys"

// Import styles 
import "../../styles/InterfazCliente/PerfilCliente.css"

// Component 
const PerfilCliente = ({ URL = '', imgDefault = '' }) => {
  // Dynamic vars 
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false)
  const [mostrarCambiarContrasena, setMostrarCambiarContrasena] = useState(false)
  const [mostrarEliminarCuenta, setMostrarEliminarCuenta] = useState(false)
  const [ usuario, setUsuario ] = useState(null)
  const [ stats, setStats ] = useState(null)
  const [ notify, setNotify ] = useState({
    title: 'Cargando...',
    message: 'Cargando y verificando tus credenciales',
    load: 1
  })

  // Vars 
  const { user, logout } = useContext(AuthContext)

  const guardarCambios = async (modPeople) => {
    setNotify({
      title: 'Actualizando...',
      message: 'verificando tus los datos proporcionados',
      load: 1
    })
    const mod = {
      nom_per: modPeople.nom_per,
      ape_per: modPeople.ape_per,
      fec_nac_per: modPeople.fec_nac_per,
      doc_per: modPeople.doc_per,
      dir_per: modPeople.dir_per,
      cel_per: modPeople.cel_per,
      cel2_per: modPeople.cel2_per,
      email_per: modPeople.email_per,
      gen_per: modPeople.gen_per,
      img_per: modPeople.fot_per
    }
    try {
      const data = await ModifyData(`${URL}/people/modify`, mod)
      setNotify(null)
      if (data?.modified) {
        setNotify({
          title: 'Actulización exitosa',
          message: 'Tus datos han sido actualizados correctamente',
          close: setNotify
        })
        setMostrarModalEdicion(false)
      }
    } catch (err) {
      setNotify(null)
      const message = errorStatusHandler(err)
      setNotify({
        title: 'Error',
        message: message,
        close: setNotify
      })
      if (err.status === 403) setTimeout(() => {
        logout()
      }, 2000)
    }
  }

  const cambiarContrasena = () => {
    setMostrarCambiarContrasena(true)
  }

  const eliminarCuenta = () => {
    setMostrarEliminarCuenta(true)
  }

  const guardarNuevaContrasena = (datosContrasena) => {
    console.log("Nueva contraseña:", datosContrasena)
    setMostrarCambiarContrasena(false)
    alert("Contraseña cambiada exitosamente")
  }

  const confirmarEliminacionCuenta = (datosEliminacion) => {
    console.log("Eliminando cuenta:", datosEliminacion)
    setMostrarEliminarCuenta(false)
    alert("Cuenta eliminada exitosamente")
  }

  const calcularTiempoRegistro = () => {
    const fechaRegistro = new Date(usuario.fec_cre_per)
    const ahora = new Date()
    const diferencia = ahora - fechaRegistro

    const años = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365))
    const meses = Math.floor((diferencia % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30))
    const dias = Math.floor((diferencia % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24))

    if (años > 0) {
      return `${años} año${años > 1 ? "s" : ""} y ${meses} mes${meses !== 1 ? "es" : ""}`
    }
    if (meses > 0) {
      return `${meses} mes${meses !== 1 ? "es" : ""}`
    }
    return `${dias} día${dias !== 1 ? "s" : ""}`
  }

  useEffect(() => {
    const GetInfo = async () => {
      try {
        const data = await PostData(`${URL}/people/by`, { by: user.doc})
        setNotify(null)
        if (data?.result[0]) {
          setUsuario(data.result[0])
        }
      } catch (err) {
        setNotify(null)
        const message = errorStatusHandler(err)
        setNotify({
          title: 'Error',
          message: message,
          close: setNotify
        })
        if (err.status === 403) setTimeout(() => {
          logout()
        }, 2000)
      }
    }

    const GetStats = async () => {
      try {
        const data = await PostData(`${URL}/global/stats/own`, { by: user.doc})
        setNotify(null)
        if (data?.result) {
          setStats(data.result)
        }
      } catch (err) {
        setNotify(null)
        const message = errorStatusHandler(err)
        setNotify({
          title: 'Error',
          message: message,
          close: setNotify
        })
        if (err.status === 403) setTimeout(() => {
          logout()
        }, 2000)
      }
    }

    GetInfo()
    GetStats()
  },[])

  return (
    <>
      {
        usuario && (
        <main className="contenedor-perfil">
          <header className="header-perfil">
            <div className="titulo-seccion-perfil">
              <h1 className="titulo-perfil">Mi Perfil</h1>
              <p className="subtitulo-perfil">Gestiona tu información personal y preferencias</p>
            </div>

            <button className="boton-editar-perfil" onClick={() => setMostrarModalEdicion(true)}>
              <Edit size={18} />
              Editar Perfil
            </button>
          </header>

          <section className="contenido-perfil">
            <div className="tarjeta-principal-perfil">
              <div className="avatar-seccion-perfil">
                <div className="avatar-contenedor-perfil">
                  <CheckImage
                    src={user.img}
                    alt={`${user.names} ${user.lastNames || ""}`}
                    className="avatar-imagen-perfil"
                    imgDefault={imgDefault}
                  />
                  <div className="estado-usuario-perfil">
                    <Shield size={16} />
                    <span>Verificado</span>
                  </div>
                </div>

                <div className="info-avatar-perfil">
                  <h2 className="nombre-usuario-perfil">
                    {`${user.names} ${user.lastNames || ""}`}
                  </h2>
                  <p className="email-usuario-perfil">{usuario.email_per}</p>
                  <div className="tiempo-registro-perfil">
                    <Calendar size={16} />
                    <span>Registrado desde hace {calcularTiempoRegistro()}</span>
                  </div>
                </div>
              </div>

              <div className="estadisticas-usuario-perfil">
                <div className="stat-usuario-perfil">
                  <div className="numero-stat-usuario-perfil">{stats?.mas || 0}</div>
                  <div className="label-stat-usuario-perfil">Mascotas</div>
                </div>
                <div className="stat-usuario-perfil">
                  <div className="numero-stat-usuario-perfil">{stats?.consultas || 0}</div>
                  <div className="label-stat-usuario-perfil">Consultas</div>
                </div>
                <div className="stat-usuario-perfil">
                  <div className="numero-stat-usuario-perfil">{stats?.citas || 0}</div>
                  <div className="label-stat-usuario-perfil">Citas Próximas</div>
                </div>
              </div>
            </div>

            <div className="formulario-perfil">
              <h3 className="titulo-formulario-perfil">Información Personal</h3>

              <div className="campos-perfil">
                <div className="campo-perfil">
                  <label className="label-perfil">
                    <User size={18} />
                    Nombres
                  </label>
                  <div className="valor-campo-perfil">{user.names}</div>
                </div>

                <div className="campo-perfil">
                  <label className="label-perfil">
                    <User size={18} />
                    Apellidos
                  </label>
                  <div className="valor-campo-perfil">{user.lastNames || ""}</div>
                </div>

                <div className="campo-perfil">
                  <label className="label-perfil">
                    <Calendar size={18} />
                    Fecha de Nacimiento
                  </label>
                  <div className="valor-campo-perfil">
                    {usuario.fec_nac_per ? new Date(usuario.fec_nac_per).toLocaleDateString("es-ES") : "15/05/1990"}
                  </div>
                </div>

                <div className="campo-perfil">
                  <label className="label-perfil">
                    <User size={18} />
                    Tipo de Documento
                  </label>
                  <div className="valor-campo-perfil">{usuario.tip_doc_per || "Cédula"}</div>
                </div>

                <div className="campo-perfil">
                  <label className="label-perfil">
                    <User size={18} />
                    Documento
                  </label>
                  <div className="valor-campo-perfil">{usuario.doc_per || "12345678"}</div>
                </div>

                <div className="campo-perfil campo-completo-perfil">
                  <label className="label-perfil">
                    <MapPin size={18} />
                    Dirección
                  </label>
                  <div className="valor-campo-perfil">{usuario.dir_per}</div>
                </div>

                <div className="campo-perfil">
                  <label className="label-perfil">
                    <Phone size={18} />
                    Celular
                  </label>
                  <div className="valor-campo-perfil">{usuario.cel_per}</div>
                </div>

                <div className="campo-perfil">
                  <label className="label-perfil">
                    <Phone size={18} />
                    Celular 2
                  </label>
                  <div className="valor-campo-perfil">{usuario.cel2_per || "+34 612 345 679"}</div>
                </div>

                <div className="campo-perfil">
                  <label className="label-perfil">
                    <Mail size={18} />
                    Email
                  </label>
                  <div className="valor-campo-perfil">{usuario.email_per}</div>
                </div>

                <div className="campo-perfil">
                  <label className="label-perfil">
                    <User size={18} />
                    Género
                  </label>
                  <div className="valor-campo-perfil">{usuario.gen_per || "Femenino"}</div>
                </div>
              </div>
            </div>

            <div className="seguridad-perfil">
              <h3 className="titulo-seguridad-perfil">Seguridad de la Cuenta</h3>

              <div className="acciones-seguridad-perfil">
                <button className="boton-seguridad-perfil cambiar-password" onClick={cambiarContrasena}>
                  <Lock size={18} />
                  <div className="info-accion-seguridad">
                    <span className="titulo-accion-seguridad">Cambiar Contraseña</span>
                    <span className="descripcion-accion-seguridad">Actualiza tu contraseña para mayor seguridad</span>
                  </div>
                </button>

                <button className="boton-seguridad-perfil eliminar-cuenta" onClick={eliminarCuenta}>
                  <Trash2 size={18} />
                  <div className="info-accion-seguridad">
                    <span className="titulo-accion-seguridad">Eliminar Cuenta</span>
                    <span className="descripcion-accion-seguridad">
                      Elimina permanentemente tu cuenta y todos los datos
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </section>

          {mostrarModalEdicion && (
            <EditarPerfilModal
              currentUser={usuario}
              imgDefault={imgDefault}
              URL={URL}
              onGuardar={guardarCambios}
              onCerrar={() => setMostrarModalEdicion(false)}
            />
          )}

          {mostrarCambiarContrasena && (
            <CambiarContrasena onGuardar={guardarNuevaContrasena} onCerrar={() => setMostrarCambiarContrasena(false)} />
          )}

          {mostrarEliminarCuenta && (
            <EliminarCuenta
              usuario={usuario}
              onEliminar={confirmarEliminacionCuenta}
              onCerrar={() => setMostrarEliminarCuenta(false)}
            />
          )}
          {
            notify && (
              <Notification
                {...notify}
              />
            )
          }
        </main>
        )
      }
    </>
  )
}

export default PerfilCliente
