const express = require('express');
const rateLimit = require("express-rate-limit");
const QRCode = require('qrcode');
const cors = require('cors'); // Importa el módulo CORS

const app = express();
const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 100, 
  message: "Has excedido el límite de solicitudes, por favor intenta más tarde."
});
app.use(limiter);

app.use(express.json());

// Configuración de CORS
app.use(cors());

app.post('/generate', (req, res) => {
    const { text, format } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Missing text parameter' });
    }

    let outputType = 'image/png';
    switch (format) {
        case 'png':
            outputType = 'image/png';
            break;
        case 'svg':
            outputType = 'image/svg+xml';
            break;
        case 'utf8':
            outputType = 'text/plain';
            break;
        default:
            outputType = 'image/png';
    }

    QRCode.toDataURL(text, { type: outputType }, (err, url) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return res.status(500).json({ error: 'Failed to generate QR code' });
        }
        
        if (format === 'utf8') {
            res.send(url);
        } else {
            res.json({ qr_code_url: url });
        }
    });
});


app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de generación de códigos QR!');
});


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
