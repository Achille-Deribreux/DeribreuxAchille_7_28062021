import React from 'react';
import "./header.css";
import logoWhite from "../../assets/icon-left-font-monochrome-white.png";
import userLogo from "../../assets/user.png";
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CancelIcon from '@material-ui/icons/Cancel';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

function Header(){
    return (<Grid container alignItems="center" spacing={3} className="header"> 
                <Grid item xs={6}>
                    <img src={logoWhite} id="logoWhite"/>
                </Grid> 

                <Grid item xs={6}>
                    <Grid container alignContent='center' spacing={3}>

                        <Grid item xs={4}>
                            <Button size="large" variant="contained" color="primary">
                                Rechercher
                            </Button>
                        </Grid>

                        <Grid item xs={4}>
                            <Link to="/create-post">
                                <Button size="large" variant="contained" color="primary">
                                    Publier
                                </Button>
                            </Link>
                        </Grid>

                        <Grid item xs={4}>
                            <Grid container alignContent='center'>
                                <Grid item xs={6}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                                </Grid>

                                <Grid item xs={6}>
                                    <CancelIcon color="secondary"/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> 
            </Grid>
    )
}

export default Header;