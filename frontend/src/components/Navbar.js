import { Link } from 'react-router-dom';

import { getUser } from '../utils/auth';

export default function Navbar() {
    const user = getUser();

    return (
        <nav className="navbar navbar-default" role="navigation">
            <div className="navbar-header">
                <button type="button" className="navbar-toggle" data-toggle="collapse"
                    data-target=".navbar-ex1-collapse">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </button>
                <Link to="/" className="navbar-brand">Movie Shop</Link>
            </div>

            <div className="collapse navbar-collapse navbar-ex1-collapse">
                <ul className="nav navbar-nav">
                    <li className="active">
                        <Link to="/movies">Movies</Link>
                    </li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                    <li>{ user.username }</li>
                    <li>
                        <Link to="/logout">Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}