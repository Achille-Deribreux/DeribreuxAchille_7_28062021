import React from 'react';
import Header from '../components/header/header'
import Post from '../components/post/post'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Container, Row, Col, Navbar,NavDropdown,Nav, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';

class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    let token = localStorage.getItem('token');
    fetch("http://localhost:3000/api/post/home",{
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
    const  {isLoaded, items } = this.state;
      if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
    return (
     
      <div>
          <Header />
          <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>
{/* Same as */}
<ToastContainer />
          <Container>
            {items.map(item => (
              <Row className="m-1">
                <Col>
                  <Paper variant="outlined" elevation={3} >
                    <Post key={item.id} id={item.id} content={item.content} imgUrl={item.imageUrl} likes={item.likes} userliked={item.userliked} userId={item.userid} date={item.createdAt}/>
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