require('dotenv').config()
const env = process.env


module.exports = {
    HOST: env.HOST,
    USER: env.USER,
    PASSWORD: env.PASSWORD,
    DB: env.DATABASE,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  