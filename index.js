const express = require('express');
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const qrController = require('./controllers/qrController');

const app = express();
const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 1500, 
  message: "Has excedido el límite de solicitudes, por favor intenta más tarde."
});
app.use(limiter);

app.use(express.json());
app.use(cors());

// Endpoint para generar código QR para URL
app.post('/generate/url', qrController.generateUrlQR);

// Endpoint para generar código QR para contacto
app.post('/generate/vcard', qrController.generateContactQR);

// Endpoint original para generar código QR
app.post('/generate', qrController.generateQR);

app.get('/', (req, res) => {
    const html = `<!DOCTYPE html>
    <html lang="es">
    <style>
    body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        margin: 20px;
        padding: 20px;
    }
    
    h1 {
        color: #333;
    }
    
    h2 {
        color: #555;
    }
    
    p {
        color: #777;
    }
    
    ul, ol {
        margin-top: 0;
        padding-left: 20px;
    }
    
    ul li, ol li {
        margin-bottom: 10px;
    }
    
    code {
        font-family: monospace;
        background-color: #f4f4f4;
        padding: 2px 5px;
        border-radius: 3px;
    }
    
    pre {
        background-color: #f4f4f4;
        padding: 10px;
        border-radius: 5px;
        overflow-x: auto;
    }
    
    a {
        text-decoration: none;
        color: #007bff;
    }
    
    a:hover {
        text-decoration: underline;
    }
    </style>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Documentación de la API de Generación de Códigos QR</title>
    </head>
    <body>
    
    <h1>Documentación de la API de Generación de Códigos QR</h1>
    
    <p>¡Bienvenido a la documentación de la API de Generación de Códigos QR! Esta API proporciona endpoints para generar códigos QR para una variedad de propósitos, incluyendo URL, vCard, Twitter, correo electrónico, SMS, WiFi, Bitcoin, archivos PDF, archivos MP3, la App Store y galerías de imágenes.</p>
    
    <h2>Tecnologías Utilizadas</h2>
    
    <p>
        <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-14.x-green?logo=node.js" alt="Node.js"></a>
        <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-4.x-blue" alt="Express"></a>
        <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel" alt="Vercel"></a>
        <a href="https://www.postman.com/"><img src="https://img.shields.io/badge/Postman-API%20Testing-orange?logo=postman" alt="Postman"></a>
    </p>
    
    <h2>Limitación de Solicitudes</h2>
    
    <p>La API implementa un límite de solicitudes para prevenir un uso excesivo del servicio. Si excedes el límite de 100 solicitudes por día, recibirás un mensaje de error.</p>
    
    <p><strong>URL Base:</strong> <code>https://qrapi-rho.vercel.app</code></p>
    
    <h2>Endpoints Disponibles</h2>
    
    <ol>
        <li>
            <h3>Generar código QR para URL</h3>
            <ul>
                <li><strong>URL:</strong> <code>/generate/url</code></li>
                <li><strong>Método:</strong> <code>POST</code></li>
                <li><strong>Cuerpo de la solicitud:</strong>
                    <pre><code>{
        "url": "URL_a_codificar"
    }</code></pre>
                </li>
            </ul>
        </li>
    
        <li>
            <h3>Generar código QR para vCard</h3>
            <ul>
                <li><strong>URL:</strong> <code>/generate/vcard</code></li>
                <li><strong>Método:</strong> <code>POST</code></li>
                <li><strong>Cuerpo de la solicitud:</strong>
                    <pre><code>{
        "name": "Nombre",
        "email": "Correo electrónico",
        "phone": "Número de teléfono",
        "address": "Dirección (opcional)",
        "title": "Título (opcional)",
        "url": "URL (opcional)"
    }</code></pre>
                </li>
            </ul>
        </li>
    
        <li>
            <h3>Generar código QR para Twitter</h3>
            <ul>
                <li><strong>URL:</strong> <code>/generate/twitter</code></li>
                <li><strong>Método:</strong> <code>POST</code></li>
                <li><strong>Cuerpo de la solicitud:</strong>
                    <pre><code>{
        "tweet": "Texto del tweet",
        "username": "Nombre de usuario de Twitter (opcional)"
    }</code></pre>
                </li>
            </ul>
        </li>
    
        <li>
            <h3>Generar código QR para correo electrónico</h3>
            <ul>
                <li><strong>URL:</strong> <code>/generate/email</code></li>
                <li><strong>Método:</strong> <code>POST</code></li>
                <li><strong>Cuerpo de la solicitud:</strong>
                    <pre><code>{
        "recipient": "Correo del destinatario",
        "subject": "Asunto del correo",
        "body": "Cuerpo del correo"
    }</code></pre>
                </li>
            </ul>
        </li>
    
        <li>
            <h3>Generar código QR para SMS</h3>
            <ul>
                <li><strong>URL:</strong> <code>/generate/sms</code></li>
                <li><strong>Método:</strong> <code>POST</code></li>
                <li><strong>Cuerpo de la solicitud:</strong>
                    <pre><code>{
        "phoneNumber": "Número de teléfono",
        "message": "Mensaje de texto"
    }</code></pre>
                </li>
            </ul>
        </li>
    
        <li>
            <h3>Generar código QR para WiFi</h3>
            <ul>
                <li><strong>URL:</strong> <code>/generate/wifi</code></li>
                <li><strong>Método:</strong> <code>POST</code></li>
                <li><strong>Cuerpo de la solicitud:</strong>
                    <pre><code>{
        "ssid": "Nombre de la red WiFi",
        "password": "Contraseña WiFi",
        "securityType": "Tipo de seguridad (WPA, WEP, etc.)"
    }</code></pre>
                </li>
            </ul>
        </li>
    
        <li>
            <h3>Generar código QR para Bitcoin</h3>
            <ul>
                <li><strong>URL:</strong> <code>/generate/bitcoin</code></li>
                <li><strong>Método:</strong> <code>POST</code></li>
                <li><strong>Cuerpo de la solicitud:</strong>
                    <pre><code>{
        "address": "Dirección de Bitcoin",
        "amount": "Cantidad de Bitcoin (opcional)"
    }</code></pre>
                </li>
            </ul>
        </li>
    
        <li>
            <h3>Generar código QR para archivos PDF</h3>
            <ul>
                <li><strong>URL:</strong> <code>/generate/pdf</code></li>
                <li><strong>Método:</strong> <code>POST</code></li>
                <li><strong>Cuerpo de la solicitud:</strong>
                    <pre><code>{
        "fileUrl": "URL del archivo PDF"
    }</code></pre>
                </li>
            </ul>
        </li>
    
        <li>
            <h3>Generar código QR para archivos MP3</h3>
            <ul>
                <li><strong>URL:</strong> <code>/generate/mp3</code></li>
                <li><strong>Método:</strong> <code>POST</code></li>
                <li><strong>Cuerpo de la solicitud:</strong>
                    <pre><code>{
        "audioUrl": "URL del archivo MP3"
    }</code></pre>
                </li>
            </ul>
        </li>
    
        <li>
            <h3>Generar código QR para la App Store</h3>
            <ul>
                <li><strong>URL:</strong> <code>/generate/app-store</code></li>
                <li><strong>Método:</strong> <code>POST</code></li>
                <li><strong>Cuerpo de la solicitud:</strong>
                    <pre><code>{
        "appId": "ID de la aplicación en la App Store"
    }</code></pre>
                </li>
            </ul>
        </li>
    
        <li>
            <h3>Generar código QR para la Galería de imágenes</h3>
            <ul>
                <li><strong>URL:</strong> <code>/generate/image-gallery</code></li>
                <li><strong>Método:</strong> <code>POST</code></li>
                <li><strong>Cuerpo de la solicitud:</strong>
                    <pre><code>{
        "imageUrls": ["URL1", "URL2", ...]
    }</code></pre>
                </li>
            </ul>
        </li>
    </ol>
    
    <hr>
    
    <p>¡Gracias por usar la API de Generación de Códigos QR! Si necesitas ayuda adicional, no dudes en contactarme.</p>
    
    <h2>Contacto</h2>
    <p>Dame una estrella en <a href="https://github.com/ManuFerrer094/qr-api">Github</a>!</p>
    <p>¡Conéctate conmigo en <a href="https://www.linkedin.com/in/manuferrer/">LinkedIn</a>!</p>
    
    </body>
    </html>
    `;
    
    res.send(html);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
