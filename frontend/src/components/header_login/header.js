import React from 'react';
import "./header.css";
import logoWhite from "../../assets/icon-left-font-monochrome-white.png"
import Button from '@material-ui/core/Button';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function Header(){
    return (
       <header>
           <div>
               <Link to="/">
                    <img src={logoWhite}/>
               </Link>
           </div>
           
           
               <div>
                    <Link to="/login" >
                        <Button variant="contained" color="primary">
                            Connexion
                        </Button>
                    </Link>
                </div>
                <div>
                <Link to="/signup" >
                    <Button variant="contained" color="secondary">
                        Inscription
                    </Button>
                </Link>
                </div>
       </header>
    )
}

export default Header;