const QRCode = require('qrcode');
const vCardsJS = require('vcards-js');

const generateUrlQR = (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'Missing URL parameter' });
    }

    const options = {
        width: 250
    };

    QRCode.toDataURL(url, options, (err, qrCodeUrl) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return res.status(500).json({ error: 'Failed to generate QR code' });
        }
        
        res.json({ qr_code_url: qrCodeUrl });
    });
};

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

    const options = {
        width: 250
    };

    QRCode.toDataURL(text, options, (err, qrCodeUrl) => {
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

const generateContactQR = (req, res) => {
    const { name, phoneNumber, email, address } = req.body;

    const vCard = vCardsJS();
    vCard.firstName = name;
    vCard.cellPhone = phoneNumber;
    vCard.email = email;
    vCard.homeAddress.street = address;

    const vCardText = vCard.getFormattedString();

    QRCode.toDataURL(vCardText, (err, qrCodeUrl) => {
        if (err) {
            console.error('Error generating contact QR code:', err);
            return res.status(500).json({ error: 'Failed to generate contact QR code' });
        }
        
        res.json({ qr_code_url: qrCodeUrl });
    });
};

module.exports = {
    generateUrlQR,
    generateQR,
    generateContactQR
};
