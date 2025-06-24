// Librarys 
import { useEffect, useState } from "react"
import { Plus, Trash2, Edit, ChevronRight, ChevronLeft, AlertTriangle, Clock } from "lucide-react"

// Imports 
import { DataFilter, divideList, formatDate } from "../Varios/Util"

// Import styles
import "../../styles/InterfazAdmin/Servicios/Laboratorio.css"

// Component 
export const ServicesContainer = ({ 
    Name = '',
    TitleIcon,
    title = '',
    titleDes = '',
    subTitle = '',
    filters = [],
    datas = [],
    headers = {},
    SearchHeaders = [],
    OpenDetails,
    OpenEdit,
    OpenCreate,
    Delete,
    ChangeState
}) => {
    // Dynamic vars 
    const [ almcData, setAlmcData ] = useState([])
    const [ page, setPage ] = useState(1)

    const formatState = (state) => {
        const sta = state === 'DISPONIBLE' ? "Disponible": 
        state === 1? "Disponible":
        state === '1'? "Disponible":
        state === true? "Disponible":
        "No-disponible"
        return sta
    }
    
    const formatearPrecio = (precio) => {
        return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(precio)
    }
    
    const handleFilter = (e) => {
        const term = e.target.value
        if (term === '') setAlmcData(divideList(datas,6))
        const datafilt = DataFilter(term, datas, SearchHeaders)
        if (datafilt) setAlmcData(divideList(datafilt,6))
    }

    const prevPage = () => {
        if (page != 1) setPage(page - 1)
    }

    const nextPage = () => {
        if (page < almcData.length) setPage(page + 1)
    }

    useEffect(() => {
        datas? setAlmcData(divideList(datas,6)): setAlmcData([])
    },[datas])

    return ( 
        <section className="tarjetagesusuario">
            <div className="contenedor-principal-laboratorio">
                {/* Encabezado */}
                <header className="encabezado-laboratorio">
                    <div className="titulo-con-icono-laboratorio">
                        {TitleIcon && (<TitleIcon className="icono-titulo-laboratorio icon" aria-hidden="true" />)}
                        <h1 className="titulo-laboratorio">{title}</h1>
                    </div>
                    <p className="descripcion-spa">{titleDes}</p>
                </header>

                {/* Controles */}
                <section className="controles-laboratorio" aria-label="Controles de filtrado y acciones">
                    <h2 className="subtitulo-laboratorio">{subTitle}</h2>
                    <div className="acciones-control-laboratorio">
                        <label htmlFor="filtro-examenes" className="sr-only">
                            Filtrar por
                        </label>
                        <select
                            id="filtro-examenes"
                            onChange={handleFilter}
                            className="filtro-laboratorio"
                            aria-label="Filtro de exámenes"
                        >
                            <option value=''>
                                Todos
                            </option>
                            {filters?.map((filter, index) => (
                                <option key={index + 76} value={filter}>
                                    {filter}
                                </option>
                            ))}
                        </select>
                        <button 
                            onClick={OpenCreate} 
                            className="EditBtn" 
                            aria-label={`Agregar nuevo ${Name}`}
                        >
                            <Plus className='icon' aria-hidden="true" />
                            Agregar {Name}
                        </button>
                    </div>
                </section>

                {/* Grid de exámenes */}
                <section className="grid-laboratorio" aria-label="Lista de exámenes de laboratorio">
                    {almcData[page -1]?.map((dat, index) => (
                        <article
                            key={index}
                            className={`tarjeta-laboratorio ${!dat[headers.sta] ? "no-disponible-laboratorio" : ""}`}
                            onClick={() => OpenDetails(dat)}
                            role="button"
                            tabIndex={0}
                            aria-label={`Ver detalles del ${Name} ${dat[headers.nom]}`}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault()
                                    OpenDetails(dat)
                                }
                            }}
                        >
                            <header className="encabezado-tarjeta-laboratorio">
                                <div className="info-principal-laboratorio">
                                    <h3 className="nombre-laboratorio">{dat[headers.nom]}</h3>
                                    <div className="etiquetas-laboratorio">
                                        <span className="categoria-laboratorio" data-categoria={dat[headers.cat]}>
                                            {dat[headers.cat]}
                                        </span>
                                        <button
                                            className={`estado-laboratorio ${formatState(dat[headers.sta])}-laboratorio`}
                                            onClick={(e) => ChangeState(dat[headers.cod], dat[headers.sta])}
                                            aria-label={`Cambiar estado del examen ${formatState(dat[headers.sta])}. Actualmente: ${formatState(dat[headers.sta])}`}
                                        >
                                            {formatState(dat[headers.sta])}
                                        </button>
                                    </div>
                                </div>
                                <div className="acciones-laboratorio">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            Delete(dat)
                                        }}
                                        className="boton-eliminar-laboratorio"
                                        aria-label={`Eliminar examen ${dat[headers.nom]}`}
                                    >
                                        <Trash2 className="icon" aria-hidden="true" />
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            OpenEdit(dat)
                                        }}
                                        className="boton-editar-laboratorio"
                                        aria-label={`Editar examen ${dat[headers.nom]}`}
                                    >
                                        <Edit className="icon" aria-hidden="true" />
                                    </button>
                                </div>
                            </header>

                            <p className="descripcion-tarjeta-laboratorio">{dat[headers.des]}</p>

                            <dl className="detalles-rapidos-laboratorio">
                                <div className="detalle-rapido-laboratorio">
                                    <dt>
                                        <Clock className="icono-detalle-laboratorio icon" aria-hidden="true" />
                                        <span className="sr-only">Tiempo:</span>
                                    </dt>
                                    <dd className="texto-detalle-laboratorio">
                                        {headers?.time?.includes('fec')? `${formatDate(dat[headers.time])}`:
                                        headers?.time?.includes('dur')? `${dat[headers.time]} horas`:
                                        dat[headers.time]}
                                    </dd>
                                </div>
                                <div className="detalle-rapido-laboratorio">
                                    <dt>
                                        <AlertTriangle className="icono-detalle-laboratorio icon" aria-hidden="true" />
                                        <span className="sr-only">Preparación:</span>
                                    </dt>
                                    <dd className="texto-detalle-laboratorio">
                                        {dat[headers.alert]}
                                    </dd>
                                </div>
                            </dl>

                            <footer className="footer-tarjeta-laboratorio">
                                <span className="precio-laboratorio" aria-label={`Precio: ${formatearPrecio(dat[headers.pri])}`}>
                                    {formatearPrecio(dat[headers.pri])}
                                </span>
                                <span className="id-laboratorio" aria-label={`Código: ${dat[headers.cod]}`}>
                                    {dat[headers.cod]}
                                </span>
                            </footer>
                        </article>
                    ))}
                </section>
                <footer className='paginacion-gestion'>
                    <section className='info-paginacion'>Pagina {page} de {almcData.length} de un total {datas.length} de registros.</section>
                    <section className='btns-container-paginacion'>
                        <button
                            type='button'
                            className='BackBtn'
                            onClick={prevPage}
                        >
                            <ChevronLeft className='icon' />
                            Anterior
                        </button>
                        <button
                            type='button'
                            className='btn-paginacion btn-active'>
                            {page}
                        </button>
                        <button
                            type='button'
                            className='BackBtn'
                            onClick={nextPage}
                        >
                            Siguiente
                            <ChevronRight className='icon' />
                        </button>
                    </section>
                </footer>
            </div>
        </section>
    )
}