export default function GeneradorPDF({ petData, medicalHistory }) {
  const generatePDF = () => {
    const printWindow = window.open("", "_blank")

    const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Historial Médico - ${petData.name}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          body { 
            font-family: 'Times New Roman', serif; 
            line-height: 1.4; 
            color: #2c3e50; 
            background: #fff;
            font-size: 12px;
          }
          
          .container { 
            max-width: 210mm; 
            margin: 0 auto; 
            padding: 20mm; 
          }
          
          .header { 
            text-align: center; 
            margin-bottom: 25px; 
            padding-bottom: 15px;
            border-bottom: 2px solid #2c3e50;
          }
          
          .header h1 { 
            font-size: 20px; 
            margin-bottom: 5px; 
            font-weight: bold;
            text-transform: uppercase;
            letter-spacing: 1px;
          }
          
          .header h2 { 
            font-size: 16px; 
            margin-bottom: 3px; 
            font-weight: normal;
          }
          
          .header p { 
            font-size: 11px;
            color: #666;
          }
          
          .info-section { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 20px; 
            margin-bottom: 25px; 
            border: 1px solid #ddd;
            padding: 15px;
          }
          
          .info-card h3 { 
            font-size: 13px; 
            margin-bottom: 10px; 
            font-weight: bold;
            text-transform: uppercase;
            border-bottom: 1px solid #eee;
            padding-bottom: 5px;
          }
          
          .info-row { 
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px; 
            font-size: 11px;
          }
          
          .info-label { 
            font-weight: bold;
            min-width: 80px;
          }
          
          .info-value {
            text-align: right;
          }
          
          .history-title {
            font-size: 16px; 
            margin: 20px 0 15px 0; 
            text-align: center; 
            font-weight: bold;
            text-transform: uppercase;
            border-top: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            padding: 8px 0;
          }
          
          .consultation { 
            margin-bottom: 20px; 
            border: 1px solid #ddd; 
            page-break-inside: avoid;
          }
          
          .consultation-header { 
            background: #f8f9fa; 
            padding: 10px 15px; 
            border-bottom: 1px solid #ddd;
          }
          
          .consultation-title { 
            font-size: 14px; 
            font-weight: bold;
            margin-bottom: 3px;
          }
          
          .consultation-meta { 
            font-size: 10px; 
            color: #666;
          }
          
          .consultation-body { 
            padding: 15px; 
          }
          
          .section { 
            margin-bottom: 15px; 
          }
          
          .section-title { 
            font-size: 12px; 
            margin-bottom: 8px; 
            font-weight: bold;
            text-transform: uppercase;
            border-bottom: 1px dotted #ccc;
            padding-bottom: 3px;
          }
          
          .basic-info {
            margin-bottom: 12px;
          }
          
          .basic-row {
            display: flex;
            margin-bottom: 5px;
            font-size: 11px;
          }
          
          .basic-label {
            font-weight: bold;
            min-width: 80px;
          }
          
          .symptoms-list { 
            display: grid; 
            grid-template-columns: 1fr 1fr; 
            gap: 5px; 
          }
          
          .symptom { 
            font-size: 10px;
            padding: 3px 6px;
            background: #f8f9fa;
            border-left: 2px solid #e74c3c;
          }
          
          .exam-grid { 
            display: grid; 
            grid-template-columns: repeat(3, 1fr); 
            gap: 8px; 
          }
          
          .exam-item { 
            text-align: center;
            padding: 6px;
            border: 1px solid #eee;
            font-size: 10px;
          }
          
          .exam-label { 
            display: block; 
            font-weight: bold;
            margin-bottom: 2px;
            text-transform: uppercase;
            font-size: 9px;
          }
          
          .exam-value { 
            font-size: 11px;
          }
          
          .medications { 
            border: 1px solid #eee;
            padding: 10px;
          }
          
          .medication { 
            margin-bottom: 8px; 
            padding: 6px;
            background: #f8f9fa;
            border-left: 2px solid #9b59b6;
          }
          
          .medication:last-child { 
            margin-bottom: 0; 
          }
          
          .med-name { 
            font-weight: bold; 
            font-size: 11px;
            margin-bottom: 2px;
          }
          
          .med-details { 
            font-size: 10px; 
            color: #666; 
          }
          
          .recommendations { 
            border: 1px solid #eee;
            padding: 10px;
          }
          
          .rec-list { 
            list-style: none; 
          }
          
          .rec-item { 
            margin-bottom: 4px; 
            padding: 3px 6px;
            background: #f8f9fa;
            border-left: 2px solid #27ae60;
            font-size: 10px;
          }
          
          .lab-results { 
            border: 1px solid #eee;
            padding: 10px;
          }
          
          .lab-item { 
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px; 
            padding: 4px 6px;
            background: #f8f9fa;
            border-left: 2px solid #27ae60;
            font-size: 10px;
          }
          
          .lab-test { 
            font-weight: bold; 
          }
          
          .lab-result { 
            font-weight: bold;
          }
          
          .next-appointment {
            margin-top: 10px;
            padding: 6px 10px;
            background: #fff9e6;
            border-left: 3px solid #f39c12;
            font-size: 10px;
          }
          
          .page-break { 
            page-break-before: always; 
          }
          
          .footer { 
            text-align: center; 
            margin-top: 25px; 
            padding-top: 10px; 
            border-top: 1px solid #ddd;
            font-size: 9px;
            color: #666;
          }
          
          @media print { 
            body { margin: 0; }
            .container { padding: 15mm; }
            .consultation { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <h1>HISTORIAL MÉDICO VETERINARIO</h1>
            <h2>Paciente: ${petData.name}</h2>
            <p>Fecha de emisión: ${new Date().toLocaleDateString("es-ES")}</p>
          </div>

          <!-- Información del paciente y propietario -->
          <div class="info-section">
            <div class="info-card">
              <h3>Datos del Paciente</h3>
              <div class="info-row">
                <span class="info-label">Nombre:</span>
                <span class="info-value">${petData.name}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Especie:</span>
                <span class="info-value">${petData.species}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Raza:</span>
                <span class="info-value">${petData.breed}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Color:</span>
                <span class="info-value">${petData.color}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Peso:</span>
                <span class="info-value">${petData.weight}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Género:</span>
                <span class="info-value">${petData.gender}</span>
              </div>
              <div class="info-row">
                <span class="info-label">F. Nacimiento:</span>
                <span class="info-value">${petData.birthDate}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Estado:</span>
                <span class="info-value">${petData.reproductiveStatus}</span>
              </div>
            </div>
            
            <div class="info-card">
              <h3>Datos del Propietario</h3>
              <div class="info-row">
                <span class="info-label">Nombre:</span>
                <span class="info-value">${petData.owner.name}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Teléfono:</span>
                <span class="info-value">${petData.owner.phone}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">${petData.owner.email}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Dirección:</span>
                <span class="info-value">${petData.owner.address}</span>
              </div>
            </div>
          </div>

          <!-- Título del historial -->
          <h2 class="history-title">REGISTRO DE CONSULTAS</h2>
          
          <!-- Consultas -->
          ${medicalHistory
            .map(
              (consultation, index) => `
            <div class="consultation ${index > 0 ? "page-break" : ""}">
              <div class="consultation-header">
                <div class="consultation-title">${consultation.type}</div>
                <div class="consultation-meta">${consultation.date} - ${consultation.time} - ${consultation.veterinarian}</div>
              </div>
              
              <div class="consultation-body">
                <!-- Información básica -->
                <div class="basic-info">
                  <div class="basic-row">
                    <span class="basic-label">Diagnóstico:</span>
                    <span>${consultation.diagnosis}</span>
                  </div>
                  <div class="basic-row">
                    <span class="basic-label">Tratamiento:</span>
                    <span>${consultation.treatment}</span>
                  </div>
                  <div class="basic-row">
                    <span class="basic-label">Notas:</span>
                    <span>${consultation.notes}</span>
                  </div>
                </div>
                
                <!-- Síntomas -->
                <div class="section">
                  <div class="section-title">Síntomas</div>
                  <div class="symptoms-list">
                    ${consultation.symptoms.map((symptom) => `<div class="symptom">${symptom}</div>`).join("")}
                  </div>
                </div>
                
                <!-- Examen físico -->
                <div class="section">
                  <div class="section-title">Examen Físico</div>
                  <div class="exam-grid">
                    <div class="exam-item">
                      <span class="exam-label">Temperatura</span>
                      <span class="exam-value">${consultation.physicalExam.temperature}</span>
                    </div>
                    <div class="exam-item">
                      <span class="exam-label">Peso</span>
                      <span class="exam-value">${consultation.physicalExam.weight}</span>
                    </div>
                    <div class="exam-item">
                      <span class="exam-label">F. Cardíaca</span>
                      <span class="exam-value">${consultation.physicalExam.heartRate}</span>
                    </div>
                    <div class="exam-item">
                      <span class="exam-label">F. Respiratoria</span>
                      <span class="exam-value">${consultation.physicalExam.respiratoryRate}</span>
                    </div>
                    <div class="exam-item">
                      <span class="exam-label">P. Arterial</span>
                      <span class="exam-value">${consultation.physicalExam.bloodPressure}</span>
                    </div>
                    <div class="exam-item">
                      <span class="exam-label">Condición</span>
                      <span class="exam-value">${consultation.physicalExam.bodyCondition}</span>
                    </div>
                  </div>
                </div>
                
                ${
                  consultation.labResults.length > 0
                    ? `
                  <!-- Resultados de laboratorio -->
                  <div class="section">
                    <div class="section-title">Laboratorio</div>
                    <div class="lab-results">
                      ${consultation.labResults
                        .map(
                          (result) => `
                        <div class="lab-item">
                          <div>
                            <div class="lab-test">${result.test}</div>
                            <div style="font-size: 9px; color: #999;">${result.reference}</div>
                          </div>
                          <div class="lab-result">${result.result}</div>
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
                <div class="section">
                  <div class="section-title">Medicamentos</div>
                  <div class="medications">
                    ${consultation.medications
                      .map(
                        (med) => `
                      <div class="medication">
                        <div class="med-name">${med.name}</div>
                        <div class="med-details">
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
                <div class="section">
                  <div class="section-title">Recomendaciones</div>
                  <div class="recommendations">
                    <ul class="rec-list">
                      ${consultation.recommendations.map((rec) => `<li class="rec-item">${rec}</li>`).join("")}
                    </ul>
                  </div>
                </div>
                
                ${
                  consultation.nextAppointment
                    ? `
                  <!-- Próxima cita -->
                  <div class="next-appointment">
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
          <div class="footer">
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
