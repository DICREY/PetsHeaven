// Librarys 
import React from 'react'
import { Outlet } from 'react-router'

//Este sera el componente donde se llamara a todas  las funcionalidades del admin, desde aca se renderizara todo con el metodo Outlet 
//:v
// Component 
export const MainAdmin = () => {
  return (
    <main>
      <Outlet />
    </main>
  )
}
