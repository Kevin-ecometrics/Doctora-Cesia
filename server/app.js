const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const moment = require("moment");

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
