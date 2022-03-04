import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format, differenceInDays } from 'date-fns';
import numeral from 'numeral';

import Alert from '../components/Alert';
import Page from '../components/Page';
import MoviePoster from '../components/MoviePoster';

import axios from '../utils/axios';
import { MOVIES_URL } from '../utils/urls';
import { TYPE_REGULAR, TYPE_CHILDRENS_MOVIE, TYPE_NEW_RELEASE } from '../utils/constants';

const today = format(new Date(), 'yyyy-MM-dd');

export default function MoviePrice() {
    const [message, setMessage] = useState('');
    const [movie, setMovie] = useState({});
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [days, setDays] = useState(0);
    const [price, setPrice] = useState(0);

    let params = useParams();
    const movieId = params.movieId;

    useEffect(() => {

        if (movieId) {
            axios.get(`${MOVIES_URL}/${movieId}`)
                .then(response => {
                    // console.log(response);

                    if (response.status === 200) {
                        setMovie(response.data);
                    }
                    else {
                        setMessage('Could not fetch movie');
                    }
                })
                .catch(e => {
                    setMessage('Error fetching movie');
                });
        }
    }, [movieId]);

    useEffect(() => {
        const days = differenceInDays(new Date(endDate), new Date(startDate));
        // console.log(days);

        if (days > 0) {
            setDays(days);
        }

        const { rentalPrice=0, maximumAge=0, releaseYear=0 } = movie;

        // Calculate price
        if (typeof days === 'number') {
            let total = days * rentalPrice;

            switch (movie.type) {
                case TYPE_CHILDRENS_MOVIE:
                    total += (maximumAge / 2);
                    break;

                case TYPE_NEW_RELEASE:
                    total += Number.parseInt(releaseYear);
                    break;

                case TYPE_REGULAR:
                default:
                    break;
            }

            setPrice(total);
        }

    }, [startDate, endDate, movie]);

    const { title, type, rentalPrice, maximumAge=0, releaseYear=0 } = movie;

    return (
        <Page title="Rent Movie">
            {message ? <Alert text={message} /> : null}

            <div className="clearfix rent-movie">
                <div className="col-sm-3">
                    <MoviePoster title={movie.title} />
                </div>

                <div className="col-sm-7 form-horizontal">
                    <h2>{title}</h2>
                    <p>{type}</p>
                    <hr />

                    <div className="form-group">
                        <label htmlFor="startDate" className="control-label col-sm-4">Rental Period</label>
                        <div className="col-sm-8">
                            <div className="row">
                                <div className="col-sm-6" style={{ paddingRight: 0 }}>
                                    <label htmlFor="">Start</label><br/>
                                    <input
                                        type="date"
                                        name="startDate"
                                        id="startDate"
                                        className="form-control"
                                        min={today}
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        required />
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="">End</label><br/>
                                    <input
                                        type="date"
                                        name="endDate"
                                        id="endDate"
                                        className="form-control"
                                        min={startDate}
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        required />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="days" className="control-label col-sm-4">Days</label>
                        <div className="col-sm-8">
                            <span className="form-control">{days}</span>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="control-label col-sm-4">Daily Rate</label>
                        <div className="col-sm-8">
                            <span className="form-control">{rentalPrice}</span>
                        </div>
                    </div>

                    {maximumAge ?
                        <div className="form-group">
                            <label className="control-label col-sm-4">Maximum Age</label>
                            <div className="col-sm-8">
                                <span className="form-control">{maximumAge}</span>
                            </div>
                        </div>
                        :null
                    }

                    {releaseYear ?
                        <div className="form-group">
                            <label className="control-label col-sm-4">Release Year</label>
                            <div className="col-sm-8">
                                <span className="form-control">{releaseYear}</span>
                            </div>
                        </div>
                        : null
                    }

                    {days ?
                        <div className="form-group">
                            <div className="col-sm-offset-4 col-sm-8">
                                <hr />
                                <h3 className="text-info">
                                    TOTAL : ${numeral(price).format('0,0.00')}
                                </h3>
                            </div>
                        </div>
                        : null
                    }
                </div>
            </div>
        </Page>
    )
}