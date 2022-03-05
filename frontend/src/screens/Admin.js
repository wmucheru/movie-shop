import { Link } from 'react-router-dom';

import Page from '../components/Page';
import MovieList from '../components/MovieList';
import SettingForm from '../components/SettingForm';

export default function Admin() {

    return (
        <Page title="Admin" bodyClass="admin-bd">
            <div role="tabpanel">
                <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active">
                        <a href="#movies" aria-controls="movies" role="tab" data-toggle="tab">Movies</a>
                    </li>
                    <li role="presentation">
                        <a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a>
                    </li>
                </ul>

                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane active" id="movies">
                        <Link to="/admin/movie/new" className="btn btn-success">+ New Movie</Link>
                        <hr />
                        <MovieList />
                    </div>
                    <div role="tabpanel" className="tab-pane clearfix" id="settings">
                        <SettingForm />
                    </div>
                </div>
            </div>
        </Page>
    );
}