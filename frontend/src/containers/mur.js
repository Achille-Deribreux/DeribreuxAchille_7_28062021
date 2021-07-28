import React from 'react';
import Header from '../components/header/header'
import Post from '../components/post/post'
import ProfileHeader from '../components/profileheader'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paper from '@material-ui/core/Paper';
import { Container, Row, Col} from 'react-bootstrap';


class Home extends React.Component{
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: [],
        id : '',
        reload:false
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
  
    apiCall() {
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
            <ProfileHeader userId={id} />
            <Container>
            {items.map(item => (
              <Row className="m-2" key = {item.id}>
                <Col>
                  <Paper variant="outlined" elevation={3} >
                    <Post  id={item.id} content={item.content} reload={this.setToTrue} userliked={item.userliked} imgUrl={item.imageUrl}likes={item.likes} userId={item.userid} date={item.createdAt}/>
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