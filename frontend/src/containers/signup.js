import Header from '../components/header_login/header';
import FormSignup from '../components/form_signup/form';
import React from 'react';
import { Redirect } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

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
     <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
{/* Same as */}
<ToastContainer />
     <FormSignup signupResponseTranfer={this.signupResponseTranfer}/>
    </div>
  );
  }
}

export default Signup;