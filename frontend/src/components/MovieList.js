import { useEffect, useState } from 'react';

import Alert from './Alert';
import MovieCard from './MovieCard';

export default function MovieList() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetch('http://backend:3000/api/movies')
            .then(response => {
                if (response.statusCode === 200) {
                    return response.json();
                }

                throw Error(response.statusText);
            })
            .then(response => {
                setMovies(response);
                setLoading(false);
            })
            .catch(e => {
                setLoading(false);
            });
    }, []);

    const buildList = (movies) => {
        if (movies !== undefined && movies.length > 0) {
            return <Alert message="No movies added" />;
        }

        return (
            movies.map((m, i) => {
                return (
                    <MovieCard
                        key={i}
                        movie={m} />
                );
            })
        );
    }

    return (
        <>{loading ?
            <div className="text-info">Loading...</div>
            :
            buildList(movies)}</>
    )
}