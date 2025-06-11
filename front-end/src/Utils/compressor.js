// import Compressor from 'compressorjs';

// export const compressImageFromUrl = async (imageUrl) => {
//     try {
//         const response = await fetch(imageUrl);
//         console.log(response)
//         const blob = await response.blob(); // Obtener la imagen como un Blob

//         return new Promise((res, rej) => {
//             new Compressor(blob, {
//                 quality: 0.6, // Nivel de calidad (0 a 1)
//                 maxWidth: 800, // Ancho máximo
//                 maxHeight: 600, // Alto máximo
//                 success(result) {
//                     // 'result' es el Blob de la imagen comprimida
//                     console.log(result)
//                     const compressedImageUrl = URL.createObjectURL(result);
//                     res(compressedImageUrl);
//                 },
//                 error(err) {
//                     rej(err.message);
//                 },
//             });
//         });
//     } catch (error) {
//         console.error('Error al cargar o comprimir la imagen:', error);
//         return null;
//     }
// }