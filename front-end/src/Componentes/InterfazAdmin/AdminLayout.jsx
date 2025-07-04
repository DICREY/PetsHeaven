import { Outlet } from "react-router-dom"
import { NavBarAdmin } from '../BarrasNavegacion/NavBarAdmi'
import { HeaderAdmin } from '../BarrasNavegacion/HeaderAdmin'
import Footer from '../Varios/Footer2'

export default function AdminLayout() {
  return (
    <main className="contenedoradminhome">
      <NavBarAdmin />
      <section className="principaladminhome">
        <HeaderAdmin />
        <main className="contenido-principal-admin">
          <Outlet />
        </main>
        <Footer />
      </section>
    </main>
  )
}