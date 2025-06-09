// Librarys 
import styles from '../../styles/Global/CookiesPolicy.module.css'

// Component 
export const CookiePolicy = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Política de Cookies</h1>
      <hr />
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>¿Qué son las cookies?</h2>
        <p className={styles.paragraph}>
          Las cookies son pequeños archivos de texto que los sitios web colocan 
          en su dispositivo para almacenar información sobre su preferencias.
        </p>
      </section>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Tipos de cookies que utilizamos</h2>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableHeadRow}>
              <th className={styles.th}>Nombre</th>
              <th className={styles.th}>Finalidad</th>
              <th className={styles.th}>Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.tableRow}>
              <td className={styles.td}>__cred</td>
              <td className={styles.td}>Mantener la sesión del usuario</td>
              <td className={styles.td}>8 horas y/o hasta cerrar el navegador</td>
            </tr>
            <tr className={styles.tableRow}>
              <td className={styles.td}>__userName</td>
              <td className={styles.td}>Identificar al usuario</td>
              <td className={styles.td}>8 horas y/o hasta cerrar el navegador</td>
            </tr>
          </tbody>
        </table>
      </section>
      
      <section className={styles.section}>
        <h2 className={styles.subtitle}>Cómo gestionar cookies</h2>
        <p className={styles.paragraph}>
          Puede controlar y/o eliminar las cookies como desee. Para más información, 
          visite <a href="https://www.aboutcookies.org" className={styles.link}>aboutcookies.org</a>.
        </p>
      </section>
    </div>
  )
}