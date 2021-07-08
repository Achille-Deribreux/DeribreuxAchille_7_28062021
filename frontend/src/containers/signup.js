import Header from '../components/header_login/header';
import FormSignup from '../components/form_signup/form';
import React from 'react';
import { Redirect } from "react-router-dom";

class Signup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {redirect : false}
  }

  signupResponseTranfer = (response) => {
    if (response.isAuth){
      this.setState({ redirect: true });
    }
  }

  render(){
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to='/home'/>;
    }
  return (
    <div>
     <Header />
     <FormSignup signupResponseTranfer={this.signupResponseTranfer}/>
    </div>
  );
  }
}

export default Signup;
