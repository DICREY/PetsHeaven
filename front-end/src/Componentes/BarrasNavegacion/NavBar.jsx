// Librarys 
import React, { useEffect, useRef, useState } from "react"
import { Menu, X } from "lucide-react"

// Imports 
import '../../../public/styles/BarrasNavegacion/NavBar.css'
import { Logout, getRoles } from '../Varios/Util'

// Main component 
export const NavBar = () => {
  // Vars 
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [isAutenticate, setIsAutenticate] = useState(false)
  const [petsUrl, setPetsUrl] = useState("/user/pets")
  const refNav = useRef(null)
  
  // Función para manejar el scroll a secciones
  const irASeccion = (e, id) => {
    e.preventDefault()
    setMenuAbierto(false)

    if (!id) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
      return
    }

    const elemento = document.getElementById(id)
    if (elemento) {
      const alturaNav = refNav.current?.offsetHeight || 0
      const posicion = elemento.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: posicion - alturaNav,
        behavior: "smooth",
      })
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      const roles = getRoles(token)
      setIsAutenticate(true) 

      if(roles.includes("Administrador") || roles.includes("Veterinario")) {
        setPetsUrl("/gestion/mascotas")
      } else setPetsUrl("/user/pets")

    } else setIsAutenticate(false)
  }, [])

  return (  
    <header className="encabezado" ref={refNav}>
      <div className="contenedor-header">
        <div className="logo-container">
          <img src="https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/5.png" alt="Logo de PetsHeaven con la palabra Pets en celeste y Heaven en negro, en una tipografía moderna." width={50} height={50} className="logo-img" />
        </div>

        {/* Navegación Escritorio */}
        <nav className="nav-escritorio">
          <a href="main" className="enlace-nav" onClick={(e) => irASeccion(e, "")}>
            Inicio
          </a>
          <a href="#nosotros" className="enlace-nav" onClick={(e) => irASeccion(e, "nosotros")}>
            Nosotros
          </a>
          <a href="#servicios" className="enlace-nav" onClick={(e) => irASeccion(e, "servicios")}>
            Servicios
          </a>
          <a href="#promociones" className="enlace-nav" onClick={(e) => irASeccion(e, "promociones")}>
            Promociones
          </a>
          <a href="#testimonios" className="enlace-nav" onClick={(e) => irASeccion(e, "testimonios")}>
            Testimonios
          </a>
          <a href="#contacto" className="enlace-nav" onClick={(e) => irASeccion(e, "contacto")}>
            Contáctanos
          </a>
          {
            isAutenticate && (
              <a href={petsUrl} className="enlace-nav">
                Mascotas
              </a>
            )
          }
        </nav>

        {/* Botón Menú Móvil */}
        <div className="contenedor-boton-menu">
          <button
            className="boton-menu"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}>
            {menuAbierto ? <X className="icono-menu" /> : <Menu className="icono-menu" />}
          </button>
        </div>

        {/* Botones para escritorio */}
        {
          isAutenticate ? (
            <div className="botones-escritorio">
              <a href="/main" className="boton-login-nav" onClick={Logout}>Cerrar Sesión</a>
            </div>
          ) : (
            <div className="botones-escritorio">
              <a href="/user/register" className="boton-registro-nav">Registrarse</a>
              <a href="/user/login" className="boton-login-nav">Iniciar Sesión</a>
            </div>
          )
        }
      </div>

      {/* Navegación Móvil */}
      <div className={`menu-movil ${menuAbierto ? "activo" : ""}`}>
        <nav className="nav-movil">
          <a href="#" className="enlace-nav-movil" onClick={(e) => irASeccion(e, "")}>
            Inicio
          </a>
          <a href="#nosotros" className="enlace-nav-movil" onClick={(e) => irASeccion(e, "nosotros")}>
            Nosotros
          </a>
          <a href="#servicios" className="enlace-nav-movil" onClick={(e) => irASeccion(e, "servicios")}>
            Servicios
          </a>
          <a href="#promociones" className="enlace-nav-movil" onClick={(e) => irASeccion(e, "promociones")}>
            Promociones
          </a>
          <a href="#testimonios" className="enlace-nav-movil" onClick={(e) => irASeccion(e, "testimonios")}>
            Testimonios
          </a>
          <a href="#contacto" className="enlace-nav-movil" onClick={(e) => irASeccion(e, "contacto")}>
            Contáctanos
          </a>
          {
            isAutenticate && (
              <a href="/user/pets" className="enlace-nav-movil">
                Mascotas
              </a>
            )
          }
          {/* Botones para móvil */}
          {
            isAutenticate ? (
              <div className="botones-movil">
                <a href="/main" className="boton-login-movil-nav" onClick={Logout}>Cerrar Sesión</a>
              </div>
            ) : (
              <div className="botones-movil">
                <a href="/user/register" className="boton-registro-movil-nav">
                  Registrarse
                </a>
                <a href='/user/login' className="boton-login-movil-nav">Iniciar Sesión</a>
              </div>
            )
          } 
        </nav>
      </div>
    </header>
  )
}