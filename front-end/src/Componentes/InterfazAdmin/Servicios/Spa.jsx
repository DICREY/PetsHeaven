// Librarys 
import { useContext, useEffect, useRef, useState } from "react"
import { Bath, X, Heart, Sparkles, Target, FileText } from "lucide-react"

// Imports 
import { HeaderAdmin } from '../../BarrasNavegacion/HeaderAdmin'
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import { AuthContext } from "../../../Contexts/Contexts"
import { ServicesContainer } from "../../Global/Services"
import { Notification } from "../../Global/Notifys"
import { FormularioServicio, ServicesDetails } from "./Forms/Forms"
import { formatPrice } from "../../../Utils/Utils"
import { GetData, ModifyData, PostData } from "../../Varios/Requests"
import { errorStatusHandler } from "../../Varios/Util"

// Import styles 
import "../../../styles/InterfazAdmin/Servicios/Spa.css"

// Component
export const SpaMascotas = ({ URL = '' }) => {
  // Dynamic vars 
  const [ mostrarFormulario, setMostrarFormulario ] = useState(false)
  const [ mostrarDetalle, setMostrarDetalle ] = useState(false)
  const [ notify, setNotify ] = useState()
  const [ servicioDetalle, setServicioDetalle ] = useState(null)
  const [ servicioEditando, setServicioEditando ] = useState(null)
  const [ modoEdicion, setModoEdicion ] = useState(false)
  const [ services, setServices ] = useState()
  const [ nuevoServicio, setNuevoServicio ] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    beneficios: "",
    duracion: "",
    recomendaciones: "",
    precio: "",
    disponible: true,
    categoria: "Higiene",
    tipoAnimal: "ambos",
    productos: "",
    frecuencia: "",
  })

  // Vars 
  const categorias = ["Higiene", "Estética", "Salud", "Terapéutico", "Relajación", "Especial"]
  const { admin } = useContext(AuthContext)
  const didFetch = useRef(false)
  const mainUrl = `${URL}/service`

  const abrirModalAgregar = () => {
    setNuevoServicio({
      id: "",
      nombre: "",
      descripcion: "",
      beneficios: "",
      duracion: "",
      recomendaciones: "",
      precio: "",
      disponible: true,
      categoria: "Higiene",
      tipoAnimal: "ambos",
      productos: "",
      frecuencia: "",
    })
    setModoEdicion(false)
    setMostrarFormulario(true)
  }

  const abrirModalEditar = (servicio) => {
    setNuevoServicio(servicio)
    setServicioEditando(servicio.id)
    setModoEdicion(true)
    setMostrarFormulario(true)
  }

  const abrirModalDetalle = (servicio) => {
    setServicioDetalle({
      ...servicio,
      nombre: servicio.nom_ser,
      descripcion: servicio.des_ser,
      descripcionPro: servicio.des_pro_ser,
      precio: servicio.pre_act_ser,
      disponible: servicio.sta_ser === "DISPONIBLE",
      duracion:  `${servicio.dur_min_tip_ser || 0} horas`,
      categoria: servicio.nom_cat,
      preparacion: servicio.des_tip_ser,
      recomendaciones: servicio.tec_des_ser,
      complicaciones: servicio.req,
      equipo: servicio.req_equ_esp?'Si aplica':'No aplica',
      procedimientos: servicio.proc_ser,
      min: `${formatPrice(servicio.pre_ser) || 0.0}`,
    })
    setMostrarDetalle(true)
  }

  const guardarServicio = async (data) => {
    try {
      setNotify({
        title: 'Guardando',
        message: 'Guardando servicio...',
        load: 1
      })

      if (modoEdicion) {
        await ModifyData(`${mainUrl}/modify`, data)
      } else {
        await PostData(`${mainUrl}/register`, data)
      }
      
      didFetch.current = false // Reset fetch state to allow refetch
      GetEsthetic()
      setNotify({
        title: 'Éxito',
        message: `servicio ${modoEdicion ? 'actualizado' : 'agregado'} correctamente`,
        close: setNotify
      })

      setModalAbierto(false)

    } catch (err) {
      setNotify(null)
      const message = errorStatusHandler(err)
      setNotify({
        title: 'Error',
        message: message,
        close: setNotify
      })
    }
  }

  const ChangeState = (data) => {
    setNotify({
      title: 'Atencion',
      message: `¿Deseas ${data.sta_ser? "desactivar" : "activar"} este servicio estetico?`,
      firstOption: () => {setNotify(null); return},
      secondOption: () => {setNotify(null); DeleteService(data.id_ser)},
      firstOptionName: 'Cancelar',
      secondOptionName: 'Continuar',
    })
    const DeleteService = async (id_ser) => {
      try {
        setNotify({
          title: 'Cargando...',
          message: 'Validando credenciales, por favor espere...',
          load: 1
        }) 
        const deleted = await ModifyData(`${mainUrl}/AblOrDis`, { id: id_ser, nom_cat: 'Estetica' })
        setNotify(null)
        if (deleted.success) {
          didFetch.current = false // Reset fetch state to allow refetch
          GetEsthetic() 
          setNotify({
              title: `${data.sta_ser === "DISPONIBLE" ? 'Desactivación' : 'Activación'} exitosa`,
              message: `El servicio estetico ha sido ${data.sta_ser === "DISPONIBLE" ? 'desactivado' : 'activado'} exitosamente`,
              close: setNotify
          })
        }
      } catch (err) {
        const message = errorStatusHandler(err)
        setNotify({
          title: 'Error',
          message: `${message}`,
          close: setNotify
        })
      }
    }
  }

  const GetEsthetic = async () => {
    if (didFetch.current) return
    didFetch.current = true

    setNotify({
      title: 'Cargando',
      message: 'Cargando servicios esteticos, por favor espere...',
      load: 1
    })

    try {
      let data = await GetData(`${mainUrl}/esthetic`)
      setNotify(null)
      if (data) setServices(data)
    } catch (err) {
      setNotify(null)
      if (err) {
        const message = errorStatusHandler(err)
        setNotify({
          title: 'Error',
          message: `${message}`,
          close: setNotify
        })
      }
    }
  }

  useEffect(() => {
    GetEsthetic()
  }, [])

  return (
    <main className="contenedoradminhome">
      <NavBarAdmin/>
      <section className="tablero-admin">
        <HeaderAdmin URL={URL} />
        <ServicesContainer 
          TitleIcon={Bath}
          title="Servicios de Spa y Cuidado"
          titleDes='Tratamientos de belleza y bienestar para tu mascota'
          subTitle="Tratamientos Disponibles"
          Name="Tratamiento"
          datas={services}
          filters={categorias}
          headers={{
            nom: 'nom_ser',
            des: 'des_ser',
            cat: 'nom_cat',
            sta: 'sta_ser',
            pri: 'pre_ser',
            cod: 'id_ser',
            time: 'dur_min_tip_ser',
            alert: 'des_tip_ser'
          }}
          SearchHeaders={['nom_cat']}
          OpenCreate={abrirModalAgregar}
          OpenDetails={abrirModalDetalle}
          OpenEdit={abrirModalEditar}
          Delete={ChangeState}
          ChangeState={ChangeState}
        />

        {/* Modal Agregar/Editar */}
        {mostrarFormulario && (
          <FormularioServicio
            onGuardar={guardarServicio}
            onCancelar={() => setMostrarFormulario(null)}
            initialData={modoEdicion ? nuevoServicio : {}}
            modoEdicion={modoEdicion}
            URL={URL}
            mainName="Estética"
          />
        )}

        {/* Modal Detalle */}
        {mostrarDetalle && servicioDetalle && (
          <ServicesDetails
            mostrarDetalle={mostrarDetalle}
            setMostrarDetalle={() => setMostrarDetalle(null)}
            infoDetails={servicioDetalle}
          />
        )}
      </section>
      {notify && <Notification {...notify} />}
    </main>
  )
}