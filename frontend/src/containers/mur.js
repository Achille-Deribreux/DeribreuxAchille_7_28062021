import React from 'react';
import Header from '../components/header/header'
import Post from '../components/post/post'
import ProfileHeader from '../components/profileheader'
import Grid from '@material-ui/core/Grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paper from '@material-ui/core/Paper';
import { Container, Row, Col, Navbar, NavDropdown, Nav, Button } from 'react-bootstrap';


class Home extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        id : ''
      };
    }
  
    componentDidMount() {
      let token = localStorage.getItem('token');
      const id = (new URL(document.location)).searchParams.get('id');
      this.setState({id : id});
      fetch("http://localhost:3000/api/post/".concat(id),{
        headers:{
          'Authorization' : 'bearer ' + token
        }
      })
      //mieux que localstorage pour passer token? 
        .then(response => response.json())
        .then((results) => {
            this.setState({
              isLoaded: true,
              items: results
            });
          })
        .catch(function(err){
          alert(err) // Affiche l'erreur dans une alert si erreur 
        });
    }
    render(){
      const  {isLoaded, items, id } = this.state;
        if (!isLoaded) {
        return <div>Chargement…</div>;
      } else {
      return (
        <div>
            <Header />
            <ProfileHeader userId={id} />
            <Container>
            {items.map(item => (
              <Row className="m-2">
                <Col>
                  <Paper variant="outlined" elevation={3} >
                    <Post key = {item.id} id={item.id} content={item.content} imgUrl={item.imageUrl}likes={item.likes} userId={item.userid} date={item.createdAt}/>
                  </Paper>
                </Col>
              </Row>
            ))}
          </Container>
        </div>
      );
    }
  }
  }
  export default Home;