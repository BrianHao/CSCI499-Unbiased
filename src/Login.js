import React from 'react';
import Admin from './Admin';

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
      <h1>This page is for Admin use only please log in to continue </h1>
      <br />
      <br />
      <h2><font color="black"> LOG IN</font></h2>
        <form onSubmit={this.login}>
          <label>
              PASSWORD
              <input type="password" value={this.state.password} onChange={this.getPassword} />
          </label>
            <input type="submit" value="SUMBIT" />
        </form>
      </div>
    )
  }
}

export default Login;
