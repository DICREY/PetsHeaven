// Librarys 
import React, { Component } from 'react'
import { FileText, User, ChevronRight, ChevronLeft } from 'lucide-react'

// Imports
import { formatDate, divideList,getAge } from '../Varios/Util'

// Import Styles 
import '../../../src/styles/Global/GlobalTable.css'

export class GlobalTable extends Component {
    constructor(props) {
      super(props)

      // Declare states
      this.state = {
        clickCount: 0,
        page: 1,
        datas: [],
        columnSize: 5
      }

      // Declare params
      this.void = () => console.log('ver')
      this.defaultImg = this.props.imgDefault
      this.onWatch = this.props.watch || this.void
      this.headersSearch = this.props.headersSearch || this.void
    }

    componentDidMount() {
      // Actualizar si los props llegan después del montaje
      const { fullData } = this.props
      if (fullData) {
        this.setState({
          datas: divideList(fullData, this.state.columnSize)
        });
      }
    }

    componentDidUpdate(prevProps) {
      if (prevProps.fullData !== this.props.fullData) {
        this.setState({
          datas: divideList(this.props.fullData || [], 5)
        });
      }
    }

    handleSearch = (term = '', data = [] ) => {
      const termLower = term.toLowerCase()
      
      const find = data.filter(pet => {
        return this.headersSearch.some(field => 
          pet[field]?.toLowerCase().includes(termLower)
        )
      })
    
      if (find) this.setState(() => ({
          datas: divideList(find,this.state.columnSize)
      }))
    }

    handleClick = (pet) => {
      const { clickCount } = this.state
      this.setState( () => ({
        clickCount: clickCount + 1
      })) 
      
      setTimeout(() => {
        if (clickCount === 1) {
          this.onWatch(pet)
        }
        this.setState( () => ({
          clickCount: 0
        }))
      }, 300)
    }

    handleColumns = (e) => {
      const { fullData } = this.props
      const newColumnSize = parseInt(e.target.value, 10)

      this.setState(() => ({
        columnSize: newColumnSize,
        datas: divideList(fullData,newColumnSize)
      }))
    }

    prevPage = () => {
      const { page } = this.state
      if (page != 1) this.setState( () => ({
        page: page - 1
      }))
    }
    
    nextPage = () => {
      const { page, datas } = this.state
      if (page < datas.length) this.setState( () => ({
          page: page + 1
      }))
    }
    
    renderCell = (item, header) => {
        // Lógica para tipos de datos comunes
        if (header.includes('fec_nac')) return `${getAge(item[header])} Años`
        if (header.includes('fec')) return formatDate(item[header])
        if (header.includes('pre')) return `$ ${item[header]}`
          
        switch (item[header]) {
          case 'date':
            return formatDate(item[header])
          case 'array':
            return item[header]?.join(', ') || '- Empty -'
          case 'status':
            return <span className={`badge ${item[header]}`}>{item[header]}</span>
          default:
            return item[header] || '- Empty -'
        }
    }

    render () {
      const { headers ,subtitle, fullData, listHeader,filters } = this.props
      const { page, datas } = this.state
      const headersKeys = Object.keys(headers)
      const headersValues = Object.values(headers)
      const info = datas

      return (
        <main>
          {subtitle && (<h2 className='subtitle-panel-gestion'>{subtitle}</h2>)}
          <nav className='controles-gestion'>
            <span className='btns-gestion'>
              <span>Mostrar</span>
              <select 
                className='select-gestion'
                defaultValue={this.state.columnSize || 5}
                onChange={(e) => this.handleColumns(e)}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </select>
              <span>registros</span>
            </span>

            {subtitle && (
            <div className='inputcontenedoradminhome'>
              <User className='inputiconoadminhome' aria-hidden='true' />
              <input
                id='busqueda-usuario'
                className='campoadminhome'
                placeholder={filters?`Buscar por ${filters}`: 'Filtrar'}
                type='search'
                aria-label='Buscar usuarios'
                onChange={e => this.handleSearch(e.target.value, fullData)}
              />
            </div>)}
          </nav>
          <section className={`global-table-container`}>
            {info?(
              <table className='global-table'>
              <thead>
                <tr>
                  {headersKeys?.map((header, index) => (
                    <th key={index +120}>
                      <div key={index} className='header-content'>
                        {header}
                      </div>
                    </th>
                  ))}
                  <th className='actions-header'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {info[page-1]?.map((item,index) => (
                  <tr key={index} onClick={() => this.onWatch(item)} style={{ cursor: 'pointer'}}>
                    {headersValues?.map((header, index) => (
                      <td key={index + 170}>
                        {header === listHeader && item[listHeader]? 
                          (
                            <ul 
                              className='mascotasadminhome' 
                              aria-label='Mascotas del usuario'
                              key={index + 18237}
                            >
                              <li className='mascotaitemadminhome'>
                                <span>
                                  {`${this.renderCell(item[listHeader][0], 'nom_mas')} - 
                                  ${this.renderCell(item[listHeader][0], 'esp_mas')}`}
                                </span>
                              </li>
                              <li className='mascotaitemadminhome'>
                                <span>
                                  {`${this.renderCell(item[listHeader][1], 'nom_mas')} - 
                                  ${this.renderCell(item[listHeader][1], 'esp_mas')}`}
                                </span>
                              </li>
                              {item[listHeader].length > 2 && (
                                <li className='mascotaitemadminhome'>
                                  <span className=''>-- Ver mas --</span>
                                </li>
                              )}
                            </ul>
                          ):(<span>{this.renderCell(item, header)}</span>)
                        }
                      </td>
                    ))}
                    <td className='actions-cell'>
                      <button 
                        onClick={() => this.onWatch(item)} 
                        aria-label={`Ver detalles de ${item.nom_per}`}
                        className='EditBtn'
                      >
                        <FileText className="icon" aria-hidden='true' />
                        Descripción
                      </button>  
                    </td>
                  </tr>
                ))
              }
              </tbody>
            </table>
            ):(
              <p>No ahi resultados</p>
            )}
          </section>
          <footer className='paginacion-gestion'>
            <div className='info-paginacion'>Mostrando registros del 1 al {info?.length} de un total de {fullData?.length} registros.</div>
            <div className='btns-container-paginacion'>
              <button 
                type='button' 
                className='BackBtn' 
                onClick={this.prevPage}                  
                >
                <ChevronLeft className='icon' />
                Anterior
              </button>
              <button 
                type='button' 
                className='btn-paginacion btn-active'
                >{page}</button>
              <button 
                type='button' 
                className='BackBtn'
                onClick={this.nextPage}
              >
                Siguiente
                <ChevronRight className='icon' />
              </button>
            </div>
          </footer>
        </main>
      )
    }
}
