import { compressImageFromUrl } from './compressor'

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