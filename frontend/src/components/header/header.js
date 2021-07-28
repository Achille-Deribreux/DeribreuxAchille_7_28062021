// HEADER PRINCIPAL, une fois connecté

//Imports 
import React from 'react';
import "./header.css"; //A dégager 

//Imports Bootstrap
import { Container, Navbar,Nav } from 'react-bootstrap';

//Imports Material UI
import Avatar from '@material-ui/core/Avatar';
import logo from '../../assets/icon-left-font-monochrome-white.svg'
import { IconButton, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from "@material-ui/core/styles";
import CreateIcon from '@material-ui/icons/Create';
import CancelIcon from '@material-ui/icons/Cancel';

//Import react-router
import {withRouter} from "react-router-dom";


//Texte Blanc pour les items header 
const WhiteTextTypography = withStyles({
    root: {
      color: "#FFFFFF",
      margin: "8px"
    }
  })(Typography);


  //Composant Header 
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }
    
    //Appel API
    componentDidMount() {
        let token =localStorage.getItem('token');
        fetch("http://localhost:3000/api/auth/getuserId",{
            headers:{
                'Authorization' : 'bearer ' + token
            }
        })
        .then(response => response.json())
        .then((res) => {
           fetch("http://localhost:3000/api/auth/"+res.userId.userId,{
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
              })
        })
        .catch((err) => {console.log(err)})



       
    }

    //Redirections vers les pages
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
    )}}
}

export default withRouter(Header);