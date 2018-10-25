import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import About from './About';
import Contact from './Contact';
import Credit from './Credit';
import Home from './Home';
import Admin from './Admin';

// Main content section of website
// Content is displayed depending on the path routed.
class App extends React.Component {
  render() {
    return (
      <div className="webpage">

        <div className="main-content" id="content-margin-s">
          <Route exact={true} path="/" component={Home}/>
          <Route exact={true} path="/About" component={About}/>
          <Route exact={true} path="/Contact" component={Contact}/>
          <Route exact={true} path="/Credit" component={Credit}/>
          <Route exact={true} path="/Admin" component={Admin}/>
        </div>

        <footer id="site-footer">
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/About">About</Link></li>
            <li><Link to="/Contact">Contact</Link></li>
            <li><Link to="/Credit">Credit</Link></li>
            <li><Link to="/Admin">Admin</Link></li>
           </ul>
        </footer>

      </div>
    );
  }
}

export default App;