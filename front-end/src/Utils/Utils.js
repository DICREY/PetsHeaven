import { compressImageFromUrl } from './compressor'
// Imports 
import { errorStatusHandler } from '../Componentes/Varios/Util'

// Verify if load img
export const checkImage = (src = '', alt, imgDefault = '', className = '') => {
    const imgComp = compressImageFromUrl(src)
    const img = new Image()
    let srcMod = imgComp? imgComp: imgDefault

    img.crossOrigin = 'Anonymous';
    img.src = srcMod
    img.onerror = () => srcMod = imgDefault

    return <img
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