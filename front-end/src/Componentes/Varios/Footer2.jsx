// Librarys 
import React from 'react'
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Clock, Heart, Stethoscope } from "lucide-react"

// Import styles 
import '../../../src/styles/Varios/footer.css'

// Component 

export default function FooterGeneral() {
  return (
    <footer className="fondo-blanco-footer-principal texto-gris-oscuro-footer-principal">
      <div className="contenedor-footer-principal mx-auto px-4 py-12">
        {/* Contenido Principal del Footer */}
        <div className="cuadricula-footer-principal cuadricula-una-columna-footer-principal md:cuadricula-dos-columnas-footer-principal lg:cuadricula-cuatro-columnas-footer-principal espacio-entre-elementos-footer-principal">
          {/* Información de la Veterinaria */}
          <div className="seccion-footer-principal">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="icono-mediano-footer-principal texto-cyan-footer-principal" />
              <h3 className="titulo-principal-footer-principal">Pets Heaven</h3>
            </div>
            <p className="parrafo-footer-principal">
              Cuidamos a tus mascotas con amor y profesionalismo. Más de 15 años brindando atención veterinaria de
              calidad las 24 horas del día.
            </p>
            <div className="redes-sociales-footer-principal">
              <button className="boton-red-social-footer-principal">
                <Facebook className="icono-footer-principal" />
              </button>
              <button className="boton-red-social-footer-principal">
                <Twitter className="icono-footer-principal" />
              </button>
              <button className="boton-red-social-footer-principal">
                <Instagram className="icono-footer-principal" />
              </button>
            </div>
          </div>

          {/* Servicios Veterinarios */}
          <div className="seccion-footer-principal">
            <div className="flex items-center space-x-2 mb-4">
              <Stethoscope className="icono-footer-principal texto-cyan-footer-principal" />
              <h3 className="subtitulo-footer-principal">Nuestros Servicios</h3>
            </div>
            <ul className="lista-servicios-footer-principal">
              <li>
                <a href="#" className="enlace-servicio-footer-principal">
                  Consultas Generales
                </a>
              </li>
              <li>
                <a href="#" className="enlace-servicio-footer-principal">
                  Vacunación
                </a>
              </li>
              <li>
                <a href="#" className="enlace-servicio-footer-principal">
                  Cirugías
                </a>
              </li>
              <li>
                <a href="#" className="enlace-servicio-footer-principal">
                  Emergencias 24h
                </a>
              </li>
              <li>
                <a href="#" className="enlace-servicio-footer-principal">
                  Peluquería Canina
                </a>
              </li>
              <li>
                <a href="#" className="enlace-servicio-footer-principal">
                  Hospitalización
                </a>
              </li>
            </ul>
          </div>

          {/* Información de Contacto */}
          <div className="seccion-footer-principal">
            <h3 className="subtitulo-footer-principal">Contacto</h3>
            <div className="informacion-contacto-footer-principal">
              <div className="elemento-contacto-footer-principal">
                <MapPin className="icono-pequeno-footer-principal texto-cyan-footer-principal" />
                <span className="texto-gris-footer-principal texto-pequeno-footer-principal">
                  Av. Veterinaria 456, Centro, Ciudad
                </span>
              </div>
              <div className="elemento-contacto-footer-principal">
                <Phone className="icono-pequeno-footer-principal texto-cyan-footer-principal" />
                <span className="texto-gris-footer-principal texto-pequeno-footer-principal">+1 (555) PET-CARE</span>
              </div>
              <div className="elemento-contacto-footer-principal">
                <Phone className="icono-pequeno-footer-principal texto-rojo-footer-principal" />
                <span className="texto-rojo-oscuro-footer-principal texto-pequeno-footer-principal texto-emergencia-footer-principal">
                  Emergencias: +1 (555) 911-PETS
                </span>
              </div>
              <div className="elemento-contacto-footer-principal">
                <Mail className="icono-pequeno-footer-principal texto-cyan-footer-principal" />
                <span className="texto-gris-footer-principal texto-pequeno-footer-principal">info@petsheaven.com</span>
              </div>
            </div>
          </div>

          {/* Horarios */}
          <div className="seccion-footer-principal">
            <div className="flex items-center space-x-2 mb-4">
              <Clock className="icono-footer-principal texto-cyan-footer-principal" />
              <h3 className="subtitulo-footer-principal">Horarios</h3>
            </div>
            <div className="horarios-atencion-footer-principal">
              <p className="horario-item-footer-principal">
                <strong>Lun - Vie:</strong> 8:00 AM - 8:00 PM
              </p>
              <p className="horario-item-footer-principal">
                <strong>Sábados:</strong> 9:00 AM - 6:00 PM
              </p>
              <p className="horario-item-footer-principal">
                <strong>Domingos:</strong> 10:00 AM - 4:00 PM
              </p>
              <p className="emergencia-veinticuatro-footer-principal">🚨 Emergencias 24/7</p>
            </div>
          </div>
        </div>

        <hr className="separador-footer-principal" />

        {/* Footer Inferior */}
        <div className="pie-inferior-footer-principal">
          <div className="derechos-autor-footer-principal">
            © 2024 Pets Heaven - Clínica Veterinaria. Todos los derechos reservados.
          </div>
          <div className="enlaces-legales-footer-principal">
            <a href="#" className="enlace-legal-footer-principal">
              Política de Privacidad
            </a>
            <a href="#" className="enlace-legal-footer-principal">
              Términos de Servicio
            </a>
            <a href="#" className="enlace-legal-footer-principal">
              Aviso Legal
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}


