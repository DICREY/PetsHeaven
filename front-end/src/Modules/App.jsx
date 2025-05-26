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
import { GesMascota } from '../Componentes/InterfazAdmin/GesMascota'
import { GesAgendaGeneral } from '../Componentes/InterfazAdmin/GesAgendaGeneral'
import { MainAdmin } from '../Componentes/InterfazAdmin/MainAdmin'
import { Pets } from '../Componentes/Pets/Pets'
import { PetDetails } from '../Componentes/Pets/PetDetails'
import { NotFound } from '../Componentes/Errores/NotFound'
import { ErrorInternalServer } from '../Componentes/Errores/ErrorInternalServer'
import { getRoles,Logout } from '../Componentes/Varios/Util'
import { useInactivityDetector } from '../Componentes/Varios/InactiveDectetor'
import VeterinariaPage from '../Componentes/VeterinariaPage'
import { PerfilPropietario } from '../Componentes/Peoples/PerfilPropietario'
import { GesAgendaPersonal } from '../Componentes/InterfazAdmin/GesAgendaPersonal'
import { Services } from '../Componentes/InterfazAdmin/Services'

//import Crud personal
import { ConfiguracionUsuarioCrud } from '../Componentes/InterfazAdmin/CrudPersonal/ConfiguracionUsuarioCrud'

// Main Component
export default function App () {
  // Dynamic vars 
  const [userSelect,setUserSelect] = useState()
  const [petSelect,setPetSelect] = useState()
  const [owner,setOwner] = useState(false)
  const [arriveTo,setArriveTo] = useState('')
  const [petDetailTab,setPetDetailTab] = useState('Datos Generales')

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
    const token = localStorage.getItem('token');

    if (token) {
      const roles = getRoles(token)
      return roles.includes('Veterinario')? children :<Navigate to='/user/login' />
    }

    return <Navigate to='/user/login' />
  }

  const AdminRoute = ({ children }) => {
    // Vars
    const token = localStorage.getItem('token')

    if (token) {
      const roles = getRoles(token)
      return roles.includes('Administrador')? children :<Navigate to='/user/login' />
    }

    return <Navigate to='/user/login' />
  }

  const MainRoute = () => {
    window.location.replace('/main')
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

  return (
    // Define Routes
    <BrowserRouter>
      <Routes>
        {/* Private routes */}
        <Route path='user/pets' element={
          <PrivateRoute children={<Pets 
            setPetSelect={setPetSelect}
            URL={URL}
            imgPetDefault={imgPetDefault}
            imgUserDefault={imgUserDefault} 
          />}/>}>
        </Route>
        <Route path='/pets/details' element={
          <PrivateRoute children={<PetDetails
            tab={petDetailTab}
            datas={petSelect}
            imgPetDefault={imgPetDefault}
            URL={URL}
          />}/>}>
        </Route>
        <Route path='services' element={
          <PrivateRoute children={<Services 
            URL={URL}
            imgDefault={imgServiceDefault}
          />}/>}>
        </Route>

        {/* Admin routes  */}
        <Route path='/admin' element={<MainAdmin />} >
          <Route path='gestion/usuarios' element={
            <AdminRoute children={<GesPersonal setUserSelect={setUserSelect} URL={URL} />} />} >
          </Route>
          <Route path='usuario/registro' element={
            <AdminRoute children={<ConfiguracionUsuario URL={URL} />} />} >
          </Route>
          <Route path='actualizar/datos personal' element={
            <AdminRoute children={<ConfiguracionUsuarioCrud userSelect={userSelect} URL={URL} />} />} >
          </Route>
        </Route>
        
        {/* Vet routes */}
        <Route path='gestion/mascotas' element={
          <VetRoute children={<GesMascota URL={URL}/>} />} >
        </Route>
        <Route path='mascota/registro' element={
          <VetRoute children={<FormularioRegMascotas URL={URL} imgDefault={imgPetDefault} />} />} >
        </Route>
        <Route path='propietario/registro' element={
          <VetRoute children={<RegistroPro URL={URL} imgDefault={imgUserDefault} />} />}>
        </Route>
        <Route path='consultorio' element={
          <VetRoute children={<HomeAdmin 
            setOwner={setOwner} 
            setUserSelect={setUserSelect} 
            setPetSelect={setPetSelect}
            URL={URL}
          />} />}>  
        </Route>
        <Route path='propietario/datos' element={
          <VetRoute children={
          <PerfilPropietario 
            setPetDetailTab={setPetDetailTab}
            owner={owner} 
            userSelect={userSelect}
            imgPetDefault={imgPetDefault} 
            imgUserDefault={imgUserDefault} 
            URL={URL}
            setPetSelect={setPetSelect}
          />} />} >
        </Route>
        <Route path='calendario/general' element={
          <VetRoute children={<GesAgendaGeneral URL={URL} />} />} >
        </Route>
        <Route path='calendario/usuario' element={
          <VetRoute children={<GesAgendaPersonal URL={URL} />} />} >
        </Route>

        {/* Public Routes */}
        <Route path='/' element={<MainRoute />} />
        <Route path='main' element={<VeterinariaPage URL={URL} setArriveTo={setArriveTo} />} />
        <Route path='user/login' element={<LoginForm URL={URL} imgDefault={imgUserDefault} arriveTo={arriveTo} />} />
        <Route path='user/register' element={<Registro URL={URL} imgDefault={imgUserDefault} />} />
        <Route path='user/recuperar' element={<ForgotPassword />} />
        <Route path='internal' element={<ErrorInternalServer />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
