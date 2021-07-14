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



class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }
    
      componentDidMount() {
        let token =localStorage.getItem('token');
        
        fetch("http://localhost:3000/api/auth/getUserId",{
            headers:{
                'Authorization' : 'bearer ' + token
            }
        })
        .then(response => response.json())
        .then((response) => {
            this.setState({
                isLoaded: true,
                items: response.userId
              });
        })
        .catch(function(error) {
            alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);
          });

       
      }
    render(){
        const  {isLoaded, items } = this.state;
        if (!isLoaded) {
            return <div>Chargement…</div>;
          } else {
                const murUrl =  "/mur/?id=" + items.userId;
                return (<Grid container alignItems="center" spacing={3} className="header"> 
            
                <Grid item container xs={6}>
                    <Link to="/home">
                        <img src={logoWhite} id="logoWhite"/>
                    </Link>
                </Grid> 

                <Grid item xs={6}>
                    <Grid container alignContent='center' spacing={3}>

                        <Grid item xs={4}>
                            <Link to="/search">
                                <Button size="large" variant="contained" color="primary">
                                    Rechercher
                                </Button>
                            </Link>
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
                                    <Link to={murUrl}>
                                        <Avatar  />
                                    </Link>
                                </Grid>
                                
                                <Grid item xs={6} container alignContent='center' alignItems='center'>
                                    <Link to="/login">
                                        <CancelIcon color="secondary"/>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid> 
            </Grid>
    )}}
}

export default Header;