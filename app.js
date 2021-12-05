// Import express package
const express = require('express');

// Create an express app (execute express)
const app = express();

const mongoose = require('mongoose');

require('dotenv/config');

const movieRoutes = require('./routes/movies');

const bodyParser = require('body-parser')

// Middlewares

app.use(bodyParser.json());
app.use('/movies',movieRoutes);

// Routes

// Get request
app.get('/', (req,res) =>{
    res.send('In home page');
});

// Connect to MongoDB

mongoose.connect(process.env.DB_CONNECTOR, ()=>{
    console.log('Connected to Mongo')
})


// Start the server at port 3000
app.listen(3000)