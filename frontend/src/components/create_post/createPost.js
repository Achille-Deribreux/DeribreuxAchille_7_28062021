import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Axios from 'axios';
import { Container, Row, Col, Form, FloatingLabel} from 'react-bootstrap';
import { withStyles } from "@material-ui/core/styles";
import WhiteTextTypography from '../WhiteTextTypo'

class CreatePost extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            content:'',
            file:''
        }
    }
    handleContentChange = (e) => {
        console.log(e.target.value)
        this.setState({
            content : e.target.value
        })
    }

    handleFileChange = (e) => {
        console.log(e.target.files[0])
        this.setState({
            file : e.target.files[0]
        })
    }
    handleSubmit = (e) => {
        const data = new FormData();
        data.append("content", this.state.content)
        data.append("file", this.state.file)
        let token = localStorage.getItem('token');
    
        fetch("http://localhost:3000/api/post/write", {
            method: 'POST',
            headers:{
                'Authorization' : 'bearer ' + token
            },
            body: data
    })
    .then((res) => console.log(res.data))
    .catch((err)=>console.log(err));
  
        //Reset state
    }
    
    render(){
        return(
                <Container className="my-3">
                    <Row className="bg-dark rounded">
                        <Col align="center" className="my-3">
                            <WhiteTextTypography variant="h2">
                                Créer un post
                            </WhiteTextTypography>
                        </Col>
                    </Row>
                    <Row>
                        <Col align="center">
                            <Form.Group className="my-3">
                                <FloatingLabel label="Votre message :">
                                <Form.Control
                                as="textarea"
                                style={{ height: '100px' }}
                                name="content" id="content" 
                                value={this.state.content} 
                                onChange={this.handleContentChange}
                                />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col align="center">
                            <Form.Group className="my-3">
                                <Form.Label>Ajouter une image :</Form.Label>
                                <Form.Control type="file" id="file" onChange={this.handleFileChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col align="center" className="my-3">
                            <Button size="large" variant="contained" color="secondary" onClick={this.handleSubmit}>
                                Publier
                            </Button>
                        </Col>
                    </Row>
                </Container>
        )
    }
}


export default CreatePost;

