import { useNavigate } from 'react-router'
import { ChevronLeft } from 'lucide-react'
import styles from '../../styles/Global/CookiesPolicy.module.css'
import Footer from '../Varios/Footer2'
import { NavBar } from '../BarrasNavegacion/NavBar'


export const CookiePolicy = () => {
    const navigate = useNavigate()

    const cookies = [
        {
            name: '__cred',
            purpose: 'Mantener la sesión del usuario',
            duration: '24 horas maximo'
        },
        {
            name: '__userName',
            purpose: 'Identificar al usuario que ingresa al sistema',
            duration: '24 horas maximo'
        },
        {
            name: '__token',
            purpose: 'Validar que el cliente tiene acceso al sistema',
            duration: '24 horas maximo'
        }
    ]

    return (
        <main className={styles.conta}>
            <NavBar />
            <div className={styles.container}>
                <span className={styles.headerSpan}>
                    <h1 className={styles.title}>Política de Cookies</h1>
                    <button
                        type='button'
                        className='BackBtn'
                        onClick={() => navigate(-1)}
                        aria-label="Volver atrás"
                    >
                        <ChevronLeft className='icon' />
                        Atrás
                    </button>
                </span>


                <section className={styles.section}>
                    <h2 className={styles.subtitle}>¿Qué son las cookies?</h2>
                    <p className={styles.paragraph}>
                        Las cookies son pequeños archivos de texto que los sitios web colocan
                        en su dispositivo para almacenar información sobre sus preferencias.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>Tipos de cookies que utilizamos</h2>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.tableHeadRow}>
                                <th className={styles.th} scope="col">Nombre</th>
                                <th className={styles.th} scope="col">Finalidad</th>
                                <th className={styles.th} scope="col">Duración</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cookies.map((cookie, index) => (
                                <tr key={index} className={styles.tableRow}>
                                    <td className={styles.td}>{cookie.name}</td>
                                    <td className={styles.td}>{cookie.purpose}</td>
                                    <td className={styles.td}>{cookie.duration}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.subtitle}>Cómo gestionar cookies</h2>
                    <p className={styles.paragraph}>
                        Puede controlar y/o eliminar las cookies como desee. Para más información,
                        visite <a href="https://www.aboutcookies.org" className={styles.link} target="_blank" rel="noopener noreferrer">aboutcookies.org</a>.
                    </p>
                </section>
            </div>
            <Footer />
        </main>
    )
}