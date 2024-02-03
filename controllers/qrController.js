const QRCode = require('qrcode');

// Endpoint para generar código QR para URL
const generateUrlQR = (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'Missing URL parameter' });
    }

    QRCode.toDataURL(url, { type: 'image/png' }, (err, qrCodeUrl) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return res.status(500).json({ error: 'Failed to generate QR code' });
        }
        
        res.json({ qr_code_url: qrCodeUrl });
    });
};

// Endpoint para generar código QR para vCard
const generateVCardQR = (req, res) => {
    const { name, email, phone, address, title, url } = req.body;
    if (!name || !email || !phone) {
        return res.status(400).json({ error: 'Missing contact information' });
    }

    const vCardData = 
        `BEGIN:VCARD
        VERSION:3.0
        N:${name}
        EMAIL:${email}
        TEL:${phone}
        ${address ? `ADR:${address}` : ''}
        ${title ? `TITLE:${title}` : ''}
        ${url ? `URL:${url}` : ''}
        END:VCARD`;

    QRCode.toDataURL(vCardData, { type: 'image/png' }, (err, qrCodeUrl) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return res.status(500).json({ error: 'Failed to generate QR code' });
        }
        
        res.json({ qr_code_url: qrCodeUrl });
    });
};

// Endpoint para generar código QR para Twitter
const generateTwitterQR = (req, res) => {
    const { tweet, username } = req.body;
    if (!tweet) {
        return res.status(400).json({ error: 'Missing tweet text' });
    }

    const tweetData = `${tweet} - ${username ? `@${username}` : ''}`;

    QRCode.toDataURL(tweetData, { type: 'image/png' }, (err, qrCodeUrl) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return res.status(500).json({ error: 'Failed to generate QR code' });
        }
        
        res.json({ qr_code_url: qrCodeUrl });
    });
};

// Endpoint para generar código QR para correo electrónico
const generateEmailQR = (req, res) => {
    const { recipient, subject, body } = req.body;
    if (!recipient || !subject || !body) {
        return res.status(400).json({ error: 'Missing email parameters' });
    }

    const emailData = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    QRCode.toDataURL(emailData, { type: 'image/png' }, (err, qrCodeUrl) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return res.status(500).json({ error: 'Failed to generate QR code' });
        }
        
        res.json({ qr_code_url: qrCodeUrl });
    });
};

// Endpoint para generar código QR para SMS
const generateSMSQR = (req, res) => {
    const { phoneNumber, message } = req.body;
    if (!phoneNumber || !message) {
        return res.status(400).json({ error: 'Missing SMS parameters' });
    }

    const smsData = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;

    QRCode.toDataURL(smsData, { type: 'image/png' }, (err, qrCodeUrl) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return res.status(500).json({ error: 'Failed to generate QR code' });
        }
        
        res.json({ qr_code_url: qrCodeUrl });
    });
};

// Endpoint para generar código QR para WiFi
const generateWiFiQR = (req, res) => {
    const { ssid, password, securityType } = req.body;
    if (!ssid || !password || !securityType) {
        return res.status(400).json({ error: 'Missing WiFi parameters' });
    }

    const wifiData = `WIFI:S:${ssid};T:${securityType};P:${password};;`;

    QRCode.toDataURL(wifiData, { type: 'image/png' }, (err, qrCodeUrl) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return res.status(500).json({ error: 'Failed to generate QR code' });
        }
        
        res.json({ qr_code_url: qrCodeUrl });
    });
};

// Endpoint para generar código QR para Bitcoin
const generateBitcoinQR = (req, res) => {
    const { address, amount } = req.body;
    if (!address) {
        return res.status(400).json({ error: 'Missing Bitcoin address' });
    }

    const bitcoinData = `bitcoin:${address}${amount ? `?amount=${amount}` : ''}`;

    QRCode.toDataURL(bitcoinData, { type: 'image/png' }, (err, qrCodeUrl) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return res.status(500).json({ error: 'Failed to generate QR code' });
        }
        
        res.json({ qr_code_url: qrCodeUrl });
    });
};

// Endpoint para generar código QR para archivos PDF
const generatePDFQR = (req, res) => {
    const { fileUrl } = req.body;
    if (!fileUrl) {
        return res.status(400).json({ error: 'Missing PDF file URL' });
    }

    const pdfData = `pdf:${fileUrl}`;

    QRCode.toDataURL(pdfData, { type: 'image/png' }, (err, qrCodeUrl) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return res.status(500).json({ error: 'Failed to generate QR code' });
        }
        
        res.json({ qr_code_url: qrCodeUrl });
    });
};

// Endpoint para generar código QR para archivos MP3
const generateMP3QR = (req, res) => {
    const { audioUrl } = req.body;
    if (!audioUrl) {
        return res.status(400).json({ error: 'Missing MP3 audio file URL' });
    }

    const mp3Data = `mp3:${audioUrl}`;

    QRCode.toDataURL(mp3Data, { type: 'image/png' }, (err, qrCodeUrl) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return res.status(500).json({ error: 'Failed to generate QR code' });
        }
        
        res.json({ qr_code_url: qrCodeUrl });
    });
};

// Endpoint para generar código QR para la App Store
const generateAppStoreQR = (req, res) => {
    const { appId } = req.body;
    if (!appId) {
        return res.status(400).json({ error: 'Missing App Store app ID' });
    }

    const appStoreData = `app-store:${appId}`;

    QRCode.toDataURL(appStoreData, { type: 'image/png' }, (err, qrCodeUrl) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return res.status(500).json({ error: 'Failed to generate QR code' });
        }
        
        res.json({ qr_code_url: qrCodeUrl });
    });
};

// Endpoint para generar código QR para la Galería de imágenes
const generateImageGalleryQR = (req, res) => {
    const { imageUrls } = req.body;
    if (!imageUrls || !Array.isArray(imageUrls) || imageUrls.length === 0) {
        return res.status(400).json({ error: 'Missing image URLs' });
    }

    const imageGalleryData = `image-gallery:${imageUrls.join(',')}`;

    QRCode.toDataURL(imageGalleryData, { type: 'image/png' }, (err, qrCodeUrl) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return res.status(500).json({ error: 'Failed to generate QR code' });
        }
        
        res.json({ qr_code_url: qrCodeUrl });
    });
};

// Endpoint original para generar código QR
const generateQR = (req, res) => {
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

    QRCode.toDataURL(text, { type: outputType }, (err, qrCodeUrl) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return res.status(500).json({ error: 'Failed to generate QR code' });
        }
        
        if (format === 'utf8') {
            res.send(qrCodeUrl);
        } else {
            res.json({ qr_code_url: qrCodeUrl });
        }
    });
};

module.exports = {
    generateUrlQR,
    generateVCardQR,
    generateTwitterQR,
    generateEmailQR,
    generateSMSQR,
    generateWiFiQR,
    generateBitcoinQR,
    generatePDFQR,
    generateMP3QR,
    generateAppStoreQR,
    generateImageGalleryQR,
    generateQR
};