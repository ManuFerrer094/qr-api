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

// Endpoint para generar código QR para URL
app.post('/generate/url', qrController.generateUrlQR);

// Endpoint para generar código QR para contacto
app.post('/generate/vcard', qrController.generateContactQR);

// Endpoint original para generar código QR
app.post('/generate', qrController.generateQR);

app.get('/', (req, res) => {
    fs.readFile('docs/documentation.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading HTML file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data);
    });
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
