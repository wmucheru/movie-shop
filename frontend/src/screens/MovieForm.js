import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import Alert from '../components/Alert';
import Page from '../components/Page';

import { MOVIES_URL } from '../utils/urls';
import axios from '../utils/axios';
import {
    TYPE_REGULAR,
    TYPE_CHILDRENS_MOVIE,
    TYPE_NEW_RELEASE,
    MOVIE_TYPES,
    GENRES,
    POPULARITY
} from '../utils/constants';

/* Helper functions */
const getDefaultPrice = (movieType = '') => {
    let price = 0;

    switch (movieType) {
        case TYPE_CHILDRENS_MOVIE:
            price = 0.54;
            break;

        case TYPE_NEW_RELEASE:
            price = 1.50;
            break;

        case TYPE_REGULAR:
        default:
            price = 1.00;
            break;
    }

    return price;
}

export default function MovieForm() {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [movie, setMovie] = useState({
        title: '',
        type: '',
        genre: '',
        popularity: '',
        rentalPrice: ''
    });

    let navigate = useNavigate();

    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {

        if (movieId) {
            axios.get(`${MOVIES_URL}/${movieId}`)
                .then(response => {
                    // console.log(response);
                    setLoading(false);

                    if (response.status === 200) {
                        setMovie(response.data);
                    }
                    else {
                        setMessage('Could not fetch movie');
                    }
                })
                .catch(e => {
                    setMessage('Error fetching movie');
                    setLoading(false);
                });
        }
    }, [movieId]);

    const onSubmit = (e) => {
        e.preventDefault();

        axios.request({
            method: movieId ? 'PUT' : 'POST',
            url: MOVIES_URL,
            data: movie
        })
            .then(response => {
                setLoading(false);

                if ([200, 201].includes(response.status)) {
                    setMessage(response.data.message);
                    setMovie({});
                    navigate('/admin');
                }
                else {
                    setMessage('Could not save movie');
                }
            })
            .catch(e => {
                setMessage('Error saving movie');
                setLoading(false);
            });
    }

    const onChange = (e) => {
        const { name, value } = e.target;

        // Update default price when type changes
        if (name === 'type') {
            movie.rentalPrice = getDefaultPrice(value);
        }

        setMovie({
            ...movie,
            [name]: value
        });
    }

    return (
        <Page title={movieId ? 'Edit Movie' : 'New Movie'}>
            <form
                className="form-horizontal movie-form col-sm-9 col-md-6"
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
                            autoComplete="off"
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
                            MOVIE_TYPES.map((t, i) => {
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
                            GENRES.map((g, i) => {
                                return (
                                    <div key={i} className="radio">
                                        <label>
                                            <input
                                                type="radio"
                                                name="genre"
                                                id="genre"
                                                required
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
                            POPULARITY.map((n, i) => {
                                const pNum = Number.parseInt(movie.popularity)

                                return (
                                    <label key={i} className="radio-inline">
                                        <input
                                            type="radio"
                                            name="popularity"
                                            id="popularity"
                                            required
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
                    <label htmlFor="rentalPrice" className="control-label col-sm-4">Rental Price ($)</label>
                    <div className="col-sm-8">
                        <input
                            type="number"
                            name="rentalPrice"
                            id="rentalPrice"
                            className="form-control"
                            required
                            value={movie.rentalPrice}
                            onChange={onChange} />
                    </div>
                </div>

                {movie.type === TYPE_CHILDRENS_MOVIE ?

                    <div className="form-group">
                        <label htmlFor="maximumAge" className="control-label col-sm-4">Maximum Age</label>
                        <div className="col-sm-8">
                            <input
                                type="number"
                                name="maximumAge"
                                id="maximumAge"
                                className="form-control"
                                required
                                value={movie.maximumAge}
                                onChange={onChange} />
                        </div>
                    </div>
                    : null
                }

                {movie.type === TYPE_NEW_RELEASE ?

                    <div className="form-group">
                        <label htmlFor="releaseYear" className="control-label col-sm-4">Release Year</label>
                        <div className="col-sm-8">
                            <input
                                type="number"
                                name="releaseYear"
                                id="releaseYear"
                                className="form-control"
                                required
                                value={movie.releaseYear}
                                onChange={onChange} />
                        </div>
                    </div>
                    : null
                }

                <div className="form-group">
                    <div className="col-sm-offset-4 col-sm-8">
                        <hr />
                        <button className="btn btn-lg btn-block btn-primary">Save</button>
                    </div>
                </div>
            </form>
        </Page>
    );
}