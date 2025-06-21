import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit } from "lucide-react"

// Import styles 
import "../../../styles/InterfazAdmin/HistorialMedico/EditarMascota.css"

export default function FormularioEditarMascota({
  isOpen,
  onClose,
  petData,
  editPetData,
  setEditPetData,
  onSave,
  onCancel,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Edit className="w-6 h-6 icono-edit-form" />
            Editar Datos de {petData.name}
          </DialogTitle>
          <DialogDescription>Modifique la información de la mascota</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="edit-name">Nombre</Label>
              <Input
                id="edit-name"
                value={editPetData.name}
                onChange={(e) => setEditPetData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="edit-species">Especie</Label>
              <Input
                id="edit-species"
                value={editPetData.species}
                onChange={(e) => setEditPetData((prev) => ({ ...prev, species: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="edit-breed">Raza</Label>
              <Input
                id="edit-breed"
                value={editPetData.breed}
                onChange={(e) => setEditPetData((prev) => ({ ...prev, breed: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="edit-color">Color</Label>
              <Input
                id="edit-color"
                value={editPetData.color}
                onChange={(e) => setEditPetData((prev) => ({ ...prev, color: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="edit-food">Alimento</Label>
              <Input
                id="edit-food"
                value={editPetData.food}
                onChange={(e) => setEditPetData((prev) => ({ ...prev, food: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="edit-weight">Peso</Label>
              <Input
                id="edit-weight"
                value={editPetData.weight}
                onChange={(e) => setEditPetData((prev) => ({ ...prev, weight: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="edit-reproductive">Estado Reproductivo</Label>
              <Select
                value={editPetData.reproductiveStatus}
                onValueChange={(value) => setEditPetData((prev) => ({ ...prev, reproductiveStatus: value }))}
              >
                <SelectTrigger>
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
            </div>
            <div>
              <Label htmlFor="edit-gender">Género</Label>
              <Select
                value={editPetData.gender}
                onValueChange={(value) => setEditPetData((prev) => ({ ...prev, gender: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Macho">Macho</SelectItem>
                  <SelectItem value="Hembra">Hembra</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-birthdate">Fecha de Nacimiento</Label>
              <Input
                id="edit-birthdate"
                type="date"
                value={editPetData.birthDate}
                onChange={(e) => setEditPetData((prev) => ({ ...prev, birthDate: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="edit-microchip">Microchip</Label>
            <Input
              id="edit-microchip"
              value={editPetData.microchip}
              onChange={(e) => setEditPetData((prev) => ({ ...prev, microchip: e.target.value }))}
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Datos del Propietario</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-owner-name">Nombre del propietario</Label>
                <Input
                  id="edit-owner-name"
                  value={editPetData.owner.name}
                  onChange={(e) =>
                    setEditPetData((prev) => ({
                      ...prev,
                      owner: { ...prev.owner, name: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-owner-phone">Teléfono</Label>
                <Input
                  id="edit-owner-phone"
                  value={editPetData.owner.phone}
                  onChange={(e) =>
                    setEditPetData((prev) => ({
                      ...prev,
                      owner: { ...prev.owner, phone: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-owner-email">Email</Label>
                <Input
                  id="edit-owner-email"
                  type="email"
                  value={editPetData.owner.email}
                  onChange={(e) =>
                    setEditPetData((prev) => ({
                      ...prev,
                      owner: { ...prev.owner, email: e.target.value },
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-owner-address">Dirección</Label>
                <Input
                  id="edit-owner-address"
                  value={editPetData.owner.address}
                  onChange={(e) =>
                    setEditPetData((prev) => ({
                      ...prev,
                      owner: { ...prev.owner, address: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button onClick={onSave} className="boton-guardar-edit">
              Guardar Cambios
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
