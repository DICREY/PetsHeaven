import React from "react";
import { formatDate } from "../../Varios/Util";

export default function GeneradorPDF({ petData = {}, medicalHistory = [] }) {
  // Datos por defecto
  const defaultPetData = {
    name: petData?.nom_per,
    species: petData?.esp_mas,
    breed: petData?.raz_mas,
    color: petData?.col_mas,
    weight: petData?.pes_mas,
    gender: petData?.gen_mas,
    birthDate: formatDate(petData?.fec_nac_mas),
    reproductiveStatus: petData?.est_rep_mas,
    owner: {
      name: `${petData?.nom_per} ${petData?.ape_per}`,
      phone: petData?.cel_per,
      email: petData?.email_per,
      address: petData?.dir_per
    }
  };

  const defaultMedicalHistory = [{
    type: "Consulta general",
    date: new Date().toLocaleDateString("es-ES"),
    time: new Date().toLocaleTimeString("es-ES", {hour: '2-digit', minute:'2-digit'}),
    veterinarian: "Veterinario no especificado",
    diagnosis: "Diagnóstico no especificado",
    treatment: "Tratamiento no especificado",
    notes: "Notas no especificadas",
    symptoms: ["Síntoma no especificado"],
    physicalExam: {
      temperature: "No registrada",
      weight: "No registrado",
      heartRate: "No registrada",
      respiratoryRate: "No registrada",
      bloodPressure: "No registrada",
      bodyCondition: "No registrada"
    },
    labResults: [],
    medications: [{
      name: "Medicamento no especificado",
      dosage: "Dosis no especificada",
      duration: "Duración no especificada",
      instructions: "Instrucciones no especificadas"
    }],
    recommendations: ["Recomendación no especificada"]
  }];

  const generatePDF = () => {
    try {
      // Combinar datos con valores por defecto
      const safePetData = { ...defaultPetData, ...petData };
      const safeMedicalHistory = medicalHistory.length > 0 ? medicalHistory : defaultMedicalHistory;

      const printWindow = window.open("", "_blank");
      if (!printWindow) {
        throw new Error("El navegador bloqueó la ventana emergente. Por favor, permite ventanas emergentes para este sitio.");
      }

      // CSS embebido como string
      const cssStyles = `
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: "Times New Roman", serif;
          line-height: 1.4;
          color: #2c3e50;
          background: #fff;
          font-size: 12px;
        }
        .contenedor-pdf {
          max-width: 210mm;
          margin: 0 auto;
          padding: 20mm;
        }
        .cabecera-pdf {
          text-align: center;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 2px solid #2c3e50;
        }
        .titulo-pdf {
          font-size: 20px;
          margin-bottom: 5px;
          font-weight: bold;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .subtitulo-pdf {
          font-size: 16px;
          margin-bottom: 3px;
          font-weight: normal;
        }
        .fecha-pdf {
          font-size: 11px;
          color: #666;
        }
        .seccion-info-pdf {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 25px;
          border: 1px solid #ddd;
          padding: 15px;
          border-radius: 5px;
        }
        .tarjeta-info-pdf {
          margin-bottom: 15px;
        }
        .tarjeta-info-pdf h3 {
          font-size: 13px;
          margin-bottom: 10px;
          font-weight: bold;
          text-transform: uppercase;
          border-bottom: 1px solid #eee;
          padding-bottom: 5px;
          color: #2c3e50;
        }
        .fila-info-pdf {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          font-size: 11px;
        }
        .etiqueta-info-pdf {
          font-weight: bold;
          min-width: 80px;
          color: #7f8c8d;
        }
        .valor-info-pdf {
          text-align: right;
          color: #2c3e50;
        }
        .titulo-historial-pdf {
          font-size: 16px;
          margin: 20px 0 15px 0;
          text-align: center;
          font-weight: bold;
          text-transform: uppercase;
          border-top: 1px solid #ddd;
          border-bottom: 1px solid #ddd;
          padding: 8px 0;
          color: #2c3e50;
        }
        .consulta-pdf {
          margin-bottom: 20px;
          border: 1px solid #ddd;
          page-break-inside: avoid;
          border-radius: 5px;
          overflow: hidden;
        }
        .cabecera-consulta-pdf {
          background: #f8f9fa;
          padding: 10px 15px;
          border-bottom: 1px solid #ddd;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .titulo-consulta-pdf {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 3px;
          color: #2c3e50;
        }
        .meta-consulta-pdf {
          font-size: 10px;
          color: #666;
          text-align: right;
        }
        .cuerpo-consulta-pdf {
          padding: 15px;
        }
        .seccion-pdf {
          margin-bottom: 15px;
        }
        .titulo-seccion-pdf {
          font-size: 12px;
          margin-bottom: 8px;
          font-weight: bold;
          text-transform: uppercase;
          border-bottom: 1px dotted #ccc;
          padding-bottom: 3px;
          color: #2c3e50;
        }
        .info-basica-pdf {
          margin-bottom: 12px;
        }
        .fila-basica-pdf {
          display: flex;
          margin-bottom: 5px;
          font-size: 11px;
        }
        .etiqueta-basica-pdf {
          font-weight: bold;
          min-width: 80px;
          color: #7f8c8d;
        }
        .valor-basica-pdf {
          color: #2c3e50;
        }
        .lista-sintomas-pdf {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 5px;
        }
        .sintoma-pdf {
          font-size: 10px;
          padding: 3px 6px;
          background: #f8f9fa;
          border-left: 2px solid #e74c3c;
          border-radius: 3px;
        }
        .grilla-examen-pdf {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }
        .item-examen-pdf {
          text-align: center;
          padding: 6px;
          border: 1px solid #eee;
          font-size: 10px;
          border-radius: 3px;
          background: #f8f9fa;
        }
        .etiqueta-examen-pdf {
          display: block;
          font-weight: bold;
          margin-bottom: 2px;
          text-transform: uppercase;
          font-size: 9px;
          color: #7f8c8d;
        }
        .valor-examen-pdf {
          font-size: 11px;
          color: #2c3e50;
        }
        .medicamentos-pdf {
          border: 1px solid #eee;
          padding: 10px;
          border-radius: 5px;
        }
        .medicamento-pdf {
          margin-bottom: 8px;
          padding: 6px;
          background: #f8f9fa;
          border-left: 2px solid #9b59b6;
          border-radius: 3px;
        }
        .medicamento-pdf:last-child {
          margin-bottom: 0;
        }
        .nombre-med-pdf {
          font-weight: bold;
          font-size: 11px;
          margin-bottom: 2px;
          color: #2c3e50;
        }
        .detalles-med-pdf {
          font-size: 10px;
          color: #666;
        }
        .recomendaciones-pdf {
          border: 1px solid #eee;
          padding: 10px;
          border-radius: 5px;
        }
        .lista-rec-pdf {
          list-style: none;
        }
        .item-rec-pdf {
          margin-bottom: 4px;
          padding: 3px 6px;
          background: #f8f9fa;
          border-left: 2px solid #27ae60;
          border-radius: 3px;
          font-size: 10px;
        }
        .resultados-lab-pdf {
          border: 1px solid #eee;
          padding: 10px;
          border-radius: 5px;
        }
        .item-lab-pdf {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          padding: 4px 6px;
          background: #f8f9fa;
          border-left: 2px solid #3498db;
          border-radius: 3px;
          font-size: 10px;
        }
        .prueba-lab-pdf {
          font-weight: bold;
          color: #2c3e50;
        }
        .resultado-lab-pdf {
          font-weight: bold;
          color: #2c3e50;
        }
        .ref-lab-pdf {
          font-size: 9px;
          color: #999;
        }
        .proxima-cita-pdf {
          margin-top: 10px;
          padding: 6px 10px;
          background: #fff9e6;
          border-left: 3px solid #f39c12;
          font-size: 10px;
          border-radius: 3px;
        }
        .nueva-pagina-pdf {
          page-break-before: always;
        }
        .pie-pdf {
          text-align: center;
          margin-top: 25px;
          padding-top: 10px;
          border-top: 1px solid #ddd;
          font-size: 9px;
          color: #666;
        }
        .logo-clinica {
          max-width: 150px;
          margin-bottom: 10px;
        }
        @media print {
          body {
            margin: 0;
          }
          .contenedor-pdf {
            padding: 15mm;
          }
          .consulta-pdf {
            page-break-inside: avoid;
          }
        }
      `;

      const renderPetInfo = (pet) => `
        <div class="tarjeta-info-pdf">
          <h3>Información de la Mascota</h3>
          <div class="fila-info-pdf">
            <span class="etiqueta-info-pdf">Nombre:</span>
            <span class="valor-info-pdf">${pet.name || 'No especificado'}</span>
          </div>
          <div class="fila-info-pdf">
            <span class="etiqueta-info-pdf">Especie:</span>
            <span class="valor-info-pdf">${pet.species || 'No especificado'}</span>
          </div>
          <div class="fila-info-pdf">
            <span class="etiqueta-info-pdf">Raza:</span>
            <span class="valor-info-pdf">${pet.breed || 'No especificado'}</span>
          </div>
          <div class="fila-info-pdf">
            <span class="etiqueta-info-pdf">Color:</span>
            <span class="valor-info-pdf">${pet.color || 'No especificado'}</span>
          </div>
          <div class="fila-info-pdf">
            <span class="etiqueta-info-pdf">Peso:</span>
            <span class="valor-info-pdf">${pet.weight || 'No especificado'} kg</span>
          </div>
          <div class="fila-info-pdf">
            <span class="etiqueta-info-pdf">Sexo:</span>
            <span class="valor-info-pdf">${pet.gender || 'No especificado'}</span>
          </div>
          <div class="fila-info-pdf">
            <span class="etiqueta-info-pdf">Fecha Nac.:</span>
            <span class="valor-info-pdf">${pet.birthDate || 'No especificada'}</span>
          </div>
          <div class="fila-info-pdf">
            <span class="etiqueta-info-pdf">Estado Repro.:</span>
            <span class="valor-info-pdf">${pet.reproductiveStatus || 'No especificado'}</span>
          </div>
        </div>
      `;

      const renderOwnerInfo = (owner) => `
        <div class="tarjeta-info-pdf">
          <h3>Información del Dueño</h3>
          <div class="fila-info-pdf">
            <span class="etiqueta-info-pdf">Nombre:</span>
            <span class="valor-info-pdf">${owner.name || 'No especificado'}</span>
          </div>
          <div class="fila-info-pdf">
            <span class="etiqueta-info-pdf">Teléfono:</span>
            <span class="valor-info-pdf">${owner.phone || 'No especificado'}</span>
          </div>
          <div class="fila-info-pdf">
            <span class="etiqueta-info-pdf">Email:</span>
            <span class="valor-info-pdf">${owner.email || 'No especificado'}</span>
          </div>
          <div class="fila-info-pdf">
            <span class="etiqueta-info-pdf">Dirección:</span>
            <span class="valor-info-pdf">${owner.address || 'No especificada'}</span>
          </div>
        </div>
      `;

      const renderConsultation = (consult, index) => `
        <div class="consulta-pdf" key="${index}">
          <div class="cabecera-consulta-pdf">
            <div>
              <div class="titulo-consulta-pdf">${consult.type || 'Consulta'}</div>
            </div>
            <div class="meta-consulta-pdf">
              <div>${consult.date || ''}</div>
              <div>${consult.time || ''}</div>
              <div>${consult.veterinarian || ''}</div>
            </div>
          </div>
          
          <div class="cuerpo-consulta-pdf">
            <div class="seccion-pdf">
              <div class="titulo-seccion-pdf">Diagnóstico</div>
              <div class="info-basica-pdf">
                <div class="fila-basica-pdf">
                  <span class="etiqueta-basica-pdf">Diagnóstico:</span>
                  <span class="valor-basica-pdf">${consult.diagnosis || 'No especificado'}</span>
                </div>
                <div class="fila-basica-pdf">
                  <span class="etiqueta-basica-pdf">Tratamiento:</span>
                  <span class="valor-basica-pdf">${consult.treatment || 'No especificado'}</span>
                </div>
                <div class="fila-basica-pdf">
                  <span class="etiqueta-basica-pdf">Notas:</span>
                  <span class="valor-basica-pdf">${consult.notes || 'No especificadas'}</span>
                </div>
              </div>
            </div>
            
            ${consult.symptoms && consult.symptoms.length > 0 ? `
            <div class="seccion-pdf">
              <div class="titulo-seccion-pdf">Síntomas</div>
              <div class="lista-sintomas-pdf">
                ${consult.symptoms.map(symptom => `
                  <div class="sintoma-pdf">${symptom}</div>
                `).join('')}
              </div>
            </div>
            ` : ''}
            
            <div class="seccion-pdf">
              <div class="titulo-seccion-pdf">Examen Físico</div>
              <div class="grilla-examen-pdf">
                <div class="item-examen-pdf">
                  <span class="etiqueta-examen-pdf">Temperatura</span>
                  <span class="valor-examen-pdf">${consult.physicalExam?.temperature || 'No registrada'}</span>
                </div>
                <div class="item-examen-pdf">
                  <span class="etiqueta-examen-pdf">Peso</span>
                  <span class="valor-examen-pdf">${consult.physicalExam?.weight || 'No registrado'}</span>
                </div>
                <div class="item-examen-pdf">
                  <span class="etiqueta-examen-pdf">Frec. Cardíaca</span>
                  <span class="valor-examen-pdf">${consult.physicalExam?.heartRate || 'No registrada'}</span>
                </div>
                <div class="item-examen-pdf">
                  <span class="etiqueta-examen-pdf">Frec. Respiratoria</span>
                  <span class="valor-examen-pdf">${consult.physicalExam?.respiratoryRate || 'No registrada'}</span>
                </div>
                <div class="item-examen-pdf">
                  <span class="etiqueta-examen-pdf">Presión Arterial</span>
                  <span class="valor-examen-pdf">${consult.physicalExam?.bloodPressure || 'No registrada'}</span>
                </div>
                <div class="item-examen-pdf">
                  <span class="etiqueta-examen-pdf">Condición Corporal</span>
                  <span class="valor-examen-pdf">${consult.physicalExam?.bodyCondition || 'No registrada'}</span>
                </div>
              </div>
            </div>
            
            ${consult.medications && consult.medications.length > 0 ? `
            <div class="seccion-pdf">
              <div class="titulo-seccion-pdf">Medicamentos</div>
              <div class="medicamentos-pdf">
                ${consult.medications.map(med => `
                  <div class="medicamento-pdf">
                    <div class="nombre-med-pdf">${med.name || 'Medicamento no especificado'}</div>
                    <div class="detalles-med-pdf">
                      <div>Dosis: ${med.dosage || 'No especificada'}</div>
                      <div>Duración: ${med.duration || 'No especificada'}</div>
                      <div>Instrucciones: ${med.instructions || 'No especificadas'}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
            ` : ''}
            
            ${consult.labResults && consult.labResults.length > 0 ? `
            <div class="seccion-pdf">
              <div class="titulo-seccion-pdf">Resultados de Laboratorio</div>
              <div class="resultados-lab-pdf">
                ${consult.labResults.map(test => `
                  <div class="item-lab-pdf">
                    <span class="prueba-lab-pdf">${test.name || 'Prueba no especificada'}</span>
                    <span class="resultado-lab-pdf">${test.result || 'No especificado'}</span>
                  </div>
                  ${test.reference ? `<div class="ref-lab-pdf">Valores de referencia: ${test.reference}</div>` : ''}
                `).join('')}
              </div>
            </div>
            ` : ''}
            
            ${consult.recommendations && consult.recommendations.length > 0 ? `
            <div class="seccion-pdf">
              <div class="titulo-seccion-pdf">Recomendaciones</div>
              <div class="recomendaciones-pdf">
                <ul class="lista-rec-pdf">
                  ${consult.recommendations.map(rec => `
                    <li class="item-rec-pdf">${rec}</li>
                  `).join('')}
                </ul>
              </div>
            </div>
            ` : ''}
            
            ${consult.nextAppointment ? `
            <div class="proxima-cita-pdf">
              <strong>Próxima cita:</strong> ${consult.nextAppointment}
            </div>
            ` : ''}
          </div>
        </div>
      `;

      const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Historial Médico - ${safePetData.name}</title>
          <meta charset="UTF-8">
          <style>${cssStyles}</style>
        </head>
        <body>
          <div class="contenedor-pdf">
            <!-- Header -->
            <div class="cabecera-pdf">
              <h1 class="titulo-pdf">HISTORIAL MÉDICO VETERINARIO</h1>
              <h2 class="subtitulo-pdf">Paciente: ${safePetData.name}</h2>
              <p class="fecha-pdf">Fecha de emisión: ${new Date().toLocaleDateString("es-ES")}</p>
            </div>
            
            <!-- Información de la mascota y dueño -->
            <div class="seccion-info-pdf">
              ${renderPetInfo(safePetData)}
              ${renderOwnerInfo(safePetData.owner || {})}
            </div>
            
            <!-- Historial de consultas -->
            <h3 class="titulo-historial-pdf">Historial de Consultas</h3>
            ${safeMedicalHistory.map((consult, index) => renderConsultation(consult, index)).join('')}
            
            <!-- Pie de página -->
            <div class="pie-pdf">
              <p>Documento generado automáticamente por el sistema veterinario</p>
              <p>© ${new Date().getFullYear()} - Todos los derechos reservados</p>
            </div>
          </div>
        </body>
      </html>
      `;

      printWindow.document.write(htmlContent);
      printWindow.document.close();

      printWindow.onload = function() {
        try {
          printWindow.print();
        } catch (printError) {
          console.error("Error al imprimir:", printError);
          printWindow.close();
          alert("Error al imprimir el documento. Por favor, intenta nuevamente.");
        }
      };
    } catch (error) {
      console.error("Error generando PDF:", error);
      alert(`Error al generar el PDF: ${error.message}`);
    }
  };

  return { generatePDF };
}