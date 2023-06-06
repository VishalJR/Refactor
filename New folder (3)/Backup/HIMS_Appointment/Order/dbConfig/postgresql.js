const Sequelize = require("sequelize");
require(`dotenv`).config();

const database = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: process.env.dialect
});

const db = {};

db.Sequelize = Sequelize;
db.database = database;
db.Order = require("../schema/Common/Order")(database, Sequelize);
db.Payment = require('../schema/Common/payment')(database,Sequelize)
db.DoctorOrder = require('../schema/Provider/DoctorOrder') (database,Sequelize)


db.database.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });
//export db
module.exports = db
