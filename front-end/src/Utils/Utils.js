// Librarys 
import React, { useState } from 'react'

// Imports 
import { errorStatusHandler } from '../Componentes/Varios/Util'
// import { compressImageFromUrl } from './compressor'

// Verify if load img
export const CheckImage = ({ src = '', alt = '', imgDefault = '', className = '' }) => {
  const [imgSrc, setImgSrc] = useState(src && src !== 'No-Registrado' ? src : imgDefault)

  return (
    <img
      className={className}
      src={imgSrc}
      alt={alt || 'No Registrado'}
      onError={() => setImgSrc(imgDefault)}
    />
  )
}

// Format price to Colombian Pesos
export const formatPrice = (precio) => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(precio)
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
            if (req?.result) return set(req.result)
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

// Convierte la primera letra en mayúscula y el resto en minúscula
export const capitalize = (word = '') => {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

// Convierte un string ISO (UTC) a formato compatible con input type="datetime-local"
export function toDatetimeLocal(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  // Ajusta a zona local y recorta a 'YYYY-MM-DDTHH:mm'
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60000);
  return localDate.toISOString().slice(0, 16);
}