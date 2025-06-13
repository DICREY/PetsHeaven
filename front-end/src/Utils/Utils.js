// import { compressImageFromUrl } from './compressor'
// Imports 
import { errorStatusHandler } from '../Componentes/Varios/Util'

// Verify if load img
export const checkImage = (src = '', alt, imgDefault = '', className = '') => {
    const img = new Image()
    let srcMod = src? src: imgDefault

    img.src = src
    img.onerror = () => <p>No se pudo</p>
    img.onload = () => <img
        className={`${className}`}
        src={srcMod}
        alt={alt || "No Registrado"}
    />
}

export const ReqFunction = async (
    URL = '',
    ReqFunct = null,
    setNotify = null,
    set = null,
    data = {}
) => {
    try {
        if (ReqFunct && setNotify && set){
            const req = await ReqFunct(URL, data)
            setNotify(null)
            if (req.data) return set(req.data[0])
            // if (req.data['0']) return set(req.data['0'])
            set(req)
        }
    } catch (err) {
        setNotify(null)
        if (err.status) {
            if (err.status === 404) return set([])
            const message = errorStatusHandler(err.status)
            setNotify({
                title: 'Error',
                message: `${message}`,
                close: setNotify
            })
        } 
    }
}