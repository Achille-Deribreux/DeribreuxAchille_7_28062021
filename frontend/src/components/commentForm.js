import React from 'react';
import { Container, Row, Col, Form, FloatingLabel} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
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

    handleSubmit = () => {
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
                    <Col xs={12}align="center">
                        <Form.Group>
                            <FloatingLabel label="Votre message :">
                                <Form.Control
                                    as="textarea"
                                    style={{ height: '80px' }}
                                    name="content" id="content" 
                                    value={this.state.content} 
                                    onChange={this.handleContent}
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>

                    <Col xs={12} align="center" className="mt-3">
                        <Button size="large" variant="contained" color="secondary" onClick={this.handleSubmit}>
                            Commenter
                        </Button>
                    </Col>
                </Row>
            </Container>
        )
    } 
}
CommentForm.propTypes= {
    reload: PropTypes.func
};
export default withRouter(CommentForm);