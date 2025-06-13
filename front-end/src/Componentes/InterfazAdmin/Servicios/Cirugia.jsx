// Librarys
import { useState, useRef, useEffect, useContext, useCallback } from "react";
import { Trash2, PenSquare, Plus, Filter, AlertCircle, FileText, Activity } from "lucide-react"

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

  const [cirugias, setCirugias] = useState([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [cirugiaEditando, setCirugiaEditando] = useState(null)
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
  const nuevaCirugia = useRef({
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
    resetForm();
  }, [resetForm]);


  return (
    <main className="maincontenedor-cirugia">
      <NavBarAdmin />
      <div className="principaladminhome">
        <div className="contenedor-cirugia">
          {admin ? (<HeaderAdmin />) : (<HeaderUser />)}
          <div className="contenedorprincipal-cirugia">
            <header className="encabezado-cirugia">
              <div className="tituloadminhome">
                <Activity className="iconoadminhome" aria-hidden='true' />
                <h1 className="textoadminhome">Servicios de Cirugía</h1>
              </div>
            </header>

            <section className="seccion-cirugia">
              <header className="header-cirugia">
                <h2 className="subtitulo-cirugia">Cirugías Disponibles</h2>
                <nav className="controles-cirugia">
                  <div className="filtro-contenedor-cirugia">
                    <Filter size={16} className="icono-filtro-cirugia" aria-hidden="true" />
                    <select className="filtro-cirugia" aria-label="Filtrar cirugías">
                      <option>Todas las cirugías</option>
                      <option>Disponibles</option>
                      <option>No disponibles</option>
                    </select>
                  </div>
                  <button className="boton-agregar-cirugia" onClick={() => setMostrarFormulario(true)}>
                    <Plus size={18} aria-hidden="true" /> <span>Agregar Cirugía</span>
                  </button>
                </nav>
              </header>

              {mostrarFormulario && (
                <aside className="overlay-cirugia" role="dialog" aria-modal="true" aria-labelledby="form-title">
                  <section className="formulario-cirugia">
                    <h3 id="form-title" className="titulo-formulario-cirugia">
                      {cirugiaEditando ? "Editar Cirugía" : "Agregar Nueva Cirugía"}
                    </h3>
                    <form onSubmit={agregarCirugia}>
                      <fieldset>
                        <legend className="sr-only">Información de la cirugía</legend>
                        <div className="campo-cirugia">
                          <label htmlFor="id-cirugia">ID Cirugía:</label>
                          <input
                            type="text"
                            id="id-cirugia"
                            name="id"
                            value={nuevaCirugia.id}
                            onChange={manejarCambioFormulario}
                            required
                            disabled={cirugiaEditando}
                          />
                        </div>
                        <div className="campo-cirugia">
                          <label htmlFor="nombre-cirugia">Nombre de la Cirugía:</label>
                          <input
                            type="text"
                            id="nombre-cirugia"
                            name="nombre"
                            defaultValue={cirugiaEditando ? formRef.current.nombre : ""}
                            onChange={manejarCambioFormulario}
                            required
                          />
                        </div>
                        <div className="campo-cirugia">
                          <label htmlFor="descripcion-cirugia">Descripción de la Cirugía:</label>
                          <textarea
                            id="descripcion-cirugia"
                            name="descripcion"
                            defaultValue={cirugiaEditando ? formRef.current.descripcion : ""}
                            onChange={manejarCambioFormulario}
                            required
                          />
                        </div>
                        <div className="campo-cirugia">
                          <label htmlFor="complicaciones-cirugia">Complicaciones:</label>
                          <textarea
                            id="complicaciones-cirugia"
                            name="complicaciones"
                            defaultValue={cirugiaEditando ? formRef.current.complicaciones : ""}
                            onChange={manejarCambioFormulario}
                            required
                          />
                        </div>
                        <div className="campo-cirugia">
                          <label htmlFor="recomendaciones-cirugia">Recomendaciones Técnicas:</label>
                          <textarea
                            id="recomendaciones-cirugia"
                            name="recomendaciones"
                            defaultValue={cirugiaEditando ? formRef.current.recomendaciones : ""}
                            onChange={manejarCambioFormulario}
                            required
                          />
                        </div>
                        <div className="campo-cirugia">
                          <label htmlFor="precio-cirugia">Precio:</label>
                          <input
                            type="number"
                            id="precio-cirugia"
                            name="precio"
                            defaultValue={cirugiaEditando ? formRef.current.precio : ""}
                            onChange={manejarCambioFormulario}
                            required
                          />
                        </div>
                        <div className="campo-cirugia">
                          <label htmlFor="descripcion-breve-cirugia">Descripción Breve:</label>
                          <input
                            type="text"
                            id="descripcion-breve-cirugia"
                            name="descripcionBreve"
                            defaultValue={cirugiaEditando ? formRef.current.descripcionBreve : ""}
                            onChange={manejarCambioFormulario}
                            required
                          />
                        </div>
                        <div className="campo-cirugia">
                          <label htmlFor="resultado-esperado-cirugia">Resultado Esperado:</label>
                          <input
                            type="text"
                            id="resultado-esperado-cirugia"
                            name="resultadoEsperado"
                            defaultValue={cirugiaEditando ? formRef.current.resultadoEsperado : ""}
                            onChange={manejarCambioFormulario}
                            required
                          />
                        </div>
                        <div className="campo-cirugia">
                          <label htmlFor="observaciones-cirugia">Observaciones:</label>
                          <textarea
                            id="observaciones-cirugia"
                            name="observaciones"
                            defaultValue={cirugiaEditando ? formRef.current.observaciones : ""}
                            onChange={manejarCambioFormulario}
                          />
                        </div>
                        <div className="campo-checkbox-cirugia">
                          <label htmlFor="disponible-cirugia">
                            <input
                              type="checkbox"
                              id="disponible-cirugia"
                              name="disponible"
                              defaultChecked={cirugiaEditando ? formRef.current.disponible : true}
                              onChange={manejarCambioFormulario}
                            />
                            Disponible
                          </label>
                        </div>
                      </fieldset>
                      <div className="botones-formulario-cirugia">
                        <button type="submit" className="boton-guardar-cirugia">
                          {cirugiaEditando ? "Actualizar" : "Agregar"}
                        </button>
                        <button type="button" className="boton-cancelar-cirugia" onClick={cancelarFormulario}>
                          Cancelar
                        </button>
                      </div>
                    </form>
                  </section>
                </aside>
              )}

              <ul className="grid-cirugia" aria-label="Lista de cirugías disponibles">
                {cirugias.map((cirugia, idx) => (
                  <li key={cirugia.id_ser || cirugia.nom_ser || idx}>
                    <article className="tarjeta-cirugia">
                      <header className="header-tarjeta-cirugia">
                        <div className="info-cirugia">
                          <h3 className="nombre-cirugia">{cirugia.nom_ser}</h3>
                          <span
                            className={`estado-cirugia ${cirugia.sta_ser === "DISPONIBLE" ? "disponible-cirugia" : "no-disponible-cirugia"}`}
                          >
                            {cirugia.sta_ser === "DISPONIBLE" ? "Disponible" : "No disponible"}
                          </span>
                        </div>
                        <div className="acciones-cirugia">
                          <button
                            className="boton-eliminar-cirugia"
                            onClick={() => eliminarCirugia(cirugia.id_ser || cirugia.nom_ser)}
                            aria-label={`Eliminar cirugía ${cirugia.nom_ser}`}
                          >
                            <Trash2 size={18} aria-hidden="true" />
                          </button>
                          <button
                            className="boton-editar-cirugia"
                            onClick={() => editarCirugia(cirugia)}
                            aria-label={`Editar cirugía ${cirugia.nom_ser}`}
                          >
                            <PenSquare size={18} aria-hidden="true" />
                          </button>
                        </div>
                      </header>

                      <p className="descripcion-tarjeta-cirugia">{cirugia.des_ser}</p>

                      <section className="detalles-cirugia">
                        <div className="detalle-cirugia">
                          <strong>
                            <AlertCircle size={14} className="icono-detalle-cirugia" aria-hidden="true" /> Complicaciones:
                          </strong>
                          <p>{cirugia.com_cir || "No especificadas"}</p>
                        </div>
                        <div className="detalle-cirugia">
                          <strong>
                            <FileText size={14} className="icono-detalle-cirugia" aria-hidden="true" /> Recomendaciones:
                          </strong>
                          <p>{cirugia.tec_des_ser}</p>
                        </div>
                      </section>

                      <footer className="footer-tarjeta-cirugia">
                        <span className="precio-cirugia">Precio: ${Number(cirugia.pre_ser).toLocaleString()}</span>
                        <span className="id-cirugia">{cirugia.id_ser || cirugia.nom_ser}</span>
                      </footer>
                    </article>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}

