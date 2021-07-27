import React from 'react';
import Post from '../components/post/post'
import Header from '../components/header/header'
import { Container, Row, Col} from 'react-bootstrap';
import Paper from '@material-ui/core/Paper';
import CommentForm from '../components/commentForm'
import Comment from '../components/comment'
import List from '@material-ui/core/List';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class PostContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          item: '',
          comments : [],
          postId : (new URL(document.location)).searchParams.get('id')
        };
      }

    componentDidMount(){
        let token = localStorage.getItem('token');

        fetch("http://localhost:3000/api/post/getpost/"+this.state.postId,{
            headers:{
                'Authorization' : 'bearer ' + token
            }
        })
        .then(response => response.json())
        .then((result) => {
            this.setState({
              item: result,
              isLoaded : false
            });
            fetch("http://localhost:3000/api/post/getAllComments/"+result.id,{
                headers:{
                    'Authorization' : 'bearer ' + token
                }
            })
            .then(response => response.json())
            .then((result) => {
                this.setState({
                    comments: result,
                  isLoaded : true
                });
            })
            .catch(function(err){
                alert(err) // Affiche l'erreur dans une alert si erreur 
            });
        })
        .catch(function(err){
          alert(err) // Affiche l'erreur dans une alert si erreur 
        });
    }

    render(){
    const  {isLoaded, item, comments} = this.state;
    
    if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
        return (
            <React.Fragment>
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
                <Container className="mt-4">
                    <Row>
                        <Col>
                            <Paper variant="outlined" elevation={3}>
                                <Post key = {item.id} id={item.id} content={item.content} imgUrl={item.imageUrl}likes={item.likes} userId={item.userid} date={item.createdAt}/>
                            </Paper>
                        </Col>
                    </Row>

                    <Row>
                        <Col align="center">
                            <List>
                                
                                {comments.map(comment => (
                                <Comment key={comment.id} id={comment.id} content={comment.content} userId={comment.userid} postId={this.state.postId} date={comment.createdAt}/>
                            ))}
                            </List>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <CommentForm postid={item.id} />
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
                
               
        )
    }
}
}
export default PostContainer;