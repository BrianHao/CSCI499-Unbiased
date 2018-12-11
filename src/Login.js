import React from 'react';
import Admin from './Admin';
import { Well } from 'react-bootstrap';

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      password: "",
      redirectToAdmin:false
    };
    this.getPassword = this.getPassword.bind(this);
    this.login = this.login.bind(this);
  }

  getPassword(event){
    this.setState({password: event.target.value});
  }

  login(event){
    if(this.state.password === process.env.REACT_APP_ADMIN_PASSWORD ){
      this.setState({redirectToAdmin: true});
    }
    else{
      alert("Password Incorrect");
    }

    event.preventDefault();

  }

  render(){
    if(this.state.redirectToAdmin === true){
      return <Admin />
    }
    return(
      <div>
      <Well>
      <br />
      <br />
      <h2><font color="black">Please enter your administrator login credentials:</font></h2>
      <br />
      <br />
        <form onSubmit={this.login}>
          <label>
              Password: {' '}
              <input type="password" value={this.state.password} onChange={this.getPassword} />
          </label>
            {' '}<input type="submit" value="SUMBIT" />
        </form>
        <br />
      <br />
        </Well>
      </div>
    )
  }
}

export default Login;
