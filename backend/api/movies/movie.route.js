const router = require('express').Router();

const { getMovies, addMovie, updateMovie } = require('./movie.controller');

router.get('/', getMovies);
router.post('/', addMovie);
router.put('/', updateMovie);

module.exports = router;