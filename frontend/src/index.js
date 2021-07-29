import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from './containers/login';
import Signup from './containers/signup';
import Home from './containers/home';
import PostCreation from './containers/PostCreation';
import Mur from './containers/mur';
import Search from './containers/search';
import ModifyPost from './containers/postModification';
import ProfileUpdate from './containers/profileUpdate';
import Post from './containers/post';
import {ProtectedRoute} from './components/protectedRoute'




ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/signup"  exact component={Signup}/>
        <Route path="/"  exact component={Login}>
          {/*<Redirect to="/home"/>*/}
         </Route> 
        <Route path="/login"  exact component={Login}/>
        <ProtectedRoute path="/home"  exact component={Home}/>
        <ProtectedRoute path="/create-post" exact component={PostCreation}/>
        <ProtectedRoute path="/post/" component={Post}/>
        <ProtectedRoute path="/mur/" component={Mur}/>
        <ProtectedRoute path="/search" component={Search} />
        <ProtectedRoute path="/update" component={ModifyPost} />
        <ProtectedRoute path="/profileUpdate" component={ProfileUpdate} />
      </Switch>
  </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
<Route path="/sign-in" render={function () {
                    let users = isLoggedIn();
                    if (users) {
                        return <Redirect push to={{
                            pathname: '/choose-domain',
                            state: { users : users }
                        }}/>
                    } else {
                       return <Login/>
                    }
                }}/>


*/