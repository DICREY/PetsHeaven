// Librarys 
import React, { useState, useEffect } from "react"
import { Search, ChevronUp, Plus, FileText, User, PawPrint } from "lucide-react"
import swal from 'sweetalert'

// Imports 
import {NavBarAdmin} from '../BarrasNavegacion/NavBarAdmi';
import { GetData } from '../Varios/Requests'
import { errorStatusHandler, formatDate, divideList } from '../Varios/Util'

// Import styles 
import '../../../public/styles/InterfazAdmin/HomeAdmin.css'

// Main component
export function HomeAdmin({ URL = "" }) {
  // Vars 
  const mainUrl = `${URL}/owner`
  const [datas,setDatas] = useState([])
  const [page,setPage] = useState(1)

  const GetDataOwners = async () => {
    const token = localStorage.getItem("token")
    try {
      if (token){
        const data = await GetData(`${mainUrl}/all`,token)
        if (data) formatDatas(data)
      }
    } catch (err) {
      if(err.status) {
        const message = errorStatusHandler(err.status)
        swal({
          icon: "error",
          title: "Error",
          text: message
        })
      } else if (err.message){
        swal({
          icon: "error",
          title: "Error",
          text: err.message
        })
      } else console.log(err)
    }
  }

  const formatDatas = (data) => {
    const formattedData = data.map((item) => {
      // Check if mascotas exists and is a string
      if (!item.mascotas || typeof item.mascotas !== 'string') {
        return { ...item, mascotas: [] }
      }
  
      // Process pet data with error handling
      const petList = item.mascotas.split(';').filter(Boolean)
        .map(petString => {
          const petData = petString.split(',')
          return {
            nom_mas: petData[0] || '',
            esp_mas: petData[1] || '',
            col_mas: petData[2] || '',
            raz_mas: petData[3] || '',
            ali_mas: petData[4] || '',
            fec_nac_mas: petData[5] || '',
            pes_mas: petData[6] || '',
            gen_mas: petData[7] || '',
            est_rep_mas: petData[8] || '',
            fot_mas: petData[9] || '',
            fec_cre_mas: petData[11] || ''
          }
        })
  
      return { ...item, mascotas: petList }
    })
  
    setDatas(formattedData)
  }

  // Ejecutar el fetch para traer datos
  useEffect(() => {
    // Vars 
    const REFRESH_INTERVAL = 2 * 60 * 1000 // 2 minutos
    let intervalId

    // Execute the request
    GetDataOwners()
    setDatas(divideList(datas,4))

    // Configure interval
    intervalId = setInterval(() => {
      GetDataOwners()
      setDatas(divideList(datas,4))
    }, REFRESH_INTERVAL)

    // Clean
    return () => clearInterval(intervalId)
  }, [])

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

              <button className="botonadminhome" onClick={() =>  window.location.href = "/propietario/registro"} >
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
                    <th className="celdaencabezadoadminhome">Celular</th>
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
                  {datas.map((propietario) => (
                    <tr key={propietario.doc_usu} className="filaadminhome">
                      <td className="celdaadminhome" data-label="Nombre">
                        <div className="infoadminhome">
                          <span className="nombreadminhome">{propietario.nom_usu}</span>
                          <span className="fechaadminhome">Creado el {formatDate(propietario.fec_cre_usu)}</span>
                        </div>
                      </td>
                      <td className="celdaadminhome" data-label="Identificador">
                        {propietario.doc_usu}
                      </td>
                      <td className="celdaadminhome" data-label="Teléfono">
                        {propietario.cel_usu}
                      </td>
                      <td className="celdaadminhome" data-label="Mascotas">
                        {propietario.mascotas && propietario.mascotas.length > 0 ? (
                          <div className="mascotasadminhome">
                            {propietario.mascotas.map((mascota, index) => (
                              <div key={index} className="mascotaitemadminhome">
                                <span>
                                  {mascota.nom_mas} - {mascota.esp_mas}
                                </span>
                              </div>
                            ))}
                          </div>
                        ) : "-- Empty --"}
                      </td>
                      <td className="celdaadminhome" data-label="Última gestión">
                        {propietario.ultimaCita ? (
                          <div className="citaadminhome">
                            <div className="fechacitaadminhome">
                              <div className="puntoadminhome"></div>
                              {propietario.ultimaCita.fecha} - {propietario.ultimaCita.hora}
                            </div>
                            <div className="tipocitaadminhome">
                              {propietario.nom_usu} - {propietario.ultimaCita.tipo}
                            </div>
                          </div>
                        ) : "-- Empty --"}
                      </td>
                      <td className="celdaadminhome" data-label="Acciones">
                        <button className="accionadminhome" onClick={() => window.location.href = "/propietario/datos"}>
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
                  Visualizando {page} - {datas.length || 1} de {datas.length} resultados
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
