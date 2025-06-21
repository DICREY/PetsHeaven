"use client"

import { useState } from "react"
import { User, Phone, MapPin, Edit, Save, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Import styles 
import "../../../styles/InterfazAdmin/HistorialMedico/ResumenMascota.css"

export default function ResumenMascota({ petData, setPetData }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState(petData)

  const handleSave = () => {
    setPetData(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData(petData)
    setIsEditing(false)
  }

  const handleChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setEditData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }))
    } else {
      setEditData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  return (
    <Card className="head-masc">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-gray-900">
              {isEditing ? (
                <Input
                  value={editData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="text-3xl font-bold border-none p-0 h-auto bg-transparent"
                />
              ) : (
                petData.name
              )}
            </h1>
          </div>
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button size="sm" onClick={handleSave} className="btn-guardar">
                  <Save className="w-4 h-4 mr-1" />
                  Guardar
                </Button>
                <Button size="sm" variant="outline" onClick={handleCancel}>
                  <X className="w-4 h-4 mr-1" />
                  Cancelar
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" onClick={() => setIsEditing(true)} className="btn-editar">
                <Edit className="w-4 h-4 mr-1" />
                Editar
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0">
            <Avatar className="w-24 h-24 md:w-32 md:h-32">
              <AvatarImage src={petData.photo || "/placeholder.svg"} alt={petData.name} />
              <AvatarFallback className="text-2xl font-bold avatar-masc">{petData.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="info-item">
                <span className="info-label">Especie:</span>
                {isEditing ? (
                  <Input
                    value={editData.species}
                    onChange={(e) => handleChange("species", e.target.value)}
                    className="info-input"
                  />
                ) : (
                  <span className="info-value">{petData.species}</span>
                )}
              </div>
              <div className="info-item">
                <span className="info-label">Raza:</span>
                {isEditing ? (
                  <Input
                    value={editData.breed}
                    onChange={(e) => handleChange("breed", e.target.value)}
                    className="info-input"
                  />
                ) : (
                  <span className="info-value">{petData.breed}</span>
                )}
              </div>
              <div className="info-item">
                <span className="info-label">Color:</span>
                {isEditing ? (
                  <Input
                    value={editData.color}
                    onChange={(e) => handleChange("color", e.target.value)}
                    className="info-input"
                  />
                ) : (
                  <span className="info-value">{petData.color}</span>
                )}
              </div>
              <div className="info-item">
                <span className="info-label">Peso:</span>
                {isEditing ? (
                  <Input
                    value={editData.weight}
                    onChange={(e) => handleChange("weight", e.target.value)}
                    className="info-input"
                  />
                ) : (
                  <span className="info-value">{petData.weight}</span>
                )}
              </div>
              <div className="info-item">
                <span className="info-label">Género:</span>
                {isEditing ? (
                  <Select value={editData.gender} onValueChange={(value) => handleChange("gender", value)}>
                    <SelectTrigger className="info-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Macho">Macho</SelectItem>
                      <SelectItem value="Hembra">Hembra</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="info-value">{petData.gender}</span>
                )}
              </div>
              <div className="info-item">
                <span className="info-label">Nacimiento:</span>
                {isEditing ? (
                  <Input
                    type="date"
                    value={editData.birthDate}
                    onChange={(e) => handleChange("birthDate", e.target.value)}
                    className="info-input"
                  />
                ) : (
                  <span className="info-value">{petData.birthDate}</span>
                )}
              </div>
              <div className="info-item">
                <span className="info-label">Estado:</span>
                {isEditing ? (
                  <Select
                    value={editData.reproductiveStatus}
                    onValueChange={(value) => handleChange("reproductiveStatus", value)}
                  >
                    <SelectTrigger className="info-select">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Entero">Entero</SelectItem>
                      <SelectItem value="Esterilizado">Esterilizado</SelectItem>
                      <SelectItem value="Esterilizada">Esterilizada</SelectItem>
                      <SelectItem value="Castrado">Castrado</SelectItem>
                      <SelectItem value="Castrada">Castrada</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <span className="info-value">{petData.reproductiveStatus}</span>
                )}
              </div>
              <div className="info-item">
                <span className="info-label">Alimento:</span>
                {isEditing ? (
                  <Input
                    value={editData.food}
                    onChange={(e) => handleChange("food", e.target.value)}
                    className="info-input"
                  />
                ) : (
                  <span className="info-value">{petData.food}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="info-prop">
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Propietario
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-600">Nombre:</span>
                    {isEditing ? (
                      <Input
                        value={editData.owner.name}
                        onChange={(e) => handleChange("owner.name", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium">{petData.owner.name}</p>
                    )}
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Teléfono:</span>
                    {isEditing ? (
                      <Input
                        value={editData.owner.phone}
                        onChange={(e) => handleChange("owner.phone", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-gray-600 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {petData.owner.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="info-prop">
                <h3 className="font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Contacto
                </h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-gray-600">Email:</span>
                    {isEditing ? (
                      <Input
                        value={editData.owner.email}
                        onChange={(e) => handleChange("owner.email", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-gray-900">{petData.owner.email}</p>
                    )}
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Dirección:</span>
                    {isEditing ? (
                      <Input
                        value={editData.owner.address}
                        onChange={(e) => handleChange("owner.address", e.target.value)}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-gray-600">{petData.owner.address}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
