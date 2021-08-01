import React from 'react';
import { Container, Row, Col, Form, FloatingLabel, Button} from 'react-bootstrap';
import { toast } from 'react-toastify';
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';
  
class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content : ''
        };
      }
    
    handleContent = (e) => {
        this.setState({
            content : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const {postid} = this.props;
        //userID à récupérer dans le back
        const data = new FormData()
        data.append("postid", postid)
        data.append("content", this.state.content)
        let token = localStorage.getItem('token');
        fetch("http://localhost:3000/api/post/postComment",{
            method: 'POST',
            headers:{
                'Authorization' : 'bearer ' + token
            },
            body: data
        })
        .then((response) => {
            toast.success('Commentaire Publié !', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                
                setTimeout(() => { 
                    this.props.reload();
                    //this.props.history.push('/post/?id='+this.props.postid);
                }, 1500)
        })
        .catch(function(error) {
            alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);
          });
    }

    render(){
        return(
            <Container className="my-2">
                <Row>
                    <Form onSubmit={this.handleSubmit}>
                    <Col xs={12}align="center">
                        
                        <Form.Group>
                            <FloatingLabel label="Votre message :">
                                <Form.Control
                                    //as="textarea"
                                    style={{ height: '80px' }}
                                    name="content" id="content" 
                                    value={this.state.content} 
                                    onChange={this.handleContent}
                                    required
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>

                    <Col xs={12} align="center" className="mt-3">
                        <Button variant="danger" type="submit">
                            Commenter
                        </Button>
                    </Col>
                    </Form>
                </Row>
            </Container>
        )
    } 
}
CommentForm.propTypes= {
    reload: PropTypes.func
};
export default withRouter(CommentForm);