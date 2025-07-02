// Librarys 
import React, { useContext, useEffect, useRef } from "react"
import { useState } from "react"
import { FlaskConical, X } from "lucide-react"

// Imports
import { ServicesContainer } from "../../Global/Services"
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import { HeaderAdmin } from '../../BarrasNavegacion/HeaderAdmin'
import { AuthContext } from "../../../Contexts/Contexts"
import { Notification } from "../../Global/Notifys"
import { FormularioLabTest, ServicesDetails } from "./Forms/Forms"
import { GetData, ModifyData, PostData } from "../../Varios/Requests"
import { errorStatusHandler } from "../../Varios/Util"
import { formatPrice } from "../../../Utils/Utils"

// Import styles
import "../../../styles/InterfazAdmin/Servicios/Laboratorio.css"

// Component 
export const ExamenesLaboratorio = ({ URL= '' }) => {
  // Dynamic vars 
  const [ mostrarFormulario, setMostrarFormulario ] = useState(false)
  const [ mostrarDetalle, setMostrarDetalle ] = useState(false)
  const [ examenDetalle, setExamenDetalle ] = useState(null)
  const [ examenEditando, setExamenEditando ] = useState(null)
  const [ modoEdicion, setModoEdicion ] = useState(false)
  const [ notify, setNotify ] = useState(false)
  const [ examenes, setExamenes ] = useState()
  const [ nuevoExamen, setNuevoExamen ] = useState()

  // Vars 
  const { admin } = useContext(AuthContext)
  const didFetch = useRef(false)
  const mainUrl = `${URL}/service/laboratory`
  const categorias = [
    "Hematología",
    "Bioquímica",
    "Urología",
    "Endocrinología",
    "Parasitología",
    "Microbiología",
    "Inmunología",
  ]

  // Functions 
  const abrirModalAgregar = () => {
    setModoEdicion(false)
    setMostrarFormulario(true)
  }

  const abrirModalEditar = (examen) => {
    setNuevoExamen({ 
      ...examen,
      nom_pro: examen?.proc_ser[0]?.nom_pro,
      con_esp_pro: examen?.proc_ser[0]?.con_esp_pro,
      des_pro: examen?.proc_ser[0]?.des_pro,
      dur_min_pro: examen?.proc_ser[0]?.dur_min_pro,
      niv_rie_pro: examen?.proc_ser[0]?.niv_rie_pro,
      pro_pro: examen?.proc_ser[0]?.pro_pro
    })
    setExamenEditando(examen.id)
    setModoEdicion(true)
    setMostrarFormulario(true)
  }

  const abrirModalDetalle = (examen) => {
    console.log(examen)
    setExamenDetalle({
      ...examen,
      nombre: examen.nom_tip_pru,
      descripcion: examen.des_tip_pru,
      descripcionPro: examen.des_pro_pru,
      precio: examen.pre_act_ser,
      disponible: examen.sta_pru_lab,
      duracion:  examen.time,
      categoria: examen.cat_tip_pru,
      preparacion: examen.des_tip_pru,
      recomendaciones: examen.tec_des_pru,
      complicaciones: examen.req,
      equipo: examen.req_equ_esp?'Si aplica':'No aplica',
      procedimientos: examen.proc_ser,
      min: `${formatPrice(examen.pre_ser) || 0.0}`,
    })
    setMostrarDetalle(true)
  }

  const SaveExam = async (data) => {
    let Req = null
    console.log(data)
    try {
      setNotify({
        title: 'Cargando...',
        message: 'Validando datos recibidos',
        load: 1
      })

      if (modoEdicion) {
        const mod = await ModifyData(`${mainUrl}/modify`, data)
        if (mod) Req = 1
      } else {
        const create = await PostData(`${mainUrl}/register`, data)
        console.log(create)
        if (create?.success) Req = 1
      }
      
      if (Req) {
        setNotify({
          title: 'Éxito',
          message: `servicio ${modoEdicion ? 'actualizado' : 'agregado'} correctamente`,
          close: setNotify
        })
        didFetch.current = false // Reset fetch state to allow refetch
        GetLaboratory()
        setMostrarFormulario(null)
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

  const ChangeState = (data) => {
    setNotify({
      title: 'Atencion',
      message: '¿Estás seguro de que deseas eliminar esta vacuna?',
      firstOption: () => {setNotify(null); return},
      secondOption: () => {setNotify(null); DeleteService(data.id)},
      firstOptionName: 'Cancelar',
      secondOptionName: 'Continuar',
    })
    const DeleteService = async (id) => {
      setExamenes(examenes.filter((e) => e.id !== id))
    }
  }

  const GetLaboratory = async () => {
    if (didFetch.current) return
    didFetch.current = true

    setNotify({
      title: 'Cargando',
      message: 'Cargando servicios de laboratorio, por favor espere...',
      load: 1
    })

    try {
      let data = await GetData(`${mainUrl}/all`)
      setNotify(null)
      if (data) {
        const mapData = data.map((examen) => { 
          return {
            ...examen,
            time: `${examen.tie_est_hrs_tip_pru} horas`,
            state: examen.est_tip_pru === 'CANCELADO'? 0 : 1,
          }
        })
        setExamenes(mapData)
      }
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
    GetLaboratory()
  }, [])

  return (
    <main className="contenedoradminhome">
      <NavBarAdmin />
      <main className="tablero-admin">
        <HeaderAdmin URL={URL} />
        <ServicesContainer 
          Name="Examén"
          TitleIcon={FlaskConical}
          title={'Servicios de Laboratorio'}
          subTitle="Exámenes Disponibles"
          filters={categorias}
          headers={{
            nom: 'nom_tip_pru',
            des: 'des_tip_pru',
            cat: 'cat_tip_pru',
            sta: 'state',
            pri: 'cos_est_tip_pru',
            cod: 'cod_ord_pru_lab',
            time: 'time',
            alert: 'met_est_tip_pru',
          }}
          SearchHeaders={['categoria']}
          OpenDetails={abrirModalDetalle}
          OpenCreate={abrirModalAgregar}
          OpenEdit={abrirModalEditar}
          Delete={ChangeState}
          ChangeState={ChangeState}
          datas={examenes}
        />
        {/* Modal Agregar/Editar */}
        {mostrarFormulario && (
          <FormularioLabTest 
            onCancelar={() => setMostrarFormulario(null)}
            onGuardar={SaveExam}
            initialData={nuevoExamen}
            modoEdicion={modoEdicion}
            URL={URL}
            mainName="Laboratorio"
          />
        )}

        {/* Modal Detalle */}
        {mostrarDetalle && examenDetalle && (
          <ServicesDetails
            infoDetails={examenDetalle}
            mostrarDetalle={mostrarDetalle}
            setMostrarDetalle={() => setMostrarDetalle(null)}
          />
        )}
      </main>
      {notify && <Notification {...notify} />}
    </main>
  )
}
