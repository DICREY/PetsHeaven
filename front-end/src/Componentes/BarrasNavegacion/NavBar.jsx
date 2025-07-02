// Librarys 
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'

// Imports 
import { AuthContext } from '../../Contexts/Contexts'

// Import styles
import '../../../src/styles/BarrasNavegacion/NavBar.css'

// Main component 
export const NavBar = () => {
  // Vars 
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [url, setUrl] = useState('/user/pets')
  const [redirectTo, setRedirectTo] = useState('Mascotas')
  const refNav = useRef(null)
  const { mainRol, logout, log } = useContext(AuthContext)

  // Función para manejar el scroll a secciones
  const irASeccion = (e, id) => {
    e.preventDefault()
    setMenuAbierto(false)

    if (!id) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      return
    }

    const elemento = document.getElementById(id)
    if (elemento) {
      const alturaNav = refNav.current?.offsetHeight || 0
      const posicion = elemento.getBoundingClientRect().top + window.scrollY
      window.scrollTo({
        top: posicion - alturaNav,
        behavior: 'smooth',
      })
    }
  }

  useEffect(() => {
    if (log) {
      if (mainRol === 'Administrador') {
        setRedirectTo('Administración')
        setUrl('/admin/home')
      } else if (mainRol === 'Veterinario') {
        setRedirectTo('Panel medico')
        setUrl('/staff/home')
      } else {
        setRedirectTo('Tú Panel')
        setUrl('/user/home')
      }
    }
  }, [])

  return (
    <header className='encabezado' ref={refNav}>
      <div className='contenedor-header'>
        <div className='logo-container'>
          <img src='https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/5.png' alt='Logo de PetsHeaven con la palabra Pets en celeste y Heaven en negro, en una tipografía moderna.' width={50} height={50} className='logo-img' />
        </div>

        {/* Navegación Escritorio */}
        <nav className='nav-escritorio'>
          <a href='main' className='enlace-nav' onClick={(e) => irASeccion(e, '')}>
            Inicio
          </a>
          <a href='#nosotros' className='enlace-nav' onClick={(e) => irASeccion(e, 'nosotros')}>
            Nosotros
          </a>
          <a href='#servicios' className='enlace-nav' onClick={(e) => irASeccion(e, 'servicios')}>
            Servicios
          </a>
          <a href='#promociones' className='enlace-nav' onClick={(e) => irASeccion(e, 'promociones')}>
            Promociones
          </a>
          <a href='#testimonios' className='enlace-nav' onClick={(e) => irASeccion(e, 'testimonios')}>
            Testimonios
          </a>
          <a href='#contacto' className='enlace-nav' onClick={(e) => irASeccion(e, 'contacto')}>
            Contáctanos
          </a>
          {
            log && (
              <a href={url} className='enlace-nav'>{redirectTo}</a>
            )
          }
          {
            log ? (
              <div className='botones-escritorio'>
                <a href='/main' className='boton-login-nav' onClick={logout}>Cerrar Sesión</a>
              </div>
            ) : (
              <div className='botones-escritorio'>
                <a href='/user/register' className='boton-registro-nav'>Registrarse</a>
                <a href='/user/login' className='boton-login-nav'>Iniciar Sesión</a>
              </div>
            )
          }
        </nav>

        {/* Botón Menú Móvil */}
        <div className='contenedor-boton-menu'>
          <button
            className='boton-menu'
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}>
            {menuAbierto ? <X className='icono-menu' /> : <Menu className='icono-menu' />}
          </button>
        </div>
      </div>

      {/* Navegación Móvil */}
      <div className={`menu-movil ${menuAbierto ? 'activo' : ''}`}>
        <nav className='nav-movil'>
          <a href='#' className='enlace-nav-movil' onClick={(e) => irASeccion(e, '')}>
            Inicio
          </a>
          <a href='#nosotros' className='enlace-nav-movil' onClick={(e) => irASeccion(e, 'nosotros')}>
            Nosotros
          </a>
          <a href='#servicios' className='enlace-nav-movil' onClick={(e) => irASeccion(e, 'servicios')}>
            Servicios
          </a>
          <a href='#promociones' className='enlace-nav-movil' onClick={(e) => irASeccion(e, 'promociones')}>
            Promociones
          </a>
          <a href='#testimonios' className='enlace-nav-movil' onClick={(e) => irASeccion(e, 'testimonios')}>
            Testimonios
          </a>
          <a href='#contacto' className='enlace-nav-movil' onClick={(e) => irASeccion(e, 'contacto')}>
            Contáctanos
          </a>
          {log && (<a href={url} className='enlace-nav'>{redirectTo}</a>)}
          {/* Botones para móvil */}
          {
            log ? (
              <div className='botones-movil'>
                <a href='/main' className='boton-login-movil-nav' onClick={logout}>Cerrar Sesión</a>
              </div>
            ) : (
              <div className='botones-movil'>
                <a href='/user/register' className='boton-registro-movil-nav'>
                  Registrarse
                </a>
                <a href='/user/login' className='boton-login-movil-nav'>Iniciar Sesión</a>
              </div>
            )
          }
        </nav>
      </div>
    </header>
  )
}