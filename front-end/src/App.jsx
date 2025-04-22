// Librarys
import React from "react"
import { BrowserRouter, Routes, Route,Navigate } from "react-router"

// Imports
import { LoginForm } from "./Componentes/Formularios/LoginForm"
import Registro from "./Componentes/Formularios/Registro"
import ForgotPassword from "./Componentes/Formularios/ForgotPassword"
import { HomeAdmin } from "./Componentes/InterfazAdmin/HomeAdmin"
import { GesUsuario } from "./Componentes/InterfazAdmin/GesUsuario"
import { GesMascota } from "./Componentes/InterfazAdmin/GesMascota"
import { Pets } from "./Componentes/Pets/Pets"
import { NotFound } from "./Componentes/Errores/NotFound"
import { ErrorInternalServer } from "./Componentes/Errores/ErrorInternalServer"
import { getRoles } from './Componentes/Varios/Util'
import VeterinariaPage from "./Componentes/VeterinariaPage"
import { ConfiguracionUsuario } from "./Componentes/InterfazAdmin/FormulariosAdmin/RegistroUsu"
import { FormularioRegMascotas } from "./Componentes/Formularios/FormularioMascotas"
import { GesAgendaGeneral } from "./Componentes/InterfazAdmin/GesAgendaGeneral"
import { RegistroPro } from "./Componentes/InterfazAdmin/FormulariosAdmin/RegistroPro"
import {PerfilPropietario} from "./Componentes/InterfazAdmin/PerfilPropietario"



// Main Component
export default function App () {
  const URL = "http://localhost:3000"
  
  // Route types
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token? children : <Navigate to="/user/login" />
  }
  
  const VetRoute = ({ children }) => {
    // Vars
    const token = localStorage.getItem('token');
    if (token) {
      const roles = getRoles(token)
      return roles.includes('Veterinario')? children :<Navigate to="/user/login" />
    }

    return <Navigate to="/user/login" />
  }

  const AdminRoute = ({ children }) => {
    // Vars
    const token = localStorage.getItem('token');
    if (token) {
      const roles = getRoles(token)
      return roles.includes('Administrador')? children :<Navigate to="/user/login" />
    }

    return <Navigate to="/user/login" />
  }

  const MainRoute = () => {
    window.location.replace("/main")
  }

  return (
    // Define Routes
    <BrowserRouter>
      <Routes>
        {/* Private routes */}
        <Route path="user/pets" element={
          <PrivateRoute children={<Pets URL={URL}/>}/>}>
        </Route>

        {/* Admin routes  */}
        <Route path="consultorio" element={
          <AdminRoute children={<HomeAdmin URL={URL}/>} />}>  
        </Route>
        <Route path="gestion/usuarios" element={
          <AdminRoute children={<GesUsuario URL={URL} />} />} >
        </Route>
        <Route path="usuario/registro" element={
          <AdminRoute children={<ConfiguracionUsuario URL={URL} />} />} >
        </Route>
        <Route path="calendario/general" element={
          <AdminRoute children={<GesAgendaGeneral URL={URL} />} />} >
        </Route>
        <Route path="propietario/datos" element={
          <AdminRoute children={<PerfilPropietario URL={URL} />} />} >
        </Route>


        {/* Vet routes */}
        <Route path="gestion/mascotas" element={
          <VetRoute children={<GesMascota URL={URL}/>} />} >
        </Route>
        <Route path="mascota/registro" element={
          <AdminRoute children={<FormularioRegMascotas URL={URL} />} />} >
        </Route>
        <Route path="propietario/registro" element={
          <AdminRoute children={<RegistroPro URL={URL} />} />} >
        </Route>


        {/* Routes */}
        <Route path="/" element={<MainRoute />} />
        <Route path="main" element={<VeterinariaPage URL={URL}/>} />
        <Route path="user/login" element={<LoginForm URL={URL}/>} />
        <Route path="user/register" element={<Registro URL={URL}/>} />
        <Route path="user/recuperar" element={<ForgotPassword />} />
        <Route path="internal" element={<ErrorInternalServer />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
