import { useState } from 'react';

import Alert from './Alert';

import { MOVIES_URL } from '../utils/urls';

export default function MovieForm() {
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [movie, setMovie] = useState({
        title: '',
        type: '',
        genre: '',
        popularity: '',
        maximumAge: '', // For children's movies
        yearReleased: '' // For new releases
    });

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(movie);

        fetch(MOVIES_URL, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(movie)
        })
        .then(response => {
            if (response.statusCode === 200) {
                return response.json();
            }
            else {
                setMessage('Could not save movie');
            }

            throw Error(response.statusText);
        })
        .then(response => {
            setMovie(response);
            setMessage(response);
            setLoading(false);
        })
        .catch(e => {
            setMessage('Error saving movie');
            setLoading(false);
        });
    }

    const onChange = (e) => {
        const { name, value } = e.target;

        setMovie({
            ...movie,
            [name]: value
        });
    }

    console.log(movie);

    const movieTypes = ['Regular', 'Children’s Movie', 'New Release'];
    const genres = ['Action', 'Drama', 'Romance', 'Comedy', 'Horror'];
    const popularity = [1, 2, 3, 4, 5];

    return (
        <>
            <form
                className="form-horizontal movie-form col-sm-6"
                onSubmit={onSubmit}>

                {loading ? <Alert text="Saving..." /> : null}
                {message ? <Alert text={message} /> : null}

                <div className="form-group">
                    <label htmlFor="title" className="control-label col-sm-4">Title</label>
                    <div className="col-sm-8">
                        <input
                            type="text"
                            name="title"
                            id="title"
                            autoFocus={true}
                            className="form-control"
                            required
                            value={movie.title}
                            onChange={onChange} />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="type" className="control-label col-sm-4">Type</label>
                    <div className="col-sm-8">
                        {
                            movieTypes.map((t, i) => {
                                return (
                                    <div key={i} className="radio">
                                        <label>
                                            <input
                                                type="radio"
                                                name="type"
                                                id="type"
                                                value={t}
                                                checked={t===movie.type}
                                                onChange={onChange} />
                                            {t}
                                        </label>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="genre" className="control-label col-sm-4">Genre</label>
                    <div className="col-sm-8">
                        {
                            genres.map((g, i) => {
                                return (
                                    <div key={i} className="radio">
                                        <label>
                                            <input
                                                type="radio"
                                                name="genre"
                                                id="genre"
                                                value={g}
                                                checked={g===movie.genre}
                                                onChange={onChange} />
                                            {g}
                                        </label>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="popularity" className="control-label col-sm-4">Popularity</label>
                    <div className="col-sm-8">
                        {
                            popularity.map((n, i) => {
                                const pNum = Number.parseInt(movie.popularity)

                                return (
                                    <label key={i} className="radio-inline">
                                        <input
                                            type="radio"
                                            name="popularity"
                                            id="popularity"
                                            value={n}
                                            checked={n===pNum}
                                            onChange={onChange} />
                                        {n}
                                    </label>
                                );
                            })
                        }
                    </div>
                </div>

                <div className="form-group">
                    <div className="col-sm-offset-4 col-sm-8">
                        <hr />
                        <button className="btn btn-lg btn-block btn-primary">Save</button>
                    </div>
                </div>
            </form>
        </>
    );
}