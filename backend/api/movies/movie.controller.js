const Movie = require('../../models/movie');

module.exports = {

    getMovies: async (req, res) => {
        const id = req.params.id || '';

        try {
            if (id) {
                const movie = await Movie.fetchById(id);
                res.status(200).json(movie);
            }
            else {
                const movies = await Movie.find({});
                res.status(200).json(movies);
            }
        }
        catch (e) {
            console.log(e)
            res.status(500).send({
                error: true,
                message: 'Could not fetch movie'
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

    updateMovie: async (req, res) => {
        const { _id } = req.body;

        try {
            const update = await Movie.findOneAndUpdate({ _id }, req.body);
            console.log(update);

            res.status(200).send({
                message: 'Movie updated'
            });
        }
        catch (e) {
            res.status(500).send({
                error: true,
                message: e
            });
        }
    },

    deleteMovie: async (req, res) => {
        const id = req.params.id || '';

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