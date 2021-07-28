import React from 'react';
import "./form.css";
import Button from '@material-ui/core/Button';

//Imports Bootstrap
import { Container, Form, FloatingLabel } from 'react-bootstrap';

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
        console.log(e.target.value)
    }

    handleNom = (e) => {
        this.setState({
            nom: e.target.value
        })
        console.log(e.target.value)
    }

    handleMail = (e) => {
        this.setState({
            mail: e.target.value
        })
        console.log(e.target.value)
    }

    handlePass = (e) => {
        this.setState({
            password: e.target.value
        })
        console.log(e.target.value)
    }
    handleFileChange = (e) => {
        console.log(e.target.files[0])
        this.setState({
            file : e.target.files[0]
        })
    }
    handleTeam = (e) => {
        this.setState({
            team: e.target.value
        })
        console.log(e.target.value)
    }
    handleIsAdmin = (e) => {
        this.setState({
            isAdmin: e.target.value
        })
        console.log(e.target.value)
    }
    signupResponseTranfer = (response) => {
        this.props.signupResponseTranfer(response);
    }
    handleSubmit = (e) => {
        //const data = JSON.stringify(this.state);
        
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
            console.log(response)
            localStorage.setItem('token', response.token)
            this.signupResponseTranfer(response);
        
        })
        .catch(function(error) {
            alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);
          });
    }
    render(){ 
        return(
            <Container className="m-auto">
            <Form className="w-50 m-auto p-3">
                <Form.Group className="mb-3">
                    <Form.Label>Prénom :</Form.Label>
                    <Form.Control  name="prenom" value={this.state.prenom} onChange={this.handlePrenom}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nom :</Form.Label>
                    <Form.Control name="nom" value={this.state.nom} onChange={this.handleNom} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Aresse mail :</Form.Label>
                    <Form.Control name="mail" type="email" value={this.state.mail} onChange={this.handleMail} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Mot De Passe :</Form.Label>
                    <Form.Control name="password" type="password" value={this.state.password} onChange={this.handlePass} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <FloatingLabel controlId="floatingSelect" label="Droits">
                        <Form.Select aria-label="Floating label select" value={this.state.isAdmin} onChange={this.handleIsAdmin} name="droits" id="droits">
                            <option value="false" defaultValue>Classique</option>
                            <option value="true">Administrateur</option>
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                    <FloatingLabel controlId="floatingSelect" label="Département">
                        <Form.Select aria-label="Floating label select" lue={this.state.team} onChange={this.handleTeam} name="departement" id="departement">
                                <option value="dev" defaultValue>Développement</option>
                                <option value="hr">Ressources Humaines</option>
                                <option value="sales">Ventes</option>
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Photo de profil :</Form.Label>
                    <Form.Control  type="file" id="file" onChange={this.handleFileChange} />
                </Form.Group>

                <Form.Group className="mb-3">
                        <Button variant="contained" color="secondary" onClick={this.handleSubmit}>
                            S'inscrire
                        </Button>
                </Form.Group>
            </Form>
        </Container>

           /*
                    <label htmlFor="file"> Photo de profil :</label>
                    <input type="file" id="file" onChange={this.handleFileChange}/>
                   */
    )}

}



export default FormSignup;