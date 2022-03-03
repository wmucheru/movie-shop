const Movie = require('../../models/movie');

module.exports = {

    getMovies: async (req, res) => {
        try {
            const movies = await Movie.find({}) || [];
            res.status(200).json(movies);
        }
        catch (e) {
            res.status(500).send({
                error: true,
                message: e
            });
        }
    },

    addMovie: async (req, res) => {
        try {
            const movie = new Movie(req.body);

            let save = await movie.save();
            console.log(save);

            res.status(201).send({
                message: 'Movie saved'
            });
        }
        catch (e) {
            res.status(500).send({
                error: true,
                message: e
            });
        }
    },

    updateMovie: (req, res) => {
        const body = JSON.parse(req.body);
    }
}