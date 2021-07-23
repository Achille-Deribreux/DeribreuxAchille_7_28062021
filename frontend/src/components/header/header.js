import React from 'react';
import "./header.css";
import { Container, Navbar,NavDropdown,Nav, Button } from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';
import logo from '../../assets/icon-left-font-monochrome-white.svg'
import Chip from '@material-ui/core/Chip';
import { Icon, IconButton, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from "@material-ui/core/styles";
import CreateIcon from '@material-ui/icons/Create';
import CancelIcon from '@material-ui/icons/Cancel';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, 
    withRouter
  } from "react-router-dom";

  
const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF",
      margin: "8px"
    }
  })(Typography);


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
        
        fetch("http://localhost:3000/api/auth/1",{
            headers:{
                'Authorization' : 'bearer ' + token
            }
        })
        .then(response => response.json())
        .then((response) => {
            this.setState({
                isLoaded: true,
                items: response.user
              });
        })
        .catch(function(error) {
            alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);
          });
    }

    searchRedirect = ()  => {
        this.props.history.push("/search")
    }

    postRedirect = ()  => {
        this.props.history.push("/create-post")
    }

    profileRedirect = ()  => {
        this.props.history.push("/mur?id="+this.state.items.id)
    }

    homeRedirect = ()  => {
        this.props.history.push("/home")
    }

    disconnect = ()  => {
        this.props.history.push("/login")
    }
       


    render(){
        const  {isLoaded, items } = this.state;
        if (!isLoaded) {
            return <div>Chargement…</div>;
          } else {
                //const murUrl =  "/mur/?id=" + items.userId;
                const murUrl =  "/mur/?id="
                return (
                <Navbar bg="dark" expand="lg" variant="dark">
                    <Container>
                        <Navbar.Brand>
                            <IconButton onClick={this.homeRedirect}>
                                        <img
                                        alt=""
                                        src={logo}
                                        width="250"
                                        height="100"
                                        className="d-inline-block align-top"
                                        />
                            </IconButton>
                        </Navbar.Brand>
                    
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />

                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="m-auto ">
                                <Nav.Link> 
                                        <IconButton onClick={this.searchRedirect}>
                                            <SearchIcon style={{ color: 'FFFFFF' }} /> 
                                            <WhiteTextTypography variant="body1">
                                                Rechercher
                                            </WhiteTextTypography>
                                        </IconButton>
                                </Nav.Link>

                                <Nav.Link>
                                        <IconButton onClick={this.postRedirect}>
                                            <CreateIcon style={{ color: 'FFFFFF' }} /> 
                                            <WhiteTextTypography variant="body1">
                                                Publier
                                            </WhiteTextTypography>
                                        </IconButton>
                                </Nav.Link>

                                <Nav.Link>
                                    <IconButton onClick={this.profileRedirect}>
                                    <Avatar src={items.profileurl} alt={items.firstname[0]+items.lastname[0]}></Avatar>
                                    <WhiteTextTypography variant="body2">
                                        {items.firstname + " " + items.lastname}
                                    </WhiteTextTypography>
                                    </IconButton>
                                </Nav.Link>

                                <Nav.Link href="#link">
                                        <IconButton onClick={this.disconnect}>
                                            <CancelIcon style={{ color: 'red' }} /> 
                                            <WhiteTextTypography variant="body2">
                                                    Déconnexion
                                                </WhiteTextTypography>
                                        </IconButton>
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
/*

 <Navbar.Brand href="#home">
                                <img
                                alt=""
                                src={logo}
                                width="300"
                                height="100"
                                className="d-inline-block align-top"
                                />

                /*                
                <Grid container alignItems="center" spacing={3} className="header"> 
            
                <Grid item container xs={4}>
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
                                    <Link  to={murUrl}>
                                        <Avatar />
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
            </Grid>*/
    )}}
}

export default withRouter(Header);