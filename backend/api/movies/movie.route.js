const router = require('express').Router();

const { getMovies, addMovie, updateMovie, deleteMovie } = require('./movie.controller');

router.get('/', getMovies);
router.get('/:id', getMovies);
router.post('/', addMovie);
router.put('/', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;