import Header from '../components/header_login/header';
import FormLogin from '../components/form_login/form';
import React from 'react';
import { Redirect } from "react-router-dom";
import { ToastContainer } from 'react-toastify';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {redirect : false}
  }

  componentDidMount(){
    document.title = "Groupomania | Login";    
  }

  loginResponseTranfer = (response) => {
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
      <FormLogin loginResponseTranfer={this.loginResponseTranfer}/>
      </div>
    );
}
}
export default Login;