// index.js

const express = require('express');
const mongoose = require('mongoose');
const rateLimit = require("express-rate-limit");
const cors = require('cors');
const qrController = require('./controllers/qrController');
const userController = require('./controllers/userController');
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

mongoose.connect('mongodb://localhost:27017/myapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexión a la base de datos exitosa');
}).catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
});

//Endpoints para los users
app.post('/users', userController.createUser);
app.get('/users/:userId', userController.getUser);
app.put('/users/:userId', userController.updateUser);
app.delete('/users/:userId', userController.deleteUser);

//Endpoints para los qr
app.post('/generate/url', qrController.generateUrlQR);
app.post('/generate/vcard', qrController.generateContactQR);
app.post('/generate', qrController.generateQR);

//Documentacion
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
