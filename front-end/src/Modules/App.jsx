// Librarys
import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router'

// Imports Forms
import { LoginForm } from '../Componentes/Formularios/LoginForm'
import Registro from '../Componentes/Formularios/Registro'
import ForgotPassword from '../Componentes/Formularios/ForgotPassword'
import { ConfiguracionUsuario } from '../Componentes/InterfazAdmin/FormulariosAdmin/RegistroPersonal'
import { FormularioRegMascotas } from '../Componentes/Formularios/FormularioMascotas'
import { RegistroPro } from '../Componentes/InterfazAdmin/FormulariosAdmin/RegistroPersona'

// Imports
import { HomeAdmin } from '../Componentes/InterfazAdmin/Consultorio'
import { GesPersonal } from '../Componentes/InterfazAdmin/GesPersonal'
import { GesAgendaGeneral } from '../Componentes/InterfazAdmin/GesAgendaGeneral'
import { MainAdmin } from '../Componentes/InterfazAdmin/MainAdmin'
import { Pets } from '../Componentes/Pets/Pets'
import { PetDetails } from '../Componentes/Pets/PetDetails'
import { NotFound } from '../Componentes/Errores/NotFound'
import { ErrorInternalServer } from '../Componentes/Errores/ErrorInternalServer'
import { decodeJWT, Logout } from '../Componentes/Varios/Util'
import { useInactivityDetector } from '../Componentes/Varios/InactiveDectetor'
import VeterinariaPage from '../Componentes/VeterinariaPage'
import { PerfilPropietario } from '../Componentes/Peoples/PerfilPropietario'
import { GesAgendaPersonal } from '../Componentes/InterfazAdmin/GesAgendaPersonal'
import { Services } from '../Componentes/InterfazAdmin/Services'
import {CirugiasVeterinaria} from "../Componentes/InterfazAdmin/Servicios/Cirugia"
import {SpaMascotas} from "../Componentes/InterfazAdmin/Servicios/Spa"
import {VisualizadorVacunas} from "../Componentes/InterfazAdmin/Servicios/Vacuna"

//import Crud personal
import { ConfiguracionUsuarioCrud } from '../Componentes/InterfazAdmin/CrudPersonal/ConfiguracionUsuarioCrud'
import { PostData } from '../Componentes/Varios/Requests'

// Main Component
export default function App () {
  // Dynamic vars 
  const [userSelect,setUserSelect] = useState()
  const [petSelect,setPetSelect] = useState()
  const [owner,setOwner] = useState(false)
  const [arriveTo,setArriveTo] = useState('')
  const [petDetailTab,setPetDetailTab] = useState('Datos Generales')
  const [roles,setRoles] = useState(['Usuario'])
  const [currentTab,setCurrentTab] = useState('Vacunas')

  // Vars 
  const imgPetDefault = 'https://github.com/Mogom/Imagenes_PetsHeaven/blob/main/Defaults/petImg.default.jpg?raw=true'
  const imgUserDefault = 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/default_veterinario.png'
  const imgServiceDefault = 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/default_veterinario.png'
  const URL = 'http://localhost:3000'
  const isInactive = useInactivityDetector(20 * 60 * 1000) // 20 minutos de inactividad  
  
  // Route types
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token')

    return token? children : <Navigate to='/user/login' />
  }
  
  const VetRoute = ({ children }) => {
    // Vars
    const token = localStorage.getItem('token')

    if (token) {
      if(roles){
        const vet = roles.includes('Veterinario')
        return vet? children : <Navigate to='/user/login' />
      }
    }

    return <Navigate to='/user/login' />
  }

  const AdminRoute = async ({ children }) => {
    // Vars
    const token = localStorage.getItem('token')
    
    const admin = roles.includes('Administrador')
    if (token) return admin? children :<Navigate to='/user/login' />

    return <Navigate to='/user/login' />
  }

  const MainRoute = () => {
    window.location.replace('/main')
  }

  const checkCookie = async () => {
    const cookie = await PostData(`${URL}/global/check-cookie`, { name: '__cred' })
    console.log(cookie)
    setRoles(cookie)
  }

  useEffect(() => {
    if (isInactive) {
      const confirms = confirm('Has estado inactivo. ¿Quieres continuar?')
      if (confirms) {
        return
      } else {
        Logout()
      }
    }
  },[isInactive])

  // useEffect(() => {
  //   checkCookie()
  // }, [roles])

  return (
    // Define Routes
    <BrowserRouter>
      <Routes>
        {/* Private routes */}
        <Route path='user/pets' element={
          <PrivateRoute children={<Pets 
            setPetSelect={setPetSelect}
            URL={URL}
            roles={roles}
            imgPetDefault={imgPetDefault}
            imgUserDefault={imgUserDefault} 
          />}/>}>
        </Route>
        <Route path='/pets/details' element={
          <PrivateRoute children={<PetDetails
            tab={petDetailTab}
            roles={roles}
            datas={petSelect}
            imgPetDefault={imgPetDefault}
            URL={URL}
          />}/>}>
        </Route>
        <Route path='/services' element={
          <PrivateRoute children={<Services URL={URL}
            imgDefault={imgServiceDefault} roles={roles} />}/>}>
        </Route>

        {/* Admin routes  */}
        <Route path='/admin' element={<MainAdmin />} >
          <Route path='gestion/usuarios' element={
            <AdminRoute children={<GesPersonal setUserSelect={setUserSelect} URL={URL} roles={roles} />} />} >
          </Route>
          <Route path='usuario/registro' element={
            <AdminRoute children={<ConfiguracionUsuario URL={URL} roles={roles} />} />} >
          </Route>
          <Route path='actualizar/datos personal' element={
            <AdminRoute children={<ConfiguracionUsuarioCrud userSelect={userSelect} URL={URL} roles={roles} />} />} >
          </Route>
        </Route>
        
        {/* Vet routes */}
        <Route path='mascota/registro' element={
          <VetRoute children={<FormularioRegMascotas URL={URL} imgDefault={imgPetDefault} roles={roles} />} />
        } />
        <Route path='propietario/registro' element={
          <VetRoute children={<RegistroPro URL={URL} imgDefault={imgUserDefault} roles={roles} />} />}>
        </Route>
        <Route path='consultorio' element={
          <VetRoute children={<HomeAdmin 
            setOwner={setOwner} 
            setUserSelect={setUserSelect} 
            setPetSelect={setPetSelect}
            roles={roles}
            URL={URL}
          />} />}>  
        </Route>
        <Route path='propietario/datos' element={
          <VetRoute children={
          <PerfilPropietario 
            setPetDetailTab={setPetDetailTab}
            owner={owner} 
            roles={roles}
            userSelect={userSelect}
            imgPetDefault={imgPetDefault} 
            imgUserDefault={imgUserDefault} 
            URL={URL}
            setPetSelect={setPetSelect}
          />} />} >
        </Route>
        <Route path='calendario/general' element={
          <VetRoute children={<GesAgendaGeneral URL={URL} roles={roles} />} />} >
        </Route>
        <Route path='calendario/usuario' element={
          <VetRoute children={<GesAgendaPersonal URL={URL} roles={roles} />} />
        } />
        <Route path='servicios/cirugia' element={
          <VetRoute children={<CirugiasVeterinaria URL={URL} roles={roles} />} />
        } />
        <Route path='servicios/vacunas' element={
          <VetRoute children={<VisualizadorVacunas URL={URL} roles={roles} />} />
        } />
        <Route path='servicios/spa' element={
          <VetRoute children={<SpaMascotas URL={URL} roles={roles} />} />
        } />

        {/* Public Routes */}
        <Route path='/' element={<MainRoute />} />
        <Route path='main' element={<VeterinariaPage URL={URL} setArriveTo={setArriveTo} />} />
        <Route path='user/login' element={
          <LoginForm
            URL={URL} imgDefault={imgUserDefault} 
            arriveTo={arriveTo} setRoles={setRoles}
          />} />
        <Route path='user/register' element={<Registro URL={URL} imgDefault={imgUserDefault} />} />
        <Route path='user/recuperar' element={<ForgotPassword />} />
        <Route path='internal' element={<ErrorInternalServer />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
