import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Stethoscope, AlertCircle, Heart, CheckCircle, Pill } from "lucide-react"
import "../styles/modal-detalle.css"

export default function ModalDetalleConsulta({ isOpen, onClose, consultation }) {
  if (!consultation) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">{consultation.type}</DialogTitle>
          <DialogDescription className="text-lg">
            {consultation.date} • {consultation.time} • {consultation.veterinarian}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Información básica */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 ico-diag" />
                  Diagnóstico y Tratamiento
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-semibold text-gray-700">Diagnóstico</h4>
                  <p className="text-gray-900">{consultation.diagnosis}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Tratamiento</h4>
                  <p className="text-gray-900">{consultation.treatment}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700">Notas del veterinario</h4>
                  <p className="text-gray-600">{consultation.notes}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 ico-sint" />
                  Síntomas Reportados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {consultation.symptoms.map((symptom, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="dot-sint"></div>
                      <span className="text-gray-900">{symptom}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Examen físico */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Heart className="w-5 h-5 ico-exam" />
                Examen Físico
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {Object.entries(consultation.physicalExam).map(([key, value]) => (
                  <div key={key} className="item-exam">
                    <p className="text-sm font-medium text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    <p className="text-lg font-semibold text-gray-900">{value}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Resultados de laboratorio */}
          {consultation.labResults.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 ico-lab" />
                  Resultados de Laboratorio
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {consultation.labResults.map((result, index) => (
                    <div key={index} className="item-lab">
                      <div>
                        <p className="font-medium text-gray-900">{result.test}</p>
                        <p className="text-sm text-gray-600">{result.reference}</p>
                      </div>
                      <span className="res-lab">{result.result}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Medicamentos prescritos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Pill className="w-5 h-5 ico-med" />
                Medicamentos Prescritos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {consultation.medications.map((medication, index) => (
                  <div key={index} className="card-med-det">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{medication.name}</h4>
                      <span className="dur-med">{medication.duration}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <p>
                        <span className="font-medium">Dosis:</span> {medication.dosage}
                      </p>
                      <p>
                        <span className="font-medium">Duración:</span> {medication.duration}
                      </p>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Instrucciones:</span> {medication.instructions}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recomendaciones */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 ico-rec" />
                Recomendaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {consultation.recommendations.map((recommendation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 check-rec mt-0.5 flex-shrink-0" />
                    <span className="text-gray-900">{recommendation}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Información adicional */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Próxima Cita</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-gray-600">Fecha recomendada:</p>
                  <p className="font-semibold text-gray-900">{consultation.nextAppointment}</p>
                  <Button className="w-full mt-3" variant="outline">
                    Agendar Cita
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Imágenes si las hay */}
          {consultation.images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Imágenes de la Consulta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {consultation.images.map((image, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Imagen ${index + 1} de la consulta`}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
