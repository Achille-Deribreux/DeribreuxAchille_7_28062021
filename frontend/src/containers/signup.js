import Header from '../components/header_login/header';
import FormSignup from '../components/form_signup/form';
import React from 'react';
import { withRouter } from "react-router-dom";
import { ToastContainer} from 'react-toastify';

class Signup extends React.Component{
  constructor(props) {
    super(props);
    this.state = {redirect : false}
  }

  componentDidMount(){
    document.title = "Groupomania | signup";    
}

  signupResponseTranfer = (response) => {
    if (response.isAuth){
      this.setState({ redirect: true });
    }
  }

  render(){
    const { redirect } = this.state;
    if (redirect) {
      this.props.history.push('/home');
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

export default withRouter(Signup);
