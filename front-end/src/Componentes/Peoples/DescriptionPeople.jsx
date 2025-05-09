// Libraries
import React from "react"

// Imports 
import { formatDate } from '../Varios/Util'

// Component 
export class DescriptionPeople extends React.Component {
  constructor(props) {
    super(props)

    this.verifyData()

    this.state = {
      validImg: false
    }
  }

  // Functions
  renderCell = (item, header) => {
    const { disabled } = this.props

    const deactive = disabled.some(item => item === header)
    // Lógica para tipos de datos comunes
    if (header.includes("fec")) return {
      value: formatDate(item),
      type: "date",
      active: deactive? false : true
    }
    return {
      value: item,
      type: "text",
      active: deactive? false : true
    }
  }

  checkImage = (src = "") => {
    const img = new Image()
    img.src = src
  
    img.onload = () => this.setState({ validImg: true })
    img.onerror = () => this.setState({ validImg: false })
  }

  verifyData = () => {
    if(!this.props.datas) window.location.replace((window.location.origin))
  }

  render = () => {
    let { datas, isEditing, handleChange, headers, imgDefault } = this.props
    const { validImg } = this.state

    const headersKeys = Object.keys(headers)
    const headersValues = Object.values(headers)

    headers = headersKeys.map((key, index) => {
      const item = this.renderCell(datas[headersValues[index]], headersValues[index])
      return {
          label: key,
          ...item}
    })

    return (
      <div className="propietarioSeccionProps">
        <h2 className="seccionTituloProps">Información personal:</h2>
        <div className="propietarioInfoProps">
          <div className="propietarioFotoInfoProps">
            <div className="propietarioFotoProps">
              {this.checkImage(datas.fot_vet)}
              {
                validImg? (
                  <img 
                    width={100}
                    height={100}
                    src={datas.fot_vet}
                    alt={`${datas.nom_per} ${datas.ape_per}` || "No Registrado"}
                  />
                ):(
                  <img 
                    width={100}
                    height={100}                      
                    src={imgDefault}
                    alt={`${datas.nom_per} ${datas.ape_per}` || "No Registrado"}
                  />
                )
              }
            </div>
            <div className="propietarioDatosProps">
              {
                headers.map((header,index) => (
                  isEditing? (
                    <div className="propietarioCampoProps">
                      <div className="propietarioEtiquetaProps">{header.label}</div>
                      <input
                        name={header.label}
                        type={header.type}
                        className="propietarioCampoProps"
                        max={header.type === "date" ? "2006-01-01" : 100}
                        min={header.type === "date" ? "1900-01-01" : 0}
                        placeholder={header.label}
                        onChange={handleChange}
                        defaultValue={header.value}
                        disabled={!header.active}
                      />
                    </div>
                  ): (
                    <div key={index+11290} className="propietarioCampoProps">
                      <div className="propietarioEtiquetaProps">{header.label}</div>
                      <div className="propietarioValorProps">
                        {header.value || "no-registrado"}
                      </div>
                    </div>
                  )
                ))
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}