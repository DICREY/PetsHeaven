const { hash } = require('bcrypt')

const HeaderWeb = {
    "Content-Type": "application/json",
    "x-api-key": "pets_heaven_vite",
    "User": "Cristian_Admin"
}

async function login(url, first, second) {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: HeaderWeb,
            body: JSON.stringify({ 
                firstData: first, 
                secondData: second 
            })
        })
  
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log("Respuesta del servidor:", data);
        return data; // Para usar la respuesta fuera de la función
  
    } catch (error) {
        console.error("Error en la petición:", error);
        throw error; // Propaga el error para manejo externo
    }
}

const decodeJWT = (token) => {
    try {
      // Dividir el token y decodificar el payload
      const base64Url = token.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const payload = JSON.parse(atob(base64))
      
      return payload
    } catch (error) {
      console.error('Error decodificando el token:', error)
      return null
    }
}

const getRoles = (token = "") => {
  const tokenData = decodeJWT(token)
  return Array(tokenData.roles)
}

const getName = (token) => {
    const decodeToken = decodeJWT(token)
    return `${decodeToken.names}_${decodeToken.lastNames}`
}

const codePass = async (pass = "") => {
    const saltRounds = 15
    const codHash = await hash(pass,saltRounds)
    console.log(codHash)
}
// const decodePass = async (pass = "") => {
    
//     console.log(codHash)
// }

codePass("user1880")

// 'Administrador','https://imgs.search.brave.com/JheS1cTjYH1Y1E7rp1FADfQDL9uXw20FxZAFfjZwEaY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9k/L2Q0L04uVGVzbGEu/SlBH'
// 'Veterinario','https://imgs.search.brave.com/rL6dnhwCDXLvz02lsRs2QjVj1F8o-8D0o4pTYhmHah8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy90/aHVtYi9jL2M4L01h/cmllX0N1cmllX2Mu/XzE5MjBzLmpwZy81/MTJweC1NYXJpZV9D/dXJpZV9jLl8xOTIw/cy5qcGc'
// 'Usuaro','https://imgs.search.brave.com/kWZPq0vRV5Hl9y9RS9CtH5o-SRhsHFZfA8twL1VUavI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy9nZXR0/eWltYWdlcy02MTUz/MTI2MzQuanBnP2Ny/b3A9MXh3OjEuMHho/O2NlbnRlcix0b3Am/cmVzaXplPTY0MDoq'