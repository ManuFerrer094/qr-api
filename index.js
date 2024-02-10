const express = require('express');
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const qrController = require('./controllers/qrController');
const fs = require('fs');

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

app.post('/generate/url', qrController.generateUrlQR);
app.post('/generate/vcard', qrController.generateContactQR);
app.post('/generate', qrController.generateQR);

app.get('/', (req, res) => {
    // Contenido HTML a servir
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Documentación de la API de Generación de Códigos QR</title>
        <link rel="stylesheet" href="./resources/styles.css">
    </head>
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
    
    ul,
    ol {
        margin-top: 0;
        padding-left: 20px;
    }
    
    ul li,
    ol li {
        margin-bottom: 10px;
    }
    
    pre {
        background-color: #1e1e1e;
        color: #ffffff;
        padding: 20px;
        border-radius: 5px;
        overflow-x: auto;
      }
      
      pre code {
        display: block;
        white-space: pre;
      }
      
      .keyword {
        color: #569cd6;
      }
      
      .string {
        color: #ce9178;
      }
      
      .comment {
        color: #6a9955;
      }
      
      .punctuation {
        color: #d4d4d4;
      }
      
    
    a {
        text-decoration: none;
        color: #007bff;
    }
    
    a:hover {
        text-decoration: underline;
    }
    </style>
    <body>
        <h1>Documentación de la API de Generación de Códigos QR</h1>
        <p>¡Bienvenido a la documentación de QRAPI! Esta API proporciona endpoints para generar códigos QR para una variedad de propósitos, incluyendo URL, vCard, Twitter, correo electrónico, SMS, WiFi, Bitcoin, archivos PDF, archivos MP3, la App Store y galerías de imágenes.</p>
        <h2>Tecnologías Utilizadas</h2>
        <p>
            <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-14.x-green?logo=node.js" alt="Node.js"></a>
            <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-4.x-blue" alt="Express"></a>
            <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel" alt="Vercel"></a>
            <a href="https://www.postman.com/"><img src="https://img.shields.io/badge/Postman-API%20Testing-orange?logo=postman" alt="Postman"></a>
        </p>
        <h2>Limitación de Solicitudes</h2>
        <p>La API implementa un límite de solicitudes para prevenir un uso excesivo del servicio. Si excedes el límite de 1500 solicitudes por día, recibirás un mensaje de error.</p>
        <p><strong>URL Base:</strong> <code>https://qrapi-rho.vercel.app</code></p>
        <h2>Endpoints Disponibles</h2>
        <ol>
            <li>
                <h3>Generar código QR para URL</h3>
                <ul>
                    <li><strong>URL:</strong> <code>/generate/url</code></li>
                    <li><strong>Método:</strong> <code>POST</code></li>
                    <li><strong>Cuerpo de la solicitud:</strong>
                        <pre><code><span class="punctuation">{</span>
    <span class="keyword">"url"</span>: <span class="string">"URL_a_codificar"</span>
<span class="punctuation">}</span></code></pre>
                    </li>
                </ul>
            </li>
        
            <li>
                <h3>Generar código QR para vCard</h3>
                <ul>
                    <li><strong>URL:</strong> <code>/generate/vcard</code></li>
                    <li><strong>Método:</strong> <code>POST</code></li>
                    <li><strong>Cuerpo de la solicitud:</strong>
                        <pre><code><span class="punctuation">{</span>
    <span class="keyword">"name"</span>: <span class="string">"Nombre"</span>,
    <span class="keyword">"email"</span>: <span class="string">"Correo electrónico"</span>,
    <span class="keyword">"phone"</span>: <span class="string">"Número de teléfono"</span>,
    <span class="keyword">"address"</span>: <span class="string">"Dirección (opcional)"</span>,
    <span class="keyword">"title"</span>: <span class="string">"Título (opcional)"</span>,
    <span class="keyword">"url"</span>: <span class="string">"URL (opcional)"</span>
<span class="punctuation">}</span></code></pre>
                    </li>
                </ul>
            </li>
        
            <li>
                <h3>Generar código QR para Twitter</h3>
                <ul>
                    <li><strong>URL:</strong> <code>/generate/twitter</code></li>
                    <li><strong>Método:</strong> <code>POST</code></li>
                    <li><strong>Cuerpo de la solicitud:</strong>
                        <pre><code><span class="punctuation">{</span>
    <span class="keyword">"tweet"</span>: <span class="string">"Texto del tweet"</span>,
    <span class="keyword">"username"</span>: <span class="string">"Nombre de usuario de Twitter (opcional)"</span>
<span class="punctuation">}</span></code></pre>
                    </li>
                </ul>
            </li>
        
            <li>
                <h3>Generar código QR para correo electrónico</h3>
                <ul>
                    <li><strong>URL:</strong> <code>/generate/email</code></li>
                    <li><strong>Método:</strong> <code>POST</code></li>
                    <li><strong>Cuerpo de la solicitud:</strong>
                        <pre><code><span class="punctuation">{</span>
    <span class="keyword">"recipient"</span>: <span class="string">"Correo del destinatario"</span>,
    <span class="keyword">"subject"</span>: <span class="string">"Asunto del correo"</span>,
    <span class="keyword">"body"</span>: <span class="string">"Cuerpo del correo"</span>
<span class="punctuation">}</span></code></pre>
                    </li>
                </ul>
            </li>
        
            <li>
                <h3>Generar código QR para SMS</h3>
                <ul>
                    <li><strong>URL:</strong> <code>/generate/sms</code></li>
                    <li><strong>Método:</strong> <code>POST</code></li>
                    <li><strong>Cuerpo de la solicitud:</strong>
                        <pre><code><span class="punctuation">{</span>
    <span class="keyword">"phoneNumber"</span>: <span class="string">"Número de teléfono"</span>,
    <span class="keyword">"message"</span>: <span class="string">"Mensaje de texto"</span>
<span class="punctuation">}</span></code></pre>
                    </li>
                </ul>
            </li>
        
            <li>
                <h3>Generar código QR para WiFi</h3>
                <ul>
                    <li><strong>URL:</strong> <code>/generate/wifi</code></li>
                    <li><strong>Método:</strong> <code>POST</code></li>
                    <li><strong>Cuerpo de la solicitud:</strong>
                        <pre><code><span class="punctuation">{</span>
    <span class="keyword">"ssid"</span>: <span class="string">"Nombre de la red WiFi"</span>,
    <span class="keyword">"password"</span>: <span class="string">"Contraseña WiFi"</span>,
    <span class="keyword">"securityType"</span>: <span class="string">"Tipo de seguridad (WPA, WEP, etc.)"</span>
<span class="punctuation">}</span></code></pre>
                    </li>
                </ul>
            </li>
        
            <li>
                <h3>Generar código QR para Bitcoin</h3>
                <ul>
                    <li><strong>URL:</strong> <code>/generate/bitcoin</code></li>
                    <li><strong>Método:</strong> <code>POST</code></li>
                    <li><strong>Cuerpo de la solicitud:</strong>
                        <pre><code><span class="punctuation">{</span>
    <span class="keyword">"address"</span>: <span class="string">"Dirección de Bitcoin"</span>,
    <span class="keyword">"amount"</span>: <span class="string">"Cantidad de Bitcoin (opcional)"</span>
<span class="punctuation">}</span></code></pre>
                    </li>
                </ul>
            </li>
        
            <li>
                <h3>Generar código QR para archivos PDF</h3>
                <ul>
                    <li><strong>URL:</strong> <code>/generate/pdf</code></li>
                    <li><strong>Método:</strong> <code>POST</code></li>
                    <li><strong>Cuerpo de la solicitud:</strong>
                        <pre><code><span class="punctuation">{</span>
    <span class="keyword">"fileUrl"</span>: <span class="string">"URL del archivo PDF"</span>
<span class="punctuation">}</span></code></pre>
                    </li>
                </ul>
            </li>
        
            <li>
                <h3>Generar código QR para archivos MP3</h3>
                <ul>
                    <li><strong>URL:</strong> <code>/generate/mp3</code></li>
                    <li><strong>Método:</strong> <code>POST</code></li>
                    <li><strong>Cuerpo de la solicitud:</strong>
                        <pre><code><span class="punctuation">{</span>
    <span class="keyword">"audioUrl"</span>: <span class="string">"URL del archivo MP3"</span>
<span class="punctuation">}</span></code></pre>
                    </li>
                </ul>
            </li>
        
            <li>
                <h3>Generar código QR para la App Store</h3>
                <ul>
                    <li><strong>URL:</strong> <code>/generate/app-store</code></li>
                    <li><strong>Método:</strong> <code>POST</code></li>
                    <li><strong>Cuerpo de la solicitud:</strong>
                        <pre><code><span class="punctuation">{</span>
    <span class="keyword">"appId"</span>: <span class="string">"ID de la aplicación en la App Store"</span>
<span class="punctuation">}</span></code></pre>
                    </li>
                </ul>
            </li>
        
            <li>
                <h3>Generar código QR para la Galería de imágenes</h3>
                <ul>
                    <li><strong>URL:</strong> <code>/generate/image-gallery</code></li>
                    <li><strong>Método:</strong> <code>POST</code></li>
                    <li><strong>Cuerpo de la solicitud:</strong>
                        <pre><code><span class="punctuation">{</span>
    <span class="keyword">"imageUrls"</span>: [<span class="string">"URL1"</span>, <span class="string">"URL2"</span>, ...]
<span class="punctuation">}</span></code></pre>
                    </li>
                </ul>
            </li>
        </ol>
        
        <hr>
        <h2>Contacto</h2>
        <p>Dame una estrella en <a href="https://github.com/ManuFerrer094/qr-api">Github</a>!</p>
        <p>¡Conéctate conmigo en <a href="https://www.linkedin.com/in/manuferrer/">LinkedIn</a>!</p>
    </body>
    </html>    
    `;

    // Enviar el contenido HTML como respuesta
    res.send(htmlContent);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
