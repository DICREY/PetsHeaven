// Librarys 
import React, {useEffect, useState} from "react"
import { useNavigate, Outlet } from "react-router-dom"
import { Dog, Plus } from "lucide-react"
 
// Imports 
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { Loader } from '../Errores/Loader'
import { NotFound} from '../Errores/NotFound'
import { GetData } from '../Varios/Requests'
import { getRoles, divideList } from '../Varios/Util'
import { EditPetButton } from '../Pets/EditPet'
import { PetDetails } from '../Pets/PetDetails'
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
  const [isAdmin,setIsAdmin] = useState(false)
  const [headers,setHeaders] = useState([])
  const navigate = useNavigate()

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

          setHeaders({
            Nombre: 'nom_mas',
            Especie: 'esp_mas',
            Raza: 'raz_mas',
            Edad: 'fec_nac_mas',
            Propietario: 'nom_usu',
            Estado: 'estado',
          })
          setLoading(false)
          setPetsAlmac(pets)
          const shortPets = divideList(pets,4)
          setPetsData(shortPets)
        } else navigate("/34")
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
                <button className="botongesmascota" onClick={() => navigate("/mascota/registro")}>
                  <Plus size={16} className="iconoplusadminhome" />
                  Registrar mascota
                </button>
              </div>

              <GlobalTable 
                subtitle={'Mascotas Registradas'}
                data={petsData}
                headersSearch={['nom_mas', 'raz_mas', 'esp_mas', 'est_rep_mas']}
                fullData={petsAlmac}
                headers={headers}
                edit={() => setEditMode(true)}
                watch={openModal}
              />
            </div>
          </section>
        ):(
          <NotFound/>
        )
      }
      {showModal && selectedPet && (
        <PetDetails 
          URL={mainURL}
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

      <Outlet />
    </main>
  )
}