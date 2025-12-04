const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, '../public')));



const pool = require('./config/db');

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error de conexión a la base:', err);
  } else {
    console.log('Conexión exitosa:', res.rows);
  }
});


// Importar rutas (con extensión .js)
const routes = require('./routes/index.routes.js');

app.use(express.json());
app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
