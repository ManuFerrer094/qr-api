const express = require('express');
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const qrController = require('./controllers/qrController');

const app = express();
const port = process.env.PORT || 3000;

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, 
  max: 100, 
  message: "Has excedido el límite de solicitudes, por favor intenta más tarde."
});
app.use(limiter);

app.use(express.json());
app.use(cors());

// Endpoint para generar código QR para URL
app.post('/generate/url', qrController.generateUrlQR);

// Endpoint para generar código QR para vCard
app.post('/generate/vcard', qrController.generateVCardQR);

// Endpoint para generar código QR para Twitter
app.post('/generate/twitter', qrController.generateTwitterQR);

// Endpoint para generar código QR para correo electrónico
app.post('/generate/email', qrController.generateEmailQR);

// Endpoint para generar código QR para SMS
app.post('/generate/sms', qrController.generateSMSQR);

// Endpoint para generar código QR para WiFi
app.post('/generate/wifi', qrController.generateWiFiQR);

// Endpoint para generar código QR para Bitcoin
app.post('/generate/bitcoin', qrController.generateBitcoinQR);

// Endpoint para generar código QR para archivos PDF
app.post('/generate/pdf', qrController.generatePDFQR);

// Endpoint para generar código QR para archivos MP3
app.post('/generate/mp3', qrController.generateMP3QR);

// Endpoint para generar código QR para la App Store
app.post('/generate/app-store', qrController.generateAppStoreQR);

// Endpoint para generar código QR para la Galería de imágenes
app.post('/generate/image-gallery', qrController.generateImageGalleryQR);

// Endpoint original para generar código QR
app.post('/generate', qrController.generateQR);

app.get('/', (req, res) => {
    res.send('¡Bienvenido a la API de generación de códigos QR!');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});
