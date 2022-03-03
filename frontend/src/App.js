import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Logout from './components/Logout';

import Login from './screens/Login';
import Admin from './screens/Admin';
import Movies from './screens/Movies';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/movies">
          <Movies />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
