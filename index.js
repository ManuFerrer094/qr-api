const express = require('express');
const rateLimit = require("express-rate-limit");
const QRCode = require('qrcode');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 100, 
  message: "Has excedido el límite de solicitudes, por favor intenta más tarde."
});
app.use(limiter);

app.use(express.json());

app.post('/generate', (req, res) => {
    const { text, format, errorCorrectionLevel } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Missing text parameter' });
    }

    let options = {};
    if (errorCorrectionLevel) {
        options.errorCorrectionLevel = errorCorrectionLevel;
    }

    if (format) {
        if (format === 'svg' || format === 'utf8' || format === 'png') {
            options.type = format;
        } else {
            return res.status(400).json({ error: 'Invalid format parameter' });
        }
    }

    QRCode.toFile(`qr_code.${format}`, text, options, (err, url) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return res.status(500).json({ error: 'Failed to generate QR code' });
        }
        const file = `${__dirname}/qr_code.${format}`;
        const stat = fs.statSync(file);
        res.writeHead(200, {
            'Content-Type': 'application/octet-stream',
            'Content-Length': stat.size
        });
        const readStream = fs.createReadStream(file);
        readStream.pipe(res);
    });
});

app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de generación de códigos QR!');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
