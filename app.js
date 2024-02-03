const express = require('express');
const QRCode = require('qrcode');
const app = express();
const port = 3000;

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

app.listen(port, () => {
    console.log(`Server is listening at https://qrapi-rho.vercel.app/`);
});
