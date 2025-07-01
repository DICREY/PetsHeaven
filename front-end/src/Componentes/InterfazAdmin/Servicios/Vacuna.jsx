// Librarys 
import { useState, useEffect, useRef } from "react"
import { Syringe, X } from "lucide-react"

// Imports 
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import { HeaderAdmin } from '../../BarrasNavegacion/HeaderAdmin'
import { Notification } from '../../Global/Notifys'
import { GetData, PostData, ModifyData } from "../../Varios/Requests"
import { errorStatusHandler, formatDate } from '../../Varios/Util'
import { ServicesContainer } from "../../Global/Services"
import { FormularioVacuna, ServicesDetails } from "./Forms/Forms"

// Import styles 
import "../../../styles/InterfazAdmin/Servicios/Vacuna.css"

// Component 
export function VisualizadorVacunas({ URL = '' }) {
  const [vacunas, setVacunas] = useState()
  const [modalAbierto, setModalAbierto] = useState(false)
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false)
  const [vacunaDetalle, setVacunaDetalle] = useState(null)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [vacunaEditando, setVacunaEditando] = useState(null)
  const [notify, setNotify] = useState({
    title: 'Cargando',
    message: 'Cargando vacunas, por favor espere...',
    load: 1
  })
  const [nuevaVacuna, setNuevaVacuna] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    descripcionPro: "",
    precio: "",
    frecuencia: "",
    tipoAnimal: "perro",
    disponible: true,
    categoria: "Esencial",
    efectosSecundarios: "",
    lote: "",
    fechaVencimiento: "",
    nombreProcedimiento: "",
    dosis: {
      cachorro: "",
      adulto: "",
      senior: "",
    },
  })

  // Vars 
  const mainUrl = `${URL}/service`
  const vaccineUrl = `${mainUrl}/vaccine`
  const categorias = ["Obligatoria", "Esencial", "Recomendada", "Opcional"]
  const didFetch = useRef(false)

  // Función para obtener las vacunas del backend
  const fetchVacunas = async () => {
    if (didFetch.current) return
    didFetch.current = true

    try {
      const response = await GetData(`${vaccineUrl}/all`)
      setNotify(null)
      if (response[0] && Array.isArray(response[0])) {
        // Mapeamos los datos del backend al formato que espera el frontend
        const vacunasMapeadas = response[0].map(vacuna => ({
          id: vacuna.id_vac,
          nombre: vacuna.nom_vac,
          descripcion: vacuna.des_vac,
          descripcionPro: vacuna.des_pro,
          precio: vacuna.pre_vac,
          frecuencia: vacuna.fre_vac,
          tipoAnimal: vacuna.req,
          disponible: vacuna.sta_vac,
          categoria: vacuna.cat_vac,
          efectosSecundarios: vacuna.efe_sec_vac,
          lote: vacuna.lot_vac,
          fechaVencimiento: formatDate(vacuna.fec_ven_vac),
          fechaCreacion: formatDate(vacuna.fec_cre_vac),
          nombreProcedimiento: vacuna.nom_pro,
          procedimientos: [{
            id_pro: vacuna.id_pro,
            nom_pro: vacuna.nom_pro,
            des_pro: vacuna.des_pro,
            niv_rie_pro: vacuna.niv_rie_pro,
            dur_min_pro: vacuna.dur_min_pro,
            con_esp_pro: vacuna.con_esp_pro,
            pro_pro: vacuna.pro_pro
          }],
          dosis: {
            cachorro: vacuna.dos_rec_cac_vac,
            adulto :vacuna.dos_rec_adu_vac,
            senior :vacuna.dos_rec_adu_jov_vac
          }
        }))

        setVacunas(vacunasMapeadas)
      }
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

  useEffect(() => {
    fetchVacunas()
  }, [fetchVacunas])

  const abrirModalAgregar = () => {
    setNuevaVacuna({
      id: "",
      nombre: "",
      descripcion: "",
      descripcionPro: "",
      precio: "",
      frecuencia: "",
      tipoAnimal: "perro",
      disponible: true,
      categoria: "Esencial",
      efectosSecundarios: "",
      lote: "",
      fechaVencimiento: "",
      fechaCreacion: "",
      nombreProcedimiento: "",
    })
    setModoEdicion(false)
    setModalAbierto(true)
  }

  const abrirModalEditar = (vacuna) => {
    setNuevaVacuna({...vacuna})
    setVacunaEditando(vacuna.id)
    setModoEdicion(true)
    setModalAbierto(true)
  }

  const guardarVacuna = async (data) => {
    if (data.nombre && data.precio > 0) {
      try {
        setNotify({
          title: 'Guardando',
          message: 'Guardando vacuna...',
          load: 1
        })
        const vacunaData = {
          nom_vac: data.nombre,
          efe_sec_vac: data.efectosSecundarios || '',
          cat_vac: data.categoria || 'Esencial',
          dos_rec_cac_vac: data.dosis?.cachorro || '',
          dos_rec_adu_vac: data.dosis?.senior || '',
          dos_rec_adu_jov_vac: data.dosis?.adulto || '',
          lot_vac: data.lote || '',
          fec_ven_vac: data.fechaVencimiento || new Date().toISOString().split('T')[0],
          fec_cre_vac: data.fechaCreacion || new Date().toISOString().split('T')[0],
          fre_vac: Number(data.frecuencia) || 0,
          des_vac: data.descripcion || '',
          pre_vac: Number(data.precio),
          nom_pro: data.nombreProcedimiento,
          des_pro: data.descripcionPro || '',
          nom_cat: data.categoriaServicio || 'Vacunacion'
        }

        if (modoEdicion) {
          if (!vacunaEditando) {
            throw new Error('ID de vacuna no especificado para edición')
          }
          await ModifyData(`${vaccineUrl}/modify`, {
            id_vac: vacunaEditando,
            ...vacunaData
          })
        } else {
          await PostData(`${vaccineUrl}/register`, vacunaData)
        }
        
        didFetch.current = false // Reset fetch state to allow refetch
        fetchVacunas()
        setNotify({
          title: 'Éxito',
          message: `Vacuna ${modoEdicion ? 'actualizada' : 'agregada'} correctamente`,
          close: setNotify
        })
        
        setModalAbierto(false)

      } catch (err) {
        setNotify(null)
        console.error('Error al guardar vacuna:', err)

        const message = err.status
          ? errorStatusHandler(err.status)
          : err.message || `No se pudo ${modoEdicion ? 'actualizar' : 'agregar'} la vacuna`

        setNotify({
          title: 'Error',
          message: message,
          close: setNotify
        })
      }
    } else {
      const message = errorStatusHandler(err)
      setNotify({
        title: 'Error',
        message: `${message}`,
        close: setNotify
      })
    }
  }

  const DeactivateVacuna = (vaccine = {}) => {
    setNotify({
      title: 'Atencion',
      message: `¿Deseas ${vaccine.disponible? "desactivar" : "activar"} esta vacuna?`,
      firstOption: () => {setNotify(null); return},
      secondOption: () => {setNotify(null); deleteVac(vaccine)},
      firstOptionName: 'Cancelar',
      secondOptionName: 'Continuar',
    })
    const deleteVac = async (vacc = {}) => {
      const data = {
        id: vacc.id,
        nom_vac: vacc.nombre,
        nom_cat: 'Vacunacion',
        nom_pro: vacc.nombreProcedimiento
      }
      try {
        setNotify({
          title: 'Cargando...',
          message: 'Validando credenciales, por favor espere...',
          load: 1
        })

        const deleteVaccine = await ModifyData(`${vaccineUrl}/change-state`, data)
        if (deleteVaccine?.change) {
          didFetch.current = false // Reset fetch state to allow refetch
          fetchVacunas()
          setNotify({
            title: 'Éxito',
            message: `Vacuna ${vacc.disponible ? 'desactivada' : 'activada'} correctamente`,
            close: setNotify
          })
        }

      } catch (err) {
        setNotify(null)
        const message = errorStatusHandler(err)
        setNotify({
          title: 'Error',
          message: `${message}`,
          close: setNotify
        })
      }
    }
  }

  const abrirModalDetalle = (vacuna) => {
    setVacunaDetalle({
      ...vacuna,
      frecuencia: `${vacuna.frecuencia} días`
    })
    setModalDetalleAbierto(true)
  }

  const handleDosisChange = (edad, valor) => {
    setNuevaVacuna({
      ...nuevaVacuna,
      dosis: {
        ...nuevaVacuna.dosis,
        [edad]: valor,
      },
    })
  }

  return (
    <main className="contenedor-vacunas">
      <NavBarAdmin />

      <section className="tablero-admin">
        <HeaderAdmin URL={URL} />
        <ServicesContainer 
          Name="Vacuna"
          TitleIcon={Syringe}
          title="Servicios de Vacunación"
          titleDes=""
          subTitle="Vacunas Disponibles"
          headers={{
            nom: 'nombre',
            des: 'descripcion',
            cat: 'categoria',
            sta: 'disponible',
            pri: 'precio',
            cod: 'id',
            time: 'fechaVencimiento',
            alert: 'efectosSecundarios',
          }}
          datas={vacunas}
          filters={categorias}
          SearchHeaders={['categoria']}
          OpenCreate={abrirModalAgregar}
          OpenDetails={abrirModalDetalle}
          OpenEdit={abrirModalEditar}
          Delete={DeactivateVacuna}
          ChangeState={DeactivateVacuna}
        />
        <div className="tarjetagesusuario">
            {/* Modal Agregar/Editar */}
            {modalAbierto && (
              <aside className="modal-fondo-vacunas">
                <section className="modal-vacunas">
                  <header className="modal-encabezado-vacunas">
                    <h3 className="titulo-modal-vacunas">{modoEdicion ? "Editar Vacuna" : "Agregar Nueva Vacuna"}</h3>
                    <button onClick={() => setModalAbierto(false)} className="cerrar-modal-vacunas">
                      <X className="icon" />
                    </button>
                  </header>
                  <FormularioVacuna
                    onGuardar={guardarVacuna}
                    onCancelar={() => setModalAbierto(false)}
                    initialData={nuevaVacuna}
                  />
                </section>
              </aside>
            )}

            {/* Modal Detalle */}
            <ServicesDetails
              mostrarDetalle={modalDetalleAbierto}
              setMostrarDetalle={() => setModalDetalleAbierto(null)}
              infoDetails={vacunaDetalle}
              labels={{
                precio: "Precio",
                frecuencia: "Frecuencia",
                categoria: "Categoría",
                disponible: "Disponible",
                descripcion: "Descripción General",
                descripcionPro: "Descripción Técnica",
                efectosSecundarios: "Complicaciones",
                infoAdicional: "Información Adicional",
                lote: "Lote",
                vencimiento: "Vencimiento",
                infoAdicionalPlus: {
                  name: 'Dosis Recomendada',
                  headers: {
                    cachorro: 'Cachorro' ,
                    adulto: 'Adulto' ,
                    senior: 'Senior',
                  },
                  valueList: 'dosis'
                },
              }}
            />
          </div>
        
      </section>
      {notify && <Notification {...notify} />}
    </main>
  )
}