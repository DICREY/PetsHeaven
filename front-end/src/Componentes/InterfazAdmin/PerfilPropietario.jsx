import React, { useState } from "react";
import { User, PawPrint, ArrowLeft, Trash2, Edit } from "lucide-react";
import "../../../public/styles/InterfazAdmin/PerfilPropietario.css";
import {NavBarAdmin} from '../BarrasNavegacion/NavBarAdmi'; // Asegúrate que la ruta sea correcta

// Datos de ejemplo
const propietarioData = {
  foto: "/placeholder.svg?height=200&width=200",
  tipoDocumento: "Cédula de Ciudadanía",
  numeroDocumento: "45645645",
  nombres: "Critian",
  apellidos: "Gómez Pérez",
  fechaNacimiento: "1985-06-15",
  genero: "Masculino",
  celular: "+573012270041, 55554545, 5656565",
  direccion: "dfgdfgdfgdf, Soacha",
  correo: "critian@ejemplo.com",
  contacto: "Pipip",
};

const mascotasData = [
  { id: 1, nombre: "Firulais", especie: "Canino", raza: "Golden", genero: "Macho", reproductivo: "No esterilizado" },
  { id: 2, nombre: "Michi", especie: "Felino", raza: "Siamés", genero: "Hembra", reproductivo: "Esterilizada" },
  { id: 3, nombre: "Rocky", especie: "Canino", raza: "Criollo(a)", genero: "Macho", reproductivo: "No esterilizado" },
];




export const PerfilPropietario = () => {
  const [pestanaActiva, setPestanaActiva] = useState("propietario");

  const verHistorial = (id) => {
    alert(`Mostrando historial de la mascota con ID: ${id}`);
  };

  const editarPropietario = () => {
    alert("Editando propietario");
  };

  const eliminarPropietario = () => {
    alert("Eliminando propietario");
  };

  return (
    <div className="app-container">
      <NavBarAdmin />
      <main className="containerpropsmain">
        <div className="contenedorProps">
          <div className="cabeceraProps">
            <h1 className="tituloProps">
              Configuración de usuario <span className="subtituloProps">Creación</span>
            </h1>
            <div className="botonesAccionProps">
              <button className="botonAtrasProps">
                <ArrowLeft size={18} />
                <span>Atrás</span>
              </button>
              <button className="botonEliminarProps" onClick={eliminarPropietario}>
                <Trash2 size={18} />
                <span>Eliminar</span>
              </button>
              <button className="botonEditarProps" onClick={editarPropietario}>
                <Edit size={18} />
                <span>Editar</span>
              </button>
            </div>
          </div>

          <div className="pestanasProps">
            <button
              className={`pestanaProps ${pestanaActiva === "propietario" ? "activaProps" : ""}`}
              onClick={() => setPestanaActiva("propietario")}
            >
              <User size={18} />
              <span>Propietario</span>
            </button>
            <button
              className={`pestanaProps ${pestanaActiva === "mascotas" ? "activaProps" : ""}`}
              onClick={() => setPestanaActiva("mascotas")}
            >
              <PawPrint size={18} />
              <span>Mascotas</span>
            </button>
          </div>

          <div className="contenidoProps">
            {pestanaActiva === "propietario" && (
              <div className="propietarioSeccionProps">
                <h2 className="seccionTituloProps">Información personal:</h2>

                <div className="propietarioInfoProps">
                  <div className="propietarioFilaFotoProps">
                    <div className="propietarioColumnaFotoProps">
                      <div className="propietarioFotoProps">
                        <User size={100} />
                      </div>
                    </div>
                    <div className="propietarioColumnaDatosBasicosProps">
                      <div className="propietarioCampoProps">
                        <div className="propietarioEtiquetaProps">Tipo de Documento</div>
                        <div className="propietarioValorProps">{propietarioData.tipoDocumento}</div>
                      </div>
                      <div className="propietarioCampoProps">
                        <div className="propietarioEtiquetaProps">Número de Documento</div>
                        <div className="propietarioValorProps">{propietarioData.numeroDocumento}</div>
                      </div>
                      <div className="propietarioCampoProps">
                        <div className="propietarioEtiquetaProps">Nombres</div>
                        <div className="propietarioValorProps">{propietarioData.nombres}</div>
                      </div>
                      <div className="propietarioCampoProps">
                        <div className="propietarioEtiquetaProps">Apellidos</div>
                        <div className="propietarioValorProps">{propietarioData.apellidos}</div>
                      </div>
                    </div>
                  </div>

                  <div className="propietarioFilaDetallesProps">
                    <div className="propietarioColumnaProps">
                      <div className="propietarioCampoProps">
                        <div className="propietarioEtiquetaProps">Fecha de Nacimiento</div>
                        <div className="propietarioValorProps">{propietarioData.fechaNacimiento}</div>
                      </div>
                      <div className="propietarioCampoProps">
                        <div className="propietarioEtiquetaProps">Género</div>
                        <div className="propietarioValorProps">{propietarioData.genero}</div>
                      </div>
                      <div className="propietarioCampoProps">
                        <div className="propietarioEtiquetaProps">Contacto</div>
                        <div className="propietarioValorProps">{propietarioData.contacto}</div>
                      </div>
                    </div>
                    <div className="propietarioColumnaProps">
                      <div className="propietarioCampoProps">
                        <div className="propietarioEtiquetaProps">Teléfonos</div>
                        <div className="propietarioValorProps">{propietarioData.celular}</div>
                      </div>
                      <div className="propietarioCampoProps">
                        <div className="propietarioEtiquetaProps">Dirección</div>
                        <div className="propietarioValorProps">{propietarioData.direccion}</div>
                      </div>
                      <div className="propietarioCampoProps">
                        <div className="propietarioEtiquetaProps">Correo</div>
                        <div className="propietarioValorProps">{propietarioData.correo}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {pestanaActiva === "mascotas" && (
              <div className="mascotasContenedorProps">
                <div className="tablaContenedorProps">
                  <table className="tablaProps">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>Especie</th>
                        <th>Raza</th>
                        <th>Género</th>
                        <th>Reproductivo</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mascotasData.map((mascota) => (
                        <tr key={mascota.id} className="filaTablaProps">
                          <td>{mascota.nombre}</td>
                          <td>{mascota.especie}</td>
                          <td>{mascota.raza}</td>
                          <td>{mascota.genero}</td>
                          <td>{mascota.reproductivo}</td>
                          <td>
                            <button 
                              className="botonHistorialProps" 
                              onClick={() => verHistorial(mascota.id)}
                            >
                              Ver historial
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {mascotasData.length === 0 && (
                  <div className="sinResultadosProps">No hay mascotas vinculadas</div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};
