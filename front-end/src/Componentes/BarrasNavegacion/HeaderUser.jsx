import React, { useState } from 'react'
import { User, HelpCircle, LogOut } from 'lucide-react'

// Imports 
import { TabHelp } from '../Global/TabHelp'
import { AuthContext } from '../../Contexts/Contexts'

// Import styles
import styles from '../../styles/BarrasNavegacion/HeaderUser.module.css'
import '../../styles/global.css' 

// Component 
export default function HeaderUser() {
  const [tabHelp,setTabHelp] = useState()
  const { logout } = React.useContext(AuthContext)

  const handleProfile = () => {
    // Lógica para ir al perfil
    console.log('Navegando al perfil...')
  }

  const handleHelp = () => {
    tabHelp? setTabHelp(false): setTabHelp(true)
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <img src='https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/5.png' alt='Logo de PetsHeaven con la palabra Pets en celeste y Heaven en negro, en una tipografía moderna.' width={50} height={50} className='logo-img' />
      </div>
      
      <nav className={styles.navLinks}>
        <button 
          onClick={handleHelp} 
          className='BackBtn'
          aria-label="Ayuda"
        >
          <HelpCircle className={styles.icon} />
          <span>Ayuda</span>
        </button>
        
        <button 
          onClick={handleProfile} 
          // className={`${styles.navButton} ${styles.profileButton}`}
          className='EditBtn'
          aria-label="Perfil"
        >
          <User className={styles.icon} />
          <span>Perfil</span>
        </button>
        
        <button 
          onClick={logout}
          className='DeleteBtn'
          aria-label="Cerrar sesión"
        >
          <LogOut className={styles.icon} />
          <span>Cerrar sesión</span>
        </button>
      </nav>
      {tabHelp && (
        <TabHelp onClose={handleHelp}/>
      )}
    </header>
  )
}