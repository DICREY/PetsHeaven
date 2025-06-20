import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, FileText, Info, Calendar } from "lucide-react"
import "../styles/modal-detalle-vacuna.css"

export default function ModalDetalleVacuna({ isOpen, onClose, vaccine }) {
  if (!vaccine) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Shield className="w-6 h-6 ico-vac" />
            {vaccine.name}
          </DialogTitle>
          <DialogDescription className="text-lg flex items-center gap-2">
            <span className="badge-id">{vaccine.id}</span>
            <span className="badge-cat">{vaccine.category}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Información de aplicación */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="w-5 h-5 ico-fecha-vac" />
                Información de Aplicación
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="item-fecha-vac">
                  <h4 className="font-semibold text-gray-700">Última aplicación</h4>
                  <p className="text-gray-900 font-medium">{vaccine.date}</p>
                </div>
                <div className="item-fecha-vac">
                  <h4 className="font-semibold text-gray-700">Próxima dosis</h4>
                  <p className="text-gray-900 font-medium">{vaccine.nextDue}</p>
                </div>
                <div className="item-fecha-vac">
                  <h4 className="font-semibold text-gray-700">Estado</h4>
                  <span
                    className={`est-vac ${
                      vaccine.status === "up-to-date"
                        ? "est-aldia-vac"
                        : vaccine.status === "due-soon"
                          ? "est-prox-vac"
                          : "est-venc-vac"
                    }`}
                  >
                    {vaccine.status === "up-to-date" ? "Al día" : vaccine.status === "due-soon" ? "Próxima" : "Vencida"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Descripción */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5 ico-desc-vac" />
                Descripción
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{vaccine.description}</p>
            </CardContent>
          </Card>

          {/* Información técnica */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="w-5 h-5 ico-tec-vac" />
                Información Técnica
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{vaccine.technicalDescription}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="item-info-vac">
                  <h4 className="font-semibold text-gray-700">Laboratorio</h4>
                  <p className="text-gray-900">{vaccine.laboratory}</p>
                </div>
                <div className="item-info-vac">
                  <h4 className="font-semibold text-gray-700">Lote</h4>
                  <p className="text-gray-900">{vaccine.batchNumber}</p>
                </div>
                <div className="item-info-vac">
                  <h4 className="font-semibold text-gray-700">Fecha de fabricación</h4>
                  <p className="text-gray-900">{vaccine.manufacturingDate}</p>
                </div>
                <div className="item-info-vac">
                  <h4 className="font-semibold text-gray-700">Fecha de vencimiento</h4>
                  <p className="text-gray-900">{vaccine.expirationDate}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
