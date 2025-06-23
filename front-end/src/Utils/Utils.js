// Librarys 
import React, { useState } from "react"

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
      alt={alt || "No Registrado"}
      onError={() => setImgSrc(imgDefault)}
    />
  )
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