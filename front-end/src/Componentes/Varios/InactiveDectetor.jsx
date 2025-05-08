// Librarys
import { useState, useEffect } from 'react'

// Component
export const useInactivityDetector = (timeout = 1000) => { // 5 minutos por defecto
  const [isInactive, setIsInactive] = useState(false)

  useEffect(() => {
    let inactivityTimer

    const resetTimer = () => {
      clearTimeout(inactivityTimer)
      setIsInactive(false)
      inactivityTimer = setTimeout(() => setIsInactive(true), timeout)
    }

    // Eventos que indican actividad
    const events = ['mousemove', 'keydown', 'scroll', 'click', 'touchstart']
    
    events.forEach(event => {
      window.addEventListener(event, resetTimer)
    })

    // Iniciar el timer
    resetTimer()

    // Limpieza
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimer)
      })
      clearTimeout(inactivityTimer)
    }
  }, [timeout])

  return isInactive
}