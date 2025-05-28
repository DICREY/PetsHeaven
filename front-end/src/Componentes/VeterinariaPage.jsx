// Imports 
import { NavBar } from './BarrasNavegacion/NavBar'
import { GetDataGlobal, PostDataGlobal } from './Varios/Requests'
import { diapositivas, promociones, testimonios } from './Varios/varios'
import { checkImage, errorStatusHandler } from './Varios/Util'
import { Loader } from './Errores/Loader'
import Footer from './Varios/Footer2'

// Librarys 
import React,{ useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Star, Phone, Mail, Clock, ChevronUp, Instagram, Facebook, Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'

// Import styles
import '../../src/styles/VeterinariaPage.css'
import HeaderUser from './BarrasNavegacion/HeaderUser'

// Animaciones
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function VeterinariaPage({ URL = '', setArriveTo}) {
  // Dynamic vars
  const mainUrl = `${URL}/global/services`
  const [diaActual, setDiaActual] = useState(0)
  const [testActual, setTestActual] = useState(0)
  const [mostrarBoton,setMostrarBoton] = useState(false)
  const [gruposTest, setGruposTest] = useState([])
  const [serData, setSerData] = useState([])
  const [loading,setLoading] = useState(true)

  // Vars
  const navigate = useNavigate()
  const imgDefault = 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/default_veterinario.png'

  // Función para agrupar testimonios en diapositivas
  const agruparTest = () => {
    if (typeof window === 'undefined') return []

    const esMovil = window.innerWidth < 768
    const testPorGrupo = esMovil ? 1 : 3
    const grupos = []

    for (let i = 0; i < testimonios.length; i += testPorGrupo) {
      grupos.push(testimonios.slice(i, i + testPorGrupo))
    }

    return grupos
  }

  const ConfigCookie = async () => {
    try {
      const cook = await PostDataGlobal(`${URL}/global/cookie`,{name: 'Puta',value: 'Cuanto cobras'})
      console.log(cook)
    } catch (err) {
      if (err.status) {
        const message = errorStatusHandler(err.status)
        // console.log(message)
      } else console.log(err)
    }
  }
  const CheckCookie = async () => {
    try {
      const cook = await GetDataGlobal(`${URL}/global/check-cookie`)
      console.log(cook.data.message)
    } catch (err) {
      if (err.status) {
        const message = errorStatusHandler(err.status)
        console.log(message)
      } else console.log(err)
    }
  }

  // Función para scroll al inicio
  const subirInicio = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  // Traer los servicios de la base de datos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const services = await GetDataGlobal(mainUrl)
        setSerData(services.data.result[0])
        setLoading(false)
      } catch (error) {
        setSerData()
      }
    }
  
    fetchData()
  }, [])
  
  // Efecto para inicializar y actualizar los grupos de testimonios
  useEffect(() => {
    setGruposTest(agruparTest())

    const cambiarTamaño = () => {
      setGruposTest(agruparTest())
    }

    window.addEventListener('resize', cambiarTamaño)
    return () => window.removeEventListener('resize', cambiarTamaño)
  }, [])

  // Efecto para el carrusel principal
  useEffect(() => {
    const intervalo = setInterval(() => {
      setDiaActual((anterior) => (anterior === diapositivas.length - 1 ? 0 : anterior + 1))
    }, 5000)
    return () => clearInterval(intervalo)
  }, [diapositivas.length])

  // Efecto para el carrusel de testimonios
  useEffect(() => {
    if (gruposTest.length > 0) {
      const intervalo = setInterval(() => {
        setTestActual((anterior) => (anterior === gruposTest.length - 1 ? 0 : anterior + 1))
      }, 7000)
      return () => clearInterval(intervalo)
    }
  }, [gruposTest.length])

  // Efecto para mostrar/ocultar el botón de scroll
  useEffect(() => {
    const manejarScroll = () => {
      if (window.scrollY > 300) {
        setMostrarBoton(true)
      } else {
        setMostrarBoton(false)
      }
    }

    window.addEventListener('scroll', manejarScroll)
    return () => window.removeEventListener('scroll', manejarScroll)
  }, [])

  return (
    <>
    {
      loading ? (<Loader />) : (
        <div className='pagina'>
          <NavBar />
          {/* <button
            className='BackBtn'
            onClick={ConfigCookie}
          >
            Cookie
          </button>
          <button
            className='BackBtn'
            onClick={CheckCookie}
          >
            Check Cookie
          </button> */}

          {/* COMPONENTE: Carrusel */}
          <motion.section 
            className='carrusel'
            initial='hidden'
            animate='visible'
            variants={fadeIn}
          >
            {diapositivas.map((dia, indice) => (
              <div key={indice} className={`dia-carrusel ${indice === diaActual ? 'activo' : ''}`}>
                {checkImage(
                  dia.imagen,
                  dia.alt || 'Imagen del carrusel de PetsHeaven',
                  imgDefault,
                  'imagen-carrusel'
                )}
              </div> 
            ))}
            <div className='indicadores'>
              {diapositivas.map((_, indice) => (
                <button
                  key={indice}
                  onClick={() => setDiaActual(indice)}
                  className={`indicador ${indice === diaActual ? 'activo' : ''}`}
                  aria-label={`Ir a diapositiva ${indice + 1}`}
                />
              ))}
            </div>
          </motion.section>

          {/* COMPONENTE: Sobre Nosotros */}
          <motion.section 
            id='nosotros' 
            className='seccion-nosotros'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            variants={containerVariants}
          >
            <div className='contenedor'>
              <motion.div className='contenedor-nosotros'>
                <motion.div className='imagen-nosotros' variants={itemVariants}>
                  {checkImage(
                    'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Fondos/NosotrosR.jpg',
                    'cuatro veterinarios sonrientes posando con tres perros de tamaño medio en un fondo claro',
                    imgDefault,
                    'img-nosotros'
                  )}
                </motion.div>
                <motion.div className='texto-nosotros' variants={itemVariants}>
                  <h2 className='titulo-seccion'>Quienes somos</h2>
                  <p className='texto-seccion mb-4'>
                    En PetsHeaven, nos dedicamos a proporcionar atención veterinaria de la más alta calidad para tus
                    mascotas. Nuestro equipo de veterinarios altamente capacitados y personal de apoyo está comprometido con
                    el bienestar y la salud de tus compañeros peludos.
                  </p>
                  <p className='texto-seccion mb-4'>
                    Fundada hace más de 10 años, nuestra clínica ha crecido para convertirse en un centro de referencia en
                    medicina veterinaria, ofreciendo servicios integrales desde chequeos rutinarios hasta procedimientos
                    quirúrgicos complejos.
                  </p>
                  <p className='texto-seccion'>
                    Entendemos que tus mascotas son parte de tu familia, por eso nos esforzamos por brindar un ambiente
                    acogedor y un trato personalizado para cada paciente.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </motion.section>

          {/* COMPONENTE: Servicios */}
          <motion.section 
            id='servicios' 
            className='seccion-servicios'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <div className='contenedor'>
              <h2 className='titulo-seccion titulo-centrado'>Nuestros Servicios</h2>
              <motion.div 
                className='grid-servicios'
                variants={staggerContainer}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
              >
                {serData.map(i => (
                  <motion.div 
                    key={i.img_ser} 
                    onClick={() => {
                      setArriveTo('/calendario/general')
                      navigate('/user/login')
                    }}
                    className='tarjeta-servicio'
                    variants={itemVariants}
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className='imagen-servicio'>
                      {checkImage(i.img_ser,
                        i.nom_ser === 'Consulta General' ? 'Veterinario revisando a un gato durante una consulta general' :
                        i.nom_ser === 'Vacunación' ? 'Veterinario aplicando vacuna a un cachorro' :
                        i.nom_ser === 'Cirugía' ? 'Veterinarios realizando una cirugía a una mascota en quirófano' :
                        i.nom_ser === 'Emergencias 24h' ? 'Atención veterinaria de emergencia a un perro por dos profesionales' :
                        i.nom_ser === 'Spa y Baño' ? 'Perro pequeño recibiendo baño con espuma en una clínica veterinaria' :
                        `Imagen representativa del servicio ${i.nom_ser}`,
                        imgDefault,'img-servicio')}
                    </div>
                    <div className='contenido-servicio'>
                      <h3 className='titulo-servicio'>{i.nom_ser}</h3>
                      <p className='descripcion-servicio'>{i.des_ser}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          {/* COMPONENTE: Promociones */}
          <motion.section 
            id='promociones' 
            className='seccion-promociones'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <div className='contenedor'>
              <h2 className='titulo-seccion titulo-centrado'>Promociones Especiales</h2>
              <motion.div 
                className='grid-promociones'
                variants={staggerContainer}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
              >
                {promociones.map((promocion, indice) => (
                  <motion.div 
                    key={indice} 
                    className='tarjeta-promocion'
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className='imagen-promocion'>
                      <img src={promocion.imagen || '/placeholder.svg'} alt={promocion.alt} className='img-promocion' />
                      <div className='etiqueta-fecha'>Válido hasta: {promocion.fechaVencimiento}</div>
                    </div>
                    <div className='contenido-promocion'>
                      <h3 className='titulo-promocion'>{promocion.titulo}</h3>
                      <p className='descripcion-promocion'>{promocion.descripcion}</p>
                      <motion.button 
                        onClick={() => setArriveTo('/calendario/general')}
                        className='boton-promocion'
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Aprovechar oferta
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.section>

          {/* COMPONENTE: Testimonios */}
          <motion.section
            id='testimonios'
            className='seccion-test'
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className='contenedor'>
              <h2 className='titulo-seccion titulo-centrado'>Testimonios</h2>
              <div className='carrusel-test'>
                {gruposTest.map((grupo, indice) => (
                  <div key={indice} className={`slide-test ${indice === testActual ? 'activo' : 'inactivo'}`}>
                    <motion.div 
                      className='grid-test'
                      initial='hidden'
                      whileInView='visible'
                      viewport={{ once: true }}
                      variants={staggerContainer}
                    >
                      {grupo.map((test, idxTest) => (
                        <motion.div 
                          key={idxTest} 
                          className='tarjeta-test'
                          variants={itemVariants}
                        >
                          <div className='cabecera-test'>
                            <img src={test.imagen || '/placeholder.svg'} alt={test.nombre} className='foto-perfil' />
                            <div className='info-test'>
                              <h3 className='nombre-test'>{test.nombre}</h3>
                              <div className='estrellas'>
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className={`estrella ${i < test.calificacion ? 'activa' : 'inactiva'}`} />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className='texto-test'>'{test.texto}'</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                ))}

                <div className='indicadores-test'>
                  {gruposTest.map((_, indice) => (
                    <button
                      key={indice}
                      onClick={() => setTestActual(indice)}
                      className={`indicador-test ${indice === testActual ? 'activo' : ''}`}
                      aria-label={`Ir al grupo de testimonios ${indice + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* COMPONENTE: Contacto */}
          <motion.section
            id='contacto'
            className='seccion-contacto'
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <div className='contenedor'>
              <motion.div 
                className='grid-contacto'
                variants={staggerContainer}
              >
                <motion.div className='columna-info' variants={itemVariants}>
                  <h2 className='titulo-contacto'>Contáctanos</h2>
                  <p className='descripcion-contacto'>
                    Estamos aquí para responder tus preguntas y proporcionar la mejor atención para tus mascotas
                  </p>
                  <div className='info-contacto'>
                    <div className='item-contacto'>
                      <MapPin className='icono-contacto' />
                      <span>Transversal 45 #3-54</span>
                    </div>
                    <div className='item-contacto'>
                      <Phone className='icono-contacto' />
                      <span>322 452 3961</span>
                    </div>
                    <div className='item-contacto'>
                      <Mail className='icono-contacto' />
                      <span>petsheaven@gmail.com</span>
                    </div>
                    <div className='item-contacto'>
                      <Clock className='icono-contacto' />
                      <div className='horarios'>
                        <div>Lunes - Viernes: 8am - 8pm</div>
                        <div>Sábados: 8am - 5pm</div>
                        <div>Domingos: Cerrado</div>
                      </div>
                    </div>
                  </div>

                  {/* Redes Sociales */}
                  <motion.div 
                    className='redes-sociales'
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className='titulo-redes'>Síguenos en redes sociales</h3>
                    <div className='iconos-redes'>
                      <motion.a
                        href='https://www.instagram.com/petsheaven'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='enlace-red'
                        aria-label='Instagram'
                        whileHover={{ y: -3 }}
                      >
                        <Instagram className='icono-red' />
                      </motion.a>
                      <motion.a
                        href='https://www.facebook.com/petsheaven'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='enlace-red'
                        aria-label='Facebook'
                        whileHover={{ y: -3 }}
                      >
                        <Facebook className='icono-red' />
                      </motion.a>
                      <motion.a
                        href='https://wa.me/573224523961'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='enlace-red'
                        aria-label='WhatsApp'
                        whileHover={{ y: -3 }}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          className='icono-red'
                        >
                          <path d='M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21' />
                          <path d='M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z' />
                          <path d='M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z' />
                          <path d='M9.5 13.5c.5 1.5 2.5 2 4 1' />
                        </svg>
                      </motion.a>
                    </div>
                  </motion.div>

                </motion.div>
                <aside className='mapa-contacto'>
                  <iframe
                    src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.9728971442!2d-74.07800742426815!3d4.598916042707592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f99a7eccfe58f%3A0x9620f171953c6c95!2sTransversal%2045%2C%20Bogot%C3%A1%2C%20Colombia!5e0!3m2!1ses!2sco!4v1710798850813!5m2!1ses!2sco'
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                    title='Ubicación de PetsHeaven'
                    className='iframe-mapa'
                    allowFullScreen
                  ></iframe>
                </aside>
              </motion.div>
            </div>
          </motion.section> 
          
          {/* Botón para subir */}
          <motion.button 
            onClick={subirInicio} 
            className='boton-subir'
            aria-label='Volver arriba'
            initial={{ opacity: 0 }}
            animate={{ opacity: mostrarBoton ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronUp className='icono-subir' />
          </motion.button> 
          <Footer/>
        </div>
      )
    }
    </>
  )
}