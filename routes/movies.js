const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// router.get('/', (req,res) =>{
//     res.send('In movies page');
// });

// router.get('/hobbit', (req,res) =>{
//     res.send('In Hobbit page');
// });

// Post data to MongoDB
router.post('/', async (req,res) => {
    console.log(req.body);
    const movie = new Movie({
        title: req.body.title,
        description: req.body.description,
    });

    try{
        const savedMovie = await movie.save();
        res.json(savedMovie);
    }catch(err){
        res.json({message:err})

    }
})

// Retrieve all data from MongoDB

router.get('/', async (req,res) =>{
    try{
        const movies = await Movie.find().limit(5);
        res.json(movies);
    }catch(err){
        res.json({message: err});
    }
})

// Retrieve a movie from MongoDB
// movieId is a dynamic parameter
router.get('/:movieId', async (req,res) => {
    console.log(req.params.movieId)
    try{
        const movieById = await Movie.findById(req.params.movieId);
        res.send(movieById)
    }catch(err){
        res.json({message: err});
    }
})

// Delete a movie from MongoDB

router.delete('/:movieId', async (req,res) =>{
    try{
        const removeMovie = await Movie.deleteOne({_id:req.params.movieId})
        res.json(removeMovie)
    }catch(err){
        res.json({message:err})
    }
})

// Update a movie

router.patch('/:movieId', async (req,res) =>{
    try{
        const updateMovie = await Movie.updateOne(
        {_id:req.params.movieId}, 
        {$set: 
            {title:req.body.title, description: req.body.description}
        });
        res.send(updateMovie);
    }catch(err){
        res.json({message: err})
    }
})

module.exports = router;