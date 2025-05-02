// Libraries
import React from "react"
import { User } from "lucide-react"
import { formatDate } from '../Varios/Util'

// Component 
export class DescriptionPeople extends React.Component {
  constructor(props) {
    super(props)
  }

  // Functions
  renderCell = (item, header) => {
    // Lógica para tipos de datos comunes
    if (header.includes("fec")) return {
      value: formatDate(item),
      type: "date",
      active: true
    }
    return {
      value: item,
      type: "text",
      active: true
    }
  }

  render = () => {
    let { datas, isEditing, handleChange, headers } = this.props
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
              <User size={100} />
            </div>
            <div className="propietarioDatosProps">
              {
                headers.map(header => (
                  isEditing? (
                    <div className="propietarioCampoProps">
                      <div className="propietarioEtiquetaProps">{header.label}</div>
                      <input
                        name={header.label}
                        type="text"
                        className="propietarioCampoProps"
                        defaultValue={header.value}
                        onChange={handleChange}
                      />
                    </div>
                  ): (
                    <div className="propietarioCampoProps">
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