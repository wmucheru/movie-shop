import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Logout from './components/Logout';

import Login from './screens/Login';
import Admin from './screens/Admin';
import Movies from './screens/Movies';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={ <Login /> } />
                <Route path="/movies" element={ <Movies /> } />
                <Route path="/admin" element={ <Admin /> } />
                <Route path="/logout" element={ <Logout /> } />
            </Routes>
        </Router>
    );
}

export default App;
