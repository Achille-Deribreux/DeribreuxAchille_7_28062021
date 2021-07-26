import React from 'react';
import Post from '../components/post/post'
import Header from '../components/header/header'
import { Container, Row, Col} from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import CommentForm from '../components/commentForm'
import Comment from '../components/comment'

class PostContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          item: '',
          comments : [],
        };
      }

    componentDidMount(){
        const id = (new URL(document.location)).searchParams.get('id');
        let token = localStorage.getItem('token');

        fetch("http://localhost:3000/api/post/getpost/"+id,{
            headers:{
                'Authorization' : 'bearer ' + token
            }
        })
        .then(response => response.json())
        .then((result) => {
            this.setState({
              item: result,
              isLoaded : true
            });
            //fetchAllComments
          })
        .catch(function(err){
          alert(err) // Affiche l'erreur dans une alert si erreur 
        });
    }

    render(){
    const  {isLoaded, item } = this.state;
    
    if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
        return (
            <React.Fragment>
                <Header />
                <Container className="mt-4">
                    <Row>
                        <Col>
                            <Paper variant="outlined" elevation={3}>
                                <Post key = {item.id} id={item.id} content={item.content} imgUrl={item.imageUrl}likes={item.likes} userId={item.userid} date={item.createdAt}/>
                            </Paper>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <CommentForm />
                        </Col>
                    </Row>
                    {/*Items.map all comments*/}
                    <Row>
                        <Col>
                        
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
                
               
        )
    }
}
}
export default PostContainer;