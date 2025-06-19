const express = require('express');
const cors = require('cors');
const logger = require('./logger');
const routes = require('./routes');

const app = express();

app.use(cors({
  origin: ['http://localhost:3000', 'http://frontend:80'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});