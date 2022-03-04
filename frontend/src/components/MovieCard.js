import { Link } from 'react-router-dom';

import MoviePoster from './MoviePoster';

import axios from '../utils/axios';
import { isAdmin } from '../utils/auth';
import { MOVIES_URL } from '../utils/urls';

/**
 * 
 * Movie Card
 * 
 * Depending on the type of of user, show button for toggling price screen / admin functions
 * 
*/
export default function MovieCard({movie, onDelete}) {
    const { _id, title, type, genre, popularity } = movie;

    const onClickDelete = (e) => {
        e.preventDefault();

        if (window.confirm('Delete this movie?')) {
            axios.delete(`${MOVIES_URL}/${_id}`)
                .then(response => {
                    // console.log(response);

                    if (response.status === 200) {
                        onDelete(_id);
                    }
                    else {
                        console.log('Could not save movie');
                    }
                })
                .catch(e => {
                    console.log('Error saving movie');
                });
        }
    }

    const showActionButtons = () => {
        if (isAdmin()) {
            return (
                <>
                    <Link to={`/admin/movies/${_id}`} className="btn btn-xs btn-warning">Edit</Link>

                    <button
                        className="btn btn-xs btn-danger"
                        onClick={onClickDelete}>Delete</button>
                </>
            )
        }
        else { 
            return <Link to={`/movies/${_id}`} className="btn btn-sm btn-block btn-success">Rent</Link>
        }
    }

    return (
        <div className="movie-card col-xs-6 col-sm-3 col-md-2">
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