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
                message: 'Movie added'
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
    },

    deleteMovie: async (req, res) => {
        const id = req.body.id;
        console.log('Movie ID: ', id);

        try {
            const remove = await Movie.deleteById(id);
            console.log(remove);

            res.status(200).send({
                message: 'Movie deleted'
            });
        }
        catch (e) {
            res.status(500).send({
                error: true,
                message: e
            });
        }
    }
}