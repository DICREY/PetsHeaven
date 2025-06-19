// Libraries
import React from "react"

// Imports 
import { formatDate, checkImage, LegalAge } from '../Varios/Util'

// Component 
export class Description extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      validImg: false,
      profileImage: null
    }
    this.legalDate = LegalAge()
    this.maxDate = new Date().toLocaleDateString('en-CA')
  }

  componentDidMount() {
    if (!this.props.datas) window.location.href = '/consultorio'
  }

  // Functions
  handleProfileImageChange = (e) => {
    const { handleChange } = this.props
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.setState({ profileImage: e.target.result })
      }
      reader.readAsDataURL(file)
      this.setState({ fot_mas: file })
    }
    handleChange(e)
  }
  
  renderCell = (item, header) => {
    const { disabled } = this.props

    const deactive = disabled.some(item => item === header)
    // Lógica para tipos de datos comunes
    return {
      value: header.includes("fec")? formatDate(item): item,
      type: header.includes("fec")? "date": header.includes("email")? "email": header.includes("cel")? "number": "text",
      active: deactive ? false : true
    }
  }

  render = () => {
    let { datas, isEditing, handleChange, headers, headerImg, imgDefault } = this.props
    const { profileImage } = this.state

    const headersKeys = Object.keys(headers)
    const headersValues = Object.values(headers)

    headers = datas && headersKeys?.map((key, index) => {
      const item = this.renderCell(datas[headersValues[index]], headersValues[index])
      return {
        headerValue: headers[key],
        label: key,
        ...item
      }
    })

    return (
      <main className="propietarioSeccionProps">
        <h2 className="seccionTituloProps">Información personal:</h2>
        <section className="propietarioInfoProps">
          <section className="propietarioFotoInfoProps">
            <section className='grupo-regusuario'>
              <label className='propietarioEtiquetaProps'>Imagen del usuario:</label>
                <div className='perfil-regusuario'>
                  <div className='imagen-regusuario'>
                    {profileImage?
                      checkImage(
                        profileImage,
                        'imagen del usuario para guardar en el sistema',
                        imgDefault):
                      checkImage(
                        datas[headerImg],
                        'imagen del usuario guardada en el sistema',
                        imgDefault)
                    }
                  </div>
                  {/* <button 
                    type="button"
                    className='editar-regusuario' 
                    onClick={() => profileInputRef.current.click()}
                  >
                    <Pencil className='icon' />
                  </button> */}
                  <input
                    type='file'
                    name="img"
                    // ref={profileInputRef}
                    onChange={this.handleProfileImageChange}
                    accept='image/*'
                    className={isEditing? '':'input-file-hidden'}
                  />
                </div>
              </section>
            <section className="propietarioDatosProps">
              {headers?.map((header, index) => (
                isEditing ? (
                  <div key={index + 938} className="propietarioCampoProps">
                    <div className="propietarioEtiquetaProps">{header.label}</div>
                    {header.label.toLowerCase().includes("gen") ? (
                      <select
                        className="select"
                        name={header.headerValue}
                        onChange={handleChange}
                        defaultValue={header.value}
                        disabled={!header.active}
                      >
                        <option value="Femenino">Femenino</option>
                        <option value="Masculino">Masculino</option>
                      </select>
                    ) : (
                      <input
                        name={header.headerValue}
                        type={header.type}
                        className="input"
                        max={header.type === "date" ? header.headerValue === 'fec_nac_per' ? this.legalDate : this.maxDate : 100}
                        placeholder={header.label}
                        onChange={handleChange}
                        defaultValue={header.value}
                        disabled={!header.active}
                      />)
                    }
                  </div>
                ) : (
                  <div key={index + 11290} className="propietarioCampoProps">
                    <div className="propietarioEtiquetaProps">{header.label}</div>
                    <div className="propietarioValorProps">
                      {header.value || "no-registrado"}
                    </div>
                  </div>
                )))
              }
            </section>
          </section>
        </section>
      </main>
    )
  }
}