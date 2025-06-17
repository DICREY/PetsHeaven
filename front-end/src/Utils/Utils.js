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
            // console.log(req)
            setNotify(null)
            if (req?.result) return set(req.result)
            if (req?.data) return set(req.data)
            set(req)
        }
    } catch (err) {
        if (err) {
            setNotify(null)
            const message = errorStatusHandler(err)
            setNotify({
                title: 'Error',
                message: `${message}`,
                close: setNotify
            })
        }
    }
}