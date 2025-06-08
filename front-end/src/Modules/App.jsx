// Librarys
import React, { useState, useEffect, useContext } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router'

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
import { useInactivityDetector } from '../Componentes/Varios/InactiveDectetor'
import VeterinariaPage from '../Componentes/VeterinariaPage'
import { PerfilPropietario } from '../Componentes/Peoples/PerfilPropietario'
import { GesAgendaPersonal } from '../Componentes/InterfazAdmin/GesAgendaPersonal'
import { Services } from '../Componentes/InterfazAdmin/Services'
import {CirugiasVeterinaria} from "../Componentes/InterfazAdmin/Servicios/Cirugia"
import {SpaMascotas} from "../Componentes/InterfazAdmin/Servicios/Spa"
import {VisualizadorVacunas} from "../Componentes/InterfazAdmin/Servicios/Vacuna"
import VeterinaryDashboard from '../Componentes/InterfazAdmin/Home'
import TodasLasNotificaciones from '../Componentes/BarrasNavegacion/Notificaciones'

// Import contexts
import { AuthProvider } from '../Contexts/Auth.context'
import { AuthContext } from '../Contexts/Contexts'

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
  const [inactive, setInactive] = useState(false)
  
  // Vars 
  const imgPetDefault = 'https://github.com/Mogom/Imagenes_PetsHeaven/blob/main/Defaults/petImg.default.jpg?raw=true'
  const imgUserDefault = 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/default_veterinario.png'
  const imgServiceDefault = 'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/default_veterinario.png'
  const URL = 'http://localhost:3000'
  // const isInactive = useInactivityDetector(5 * 1000)
  
  // Route types
  const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext)

    return user ? children : <Navigate to='/user/login' />
  }
  
  const VetRoute = ({ children }) => {
    // Vars
    const { roles } = useContext(AuthContext)
    
    if(roles) {
      const vet = roles.includes('Veterinario')
      return vet? children : <Navigate to='/user/login' />
    }

    return <Navigate to='/user/login' />
  }

  const AdminRoute = ({ children }) => {
    const { roles } = useContext(AuthContext)
    if(roles) {
      const admin = roles.includes('Administrador')
      return admin? children :<Navigate to='/user/login' />
    }

    return <Navigate to='/user/login' />
  }

  const MainRoute = () => {
    window.location.replace('/main')
  }

  // useEffect(() => {
  //   if (isInactive) {
  //     setNotify({
  //       title: 'Sesión Inactiva',
  //       message: 'Tu sesión ha estado inactiva por un tiempo prolongado. ¿Deseas continuar?',
  //       select: () => setInactive(true),
  //     })
  //     if (inactive) {
  //       return <Navigate to='/user/login' />
  //     }
  //   }
  // },[isInactive])

  return (
    // Define Routes
    <AuthProvider>
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
          <Route path='/services' element={
            <PrivateRoute children={<Services URL={URL}
            imgDefault={imgServiceDefault} />}/>}>
          </Route>
          <Route path='notificaciones' element={
            <PrivateRoute children={<TodasLasNotificaciones URL={URL} />}/>}>
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
            <Route path='administracion' element={
              <AdminRoute children={<VeterinaryDashboard URL={URL} />} />} >
            </Route>
          </Route>
          
          {/* Vet routes */}
          <Route path='mascota/registro' element={
            <VetRoute children={<FormularioRegMascotas URL={URL} imgDefault={imgPetDefault} />} />
          } />
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
            <VetRoute children={<GesAgendaPersonal URL={URL} />} />
          } />
          <Route path='services/cirugia' element={
            <VetRoute children={<CirugiasVeterinaria URL={URL} />} />
          } />
          <Route path='services/vacunas' element={
            <VetRoute children={<VisualizadorVacunas URL={URL} />} />
          } />
          <Route path='services/spa' element={
            <VetRoute children={<SpaMascotas URL={URL} />} />
          } />

          {/* Public Routes */}
          <Route path='/' element={<MainRoute />} />
          <Route path='main' element={<VeterinariaPage URL={URL} setArriveTo={setArriveTo} />} />
          <Route path='user/login' element={
            <LoginForm
              URL={URL} imgDefault={imgUserDefault} 
              arriveTo={arriveTo}
            /> } /> 
          <Route path='user/register' element={<Registro URL={URL} imgDefault={imgUserDefault} />} />
          <Route path='user/recuperar' element={<ForgotPassword />} />
          <Route path='internal' element={<ErrorInternalServer />} />
          <Route path='/politica-cookies' element={<ErrorInternalServer />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
