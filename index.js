const express = require('express');
const rateLimit = require("express-rate-limit");
const QRCode = require('qrcode');

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
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Missing text parameter' });
    }

    QRCode.toDataURL(text, (err, url) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return res.status(500).json({ error: 'Failed to generate QR code' });
        }
        res.json({ qr_code_url: url });
    });
});


app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de generación de códigos QR!');
});


app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
