// Librarys 
import React from 'react'
import { InfoIcon } from 'lucide-react'

// Import styles 
import '../../../../src/styles/InterfazAdmin/FormuariosAdmin/RolPrivilegios.css'

// Component 
const RolPrivilegios = ({ register, errors, setVet }) => {

  return (
    <section className='rol-privilegios-container' aria-labelledby='titulo-perfil'>
      <h2 id='titulo-perfil'>Perfil del personal</h2>

      <div className='nota-admin' role='note'>
        <InfoIcon className='icon' aria-hidden='true' />
        <span>Esta configuración solo es editable por un rol administrador.</span>
      </div>

      <section className='seccion-rol'>
        <div className='grupo-rol'>
          <label htmlFor='rol' className='etiqueta-rol'>
            Rol <span className='obligatorio' aria-hidden='true'>*</span>
          </label>
          <div className='selector-rol'>
            <select
              id='rol'
              name='rol'
              className={`campo-selector ${errors.rol ? 'campo-error' : ''}`}
              {...register('rol', { required: 'El rol es requerido.' })}
              defaultValue='--'
              onChange={(e) => {e.target.value === 'Veterinario'? setVet(1): setVet(0)}}
              aria-invalid={errors.rol ? 'true' : 'false'}
              aria-describedby={errors.rol ? 'error-rol' : undefined}
            >
              <option value='--' disabled>Seleccione una opción</option>
              <option value='Administrador'>Administrador</option>
              <option value='Veterinario'>Veterinario</option>
            </select>
          </div>
          {errors.rol && (
            <p className='mensaje-error' id='error-rol' role='alert'>
              {errors.rol.message}
            </p>
          )}
        </div>
        <p className='descripcion-rol'>El rol determina los privilegios generales que tendrá el usuario.</p>
      </section>

      {/* <hr className='LineH' /> */}

      {/* <section className='seccion-privilegios' aria-labelledby='titulo-privilegios'>
        <h3 id='titulo-privilegios'>Privilegios de agenda</h3>
      </section> */}
    </section>
  )
}

export default RolPrivilegios