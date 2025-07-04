import React from "react";

export default function GeneradorPDF({ petData = {}, medicalHistory = [] }) {
  // Datos por defecto
  const defaultPetData = {
    name: "Nombre no especificado",
    species: "Especie no especificada",
    breed: "Raza no especificada",
    color: "Color no especificado",
    weight: "Peso no especificado",
    gender: "Género no especificado",
    birthDate: "Fecha no especificada",
    reproductiveStatus: "Estado no especificado",
    owner: {
      name: "Dueño no especificado",
      phone: "Teléfono no especificado",
      email: "Email no especificado",
      address: "Dirección no especificada"
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
        }
        .tarjeta-info-pdf h3 {
          font-size: 13px;
          margin-bottom: 10px;
          font-weight: bold;
          text-transform: uppercase;
          border-bottom: 1px solid #eee;
          padding-bottom: 5px;
        }
        .titulo-tarjeta-pdf {
          font-size: 13px;
          margin-bottom: 10px;
          font-weight: bold;
          text-transform: uppercase;
          border-bottom: 1px solid #eee;
          padding-bottom: 5px;
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
        }
        .valor-info-pdf {
          text-align: right;
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
        }
        .consulta-pdf {
          margin-bottom: 20px;
          border: 1px solid #ddd;
          page-break-inside: avoid;
        }
        .cabecera-consulta-pdf {
          background: #f8f9fa;
          padding: 10px 15px;
          border-bottom: 1px solid #ddd;
        }
        .titulo-consulta-pdf {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 3px;
        }
        .meta-consulta-pdf {
          font-size: 10px;
          color: #666;
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
        }
        .etiqueta-examen-pdf {
          display: block;
          font-weight: bold;
          margin-bottom: 2px;
          text-transform: uppercase;
          font-size: 9px;
        }
        .valor-examen-pdf {
          font-size: 11px;
        }
        .medicamentos-pdf {
          border: 1px solid #eee;
          padding: 10px;
        }
        .medicamento-pdf {
          margin-bottom: 8px;
          padding: 6px;
          background: #f8f9fa;
          border-left: 2px solid #9b59b6;
        }
        .medicamento-pdf:last-child {
          margin-bottom: 0;
        }
        .nombre-med-pdf {
          font-weight: bold;
          font-size: 11px;
          margin-bottom: 2px;
        }
        .detalles-med-pdf {
          font-size: 10px;
          color: #666;
        }
        .recomendaciones-pdf {
          border: 1px solid #eee;
          padding: 10px;
        }
        .lista-rec-pdf {
          list-style: none;
        }
        .item-rec-pdf {
          margin-bottom: 4px;
          padding: 3px 6px;
          background: #f8f9fa;
          border-left: 2px solid #27ae60;
          font-size: 10px;
        }
        .resultados-lab-pdf {
          border: 1px solid #eee;
          padding: 10px;
        }
        .item-lab-pdf {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
          padding: 4px 6px;
          background: #f8f9fa;
          border-left: 2px solid #27ae60;
          font-size: 10px;
        }
        .prueba-lab-pdf {
          font-weight: bold;
        }
        .resultado-lab-pdf {
          font-weight: bold;
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

            <!-- Resto del contenido HTML (igual que antes) -->
            <!-- ... -->
            
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