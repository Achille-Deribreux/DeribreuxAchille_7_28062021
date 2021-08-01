import React from 'react';
//Imports Bootstrap
import { Container, Navbar,Nav } from 'react-bootstrap';
import PersonIcon from '@material-ui/icons/Person';

//Imports Material UI
import logo from '../../assets/icon-left-font-monochrome-white.svg'
import { IconButton, Typography } from '@material-ui/core';
import { withStyles } from "@material-ui/core/styles";
import CreateIcon from '@material-ui/icons/Create';

import { withRouter } from "react-router-dom";


  //Texte Blanc pour les items header 

const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF",
      margin: "8px"
    }
  })(Typography);

class Header extends React.Component{

    connexionRedirect = () => {
         this.props.history.push("/login");
    }

    inscriptionRedirect = () => {
        this.props.history.push("/signup");
    }

    render(){
    return (<header>
                <Navbar bg="dark" expand="lg" variant="dark">
                 
                    <Container>
                        <Navbar.Brand>
                            <IconButton  aria-label="get back home">
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
                </header>
    )
    }
}

export default withRouter(Header);