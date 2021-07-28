import React from 'react';
import Header from '../components/header/header'
import Post from '../components/post/post'
import Paper from '@material-ui/core/Paper';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

class Home extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      reload : false
    };
  }

  setToTrue = () => {
    this.setState({
      reload : true
    })
    console.log("ça set true", this.state.reload);
  }

  componentDidUpdate(){
    console.log("did update vaut", this.state.reload)
    if(this.state.reload){
        console.log("ça passe dans la condition")
    this.apiCall();
    this.setState({
      reload:false
    })
    }
}

  componentDidMount() {
    this.apiCall()
    document.title = "Groupomania | Home";    
  }

  apiCall= () => {
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
              <Row className="m-1" key={item.id}>
                <Col>
                  <Paper variant="outlined" elevation={3} >
                    <Post  id={item.id} reload={this.setToTrue} content={item.content} imgUrl={item.imageUrl} likes={item.likes} userliked={item.userliked} userId={item.userid} date={item.createdAt}/>
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