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
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>QR API</title>
        <link rel="icon" href="qrfavicon.ico" type="image/x-icon">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Honk&family=Play:wght@400;700&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Honk&family=Inter:wght@100..900&family=Play:wght@400;700&display=swap" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    </head>
    <style>
    :root {
        --font-family: "Inter", sans-serif;
        --heading-font-family: "Play", sans-serif;
        --primary-color: #00c8ff;
        --secondary-color: #12cf3e;
        --text-color: #ddd;
        --background-color: #333;
        --code-background-color: #1e1e1e;
        --code-text-color: #fff;
        --link-hover-color: #0056b3;
    }
    
    body {
        font-family: var(--font-family);
        font-optical-sizing: auto;
        font-weight: 400;
        font-style: normal;
        font-variation-settings: "slnt" 0;
        line-height: 1.6;
        margin: 20px;
        padding: 20px;
        background-color: var(--background-color);
        color: var(--text-color);
    }
    
    h1, h2, h3, h4 {
        font-family: var(--heading-font-family);
        font-weight: 700;
        font-style: normal;
    }
    
    h1 {
        font-size: 2.5em;
    }
    
    h2 {
        font-size: 2em;
    }
    
    h3 {
        font-size: 1.5em;
    }
    
    h4 {
        font-size: 1.2em;
    }
    
    p {
        color: #bbb;
    }
    
    ul, ol {
        margin-top: 0;
        padding-left: 20px;
    }
    
    ul li, ol li {
        margin-bottom: 10px;
    }
    
    pre {
        background-color: var(--code-background-color);
        color: var(--code-text-color);
        padding: 20px;
        border-radius: 5px;
        overflow-x: auto;
    }
    
    pre code {
        display: block;
        white-space: pre;
    }
    
    .keyword {
        color: var(--primary-color);
    }
    
    .string {
        color: var(--secondary-color);
    }
    
    .comment {
        color: #6c757d;
    }
    
    .punctuation {
        color: #6c757d;
    }
    
    a {
        text-decoration: none;
        color: var(--primary-color);
        transition: color 0.3s ease;
    }
    
    a:hover {
        color: var(--link-hover-color);
        text-decoration: underline;
    }    
    </style>
    <body>
    <div class="container">
        <h1>QR API</h1>
        <p>Esta API proporciona endpoints para generar códigos QR para una variedad de propósitos, incluyendo URL, vCard, Twitter, correo electrónico, SMS, WiFi, Bitcoin, archivos PDF, archivos MP3, la App Store y galerías de imágenes.</p>
        
        <div class="row">
            <div class="col-md-6">
                <h2>Tecnologías utilizadas</h2>
                <p>
                    <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-14.x-green?logo=node.js" alt="Node.js"></a>
                    <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-4.x-blue" alt="Express"></a>
                    <a href="https://vercel.com/"><img src="https://img.shields.io/badge/Vercel-Deployed-black?logo=vercel" alt="Vercel"></a>
                    <a href="https://www.postman.com/"><img src="https://img.shields.io/badge/Postman-API%20Testing-orange?logo=postman" alt="Postman"></a>
                </p>
            </div>
            <div class="col-md-6">
                <h2>Limitación de solicitudes</h2>
                <p>La API implementa un límite de solicitudes para prevenir un uso excesivo del servicio. Si excedes el límite de 1500 solicitudes por día, recibirás un mensaje de error.</p>
                <p><strong>URL Base:</strong> <code>https://qrapi-rho.vercel.app</code></p>
            </div>
        </div>

        <h2>Endpoints sisponibles</h2>
        <ol>
            <li>
                <h3>Generar código QR para texto</h3>
                <ul>
                    <li><strong>URL:</strong> <code>/generate</code></li>
                    <li><strong>Método:</strong> <code>POST</code></li>
                    <li><strong>Cuerpo de la solicitud:</strong>
                        <pre><code><span class="punctuation">{</span>
    <span class="keyword">"text"</span>: <span class="string">"Texto_a_codificar"</span>
<span class="punctuation">}</span></code></pre>
                    </li>
                </ul>
            </li>
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
        </ol>

        <hr>
        <h2>Contacto</h2>
        <p>Dame una estrella en <a href="https://github.com/ManuFerrer094/qr-api">Github</a>!</p>
        <p>¡Conéctate conmigo en <a href="https://www.linkedin.com/in/manuferrer/">LinkedIn</a>!</p>
    </div>
</body>
    </html>    
    `;

    // Enviar el contenido HTML como respuesta
    res.send(htmlContent);
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
