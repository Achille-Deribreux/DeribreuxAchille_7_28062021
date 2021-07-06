import React from 'react';
import "./header.css";
import logoWhite from "../../assets/icon-left-font-monochrome-white.png";
import userLogo from "../../assets/user.png";
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
                    <img id="logoWhite" src={logoWhite}/>
               </Link>
           </div>
           
            <div>
            <Button variant="contained" color="secondary">
                Rechercher des collègues
            </Button>
            </div>

            <div>
                <img id="userLogo" src={userLogo}/>
            </div>
       </header>
    )
}

export default Header;