// Imports 
import { formatDate,errorStatusHandler } from '../../Varios/Util'
import { PostData } from '../../Varios/Requests'
import { Loader } from '../../Errores/Loader'

// Librarys
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

// Main component 
export const Historial = ({ datas, URL = "" }) => {
  // Dinamyc vars 
  const [history, setHistory] = useState()
  const [loading, setLoading] = useState(true)

  // Vars 
  const mainURL = `${URL}/history`
  const navigate = useNavigate()

  // Functions
  const fetchData = async (url = "", token = "") => {
    console.log(mainURL)
    try {
      const history = await PostData(url, token, {
        firstData: datas.nom_mas,
        secondData: datas.doc_per
      })
      if(history) {
        setHistory(history)
        setLoading(false)
      }
    } catch (err) {
      if (err.status) {
        const message = errorStatusHandler(err.status)
        swal({
          icon: 'error',
          title: 'Error',
          text: message,
          button: 'Aceptar'
        })
      } else console.log(err)
    }
  }

  useEffect(() => {
    console.log(mainURL)
    const token = localStorage.getItem("token")
    if (!datas) console.log("sin datas")

    if (token) fetchData(mainURL, token)

  },[])

  return (
      loading ? (
        <Loader />
      ) : (
        <section className="pet-content">  
            {
              history.citas?.map((history, index) => (
                <article className="info-card"> 
                  {console.log(history)}
                  <h2>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Citas
                  </h2>
                  <aside className="info-grid">
                      <div key={history.doc_per} className="info-item">
                        <div className="info-label">
                          {history.nom_per}
                        </div>
                        <div className="info-value">
                          <p> </p>
                          <p> {history.fec_cit || "No Registrado"}</p>
                          <p> {history.des_cit || "No Registrado"}</p>
                        </div>
                      </div>
                  </aside>
                </article>
              ))
            }
            {
              history.consultas?.map((history, index) => (
                <article className="info-card"> 
                  <h2>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M10 9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Consultas
                  </h2>
                  <aside className="info-grid">
                      <div key={history.doc_per} className="info-item">
                        <div className="info-label"><strong>Veterinario:</strong></div>
                        <div className="info-label"><strong>Fecha:</strong></div>
                        <div className="info-label"><strong>Descripción:</strong></div>
                        <div className="info-value">
                          <p> {history.nom_per}</p>
                          <p> {history.fec_cit || "No Registrado"}</p>
                          <p> {history.des_cit || "No Registrado"}</p>
                        </div>
                      </div>
                  </aside>
                </article>
              ))
            }
          </section>  
      )
  )
}