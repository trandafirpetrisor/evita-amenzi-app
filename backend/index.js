const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Rute
app.use('/api/auth', require('./routes/auth'));
app.use('/api/masini', require('./routes/masini'));

app.get('/', (req, res) => {
  res.json({ message: 'EvitaAmenzi API functioneaza!' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server pornit pe portul ${PORT}`);
});