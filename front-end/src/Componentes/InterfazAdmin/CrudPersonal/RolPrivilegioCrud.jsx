// Librarys 
import React from 'react'
import { InfoIcon } from 'lucide-react'

// Import styles
import '../../../../src/styles/InterfazAdmin/FormuariosAdmin/RolPrivilegios.css'

// Component
export const RolPrivilegiosCrud = ({ userData, isEditing, onChange }) => {
  return (
    <section className='rol-privilegios-container'>
      <h2>Perfil del personal</h2>
      <div className='nota-admin'>
        <InfoIcon className='icon' />
        <span>Esta configuración solo es editable por un rol administrador.</span>
      </div>

      <section className='seccion-rol'>
        <div className='grupo-rol'>
          <label className='etiqueta-rol'>
            Rol <span className='obligatorio'>*</span>
          </label>
          <div className='selector-rol'>
            {isEditing ? (
              <select className='campo-selector' value={userData.rol} onChange={(e) => onChange('rol', e.target.value)}>
                <option value='Administrador'>Administrador</option>
                <option value='Veterinario'>Veterinario</option>
                <option value='Asistente'>Asistente</option>
              </select>
            ) : (
              <div className='valor-rol'>{userData.rol}</div>
            )}
          </div>
        </div>
        <p className='descripcion-rol'>El rol determina los privilegios generales que tendrá el usuario.</p>
      </section>

      <div className='separador'></div>

      <section className='seccion-privilegios'>
        <h3>Privilegios de agenda</h3>
        <div className='privilegios-lista'>
          <div className='privilegio-item'>
            <div className='privilegio-header'>
              <label className='privilegio-label'>
                <div className='checkbox-container'>
                  <input
                    type='checkbox'
                    className='checkbox-input'
                    checked={userData.agendaAdmin}
                    onChange={(e) => onChange('agendaAdmin', e.target.checked)}
                    disabled={!isEditing}
                  />
                  <span className='checkbox-custom'></span>
                </div>
                Administración de agenda
              </label>
            </div>
            <p className='privilegio-descripcion'>
              Permite crear, modificar y eliminar citas de cualquier profesional.
            </p>
          </div>

          <div className='privilegio-item'>
            <div className='privilegio-header'>
              <label className='privilegio-label'>
                <div className='checkbox-container'>
                  <input
                    type='checkbox'
                    className='checkbox-input'
                    checked={userData.agendaPersonal}
                    onChange={(e) => onChange('agendaPersonal', e.target.checked)}
                    disabled={!isEditing}
                  />
                  <span className='checkbox-custom'></span>
                </div>
                Agenda personal
              </label>
            </div>
            <p className='privilegio-descripcion'>Permite gestionar únicamente las citas asignadas al profesional.</p>
          </div>
        </div>
      </section>
    </section>
  )
}
