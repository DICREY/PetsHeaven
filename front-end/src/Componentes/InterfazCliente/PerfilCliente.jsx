import React from "react"
import { useState } from "react"
import { Edit, User, Mail, Phone, MapPin, Calendar, Shield, Lock, Trash2 } from "lucide-react"
import EditarPerfilModal from "./EditarPerfilModal"
import CambiarContrasena from "./CambiarContrasena"
import EliminarCuenta from "./EliminarCuenta"
import "../../styles/InterfazCliente/PerfilCliente.css"

const PerfilCliente = ({ usuario, setUsuario }) => {
  const [mostrarModalEdicion, setMostrarModalEdicion] = useState(false)
  const [mostrarCambiarContrasena, setMostrarCambiarContrasena] = useState(false)
  const [mostrarEliminarCuenta, setMostrarEliminarCuenta] = useState(false)

  const guardarCambios = (usuarioActualizado) => {
    setUsuario(usuarioActualizado)
    setMostrarModalEdicion(false)
    alert("Perfil actualizado correctamente")
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
    const fechaRegistro = new Date(usuario.fechaRegistro)
    const ahora = new Date()
    const diferencia = ahora - fechaRegistro
    const años = Math.floor(diferencia / (1000 * 60 * 60 * 24 * 365))
    const meses = Math.floor((diferencia % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30))

    if (años > 0) {
      return `${años} año${años > 1 ? "s" : ""} y ${meses} mes${meses > 1 ? "es" : ""}`
    }
    return `${meses} mes${meses > 1 ? "es" : ""}`
  }

  return (
    <div className="contenedor-perfil">
      <div className="header-perfil">
        <div className="titulo-seccion-perfil">
          <h1 className="titulo-perfil">Mi Perfil</h1>
          <p className="subtitulo-perfil">Gestiona tu información personal y preferencias</p>
        </div>

        <button className="boton-editar-perfil" onClick={() => setMostrarModalEdicion(true)}>
          <Edit size={18} />
          Editar Perfil
        </button>
      </div>

      <div className="contenido-perfil">
        <div className="tarjeta-principal-perfil">
          <div className="avatar-seccion-perfil">
            <div className="avatar-contenedor-perfil">
              <img
                src={usuario.avatar || "/placeholder.svg?height=120&width=120"}
                alt={`${usuario.nombres || usuario.nombre} ${usuario.apellidos || ""}`}
                className="avatar-imagen-perfil"
              />
              <div className="estado-usuario-perfil">
                <Shield size={16} />
                <span>Verificado</span>
              </div>
            </div>

            <div className="info-avatar-perfil">
              <h2 className="nombre-usuario-perfil">
                {`${usuario.nombres || usuario.nombre} ${usuario.apellidos || ""}`}
              </h2>
              <p className="email-usuario-perfil">{usuario.email}</p>
              <div className="tiempo-registro-perfil">
                <Calendar size={16} />
                <span>Cliente desde hace {calcularTiempoRegistro()}</span>
              </div>
            </div>
          </div>

          <div className="estadisticas-usuario-perfil">
            <div className="stat-usuario-perfil">
              <div className="numero-stat-usuario-perfil">2</div>
              <div className="label-stat-usuario-perfil">Mascotas</div>
            </div>
            <div className="stat-usuario-perfil">
              <div className="numero-stat-usuario-perfil">5</div>
              <div className="label-stat-usuario-perfil">Consultas</div>
            </div>
            <div className="stat-usuario-perfil">
              <div className="numero-stat-usuario-perfil">3</div>
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
              <div className="valor-campo-perfil">{usuario.nombres || usuario.nombre}</div>
            </div>

            <div className="campo-perfil">
              <label className="label-perfil">
                <User size={18} />
                Apellidos
              </label>
              <div className="valor-campo-perfil">{usuario.apellidos || "González"}</div>
            </div>

            <div className="campo-perfil">
              <label className="label-perfil">
                <Calendar size={18} />
                Fecha de Nacimiento
              </label>
              <div className="valor-campo-perfil">
                {usuario.fechaNacimiento ? new Date(usuario.fechaNacimiento).toLocaleDateString("es-ES") : "15/05/1990"}
              </div>
            </div>

            <div className="campo-perfil">
              <label className="label-perfil">
                <User size={18} />
                Tipo de Documento
              </label>
              <div className="valor-campo-perfil">{usuario.tipoDocumento || "Cédula"}</div>
            </div>

            <div className="campo-perfil">
              <label className="label-perfil">
                <User size={18} />
                Documento
              </label>
              <div className="valor-campo-perfil">{usuario.documento || "12345678"}</div>
            </div>

            <div className="campo-perfil campo-completo-perfil">
              <label className="label-perfil">
                <MapPin size={18} />
                Dirección
              </label>
              <div className="valor-campo-perfil">{usuario.direccion}</div>
            </div>

            <div className="campo-perfil">
              <label className="label-perfil">
                <Phone size={18} />
                Celular
              </label>
              <div className="valor-campo-perfil">{usuario.celular || usuario.telefono}</div>
            </div>

            <div className="campo-perfil">
              <label className="label-perfil">
                <Phone size={18} />
                Celular 2
              </label>
              <div className="valor-campo-perfil">{usuario.celular2 || "+34 612 345 679"}</div>
            </div>

            <div className="campo-perfil">
              <label className="label-perfil">
                <Mail size={18} />
                Email
              </label>
              <div className="valor-campo-perfil">{usuario.email}</div>
            </div>

            <div className="campo-perfil">
              <label className="label-perfil">
                <User size={18} />
                Género
              </label>
              <div className="valor-campo-perfil">{usuario.genero || "Femenino"}</div>
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
      </div>

      {mostrarModalEdicion && (
        <EditarPerfilModal
          usuario={usuario}
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
    </div>
  )
}

export default PerfilCliente
