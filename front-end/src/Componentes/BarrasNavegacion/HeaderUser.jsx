// Librarys
import React from 'react'
import { User, HelpCircle, LogOut } from 'lucide-react'

// Imports 
import { Logout, checkImage } from '../Varios/Util'

// Import styles
import styles from '../../styles/BarrasNavegacion/HeaderUser.module.css'
import '../../styles/global.css' 

export default function HeaderUser({ imgDefault = '', openHelp = null }) {
  const handleProfile = () => {
    // Lógica para ir al perfil
    console.log('Navegando al perfil...')
  }

  const handleHelp = () => {
    return 
  }

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        {checkImage(
          'https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/5.png',
          'Logo de PetsHeaven con la palabra Pets en celeste y Heaven en negro, en una tipografía moderna.',
          imgDefault,
          'logo-img'
        )}
      </div>
      
      <nav className={styles.navLinks}>
        <button 
          onClick={openHelp? openHelp: handleHelp}
          className={`${styles.navButton} ${styles.helpButton}`}
          aria-label="Ayuda"
        >
          <HelpCircle size={20} className={styles.icon} />
          <span>Ayuda</span>
        </button>
        
        <button 
          onClick={handleProfile} 
          className={`${styles.navButton} ${styles.profileButton}`}
          aria-label="Perfil"
        >
          <User size={20} className={styles.icon} />
          <span>Perfil</span>
        </button>
        
        <button 
          onClick={Logout} 
          className={`${styles.navButton} ${styles.logoutButton}`}
          aria-label="Cerrar sesión"
        >
          <LogOut size={20} className={styles.icon} />
          <span>Cerrar sesión</span>
        </button>
      </nav>
    </header>
  )
}