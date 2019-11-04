const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDb();

// Body Parser (acess to req.body)
app.use(express.json());

// Route Files
const games = require('./routes/games');

// Mount Routes
app.use('/api/v1/games', games);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    colors.bgBlue(`Server running in ${process.env.NODE_ENV} on port ${PORT}!`)
  );
});
