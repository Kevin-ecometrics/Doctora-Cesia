const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const moment = require("moment");
const axios = require("axios");

const CAPTCHA_SECRET_KEY = process.env.CAPTCHA_SECRET_KEY;

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cesia",
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});

app.post('/contact', async (req, res) => {
  const { name, lastName, email, phone, message, captchaToken } = req.body;

  if (!captchaToken) {
    return res.status(400).json({ message: 'Captcha requerido' });
  }

  try {
    const verify = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      { params: { secret: CAPTCHA_SECRET_KEY, response: captchaToken } }
    );
    if (!verify.data.success) {
      return res.status(400).json({ message: 'Captcha inválido' });
    }
  } catch (err) {
    console.error('Error verificando captcha:', err);
    return res.status(500).json({ message: 'Error verificando captcha' });
  }

  const mailOptions = {
      from: 'doctora@cesiaborjon.com', // Reemplaza con tu correo
      to: email,
      cc: 'doctora@cesiaborjon.com',
      subject: 'Informacion de Contacto',
      html: `
    <div style="font-family: Arial, sans-serif; background-color: #f8f8f8; padding: 40px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden;">
        
        <div style="background-color: #B09FCD; color: white; padding: 20px 30px;">
          <h2 style="margin: 0;">Nuevo mensaje de contacto</h2>
        </div>

        <div style="padding: 30px;">
          <p style="margin: 0 0 15px;"><strong style="color: #B09FCD;">Nombre:</strong> ${name} ${lastName}</p>
          <p style="margin: 0 0 15px;"><strong style="color: #B09FCD;">Email:</strong> ${email}</p>
          <p style="margin: 0 0 15px;"><strong style="color: #B09FCD;">Teléfono:</strong> ${phone}</p>
          <p style="margin: 0 0 10px;"><strong style="color: #B09FCD;">Mensaje:</strong></p>
          <p style="background-color: #B09FCD; padding: 15px; border-radius: 8px; color: #ffff;">
            ${message}
          </p>
        </div>

        <div style="background-color: #f1f1f1; text-align: center; padding: 15px; font-size: 12px; color: #FABB70;">
          Este mensaje fue enviado desde el formulario de contacto del sitio web.
        </div>
      </div>
    </div>
  `,  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      res.status(500).json({ message: 'Error al enviar el correo' });
      return;
    }
    console.log('Correo enviado:', info.response);
    res.status(200).json({ message: 'Correo enviado exitosamente' });
  });
});

app.post("/calendar", (req, res) => {
  const { name, phone, email, dateTime } = req.body;

  // Convertir dateTime al formato adecuado
  const formattedDateTime = moment(dateTime, "DD/MM/YYYY hh:mm A").format(
    "YYYY-MM-DD HH:mm:ss"
  );

  const query =
    "INSERT INTO citas (name, phone, email, dateTime) VALUES (?, ?, ?, ?)";
  db.query(query, [name, phone, email, formattedDateTime], (err, result) => {
    if (err) {
      console.error("Error al guardar los datos:", err);
      res.status(500).json({ message: "Error al guardar los datos" });
      return;
    }
    console.log("Datos guardados:", result);
    res.status(200).json({ message: "Datos guardados exitosamente" });
  });
});

app.get("/appointments", (req, res) => {
  const query = "SELECT * FROM citas";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener las citas:", err);
      res.status(500).json({ message: "Error al obtener las citas" });
      return;
    }
    res.status(200).json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
