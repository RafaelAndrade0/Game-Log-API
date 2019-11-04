const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load Env Vars
dotenv.config({ path: './config/config.env' });

// Load Models
const Game = require('./models/Game');

// Connect to Database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Converts the Json into an object
const games = JSON.parse(fs.readFileSync('./_data/games.json', 'utf-8'));

// Import into database
const importData = async () => {
  try {
    await Game.create(games);
    console.log('Data Imported....');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete from database
const deleteData = async () => {
  try {
    await Game.deleteMany();
    console.log('Data deleted....');
  } catch (error) {
    console.log(error);
  }
};

// process.argv[2] is the third argument on the command line. Ex: node serve -i
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
