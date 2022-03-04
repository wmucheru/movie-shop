import defaultPoster from '../images/default-poster.png';

export default function MoviePoster({ title='Movie Shop' }) {
    return (
        <img
            src={defaultPoster}
            className="movie-poster"
            alt={title} />
    )
}