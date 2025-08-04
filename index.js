const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const daiRouter = require('./routes/dai');

dotenv.config(); // Cargar variables de entorno

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Ruta delegada a /ApiTest
app.use('/ApiTest', daiRouter);

app.get('/', (req, res) => {
  res.send('Servidor API corriendo. Usa la ruta /ApiTest/totalSupply para ver el resultado.');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

