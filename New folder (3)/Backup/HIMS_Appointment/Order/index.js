const express = require('express');
const serverless = require('serverless-http')
const bodyParser = require('body-parser');
const orderRoutes = require('./Routes/routes');
const sequelize = require('sequelize');
 require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(bodyParser.json());

// Routes
app.use('/api',orderRoutes);

// Error handler middleware
app.use(express.urlencoded({extended:true}))

// Start the server

app.listen(PORT, () => { console.log('Connected', PORT) })

var handler= serverless(app)
module.exports={app, handler}