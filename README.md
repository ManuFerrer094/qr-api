# Documentación de la API de Generación de Códigos QR

¡Bienvenido a la documentación de QRAPI! Esta API proporciona endpoints para generar códigos QR para una variedad de propósitos, incluyendo URL, vCard, Twitter, correo electrónico, SMS, WiFi, Bitcoin, archivos PDF, archivos MP3, la App Store y galerías de imágenes.

## Tecnologías Utilizadas

[![Node.js](https://img.shields.io/badge/Node.js-14.x-green?logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-blue)](https://expressjs.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel)](https://vercel.com/)
[![Postman](https://img.shields.io/badge/Postman-API%20Testing-orange?logo=postman)](https://www.postman.com/)

## Limitación de Solicitudes

La API implementa un límite de solicitudes para prevenir un uso excesivo del servicio. Si excedes el límite de 1500 solicitudes por día, recibirás un mensaje de error.

**URL Base:** `https://qrapi-rho.vercel.app`

## Endpoints Disponibles

1. **Generar código QR para URL**
   - **URL:** `/generate/url`
   - **Método:** `POST`
   - **Cuerpo de la solicitud:**
     ```json
     {
         "url": "URL_a_codificar"
     }
     ```

2. **Generar código QR para vCard**
   - **URL:** `/generate/vcard`
   - **Método:** `POST`
   - **Cuerpo de la solicitud:**
     ```json
     {
         "name": "Nombre",
         "email": "Correo electrónico",
         "phone": "Número de teléfono",
         "address": "Dirección (opcional)",
         "title": "Título (opcional)",
         "url": "URL (opcional)"
     }
     ```

3. **Generar código QR para Twitter**
   - **URL:** `/generate/twitter`
   - **Método:** `POST`
   - **Cuerpo de la solicitud:**
     ```json
     {
         "tweet": "Texto del tweet",
         "username": "Nombre de usuario de Twitter (opcional)"
     }
     ```

4. **Generar código QR para correo electrónico**
   - **URL:** `/generate/email`
   - **Método:** `POST`
   - **Cuerpo de la solicitud:**
     ```json
     {
         "recipient": "Correo del destinatario",
         "subject": "Asunto del correo",
         "body": "Cuerpo del correo"
     }
     ```

5. **Generar código QR para SMS**
   - **URL:** `/generate/sms`
   - **Método:** `POST`
   - **Cuerpo de la solicitud:**
     ```json
     {
         "phoneNumber": "Número de teléfono",
         "message": "Mensaje de texto"
     }
     ```

6. **Generar código QR para WiFi**
   - **URL:** `/generate/wifi`
   - **Método:** `POST`
   - **Cuerpo de la solicitud:**
     ```json
     {
         "ssid": "Nombre de la red WiFi",
         "password": "Contraseña WiFi",
         "securityType": "Tipo de seguridad (WPA, WEP, etc.)"
     }
     ```

7. **Generar código QR para Bitcoin**
   - **URL:** `/generate/bitcoin`
   - **Método:** `POST`
   - **Cuerpo de la solicitud:**
     ```json
     {
         "address": "Dirección de Bitcoin",
         "amount": "Cantidad de Bitcoin (opcional)"
     }
     ```

8. **Generar código QR para archivos PDF**
   - **URL:** `/generate/pdf`
   - **Método:** `POST`
   - **Cuerpo de la solicitud:**
     ```json
     {
         "fileUrl": "URL del archivo PDF"
     }
     ```

9. **Generar código QR para archivos MP3**
   - **URL:** `/generate/mp3`
   - **Método:** `POST`
   - **Cuerpo de la solicitud:**
     ```json
     {
         "audioUrl": "URL del archivo MP3"
     }
     ```

10. **Generar código QR para la App Store**
    - **URL:** `/generate/app-store`
    - **Método:** `POST`
    - **Cuerpo de la solicitud:**
      ```json
      {
          "appId": "ID de la aplicación en la App Store"
      }
      ```

11. **Generar código QR para la Galería de imágenes**
    - **URL:** `/generate/image-gallery`
    - **Método:** `POST`
    - **Cuerpo de la solicitud:**
      ```json
      {
          "imageUrls": ["URL1", "URL2", ...]
      }
      ```

---

## Contacto

¡Dame una estrella en [Github](https://github.com/ManuFerrer094/qr-api)!

¡Conéctate conmigo en [LinkedIn](https://www.linkedin.com/in/manuferrer/)!
