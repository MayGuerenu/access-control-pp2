const express = require('express');
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/index.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('API PP2 funcionando');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
