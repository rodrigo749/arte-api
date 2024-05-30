require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
  url: MONGODB_URI,
  PORT: 27017,
  DB: "tutorial"
}