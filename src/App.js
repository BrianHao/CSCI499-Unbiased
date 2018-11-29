import React from 'react';
import { Link, Route, Redirect} from 'react-router-dom';
import About from './About';
import Credit from './Credit';
import Home from './Home';
import Admin from './Admin';
import Related from './Related';
import Login from './Login';



function PrivateRoute({ component: Component, isAdmin, ...rest }) {
return ( <Route {...rest}
        render={props => isAdmin ? ( <Component isAdmin={isAdmin} {...props} /> )
      : ( <Redirect to={{ pathname: "/login", state: { from: props.location }
        }} />
)} />
);
}

// Main content section of website
// Content is displayed depending on the path routed.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false
    };
  }

  render() {
    return (
      <div className="webpage">

        <div className="main-content" id="content-margin-s">
          <Route exact={true} path="/" component={Home}/>
          <Route exact={true} path="/About" component={About}/>
          <Route exact={true} path="/Credit" component={Credit}/>
          <PrivateRoute exact={true} path="/Admin" isAdmin={this.state.isAdmin} component={Admin}/>
          <Route exact={true} path="/Related" component={Related}/>
          <Route exact={true} path="/Login" component={Login} />
        </div>

          <footer id="site-footer">
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/About">About</Link></li>
            <li><Link to="/Credit">Credit</Link></li>
            <li><Link to="/Admin"><font color="red">Admin</font></Link></li>
           </ul>
        </footer>

      </div>
    );
  }
}

export default App;
