const express = require('express');
const dotenv = require('dotenv');

const app = express();

// Load env vars
dotenv.config({ path: './config/config.env' });

// Route Files
const games = require('./routes/games');

// Mount Routes
app.use('/api/v1/games', games);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}!`);
});