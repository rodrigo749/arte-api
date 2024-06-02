const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.tutorials = require("./tutorial.model.js")(mongoose);
db.artes = require("./arte.model.js")(mongoose);
db.categorias = require("./categoria.model.js")(mongoose);
db.user = require("./user.model");
db.role = require("./role.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;