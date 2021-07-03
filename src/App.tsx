import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';

import './global.scss';
import { Assets } from './pages/Assets';
import { Asset } from './pages/Asset';
import { Companies } from './pages/Companies';
import { Units } from './pages/Units';
import { Users } from './pages/Users';

export function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/assets/:id" component={Asset} />
        <Route path="/companies" component={Companies} />
        <Route path="/units" component={Units} />
        <Route path="/users" component={Users} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
