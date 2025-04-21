import { Instagram, Facebook } from "lucide-react"
import "../../../public/styles/Varios/footer.css"
import React from "react"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="contenedor-footer">
        <div className="logo-derechos">
          <img src="https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/1.png" alt="Logo de Pets Heaven, clínica veterinaria. Muestra un dibujo lineal de un gato y un perro con un corazón azul sobre ellos. El texto 'Pets' está en azul y 'Heaven' en negro. Debajo se lee 'Clínica Veterinaria'." className="logo-footer" />
          <span className="texto-footer">© 2025 PetsHeaven. Todos los derechos reservados.</span>
        </div>
        <div className="enlaces-legales">
          <a href="#" className="enlace-footer">
            Política de Privacidad
          </a>
          <a href="#" className="enlace-footer">
            Términos de Servicio
          </a>
          <a href="#" className="enlace-footer">
            Cookies
          </a>
        </div>
      </div>
    </footer>
  )
}

