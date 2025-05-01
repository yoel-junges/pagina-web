require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// Configuración del transporter de Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Ruta para el envío de correos
app.post('/api/contacto', async (req, res) => {
    try {
        const { nombre, email, telefono, consulta, mensaje } = req.body;

        // Configurar el correo
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'ventas@metalurgicabreques.com.ar',
            subject: `Nuevo mensaje de contacto: ${consulta}`,
            html: `
                <h2>Nuevo mensaje de contacto</h2>
                <p><strong>Nombre:</strong> ${nombre}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Teléfono:</strong> ${telefono}</p>
                <p><strong>Tipo de consulta:</strong> ${consulta}</p>
                <p><strong>Mensaje:</strong></p>
                <p>${mensaje}</p>
            `
        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Correo enviado con éxito' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ error: 'Error al enviar el correo' });
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
}); 