import { useState, useEffect } from 'react'
import '../../styles/Global/CookieConsent.css'

export const CookieConsent = () => {
    const [visible, setVisible] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [preferences, setPreferences] = useState({
        essential: true,
        theme: false
    })

    useEffect(() => {
        const consent = localStorage.getItem('vet_cookie_consent')
        if (!consent) {
            setVisible(true)
        }
    }, [])

    const handleAcceptAll = () => {
        const consent = { essential: true, theme: true }
        localStorage.setItem('vet_cookie_consent', JSON.stringify(consent))
        setVisible(false)
    }

    const handleSavePreferences = () => {
        localStorage.setItem('vet_cookie_consent', JSON.stringify(preferences))
        setVisible(false)
    }

    if (!visible) return null

    return (
        <aside className='cookieConsent'>
            <section className='contentCookie'>
                <header className='headerCookie'>
                    <h3 className='titleCookie'>
                        <span className='dot'></span>
                        Preferencias de Privacidad
                    </h3>
                    <button
                        onClick={() => setVisible(false)}
                        className='closeBtnCookie'
                        aria-label="Cerrar"
                    >
                        ×
                    </button>
                </header>

                <p className='descriptionCookie'>
                    En nuestra clínica veterinaria usamos cookies esenciales para tu sesión y
                    opcionales para recordar tus preferencias de personalización. Valoramos tu privacidad.
                </p>

                {showSettings && (
                    <section className='settingsBox'>
                        <aside className='settingRow'>
                            <label htmlFor="essential-cookies" className='settingLabel'>
                                Cookies Esenciales
                            </label>
                            <div className='switchWrapper'>
                                <input
                                    type="checkbox"
                                    id="essential-cookies"
                                    defaultChecked={preferences.essential}
                                    disabled
                                    className='switchInput'
                                />
                                Siempre activas
                                <div className='switchTrack switchTrackOn'></div>
                                <div className='switchDot switchDotOn'></div>
                            </div>
                        </aside>

                        {/* <aside className='settingRow'>
                        <label htmlFor="theme-cookies" className='settingLabel'>
                            Preferencia de Tema
                        </label>
                        <div className='switchWrapper'>
                            <input 
                            type="checkbox" 
                            id="theme-cookies"
                            checked={preferences.theme}
                            onChange={(e) => setPreferences({...preferences, theme: e.target.checked})}
                            className='switchInput'
                            />
                            <div className={`$'switchTrack' ${preferences.theme ?'switchTrackOn':'switchTrackOff'`}></div>
                            <div className={`$'switchDot' ${preferences.theme ?'switchDotOn': ''}`}></div>
                        </div>
                    </aside> */}
                    </section>
                )}

                <div className='actionsCookie'>
                    <button
                        onClick={handleAcceptAll}
                        className='EditBtn expandBtn'
                    >
                        Aceptar Todas
                    </button>

                    <button
                        onClick={() => setShowSettings(!showSettings)}
                        className='BackBtn expandBtn'
                    >
                        {showSettings ? 'Atrás' : 'Personalizar'}
                    </button>

                    {showSettings && (
                        <button
                            onClick={handleSavePreferences}
                            className='AddBtn expandBtn'
                        >
                            Guardar
                        </button>
                    )}
                </div>

                <p className='footerCookie'>
                    Al continuar, aceptas nuestro{' '}
                    <a href="/politica-cookies" className='cookieLink'>
                        uso de cookies
                    </a>.
                </p>
            </section>
        </aside>
    )
}