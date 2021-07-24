import React from 'react';
import "./header.css";
//Imports Bootstrap
import { Container, Navbar,NavDropdown,Nav, Button } from 'react-bootstrap';
import PersonIcon from '@material-ui/icons/Person';

//Imports Material UI
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
import { render } from 'react-dom';

  //Texte Blanc pour les items header 

const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF",
      margin: "8px"
    }
  })(Typography);

class Header extends React.Component{
    constructor(props) {
        super(props);
      }

    connexionRedirect = () => {
         this.props.history.push("/login");
    }

    inscriptionRedirect = () => {
        this.props.history.push("/signup");
    }

    render(){
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
                                        <IconButton onClick={this.connexionRedirect}>
                                            <PersonIcon style={{ color: 'FFFFFF' }} /> 
                                            <WhiteTextTypography variant="body1">
                                                Connexion
                                            </WhiteTextTypography>
                                        </IconButton>
                                </Nav.Link>

                                <Nav.Link>
                                        <IconButton onClick={this.inscriptionRedirect}>
                                            <CreateIcon style={{ color: 'FFFFFF' }} /> 
                                            <WhiteTextTypography variant="body1">
                                                Inscription
                                            </WhiteTextTypography>
                                        </IconButton>
                                </Nav.Link>

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
    )
    }
}

export default withRouter(Header);