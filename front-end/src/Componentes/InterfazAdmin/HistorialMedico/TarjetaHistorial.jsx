// Librarys 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Import styles 
import "../../../styles/InterfazAdmin/HistorialMedico/TarjetaHistorial.css"

// Component 
const TarjetaHistorial = ({ record, onClick }) => {
  return (
    <Card
      className="card-hist cursor-pointer hover:shadow-lg transition-all duration-200"
      onClick={() => onClick(record)}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{record.type}</CardTitle>
            <CardDescription>
              {record.date} • {record.time} • {record.veterinarian}
            </CardDescription>
          </div>
          <span className="est-comp">Completado</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <h4 className="font-semibold text-gray-700">Diagnóstico</h4>
            <p className="text-gray-900">{record.diagnosis}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700">Tratamiento</h4>
            <p className="text-gray-900">{record.treatment}</p>
          </div>
          <p className="text-sm link-det font-medium mt-3">Clic para ver detalles completos →</p>
        </div>
      </CardContent>
    </Card>
  )
}

// export 
export default TarjetaHistorial