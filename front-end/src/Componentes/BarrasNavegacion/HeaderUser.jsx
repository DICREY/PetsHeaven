import React from 'react';
import styles from '../../styles/BarrasNavegacion/HeaderUser.module.css';
import { User, HelpCircle, LogOut } from 'lucide-react';
import '../../styles/global.css'; 

export default function HeaderUser() {
  const handleLogout = () => {
    // Lógica para cerrar sesión
    console.log('Cerrando sesión...');
  };

  const handleProfile = () => {
    // Lógica para ir al perfil
    console.log('Navegando al perfil...');
  };

  const handleHelp = () => {
    // Lógica para mostrar ayuda
    console.log('Mostrando ayuda...');
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <img src='https://media.githubusercontent.com/media/Mogom/Imagenes_PetsHeaven/main/Logos/5.png' alt='Logo de PetsHeaven con la palabra Pets en celeste y Heaven en negro, en una tipografía moderna.' width={50} height={50} className='logo-img' />
      </div>
      
      <nav className={styles.navLinks}>
        <button 
          onClick={handleHelp} 
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
          onClick={handleLogout} 
          className={`${styles.navButton} ${styles.logoutButton}`}
          aria-label="Cerrar sesión"
        >
          <LogOut size={20} className={styles.icon} />
          <span>Cerrar sesión</span>
        </button>
      </nav>
    </header>
  );
}