import { useEffect, useState } from 'react';

import Alert from './Alert';
import MovieCard from './MovieCard';

import { MOVIES_URL } from '../utils/urls';

export default function MovieList() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch(MOVIES_URL)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    setMessage('Could not fetch movies');
                    return [];
                }
            })
            .then(response => {
                setMovies(response);
                setLoading(false);
            })
            .catch(e => {
                console.log(e)
                setMessage('Error fetching movies');
                setLoading(false);
            });
    }, []);

    const buildList = (movies) => {
        if (movies === undefined || movies.length === 0) {
            return <Alert message="No movies added" />;
        }

        return (
            <div className="row">
                {
                    movies.map((m, i) => {
                        return (
                            <MovieCard
                                key={i}
                                movie={m} />
                        );
                    })
                }
            </div>
        );
    }

    return (
        <>
            {message !== '' ?
                <Alert text={message} type="danger" /> : null
            }
            {loading ?
                <Alert text="Loading..." /> : buildList(movies)
            }
        </>
    )
}