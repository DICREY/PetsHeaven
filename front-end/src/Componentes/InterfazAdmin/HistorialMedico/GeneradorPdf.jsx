import React from "react"
import "../../../styles/InterfazAdmin/HistorialMedico/GeneradorPdf.css"

export default function GeneradorPDF({ petData, medicalHistory }) {
  const generatePDF = () => {
    const printWindow = window.open("", "_blank")

    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Historial Médico - ${petData.name}</title>
        <link rel="stylesheet" href="./styles/generador-pdf.css">
      </head>
      <body>
        <div class="contenedor-pdf">
          <!-- Header -->
          <div class="cabecera-pdf">
            <h1 class="titulo-pdf">HISTORIAL MÉDICO VETERINARIO</h1>
            <h2 class="subtitulo-pdf">Paciente: ${petData.name}</h2>
            <p class="fecha-pdf">Fecha de emisión: ${new Date().toLocaleDateString("es-ES")}</p>
          </div>

          <!-- Información del paciente y propietario -->
          <div class="seccion-info-pdf">
            <div class="tarjeta-info-pdf">
              <h3 class="titulo-tarjeta-pdf">Datos del Paciente</h3>
              <div class="fila-info-pdf">
                <span class="etiqueta-info-pdf">Nombre:</span>
                <span class="valor-info-pdf">${petData.name}</span>
              </div>
              <div class="fila-info-pdf">
                <span class="etiqueta-info-pdf">Especie:</span>
                <span class="valor-info-pdf">${petData.species}</span>
              </div>
              <div class="fila-info-pdf">
                <span class="etiqueta-info-pdf">Raza:</span>
                <span class="valor-info-pdf">${petData.breed}</span>
              </div>
              <div class="fila-info-pdf">
                <span class="etiqueta-info-pdf">Color:</span>
                <span class="valor-info-pdf">${petData.color}</span>
              </div>
              <div class="fila-info-pdf">
                <span class="etiqueta-info-pdf">Peso:</span>
                <span class="valor-info-pdf">${petData.weight}</span>
              </div>
              <div class="fila-info-pdf">
                <span class="etiqueta-info-pdf">Género:</span>
                <span class="valor-info-pdf">${petData.gender}</span>
              </div>
              <div class="fila-info-pdf">
                <span class="etiqueta-info-pdf">F. Nacimiento:</span>
                <span class="valor-info-pdf">${petData.birthDate}</span>
              </div>
              <div class="fila-info-pdf">
                <span class="etiqueta-info-pdf">Estado:</span>
                <span class="valor-info-pdf">${petData.reproductiveStatus}</span>
              </div>
            </div>
            
            <div class="tarjeta-info-pdf">
              <h3 class="titulo-tarjeta-pdf">Datos del Propietario</h3>
              <div class="fila-info-pdf">
                <span class="etiqueta-info-pdf">Nombre:</span>
                <span class="valor-info-pdf">${petData.owner.name}</span>
              </div>
              <div class="fila-info-pdf">
                <span class="etiqueta-info-pdf">Teléfono:</span>
                <span class="valor-info-pdf">${petData.owner.phone}</span>
              </div>
              <div class="fila-info-pdf">
                <span class="etiqueta-info-pdf">Email:</span>
                <span class="valor-info-pdf">${petData.owner.email}</span>
              </div>
              <div class="fila-info-pdf">
                <span class="etiqueta-info-pdf">Dirección:</span>
                <span class="valor-info-pdf">${petData.owner.address}</span>
              </div>
            </div>
          </div>

          <!-- Título del historial -->
          <h2 class="titulo-historial-pdf">REGISTRO DE CONSULTAS</h2>
          
          <!-- Consultas -->
          ${medicalHistory
            .map(
              (consultation, index) => `
            <div class="consulta-pdf ${index > 0 ? "nueva-pagina-pdf" : ""}">
              <div class="cabecera-consulta-pdf">
                <div class="titulo-consulta-pdf">${consultation.type}</div>
                <div class="meta-consulta-pdf">${consultation.date} - ${consultation.time} - ${consultation.veterinarian}</div>
              </div>
              
              <div class="cuerpo-consulta-pdf">
                <!-- Información básica -->
                <div class="info-basica-pdf">
                  <div class="fila-basica-pdf">
                    <span class="etiqueta-basica-pdf">Diagnóstico:</span>
                    <span>${consultation.diagnosis}</span>
                  </div>
                  <div class="fila-basica-pdf">
                    <span class="etiqueta-basica-pdf">Tratamiento:</span>
                    <span>${consultation.treatment}</span>
                  </div>
                  <div class="fila-basica-pdf">
                    <span class="etiqueta-basica-pdf">Notas:</span>
                    <span>${consultation.notes}</span>
                  </div>
                </div>
                
                <!-- Síntomas -->
                <div class="seccion-pdf">
                  <div class="titulo-seccion-pdf">Síntomas</div>
                  <div class="lista-sintomas-pdf">
                    ${consultation.symptoms.map((symptom) => `<div class="sintoma-pdf">${symptom}</div>`).join("")}
                  </div>
                </div>
                
                <!-- Examen físico -->
                <div class="seccion-pdf">
                  <div class="titulo-seccion-pdf">Examen Físico</div>
                  <div class="grilla-examen-pdf">
                    <div class="item-examen-pdf">
                      <span class="etiqueta-examen-pdf">Temperatura</span>
                      <span class="valor-examen-pdf">${consultation.physicalExam.temperature}</span>
                    </div>
                    <div class="item-examen-pdf">
                      <span class="etiqueta-examen-pdf">Peso</span>
                      <span class="valor-examen-pdf">${consultation.physicalExam.weight}</span>
                    </div>
                    <div class="item-examen-pdf">
                      <span class="etiqueta-examen-pdf">F. Cardíaca</span>
                      <span class="valor-examen-pdf">${consultation.physicalExam.heartRate}</span>
                    </div>
                    <div class="item-examen-pdf">
                      <span class="etiqueta-examen-pdf">F. Respiratoria</span>
                      <span class="valor-examen-pdf">${consultation.physicalExam.respiratoryRate}</span>
                    </div>
                    <div class="item-examen-pdf">
                      <span class="etiqueta-examen-pdf">P. Arterial</span>
                      <span class="valor-examen-pdf">${consultation.physicalExam.bloodPressure}</span>
                    </div>
                    <div class="item-examen-pdf">
                      <span class="etiqueta-examen-pdf">Condición</span>
                      <span class="valor-examen-pdf">${consultation.physicalExam.bodyCondition}</span>
                    </div>
                  </div>
                </div>
                
                ${
                  consultation.labResults.length > 0
                    ? `
                  <!-- Resultados de laboratorio -->
                  <div class="seccion-pdf">
                    <div class="titulo-seccion-pdf">Laboratorio</div>
                    <div class="resultados-lab-pdf">
                      ${consultation.labResults
                        .map(
                          (result) => `
                        <div class="item-lab-pdf">
                          <div>
                            <div class="prueba-lab-pdf">${result.test}</div>
                            <div class="ref-lab-pdf">${result.reference}</div>
                          </div>
                          <div class="resultado-lab-pdf">${result.result}</div>
                        </div>
                      `,
                        )
                        .join("")}
                    </div>
                  </div>
                `
                    : ""
                }
                
                <!-- Medicamentos -->
                <div class="seccion-pdf">
                  <div class="titulo-seccion-pdf">Medicamentos</div>
                  <div class="medicamentos-pdf">
                    ${consultation.medications
                      .map(
                        (med) => `
                      <div class="medicamento-pdf">
                        <div class="nombre-med-pdf">${med.name}</div>
                        <div class="detalles-med-pdf">
                          Dosis: ${med.dosage} | Duración: ${med.duration}<br>
                          ${med.instructions}
                        </div>
                      </div>
                    `,
                      )
                      .join("")}
                  </div>
                </div>
                
                <!-- Recomendaciones -->
                <div class="seccion-pdf">
                  <div class="titulo-seccion-pdf">Recomendaciones</div>
                  <div class="recomendaciones-pdf">
                    <ul class="lista-rec-pdf">
                      ${consultation.recommendations.map((rec) => `<li class="item-rec-pdf">${rec}</li>`).join("")}
                    </ul>
                  </div>
                </div>
                
                ${
                  consultation.nextAppointment
                    ? `
                  <!-- Próxima cita -->
                  <div class="proxima-cita-pdf">
                    <strong>Próxima cita recomendada:</strong> ${consultation.nextAppointment}
                  </div>
                `
                    : ""
                }
              </div>
            </div>
          `,
            )
            .join("")}
          
          <!-- Footer -->
          <div class="pie-pdf">
            <p>Documento generado el ${new Date().toLocaleString("es-ES")}</p>
            <p>Contacto: ${petData.owner.phone} | ${petData.owner.email}</p>
          </div>
        </div>
      </body>
    </html>
  `

    printWindow.document.write(htmlContent)
    printWindow.document.close()

    setTimeout(() => {
      printWindow.print()
    }, 500)
  }

  return { generatePDF }
}
