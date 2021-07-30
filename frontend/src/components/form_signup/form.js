import React from 'react';
import "./form.css";
import auth from '../auth';
import {withRouter} from 'react-router-dom';
import { toast } from 'react-toastify';
//Imports Bootstrap
import { Container, Form, FloatingLabel, Button } from 'react-bootstrap';

class FormSignup extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            prenom:'',
            nom:'',
            mail : '',
            password:'',
            team:'dev',
            isAdmin: false,
            file:''
        }
    }

    handlePrenom =  (e) => {
        this.setState({
            prenom : e.target.value
        })
    }

    handleNom = (e) => {
        this.setState({
            nom: e.target.value
        })
    }

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

    handleFileChange = (e) => {
        this.setState({
            file : e.target.files[0]
        })
    }

    handleTeam = (e) => {
        this.setState({
            team: e.target.value
        })
    }

    handleIsAdmin = (e) => {
        this.setState({
            isAdmin: e.target.value
        })
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        
        const data = new FormData();
        data.append("prenom",this.state.prenom);
        data.append("nom",this.state.nom);
        data.append("mail",this.state.mail);
        data.append("password",this.state.password);
        data.append("team",this.state.team);
        data.append("isAdmin",this.state.isAdmin);
        if (this.state.file !== ''){
        data.append("file",this.state.file);
        }
        this.setState({
           prenom:'',
            nom:'',
            mail : '',
            password:'',
            team:'',
            isAdmin:'',
            file:''
        })
        fetch("http://localhost:3000/api/auth/signup",{
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then((response) => {
            localStorage.setItem('token', response.token);
            auth.login(() => {
                this.props.history.push("/home");
              });
        })
        .catch(function(error) {
            alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);
          });
    }
    render(){ 
        return(
            <Container className="m-auto">
              <Form className="w-50 m-auto" onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="firstname">Prénom :</Form.Label>
                    <Form.Control  id="firstname" name="prenom" value={this.state.prenom} onChange={this.handlePrenom}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="lastname">Nom :</Form.Label>
                    <Form.Control id="lastname" name="nom" value={this.state.nom} onChange={this.handleNom} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="email">Aresse mail :</Form.Label>
                    <Form.Control id="email" name="mail" type="email" value={this.state.mail} onChange={this.handleMail} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="password">Mot De Passe :</Form.Label>
                    <Form.Control id="password" name="password" type="password" value={this.state.password} onChange={this.handlePass} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <FloatingLabel htmlFor="droits" controlId="floatingSelect" label="Droits">
                        <Form.Select aria-label="Floating label select" value={this.state.isAdmin} onChange={this.handleIsAdmin} name="droits" id="droits">
                            <option value="false" defaultValue>Classique</option>
                            <option value="true">Administrateur</option>
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                    <FloatingLabel htmlFor="departement" controlId="floatingSelect" label="Département">
                        <Form.Select aria-label="Floating label select" lue={this.state.team} onChange={this.handleTeam} name="departement" id="departement">
                                <option value="dev" defaultValue>Développement</option>
                                <option value="hr">Ressources Humaines</option>
                                <option value="sales">Ventes</option>
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="file">Photo de profil :</Form.Label>
                    <Form.Control  type="file" id="file" onChange={this.handleFileChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                            <Button color="primary" type="submit">
                                Se connecter
                            </Button>
                    </Form.Group>
            </Form>
        </Container>
    )}

}



export default withRouter(FormSignup);