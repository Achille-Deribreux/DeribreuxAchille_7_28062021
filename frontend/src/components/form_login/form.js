import React from 'react';
import "./form.css";
//import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
//Imports Bootstrap
import { Container, Form, Button} from 'react-bootstrap';

class FormLogin extends React.Component{

    constructor(props){
        super(props)
        this.state = {mail : '',password:''}
    }
    //state erreur, validation email, ... 
    handleMail = (e) => {
       this.setState({
           mail: e.target.value
       })
    }

    handlePass = (e) => {
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
            if(response.error === "utilisateur non trouvé !"){
                toast.error('Utilisateur inexistant', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            }else if(response.error === "mdp incorrect!"){
                toast.error('Mot de passe incorrect !', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            } else{
                localStorage.setItem('token', response.token)
            toast.success('Connecté', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            setTimeout(() => { 
            this.loginResponseTranfer(response);
            }, 1000)
            }
        
        })
        .catch(function(error) {
            alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);
          });

     }

    render() {
        localStorage.clear();
        return(
            <Container className="m-auto">
                <Form className="w-50 m-auto" onSubmit={this.handleSubmit}>
                    <Form.Group className="my-3">
                        <Form.Label htmlFor="email">Adresse mail :</Form.Label>
                        <Form.Control  name="mail" id="email" type="email" value={this.state.mail} onChange={this.handleMail}/>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label htmlFor="password">Mot de passe :</Form.Label>
                        <Form.Control name="password" id="password" type="password" value={this.state.password} onChange={this.handlePass} />
                    </Form.Group>

                    <Form.Group className="mb-3">
                            <Button color="primary" type="submit">
                                Se connecter
                            </Button>
                    </Form.Group>
                </Form>
            </Container>
        )
    }
}



export default FormLogin;