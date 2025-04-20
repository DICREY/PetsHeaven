// Librarys 
import React, {useEffect, useState} from "react"
import { Dog, Eye, Plus } from "lucide-react"
 
// Imports 
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { Loader } from '../Errores/Loader'
import { SubNotFound } from '../Errores/NotFound'
import { GetData } from '../Varios/Requests'
import { getRoles } from '../Varios/Util'
import { EditPetButton } from '../Pets/EditPet'
import { PetDetails } from '../Pets/PetDetails'
import { FormularioRegMascota } from '../Formularios/FormularioMascotas'
import { GlobalTable } from '../InterfazAdmin/GlobalTable'

// Import Styles 
import "../../../public/styles/InterfazAdmin/GesMascota.css"

// Main component 
export function GesMascota({ URL = "" }) {
  // Declare Vars
  const mainURL = `${URL}/pet`
  const [petsData, setPetsData] = useState([])
  const [petsAlmac,setPetsAlmac] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedPet, setSelectedPet] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editMode,setEditMode] = useState(false)
  const [register,setRegister] = useState(false)
  const [isAdmin,setIsAdmin] = useState(false)
  const [headers,setHeaders] = useState([])
  const [clickCount, setClickCount] = useState(0)

  // Functions
  // fetch para traer datos
  const fetchData = async () => {
    const token = localStorage.getItem("token")
      try {
        if(token) {
          const pets = await GetData(`${mainURL}/all`,token)
          const roles = getRoles(token)

          const admin = roles.some(role => role.toLowerCase() === "administrador")
          admin?setIsAdmin(true):setIsAdmin(false)

          setLoading(false)
          setPetsData(pets)
          setPetsAlmac(pets)
          setHeaders({
            Nombre: 'nom_mas',
            Especie: 'esp_mas',
            Raza: 'raz_mas',
            Edad: 'fec_nac_mas',
            Propietario: 'nom_usu',
            Estado: 'estado',
          })
        } else window.location.href = "/34"
      } catch (err) {
        err.message? swal({
            icon: "error",
            title: "Error",
            text: err.message
        }): console.log(err)
      }
  }

  // Abrir sección de detalles
  const openModal = (pet) => {
    setSelectedPet(pet)
    setEditMode(false)
    setShowModal(true)
    document.body.style.overflow = 'hidden' // Deshabilita el scroll del body
  }

  // Cerrar sección de detalles
  const closeModal = () => {
    setShowModal(false)
    document.body.style.overflow = 'auto' // Habilita el scroll del body
  }

  // Manejar busqueda 
  const handleSearch = term => {
    const termLower = term.toLowerCase()
  
    const find = petsAlmac.filter(pet => {
      // Campos específicos donde buscar
      const searchFields = ['nom_mas', 'raz_mas', 'esp_mas', 'est_rep_mas']
      return searchFields.some(field => 
        pet[field]?.toLowerCase().includes(termLower)
      )
    })

    if (find) setPetsData(find)
  }

  // Ejecutar el fetch para traer datos
  useEffect(() => {
      // Vars 
      const REFRESH_INTERVAL = 2 * 60 * 1000 // 2 minutos
      let intervalId
  
      // Execute the request
      fetchData()
  
      // Configure interval
      intervalId = setInterval(fetchData(), REFRESH_INTERVAL)
  
      // Clean
      return () => clearInterval(intervalId)
    }, [])

  return (
    <>
    {loading?(
      <Loader />
    ):(
      <main className="appgesmascota">
        <NavBarAdmin />
        {
          petsData?(
            <section className="contenedorgesmascota">
              <div className="panelgesmascota">
                <div className="cabeceragesmascota">
                  <h1 className="titulogesmascota">
                    <Dog className="iconotitulogesmascota" size={20} />
                    Gestión de mascotas
                  </h1>
                  <button className="botongesmascota" onClick={() => setRegister(true)}>
                    <Plus size={16} className="iconoplusadminhome" />
                    Registrar mascota
                  </button>
                </div>

                <h2 className="subtitulopanelgesmascota">Mascotas registradas</h2>

                <div className="controlesgesmascota">
                  <div className="mostrargesmascota">
                    <span>Mostrar</span>
                    <select className="selectgesmascota">
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                    <span>registros</span>
                  </div>

                  <div className="buscargesmascota">
                    <span>Buscar:</span>
                    <input type="text" className="inputgesmascota" onChange={e => handleSearch(e.target.value)}/>
                  </div>
                </div>

                <GlobalTable 
                  data={petsData}
                  headers={headers}
                  edit={() => setEditMode(true)}
                  watch={openModal}
                />

                <div className="paginaciongesmascota">
                  <div className="infogesmascota">Mostrando registros del 1 al 3 de un total de 3 registros.</div>
                  <div className="botonesgesmascota">
                    <button className="btngesmascota" disabled>
                      Anterior
                    </button>
                    <button className="btngesmascota btnactivogesmascota">1</button>
                    <button className="btngesmascota">Siguiente</button>
                  </div>
                </div>
              </div>
            </section>
          ):(
            <SubNotFound />
          )
        }
        {showModal && selectedPet && (
            <PetDetails 
                datas={selectedPet} 
                open={showModal} 
                admin={isAdmin}
                ready={(state) => setShowModal(state)}
                editMode={() => setEditMode(true)} />
        )}
        {editMode && (
            <EditPetButton 
                URL={mainURL}
                petData={selectedPet}
                open={editMode}
                onSave={(state) => setEditMode(state)}
            />
          )
        }
        {register && (
            <FormularioRegMascota 
              open={register}
              URL={mainURL}
              onRegist={state => setRegister(state)}
            />
          )
        }
      </main>
    )}
    </>
  )
}