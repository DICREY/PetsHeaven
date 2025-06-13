// Librarys
import { useState, useRef, useEffect, useContext, useCallback } from "react";
import { Activity, Plus, Trash2, Edit, X, Clock, AlertTriangle, FileText, Target, Timer } from "lucide-react"

// Imports
import { NavBarAdmin } from '../../BarrasNavegacion/NavBarAdmi'
import { HeaderUser } from '../../BarrasNavegacion/HeaderUser'
import { HeaderAdmin } from '../../BarrasNavegacion/HeaderAdmin'
import { errorStatusHandler } from '../../Varios/Util'
import { Notification } from '../../Global/Notifys'
import Footer from '../../Varios/Footer2'
import { GetData, PostData, ModifyData } from "../../Varios/Requests"
import { AuthContext } from "../../../Contexts/Contexts"

// Style
import "../../../styles/InterfazAdmin/Servicios/Cirugia.css"
import { data } from "react-router";

export const CirugiasVeterinaria = ({ URL = '' }) => {
  // Dynamic Vars 
  const [notify, setNotify] = useState(null)

  // Vars 
  const didFetch = useRef(false)
  const mainUrl = `${URL}/service`
  const { admin } = useContext(AuthContext)
  const formRef = useRef({
    id: "",
    nombre: "",
    descripcion: "",
    complicaciones: "",
    recomendaciones: "",
    precio: "",
    disponible: true,
    fechaCirugia: "",
    descripcionBreve: "",
    resultadoEsperado: "",
    observaciones: ""
  });

  const [cirugias, setCirugias] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [mostrarDetalle, setMostrarDetalle] = useState(false)
  const [cirugiaDetalle, setCirugiaDetalle] = useState(null)
  const [cirugiaEditando, setCirugiaEditando] = useState(null)
  const [modoEdicion, setModoEdicion] = useState(false)
  const [filtroTipo, setFiltroTipo] = useState("todos")
  
  // Categorías de cirugías
  const categorias = [
    "Ortopedia",
    "Oftalmología",
    "Dermatología",
    "Cardiología",
    "Neurología",
    "Oncología",
    "Traumatología",
    "Odontología",
    "General"
  ];

  // Filtrar cirugías según el filtro seleccionado
  const cirugiasFiltradas = cirugias.filter(cirugia => {
    if (filtroTipo === "todos") return true;
    if (filtroTipo === "disponibles") return cirugia.sta_ser === "DISPONIBLE";
    if (filtroTipo === "no-disponibles") return cirugia.sta_ser === "NO-DISPONIBLE";
    return cirugia.categoria === filtroTipo;
  });

  const fetchCirugias = useCallback(async () => {
    if (didFetch.current) return;
    didFetch.current = true;

    setNotify({
      title: 'Cargando',
      message: 'Cargando cirugias, por favor espere...',
      load: 1
    });

    try {
      let data = await GetData(`${mainUrl}/cirs`);
      setNotify(null);

      if (data && !Array.isArray(data)) {
        data = [data];
      }
      if (data) {
        setCirugias(data);
      }
    } catch (err) {
      setNotify(null);
      if (err.status) {
        const message = errorStatusHandler(err.status);
        setNotify({
          title: 'Error',
          message: `${message}`,
          close: setNotify
        });
      } else {
        console.error(err);
      }
    }
  }, [mainUrl]);

  // Functions    
  useEffect(() => {
    fetchCirugias();
  }, [fetchCirugias]);

  const manejarCambioFormulario = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    formRef.current = {
      ...formRef.current,
      [name]: type === "checkbox" ? checked : value,
    };
  }, []);

  const agregarCirugia = useCallback(async (e) => {
    e.preventDefault();
    try {
      const nueva = {
        cat_ser: 3,
        nom_ser: formRef.current.nombre,
        pre_ser: Number(formRef.current.precio),
        des_ser: formRef.current.descripcion,
        sta_ser: formRef.current.disponible ? "DISPONIBLE" : "NO DISPONIBLE",
        tec_des_ser: formRef.current.recomendaciones,
        fec_cir: formRef.current.fechaCirugia,
        des_cir: formRef.current.descripcionBreve,
        res_cir: formRef.current.resultadoEsperado,
        com_cir: formRef.current.complicaciones,
        obv_cir: formRef.current.observaciones
      };

      await PostData(`${mainUrl}/register`, nueva);
      setMostrarFormulario(false);
      resetForm();
      fetchCirugias();
    } catch (err) {
      setNotify({
        title: 'Error',
        message: 'No se pudo agregar la cirugía',
        close: setNotify
      });
    }
  }, [mainUrl, fetchCirugias]);

  const actualizarCirugia = useCallback(async (e) => {
    e.preventDefault();
    try {
      const actualizada = {
        id_ser: cirugiaEditando.id_ser,
        nom_ser: formRef.current.nombre,
        des_ser: formRef.current.descripcion,
        com_cir: formRef.current.complicaciones,
        tec_des_ser: formRef.current.recomendaciones,
        pre_ser: Number(formRef.current.precio),
        sta_ser: formRef.current.disponible ? "DISPONIBLE" : "NO DISPONIBLE",
        tipo_ser: "Cirugía"
      };

      await ModifyData(`${mainUrl}/modify`, actualizada);
      setMostrarFormulario(false);
      setCirugiaEditando(null);
      resetForm();
      fetchCirugias();
    } catch (err) {
      setNotify({
        title: 'Error',
        message: 'No se pudo actualizar la cirugía',
        close: setNotify
      });
    }
  }, [mainUrl, cirugiaEditando, fetchCirugias]);

  // Resetear formulario
  const resetForm = useCallback(() => {
    formRef.current = {
      id: "",
      nombre: "",
      descripcion: "",
      complicaciones: "",
      recomendaciones: "",
      precio: "",
      disponible: true,
      fechaCirugia: "",
      descripcionBreve: "",
      resultadoEsperado: "",
      observaciones: ""
    };
  }, []);

  // Editar cirugía
  const editarCirugia = useCallback((cirugia) => {
    formRef.current = {
      id: cirugia.id_ser || "",
      nombre: cirugia.nom_ser || "",
      descripcion: cirugia.des_ser || "",
      complicaciones: cirugia.com_cir || "",
      recomendaciones: cirugia.tec_des_ser || "",
      precio: cirugia.pre_ser ? cirugia.pre_ser.toString() : "",
      disponible: cirugia.sta_ser === "DISPONIBLE",
      fechaCirugia: cirugia.fec_cir || "",
      descripcionBreve: cirugia.des_cir || "",
      resultadoEsperado: cirugia.res_cir || "",
      observaciones: cirugia.obv_cir || ""
    };
    setCirugiaEditando(cirugia);
    setModoEdicion(true);
    setMostrarFormulario(true);
  }, []);

  // Eliminar cirugía
  const eliminarCirugia = useCallback(async (id_ser) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta cirugía?")) return;
    try {
      const data = {data:{id_ser:id_ser, or:true}}
      await ModifyData(`${mainUrl}/AblOrDis`, data);
      fetchCirugias();
    } catch (err) {
      setNotify({
        title: 'Error',
        message: 'No se pudo eliminar la cirugía',
        close: setNotify
      });
    }
  }, [mainUrl, fetchCirugias]);

  const cancelarFormulario = useCallback(() => {
    setMostrarFormulario(false);
    setCirugiaEditando(null);
    setModoEdicion(false);
    resetForm();
  }, [resetForm]);

  // Abrir modal para agregar nueva cirugía
  const abrirModalAgregar = useCallback(() => {
    resetForm();
    setModoEdicion(false);
    setMostrarFormulario(true);
  }, [resetForm]);

  // Abrir modal para ver detalles
  const abrirModalDetalle = useCallback((cirugia) => {
    setCirugiaDetalle({
      ...cirugia,
      nombre: cirugia.nom_ser,
      descripcion: cirugia.des_ser,
      precio: cirugia.pre_ser,
      disponible: cirugia.sta_ser === "DISPONIBLE",
      duracion: "45-60 minutos", // Valor de ejemplo
      categoria: "General", // Valor de ejemplo
      preparacion: "Ayuno de 12 horas antes del procedimiento", // Valor de ejemplo
      recomendaciones: cirugia.tec_des_ser,
      complicaciones: cirugia.com_cir
    });
    setMostrarDetalle(true);
  }, []);

  // Abrir modal para editar
  const abrirModalEditar = useCallback((cirugia) => {
    editarCirugia(cirugia);
  }, [editarCirugia]);

  // Formatear precio
  const formatearPrecio = useCallback((precio) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(precio || 0);
  }, []);

  // Cambiar estado de disponibilidad
  const cambiarEstado = useCallback(async (id, e) => {
    e.stopPropagation();
    try {
      const cirugia = cirugias.find(c => c.id_ser === id);
      const nuevoEstado = cirugia.sta_ser === "DISPONIBLE" ? "NO DISPONIBLE" : "DISPONIBLE";
      
      await ModifyData(`${mainUrl}/modify`, {
        id_ser: id,
        sta_ser: nuevoEstado
      });
      
      fetchCirugias();
    } catch (err) {
      setNotify({
        title: 'Error',
        message: 'No se pudo cambiar el estado de la cirugía',
        close: setNotify
      });
    }
  }, [mainUrl, cirugias, fetchCirugias]);

  return (
    <div className="contenedor-cirugia">
      <div className="contenedorprincipal-cirugia">
        {/* Encabezado */}
        <header className="encabezado-cirugia">
          <div className="tituloadminhome">
            <Activity className="iconoadminhome" />
            <h1 className="textoadminhome">Servicios de Cirugía</h1>
          </div>
          <p className="descripcion-cirugia">Gestión completa de procedimientos quirúrgicos veterinarios</p>
        </header>

        {/* Controles */}
        <div className="header-cirugia">
          <h2 className="subtitulo-cirugia">Cirugías Disponibles</h2>
          <div className="controles-cirugia">
            <div className="filtro-contenedor-cirugia">
              <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} className="filtro-cirugia">
                <option value="todos">Todas las cirugías</option>
                <option value="disponibles">Disponibles</option>
                <option value="no-disponibles">No disponibles</option>
                <optgroup label="Por especialidad">
                  {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                      {categoria}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
            <button onClick={abrirModalAgregar} className="boton-agregar-cirugia">
              <Plus size={16} />
              Agregar Cirugía
            </button>
          </div>
        </div>

        {/* Grid de cirugías */}
        <div className="grid-cirugia">
          {cirugiasFiltradas.map((cirugia) => (
            <div key={cirugia.id_ser} className="tarjeta-cirugia" onClick={() => abrirModalDetalle(cirugia)}>
              <div className="header-tarjeta-cirugia">
                <div className="icono-cirugia">
                  <Activity size={20} />
                </div>
                <div className="info-cirugia">
                  <h3 className="nombre-cirugia">{cirugia.nom_ser}</h3>
                  <span
                    className={`estado-cirugia ${cirugia.sta_ser === "DISPONIBLE" ? "disponible-cirugia" : "no-disponible-cirugia"}`}
                    onClick={(e) => cambiarEstado(cirugia.id_ser, e)}
                  >
                    {cirugia.sta_ser === "DISPONIBLE" ? "Disponible" : "No disponible"}
                  </span>
                </div>
                <div className="acciones-cirugia">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      abrirModalEditar(cirugia)
                    }}
                    className="boton-editar-cirugia"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      eliminarCirugia(cirugia.id_ser)
                    }}
                    className="boton-eliminar-cirugia"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p className="descripcion-tarjeta-cirugia">{cirugia.des_ser}</p>

              <div className="detalles-cirugia">
                <div className="detalle-cirugia">
                  <strong>
                    <Clock size={14} className="icono-detalle-cirugia" />
                    Duración:
                  </strong>
                  <p>45-60 minutos</p>
                </div>
                <div className="detalle-cirugia">
                  <strong>
                    <Timer size={14} className="icono-detalle-cirugia" />
                    Recuperación:
                  </strong>
                  <p>7-10 días</p>
                </div>
              </div>

              <div className="footer-tarjeta-cirugia">
                <span className="precio-cirugia">{formatearPrecio(cirugia.pre_ser)}</span>
                <span className="id-cirugia">{cirugia.id_ser}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Agregar/Editar */}
        {mostrarFormulario && (
          <div className="overlay-cirugia">
            <div className="formulario-cirugia">
              <div className="header-modal-cirugia">
                <h3 className="titulo-formulario-cirugia">
                  {modoEdicion ? "Editar Cirugía" : "Agregar Nueva Cirugía"}
                </h3>
                <button onClick={cancelarFormulario} className="boton-cerrar-cirugia">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={modoEdicion ? actualizarCirugia : agregarCirugia}>
                <div className="campo-cirugia">
                  <label>Nombre de la Cirugía</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formRef.current.nombre}
                    onChange={manejarCambioFormulario}
                    placeholder="Ej: Esterilización"
                    required
                  />
                </div>

                <div className="campo-cirugia">
                  <label>Descripción</label>
                  <textarea
                    name="descripcion"
                    value={formRef.current.descripcion}
                    onChange={manejarCambioFormulario}
                    placeholder="Descripción del procedimiento quirúrgico"
                    required
                  />
                </div>

                <div className="campo-cirugia">
                  <label>Precio (COP)</label>
                  <input
                    type="number"
                    name="precio"
                    value={formRef.current.precio}
                    onChange={manejarCambioFormulario}
                    placeholder="Ej: 150000"
                    required
                  />
                </div>

                <div className="campo-cirugia">
                  <label>Fecha de Cirugía</label>
                  <input
                    type="date"
                    name="fechaCirugia"
                    value={formRef.current.fechaCirugia}
                    onChange={manejarCambioFormulario}
                  />
                </div>

                <div className="campo-cirugia">
                  <label>Descripción Breve</label>
                  <textarea
                    name="descripcionBreve"
                    value={formRef.current.descripcionBreve}
                    onChange={manejarCambioFormulario}
                    placeholder="Descripción breve del procedimiento"
                  />
                </div>

                <div className="campo-cirugia">
                  <label>Resultado Esperado</label>
                  <textarea
                    name="resultadoEsperado"
                    value={formRef.current.resultadoEsperado}
                    onChange={manejarCambioFormulario}
                    placeholder="Resultado esperado de la cirugía"
                  />
                </div>

                <div className="campo-cirugia">
                  <label>Complicaciones Posibles</label>
                  <textarea
                    name="complicaciones"
                    value={formRef.current.complicaciones}
                    onChange={manejarCambioFormulario}
                    placeholder="Posibles complicaciones del procedimiento"
                  />
                </div>

                <div className="campo-cirugia">
                  <label>Recomendaciones Post-operatorias</label>
                  <textarea
                    name="recomendaciones"
                    value={formRef.current.recomendaciones}
                    onChange={manejarCambioFormulario}
                    placeholder="Cuidados después de la cirugía"
                  />
                </div>

                <div className="campo-cirugia">
                  <label>Observaciones</label>
                  <textarea
                    name="observaciones"
                    value={formRef.current.observaciones}
                    onChange={manejarCambioFormulario}
                    placeholder="Observaciones adicionales"
                  />
                </div>

                <div className="campo-checkbox-cirugia">
                  <label>
                    <input
                      type="checkbox"
                      name="disponible"
                      checked={formRef.current.disponible}
                      onChange={manejarCambioFormulario}
                    />
                    Disponible
                  </label>
                </div>

                <div className="botones-formulario-cirugia">
                  <button type="submit" className="boton-guardar-cirugia">
                    {modoEdicion ? "Actualizar" : "Agregar"}
                  </button>
                  <button type="button" onClick={cancelarFormulario} className="boton-cancelar-cirugia">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal Detalle */}
        {mostrarDetalle && cirugiaDetalle && (
          <div className="overlay-cirugia">
            <div className="modal-detalle-cirugia">
              <div className="header-modal-cirugia">
                <h3 className="titulo-modal-cirugia">{cirugiaDetalle.nombre}</h3>
                <button onClick={() => setMostrarDetalle(false)} className="boton-cerrar-cirugia">
                  <X size={20} />
                </button>
              </div>

              {/* Métricas principales */}
              <div className="metricas-cirugia">
                <div className="metrica-item-cirugia">
                  <div className="metrica-valor-cirugia">{formatearPrecio(cirugiaDetalle.precio)}</div>
                  <div className="metrica-label-cirugia">Precio</div>
                </div>
                <div className="metrica-item-cirugia">
                  <div className="metrica-valor-cirugia">{cirugiaDetalle.duracion}</div>
                  <div className="metrica-label-cirugia">Duración</div>
                </div>
                <div className="metrica-item-cirugia">
                  <div className="metrica-valor-cirugia">{cirugiaDetalle.categoria}</div>
                  <div className="metrica-label-cirugia">Categoría</div>
                </div>
                <div className="metrica-item-cirugia">
                  <div className={`metrica-valor-cirugia ${cirugiaDetalle.disponible ? "" : "no-disponible-cirugia"}`}>
                    {cirugiaDetalle.disponible ? "SÍ" : "NO"}
                  </div>
                  <div className="metrica-label-cirugia">Disponible</div>
                </div>
              </div>

              {/* Secciones de información */}
              <div className="secciones-detalle-cirugia">
                <div className="seccion-detalle-cirugia">
                  <h4 className="titulo-seccion-cirugia">
                    <FileText size={20} />
                    Descripción
                  </h4>
                  <p className="contenido-seccion-cirugia">{cirugiaDetalle.descripcion}</p>
                </div>

                <div className="seccion-detalle-cirugia">
                  <h4 className="titulo-seccion-cirugia">
                    <Target size={20} />
                    Preparación
                  </h4>
                  <p className="contenido-seccion-cirugia">{cirugiaDetalle.preparacion}</p>
                </div>

                <div className="seccion-detalle-cirugia">
                  <h4 className="titulo-seccion-cirugia">
                    <AlertTriangle size={20} />
                    Complicaciones
                  </h4>
                  <p className="contenido-seccion-cirugia">{cirugiaDetalle.complicaciones}</p>
                </div>

                <div className="seccion-detalle-cirugia">
                  <h4 className="titulo-seccion-cirugia">
                    <Clock size={20} />
                    Recomendaciones
                  </h4>
                  <p className="contenido-seccion-cirugia">{cirugiaDetalle.recomendaciones}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {notify && <Notification {...notify} />}
    </div>
  )
}