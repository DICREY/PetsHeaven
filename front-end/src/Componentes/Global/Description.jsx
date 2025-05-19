// Libraries
import React from "react"

// Imports 
import { formatDate, checkImage } from '../Varios/Util'

// Component 
export class Description extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      validImg: false
    }
  }

  componentDidMount() {
    if(!this.props.datas) window.location.href = '/consultorio'
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

  render = () => {
    let { datas, isEditing, handleChange, headers, imgDefault } = this.props

    const headersKeys = Object.keys(headers)
    const headersValues = Object.values(headers)

    headers = headersKeys?.map((key, index) => {
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
              {checkImage(
                datas.image,
                `${datas.alt_img}`,
                imgDefault
              )}
            </div>
            <div className="propietarioDatosProps">
              {
                headers?.map((header,index) => (
                  isEditing? (
                    <div className="propietarioCampoProps">
                      <div className="propietarioEtiquetaProps">{header.label}</div>
                      {header.label.toLowerCase().includes("gen")? (
                        <select 
                          className="select"
                          name={header.label}
                          onChange={handleChange}
                          defaultValue={header.value}
                          disabled={!header.active}
                        >
                          <option value="Femenino">Femenino</option>
                          <option value="Masculino">Masculino</option>
                        </select>
                      ):(
                        <input
                          name={header.label}
                          type={header.type}
                          className="input"
                          max={header.type === "date" ? "2006-01-01" : 100}
                          min={header.type === "date" ? "1900-01-01" : 0}
                          placeholder={header.label}
                          onChange={handleChange}
                          defaultValue={header.value}
                          disabled={!header.active}
                        />)
                      }
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