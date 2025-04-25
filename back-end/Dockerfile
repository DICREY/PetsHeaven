# Imagen de referencia de docker que usaremos 
FROM node:20

# Crear carpeta en docker donde se alojara nuestro container
RUN mkdir -p /home/app

# [carpeta local donde esta alojado nuestro container] [donde se va a usar en docker]
COPY . /home/app

# Puerto que exponemos en nuestro pc
EXPOSE 3000

# comando para correr el container
CMD ["node --watch","/home/app/index.js"]