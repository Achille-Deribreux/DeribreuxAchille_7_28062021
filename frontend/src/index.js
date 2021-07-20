import React from 'react';
import ReactDOM from 'react-dom';
import './components/index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import Login from './containers/login';
import Signup from './containers/signup';
import Home from './containers/home';
import PostCreation from './containers/PostCreation';
import Mur from './containers/mur';
import Search from './containers/search';
import ModifyPost from './containers/postModification';
import ProfileUpdate from './containers/profileUpdate';






ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/signup"  exact component={Signup}/>
        <Route path="/"  exact component={Login}>
          {/*<Redirect to="/home"/>*/}
         </Route> 
        <Route path="/login"  exact component={Login}/>
        <Route path="/home"  exact component={Home}/>
        <Route path="/create-post" exact component={PostCreation}/>
        <Route path="/mur/" component={Mur}/>
        <Route path="/search" component={Search} />
        <Route path="/update" component={ModifyPost} />
        <Route path="/profileUpdate" component={ProfileUpdate} />
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