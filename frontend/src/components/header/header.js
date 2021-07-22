import React from 'react';
import "./header.css";
import { Container, Navbar,NavDropdown,Nav, Button } from 'react-bootstrap';
import Avatar from '@material-ui/core/Avatar';
import logo from '../../assets/icon-left-font-monochrome-white.svg'
import Chip from '@material-ui/core/Chip';

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
                return (<Navbar bg="dark" expand="lg">
                <Container>
                <Navbar.Brand href="#home">
                                <img
                                alt=""
                                src={logo}
                                width="250"
                                height="100"
                                className="d-inline-block align-top"
                                /></Navbar.Brand>
                  
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                      <Nav.Link href="#home"> <Button variant="primary">Primary</Button></Nav.Link>
                      <Nav.Link href="#link"><Button variant="secondary">Secondary</Button></Nav.Link>
                      <Nav.Link href="#link"><Avatar>AD</Avatar></Nav.Link>
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

export default Header;