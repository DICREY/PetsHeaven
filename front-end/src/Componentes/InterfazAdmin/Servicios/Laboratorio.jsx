// Librarys 
import React from "react"
import { useState } from "react"
import { FlaskConical, Plus, Trash2, Edit, X, Clock, AlertTriangle, FileText, Target } from "lucide-react"

// Imports
import { ServicesContainer } from "../../Global/Services"

// Import styles
import "../../../styles/InterfazAdmin/Servicios/Laboratorio.css"

// Component 
export const ExamenesLaboratorio = ({ URL='' }) => {
  const [examenes, setExamenes] = useState([
    {
      id: "LAB001",
      nombre: "Hemograma Completo",
      descripcion: "Análisis completo de células sanguíneas para detectar anemia, infecciones y otros trastornos.",
      tipoExamen: "Hematología",
      tiempoResultados: "2-4 horas",
      preparacionRequerida: "Ayuno de 8-12 horas recomendado",
      metodologia: "Citometría de flujo automatizada",
      valoresReferencia: "Glóbulos rojos: 5.5-8.5 M/μL, Glóbulos blancos: 6.0-17.0 K/μL, Plaquetas: 200-500 K/μL",
      indicaciones: "Chequeo general, anemia, infecciones, sangrado anormal",
      precio: 65000,
      disponible: true,
      categoria: "Hematología",
      tipoAnimal: "ambos",
      equipoRequerido: "Analizador hematológico automatizado",
      muestra: "Sangre con anticoagulante EDTA",
    },
    {
      id: "LAB002",
      nombre: "Perfil Bioquímico",
      descripcion: "Evaluación de función hepática, renal y metabólica a través de enzimas y metabolitos.",
      tipoExamen: "Bioquímica",
      tiempoResultados: "4-6 horas",
      preparacionRequerida: "Ayuno de 12 horas obligatorio",
      metodologia: "Espectrofotometría automatizada",
      valoresReferencia: "ALT: 10-100 U/L, Creatinina: 0.5-1.8 mg/dL, Glucosa: 70-143 mg/dL",
      indicaciones: "Evaluación hepática, renal, diabetes, chequeo geriátrico",
      precio: 85000,
      disponible: true,
      categoria: "Bioquímica",
      tipoAnimal: "ambos",
      equipoRequerido: "Analizador bioquímico automatizado",
      muestra: "Suero sanguíneo",
    },
    {
      id: "LAB003",
      nombre: "Análisis de Orina",
      descripcion: "Examen microscópico y químico de orina para detectar infecciones y enfermedades renales.",
      tipoExamen: "Urología",
      tiempoResultados: "1-2 horas",
      preparacionRequerida: "Muestra de primera orina de la mañana preferible",
      metodologia: "Microscopía óptica y tiras reactivas",
      valoresReferencia: "Densidad: 1.015-1.045, pH: 6.0-7.5, Proteínas: Negativo",
      indicaciones: "Infecciones urinarias, enfermedad renal, diabetes",
      precio: 45000,
      disponible: true,
      categoria: "Urología",
      tipoAnimal: "ambos",
      equipoRequerido: "Microscopio óptico, analizador de orina",
      muestra: "Orina fresca estéril",
    },
    {
      id: "LAB004",
      nombre: "Perfil Tiroideo",
      descripcion: "Medición de hormonas tiroideas T3, T4 y TSH para evaluar función tiroidea.",
      tipoExamen: "Endocrinología",
      tiempoResultados: "24-48 horas",
      preparacionRequerida: "No requiere ayuno, evitar estrés antes de la muestra",
      metodologia: "Inmunoensayo quimioluminiscente",
      valoresReferencia: "T4: 1.0-4.0 μg/dL, TSH: 0.05-0.5 ng/mL",
      indicaciones: "Problemas de peso, letargo, cambios de comportamiento",
      precio: 120000,
      disponible: false,
      categoria: "Endocrinología",
      tipoAnimal: "ambos",
      equipoRequerido: "Analizador de inmunoensayos",
      muestra: "Suero sanguíneo",
    },
    {
      id: "LAB005",
      nombre: "Coprológico",
      descripcion: "Análisis de heces para detectar parásitos, sangre oculta y trastornos digestivos.",
      tipoExamen: "Parasitología",
      tiempoResultados: "2-3 horas",
      preparacionRequerida: "Muestra fresca de menos de 2 horas",
      metodologia: "Microscopía directa y técnicas de concentración",
      valoresReferencia: "Ausencia de parásitos, sangre oculta negativa",
      indicaciones: "Diarrea, vómito, pérdida de peso, desparasitación",
      precio: 35000,
      disponible: true,
      categoria: "Parasitología",
      tipoAnimal: "ambos",
      equipoRequerido: "Microscopio óptico, centrífuga",
      muestra: "Heces frescas",
    },
    {
      id: "LAB006",
      nombre: "Cultivo Bacteriano",
      descripcion: "Identificación de bacterias patógenas y prueba de sensibilidad a antibióticos.",
      tipoExamen: "Microbiología",
      tiempoResultados: "48-72 horas",
      preparacionRequerida: "Muestra estéril antes de iniciar antibióticos",
      metodologia: "Cultivo en medios selectivos y antibiograma",
      valoresReferencia: "Identificación de patógenos y sensibilidad antibiótica",
      indicaciones: "Infecciones persistentes, selección de antibiótico",
      precio: 95000,
      disponible: true,
      categoria: "Microbiología",
      tipoAnimal: "ambos",
      equipoRequerido: "Incubadora, medios de cultivo, autoclave",
      muestra: "Según sitio de infección (orina, sangre, herida)",
    },
  ])

  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarDetalle, setMostrarDetalle] = useState(false)
  const [examenDetalle, setExamenDetalle] = useState(null)
  const [examenEditando, setExamenEditando] = useState(null)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [filtroTipo, setFiltroTipo] = useState("todos")
  const [nuevoExamen, setNuevoExamen] = useState({
    id: "",
    nombre: "",
    descripcion: "",
    tipoExamen: "Hematología",
    tiempoResultados: "",
    preparacionRequerida: "",
    metodologia: "",
    valoresReferencia: "",
    indicaciones: "",
    precio: "",
    disponible: true,
    categoria: "Hematología",
    tipoAnimal: "ambos",
    equipoRequerido: "",
    muestra: "",
  })

  const categorias = [
    "Hematología",
    "Bioquímica",
    "Urología",
    "Endocrinología",
    "Parasitología",
    "Microbiología",
    "Inmunología",
  ]

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(precio)
  }

  const examenesFiltrados = examenes.filter((examen) => {
    if (filtroTipo === "todos") return true
    if (filtroTipo === "disponibles") return examen.disponible
    if (filtroTipo === "no-disponibles") return !examen.disponible
    return examen.categoria === filtroTipo
  })

  const abrirModalAgregar = () => {
    setNuevoExamen({
      id: "",
      nombre: "",
      descripcion: "",
      tipoExamen: "Hematología",
      tiempoResultados: "",
      preparacionRequerida: "",
      metodologia: "",
      valoresReferencia: "",
      indicaciones: "",
      precio: "",
      disponible: true,
      categoria: "Hematología",
      tipoAnimal: "ambos",
      equipoRequerido: "",
      muestra: "",
    })
    setModoEdicion(false)
    setMostrarFormulario(true)
  }

  const abrirModalEditar = (examen) => {
    setNuevoExamen({ ...examen, precio: examen.precio.toString() })
    setExamenEditando(examen.id)
    setModoEdicion(true)
    setMostrarFormulario(true)
  }

  const abrirModalDetalle = (examen) => {
    setExamenDetalle(examen)
    setMostrarDetalle(true)
  }

  const guardarExamen = () => {
    if (nuevoExamen.nombre && nuevoExamen.precio > 0) {
      if (modoEdicion) {
        setExamenes(
          examenes.map((e) => (e.id === examenEditando ? { ...nuevoExamen, precio: Number(nuevoExamen.precio) } : e)),
        )
      } else {
        setExamenes([...examenes, { ...nuevoExamen, precio: Number(nuevoExamen.precio) }])
      }
      setMostrarFormulario(false)
    }
  }

  const eliminarExamen = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este examen?")) {
      setExamenes(examenes.filter((e) => e.id !== id))
    }
  }

  const cambiarEstado = (id, e) => {
    e.stopPropagation()
    setExamenes(examenes.map((examen) => (examen.id === id ? { ...examen, disponible: !examen.disponible } : examen)))
  }

  return (
    <ServicesContainer 
      TitleIcon={FlaskConical}
      title={'Servicios de Laboratorio'}
    />
  )
}
