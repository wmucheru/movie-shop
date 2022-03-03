/**
 * 
 * Movie Card
 * 
 * Depending on the type of of user, show button for toggling price screen
 * 
*/
export default function MovieCard({ title, type, genre, posterUrl }) {

    return (
        <div className="movie-card">
            <img
                src={posterUrl}
                className="movie-poster"
                alt={title} />
            <div className="movie-title"></div>
            <div className="movie-info">{genre}</div>
        </div>
    )
}