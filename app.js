const express = require('express');
const QRCode = require('qrcode');
const app = express();
const port = process.env.PORT || 3000; // Modificación para tomar el puerto de la variable de entorno o usar 3000 por defecto

app.use(express.json());

// Ruta principal que devuelve un HTML simple
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the QR API!</h1>');
});

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

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
