import { useState } from 'react';

export default function MovieForm() {
    const [movie, setMovie] = useState({});

    const onSubmit = (e) => {
        e.preventDefault();

        console.log(movie);
    }

    onChange = (e) => {
        const { name, value } = e.target;
        setMovie({
            ...movie,
            [name]: value
        });
    }

    return (
        <>
            <form
                class="form movie-form"
                onSubmit={onSubmit}>

                <div className="form-group">
                    <input
                        type="text"
                        name="title"
                        className="form-control"
                        required
                        value={movie.title}
                        onChange={onChange} />
                </div>

                <div className="form-group">
                    <button className="btn btn-lg btn-primary">Save</button>
                </div>
            </form>
        </>
    );
}