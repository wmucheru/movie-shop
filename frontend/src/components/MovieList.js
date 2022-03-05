import { useEffect, useState } from 'react';

import Alert from './Alert';
import MovieCard from './MovieCard';

import { MOVIES_URL } from '../utils/urls';
import axios from '../utils/axios';

export default function MovieList() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {

        axios.get(MOVIES_URL)
            .then(response => {
                setLoading(false);

                if (response.status === 200) {
                    setMovies(response.data);
                }
                else {
                    setMessage('Could not fetch movies');
                }
            })
            .catch(e => {
                console.log(e)
                setLoading(false);
                setMessage('Error fetching movies');
            });
    }, []);

    const onDelete = (id) => {
        setMovies(movies.filter(m => m._id !== id));
    }

    const listMovies = () => {
        if (message !== '') {
            return <Alert text={message} type="danger" />
        }

        if (movies === undefined || movies.length === 0) {
            return <Alert text="No movies added" />;
        }

        return (
            <div className="row" style={{ marginRight:0 }}>
                {
                    movies.map((m, i) => {
                        return (
                            <MovieCard
                                key={i}
                                movie={m}
                                onDelete={onDelete} />
                        );
                    })
                }
            </div>
        );
    }

    return (
        <>
            {loading ?
                <Alert text="Loading..." /> : listMovies()
            }
        </>
    )
}