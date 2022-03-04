import MoviePoster from './MoviePoster';

import { isAdmin } from '../utils/auth';

/**
 * 
 * Movie Card
 * 
 * Depending on the type of of user, show button for toggling price screen
 * 
*/
export default function MovieCard({movie}) {
    const { title, type, genre, popularity } = movie;

    const showActionButtons = () => {
        if (isAdmin()) {
            return (
                <>
                    <button className="btn btn-sm btn-primary">Edit</button>
                    <button className="btn btn-sm btn-danger">Delete</button>
                </>
            )
        }
        else { 
            return <button className="btn btn-sm btn-block btn-success">Rent</button>
        }
    }

    return (
        <div className="movie-card col-xs-2 col-sm-3">
            <div>
                <span className="movie-type">{type}</span>
                <MoviePoster title={title} />
                <div className="ellipsis movie-title">{title}</div>
                <div className="movie-info">{genre} &middot; {`${popularity}/5`}</div>
                <div className="movie-actions">
                    {showActionButtons()}
                </div>
            </div>
        </div>
    )
}