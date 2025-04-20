// Imports 
import { errorStatusHandler,loadingAlert,formatDate } from '../Varios/Util'
import { ModifyData } from '../Varios/Requests'

// Librarys 
import React, { Component } from 'react'
import swal from 'sweetalert'

// Import Styles
import '../../../public/styles/Pets/editPets.css'

// Main component 
export class EditPetButton extends Component {
    constructor(props) {
        super(props)
        // Vars 
        this.state = {
            isOpen: this.props.open,
            formData: this.props.petData || {},
        }
        
        // Configuración
        this.URL = `${this.props.url}/modify`
        this.token = localStorage.getItem("token")
        this.onSave = this.props.onSave
    }

    // Handle values
    handleChange = (e) => {
        let { name, value } = e.target
        this.setState(prev => ({ formData: {
            ...prev.formData, [name]: value
        } }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.modifyData()
        this.onSave(false)
        this.setState({ isOpen: false })
    }

    modifyData = async () => {
        const { formData } = this.state
        try {
            if (this.token) {
                loadingAlert("Validando...",)
                formData.fec_nac_mas = formatDate(formData.fec_nac_mas)
                formData.fec_cre_mas = formatDate(formData.fec_cre_mas)
                this.mod = await ModifyData(this.URL, this.token, formData)
                this.mod.ok && swal({
                    icon: 'success',
                    title: 'Modificado',
                    text: 'Los datos de la mascota han sido modificados',
                })
            }
        } catch (err) {
            if(err.status) {
                this.message = errorStatusHandler(err.status)
                swal({
                  title: 'Error',
                  text: `${message}`,
                  icon: 'warning',
                })
            } else console.log(err)
        }
    }

    render = () => {
        // Vars
        const { formData,isOpen } = this.state

        return (
        <section>
        {isOpen && (
            <section className="modal-overlay" >
            <section className="modal-content" >
                
                <h2>Editar información</h2>
                
                <form onSubmit={this.handleSubmit}>
                <div className="form-grid">
                    <div className="form-group">
                        <label>Especie</label>
                        <select name="esp_mas" value={formData.esp_mas} 
                            onChange={this.handleChange}
                            className="form-input">
                            <option value="Perro">Perro</option>
                            <option value="Gato">Gato</option>
                            <option value="Ave">Ave</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Raza</label>
                        <input
                            type="text"
                            name="raz_mas"
                            value={formData.raz_mas}
                            onChange={this.handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Color</label>
                        <input
                            type="text"
                            name="col_mas"
                            value={formData.col_mas}
                            onChange={this.handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Género</label>
                        <select
                            name="gen_mas"
                            onChange={this.handleChange}
                            className="form-input">
                            <option value="Femenino">Femenino</option>
                            <option value="Masculino">Masculino</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Fecha Nacimiento</label>
                        <input
                            type="date"
                            name="fec_nac_mas"
                            value={formatDate(formData.fec_nac_mas)}
                            onChange={this.handleChange}
                            className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Peso (kg)</label>
                        <input
                            type="number"
                            name="pes_mas"
                            value={formData.pes_mas}
                            onChange={this.handleChange}
                            className="form-input"
                            step="0.1"
                        />
                    </div>

                    <div className="form-group">
                        <label>Estado Reproductivo</label>
                        <select
                            name="est_rep_mas"
                            onChange={this.handleChange}
                            className="form-input"
                        >
                            <option value={formData.est_rep_mas}>{formData.est_rep_mas}</option>
                            {
                                formData.est_rep_mas === 'No esterilizado'?
                                <option value="Esterilizado">Esterilizado</option>
                                :<option value="No esterilizado">No esterilizado</option>
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Alimento</label>
                        <input
                            type="text"
                            name="ali_mas"
                            value={formData.ali_mas}
                            onChange={this.handleChange}
                            className="form-input"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Foto de {formData.nom_mas}</label>
                        <input
                            type="text"
                            name="fot_mas"
                            value={formData.fot_mas}
                            onChange={this.handleChange}
                            className="form-input"
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" className="cancel-button" onClick={() => {
                        this.setState({ isOpen: false })
                        this.onSave(false)}}>
                        Cancelar
                    </button>
                    <button type="submit" className="save-button">
                        Guardar Cambios
                    </button>
                </div>
                </form>
            </section>
            </section>
        )}
        </section>
        )
    }   
}