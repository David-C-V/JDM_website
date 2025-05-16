const express = require('express');
const cors = require('cors');
const app = express();
const carRoutes = require('./routes/cars');
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/cars', carRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
