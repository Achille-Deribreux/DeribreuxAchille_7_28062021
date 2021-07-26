import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import { Container, Row, Col, Form, FloatingLabel, Image} from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, 
    withRouter
  } from "react-router-dom";
  import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Alert from '@material-ui/lab/Alert'; 
import Snackbar from '@material-ui/core/Snackbar';
import WhiteTextTypography from './WhiteTextTypo'

class ModifyPost extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            content:'',
            file:'',
            userId:''
        }
    }
    
    componentWillMount(){
        let token = localStorage.getItem('token');
        const postId = (new URL(document.location)).searchParams.get('id');
        fetch("http://localhost:3000/api/post/getpost/"+postId,{
            headers:{
              'Authorization' : 'bearer ' + token
            }
          })
          .then(response => response.json())
          .then((post)=>{
              console.log(post)
              this.setState({
                content: post.content,
                  file: post.imageUrl,
                  userId : post.userid
                });
          })
          .catch(function(err){
              alert(err) // Affiche l'erreur dans une alert si erreur 
            });
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
        console.log("body user id", this.state.userId);
        const postId = (new URL(document.location)).searchParams.get('id');
        const data = new FormData();
        data.append("postId", postId)
        data.append("author", this.state.userId)
        data.append("content", this.state.content)
        if (this.state.file !== ''){
        data.append("file", this.state.file)
        }
        let token = localStorage.getItem('token');
        fetch("http://localhost:3000/api/post/update", {
            method: 'POST',
            headers:{
                'Authorization' : 'bearer ' + token
            },
            body: data
    })
    .then(response => response.json())
    .then((res) => {
        this.props.history.push("/mur/?id="+res.userId);
    })
    .catch((err)=>console.log(err));
    }

    render(){
        return(
               <Container className="my-3">
                    <Row className="bg-dark rounded">
                        <Col align="center" className="my-3">
                            <WhiteTextTypography variant="h2">
                                Modifier un post
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
                        <Col align="center" className="my-3">
                            <Image src={this.state.file} rounded />
                        </Col>
                    </Row>

                    <Row>
                        <Col align="center">
                            <Form.Group className="my-3">
                                <Form.Label>Modifier l'image :</Form.Label>
                                <Form.Control type="file" id="file" onChange={this.handleFileChange} />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col align="center" className="my-3">
                            <Button size="large" variant="contained" color="secondary" onClick={this.handleSubmit}>
                                Modifier
                            </Button>
                        </Col>
                    </Row>


                </Container>
        )
    }
}

export default withRouter(ModifyPost);