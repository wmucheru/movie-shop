import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Logout from './components/Logout';

import Login from './screens/Login';
import Admin from './screens/Admin';
import Movies from './screens/Movies';
import MovieForm from './screens/MovieForm';
import Page404 from './screens/Page404';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Login />} />

                <Route path="/movies" element={<Movies />} />

                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/movie/new" element={<MovieForm />} />
                <Route path="/admin/movies/:movieId" element={<MovieForm />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/*" element={<Page404 />} />
            </Routes>
        </Router>
    );
}

export default App;
