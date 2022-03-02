export function MovieCard({ title, type, genre, posterUrl }) {

    return (
        <div className="movie-card">
            <img
                src={posterUrl}
                className="movie-poster"
                alt={title} />
            <h4 class="movie-title"></h4>
            <div class="movie-info">{genre}</div>
        </div>
    )
}