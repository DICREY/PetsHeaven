// Librarys 
import React, { Component } from 'react'
import { Edit, MoreHorizontal } from 'lucide-react'

// Imports
import { formatDate, divideList,getAge } from '../Varios/Util'

// Import Styles 
import '../../../src/styles/InterfazAdmin/GlobalTable.css'

export class GlobalTable extends Component {
    constructor (props) {
      super(props)

      this.state = {
        clickCount: 0,
        page: 1,
        datas: this.props.data
      }

      // Declare params
      this.void = () => console.log('ver')
      this.onMore = this.props.watch || this.void
      this.onEdit = this.props.edit || this.void
      this.headersSearch = this.props.headersSearch || this.void
    }

    handleSearch = (term = '', data = [] ) => {
      const termLower = term.toLowerCase()
      
      const find = data.filter(pet => {
        return this.headersSearch.some(field => 
          pet[field]?.toLowerCase().includes(termLower)
        )
      })
    
      if (find) this.setState(() => ({
          datas: divideList(find,4)
        }))
    }
    

    handleClick = (pet) => {
      const { clickCount } = this.state
      this.setState( () => ({
        clickCount: clickCount + 1
      })) 
      
      setTimeout(() => {
        if (clickCount === 1) {
          this.onMore(pet)
        }
        this.setState( () => ({
          clickCount: 0
        }))
      }, 300)
    }

    prevPage = () => {
      const { page } = this.state
      if (page != 1) this.setState( () => ({
          page: page - 1
        }))
    }

    nextPage = () => {
      const { data } = this.props
      const { page } = this.state
      if (page < data.length) this.setState( () => ({
          page: page + 1
        }))
    }
    
    renderCell = (item, header) => {
        // Lógica para tipos de datos comunes
        if (header.includes('fec_nac')) return `${getAge(item[header])} Años`
        if (header.includes('fec')) return formatDate(item[header])
          
        switch (item[header]) {
          case 'date':
            return formatDate(item[header]);
          case 'array':
            return item[header]?.join(', ') || '- Empty -';
          case 'status':
            return <span className={`badge ${item[header]}`}>{item[header]}</span>;
          default:
            return item[header] || '- Empty -';
        }
    }

    render () {
        const { headers ,subtitle, fullData, data } = this.props
        const { page, datas } = this.state
        const headersKeys = Object.keys(headers)
        const headersValues = Object.values(headers)
        const info = datas[0]?datas:data
        return (
          <main>
            <h2 className='subtitle-panel-gestion'>{subtitle}</h2>
            <nav className='controles-gestion'>
              <div className='btns-gestion'>
                <span>Mostrar</span>
                <select className='select-gestion'>
                  <option value='10'>10</option>
                  <option value='25'>25</option>
                  <option value='50'>50</option>
                  <option value='100'>100</option>
                </select>
                <span>registros</span>
              </div>

              <div className='buscar-gestion'>
                <span>Buscar:</span>
                <input
                  type='text' 
                  className='input-gestion' 
                  onChange={e => this.handleSearch(e.target.value, fullData)}/>
              </div>
            </nav>
            <section className={`global-table-container`}>
              <table className='global-table'>
                <thead>
                  <tr>
                    {headersKeys.map((header, index) => (
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
                    <tr key={index} onClick={() => this.handleClick(item)}>
                      {headersValues.map((header, index) => (
                        <td key={index + 170}>
                          <span>{this.renderCell(item, header)}</span>
                        </td>
                      ))}
                      <td className='actions-cell'>
                        <button onClick={() => this.onEdit(item)} >
                          <Edit size={16} />
                        </button>
                        <button onClick={() => this.onMore(item)}>
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
            <footer className='paginacion-gestion'>
              <div className='info-paginacion'>Mostrando registros del 1 al {info.length} de un total de {fullData.length} registros.</div>
              <div className='btns-container-paginacion'>
                <button 
                  type='button' 
                  className='btn-paginacion' 
                  onClick={this.prevPage}                  
                  >
                  Anterior
                </button>
                <button 
                  type='button' 
                  className='btn-paginacion btn-active'
                  >{page}</button>
                <button 
                  type='button' 
                  className='btn-paginacion'
                  onClick={this.nextPage}
                >Siguiente</button>
              </div>
            </footer>
          </main>
        )
    }
}
