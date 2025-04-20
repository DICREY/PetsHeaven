import React from "react"
import { Search, ChevronUp, Plus, FileText, User, PawPrint } from "lucide-react"
import {NavBarAdmin} from '../BarrasNavegacion/NavBarAdmi';
import '../../../public/styles/InterfazAdmin/HomeAdmin.css'

// dartos ejemplo uwu 
const propietariosEjemplo = [
  {
    id: 1,
    nombre: "Ana García",
    identificador: "1234567890",
    telefono: "555-123-4567",
    fechaCreacion: "15/04/2023",
    mascotas: [
      {
        id: 101,
        nombre: "Luna",
        tipo: "Hembra",
      },
      {
        id: 102,
        nombre: "Max",
        tipo: "Macho",
      },
    ],
    ultimaCita: {
      fecha: "10/04/2023",
      hora: "09:30am",
      tipo: "Consulta",
    },
  },
  {
    id: 2,
    nombre: "Carlos Rodríguez",
    identificador: "0987654321",
    telefono: "555-987-6543",
    fechaCreacion: "20/03/2023",
    mascotas: [
      {
        id: 103,
        nombre: "Rocky",
        tipo: "Macho",
      },
    ],
    ultimaCita: {
      fecha: "05/04/2023",
      hora: "11:00am",
      tipo: "Vacunación",
    },
  },
  {
    id: 3,
    nombre: "María López",
    identificador: "5678901234",
    telefono: "555-567-8901",
    fechaCreacion: "10/02/2023",
    mascotas: [
      {
        id: 104,
        nombre: "Bella",
        tipo: "Hembra",
      },
      {
        id: 105,
        nombre: "Toby",
        tipo: "Macho",
      },
      {
        id: 106,
        nombre: "Nina",
        tipo: "Hembra",
      },
    ],
    ultimaCita: {
      fecha: "12/04/2023",
      hora: "16:15pm",
      tipo: "Control",
    },
  },
]

export function HomeAdmin() {
  return (
    <main className="contenedoradminhome">
      <NavBarAdmin/>

      <div className="principaladminhome">
        <div className="tarjetaadminhome">
          <div className="contenidoadminhome">
            <div className="encabezadoadminhome">
              <div className="tituloadminhome">
                <FileText className="iconoadminhome" />
                <h1 className="textoadminhome">Lista de propietarios y mascotas</h1>
                <div className="decoracionadminhome">
                  <PawPrint className="huellaadminhome" />
                </div>
              </div>

              <button className="botonadminhome">
                <Plus size={16} className="iconoplusadminhome" />
                Registrar propietario
              </button>
            </div>

            <div className="busquedaadminhome">
              <div className="seccionadminhome">
                <label className="etiquetaadminhome">Propietario</label>
                <div className="inputcontenedoradminhome">
                  <User className="inputiconoadminhome" />
                  <input
                    className="campoadminhome"
                    placeholder="Buscar por identificación, teléfono o nombre del propietario"
                    type="text"
                  />
                </div>
              </div>

              <div className="seccionadminhome">
                <label className="etiquetaadminhome">Mascota</label>
                <div className="inputcontenedoradminhome">
                  <PawPrint className="inputiconoadminhome" />
                  <input
                    className="campoadminhome"
                    placeholder="Buscar por nombre o identificador de la mascota"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="centradoadminhome">
              <button className="botonbuscaradminhome">
                <Search size={16} className="iconobuscaradminhome" />
                Buscar
              </button>
            </div>

            <div className="tablacontenedoradminhome">
              <table className="tablaadminhome">
                <thead>
                  <tr className="encabezadotablaadminhome">
                    <th className="celdaencabezadoadminhome">Nombre</th>
                    <th className="celdaencabezadoadminhome">Identificador</th>
                    <th className="celdaencabezadoadminhome">Teléfono</th>
                    <th className="celdaencabezadoadminhome">
                      <div className="mascotasencabezadoadminhome">Mascotas</div>
                    </th>
                    <th className="celdaencabezadoadminhome">
                      <div className="gestionencabezadoadminhome">
                        Última gestión
                        <ChevronUp size={14} className="iconoordenadminhome" />
                      </div>
                    </th>
                    <th className="celdaencabezadoadminhome">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {propietariosEjemplo.map((propietario) => (
                    <tr key={propietario.id} className="filaadminhome">
                      <td className="celdaadminhome" data-label="Nombre">
                        <div className="infoadminhome">
                          <span className="nombreadminhome">{propietario.nombre}</span>
                          <span className="fechaadminhome">Creado el {propietario.fechaCreacion}</span>
                        </div>
                      </td>
                      <td className="celdaadminhome" data-label="Identificador">
                        {propietario.identificador}
                      </td>
                      <td className="celdaadminhome" data-label="Teléfono">
                        {propietario.telefono}
                      </td>
                      <td className="celdaadminhome" data-label="Mascotas">
                        {propietario.mascotas && propietario.mascotas.length > 0 ? (
                          <div className="mascotasadminhome">
                            {propietario.mascotas.map((mascota) => (
                              <div key={mascota.id} className="mascotaitemadminhome">
                                <span>
                                  {mascota.nombre} - {mascota.tipo}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </td>
                      <td className="celdaadminhome" data-label="Última gestión">
                        {propietario.ultimaCita ? (
                          <div className="citaadminhome">
                            <div className="fechacitaadminhome">
                              <div className="puntoadminhome"></div>
                              {propietario.ultimaCita.fecha} - {propietario.ultimaCita.hora}
                            </div>
                            <div className="tipocitaadminhome">
                              {propietario.nombre} - {propietario.ultimaCita.tipo}
                            </div>
                          </div>
                        ) : null}
                      </td>
                      <td className="celdaadminhome" data-label="Acciones">
                        <button className="accionadminhome">
                          <FileText size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="paginacionadminhome">
              <div className="resultadosadminhome">
                <span className="contadoradminhome">10</span>
                <ChevronUp size={14} className="flechaadminhome" />
                <span className="textocontadoradminhome">
                  Visualizando 1 - {propietariosEjemplo.length} de {propietariosEjemplo.length} resultados
                </span>
              </div>
              <div className="huellasadminhome">
                <PawPrint className="huella1adminhome" />
                <PawPrint className="huella2adminhome" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
