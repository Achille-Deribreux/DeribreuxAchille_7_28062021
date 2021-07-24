import React from 'react';
import "./form.css";
import Button from '@material-ui/core/Button';

import TypeField from '../formItems/typeField'


//Imports Bootstrap
import { Container, Row, Col, Form, FormGroup, FormControl } from 'react-bootstrap';

class FormLogin extends React.Component{

    constructor(props){
        super(props)
        this.state = {mail : '',password:''}
    }
    //state erreur, validation email, ... 
    handleMail = (e) => {
        console.log(e.target.value);
       this.setState({
           mail: e.target.value
       })
    }

    handlePass = (e) => {
        console.log(e.target.value);
        this.setState({
            password: e.target.value
        })
     }
    
     loginResponseTranfer = (response) => {
        this.props.loginResponseTranfer(response);
    }
    
     handleSubmit = (e) => {
         e.preventDefault()
         const data = JSON.stringify(this.state);
        //Reset state
        fetch("http://localhost:3000/api/auth/login",{
            method: 'POST',
            headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' ,
           
            },
            body: data
        })
        .then(response => response.json())
        .then((response) => {
            this.loginResponseTranfer(response);
            localStorage.setItem('token', response.token)
            /*window.location="./home"*/
        
        })
        .catch(function(error) {
            alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);
          });

     }

    render() {
        localStorage.clear();
        return(
            <Container className="m-auto">
                <Form className="w-50 m-auto">
                    <Form.Group className="mb-3">
                        <Form.Label>Adresse mail :</Form.Label>
                        <Form.Control  name="mail" type="email" value={this.state.mail} onChange={this.handleMail}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Mot de passe :</Form.Label>
                        <Form.Control name="password" type="password" value={this.state.password} onChange={this.handlePass} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                            <Button variant="contained" color="secondary" onClick={this.handleSubmit}>
                                Se connecter
                            </Button>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}



export default FormLogin;