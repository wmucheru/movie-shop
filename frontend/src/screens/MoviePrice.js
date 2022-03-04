import MoviePoster from '../components/MoviePoster';

export default function MoviePrice({ movie }) {
    const { title, type, genre, popularity } = movie;

    console.log(movie)

    return (
        <div className="row">
            <div className="col-sm-3">
                <MoviePoster title={movie.title} />
            </div>

            <div className="col-sm-offset-2 col-sm-8">
                INFO
            </div>
        </div>
    )
}