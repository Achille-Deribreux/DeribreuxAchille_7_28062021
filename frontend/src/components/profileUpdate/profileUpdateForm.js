import React from 'react';
import { Container, Row, Col, Form, FloatingLabel, Button } from 'react-bootstrap';
import WhiteTextTypography from '../WhiteTextTypo'
import { toast } from 'react-toastify';
import { withRouter} from "react-router-dom";


class ProfileUpdateForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            prenom:'',
            nom:'',
            mail : '',
            password:'',
            team:'',
            isAdmin:'',
            file:'',
            userId : (new URL(document.location)).searchParams.get('id')
        }
    }
    componentDidMount(){
        

        let token = localStorage.getItem('token');
        fetch("http://localhost:3000/api/auth/"+this.state.userId,{
            headers:{
              'Authorization' : 'bearer ' + token
            }
          })
          .then(response => response.json())
          .then((user)=>{
              this.setState({
                prenom: user.user.firstname,
                nom: user.user.lastname,
                team: user.user.team,
                isAdmin: user.user.isAdmin
                });
          })
          .catch(function(err){
              alert(err) // Affiche l'erreur dans une alert si erreur 
            });
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
        fetch("http://localhost:3000/api/auth/updateuser", {
            method: 'POST',
            headers:{
                'Authorization' : 'bearer ' + localStorage.getItem('token')
            },
            body: data
    })
    .then((res) => {
        toast.success('Profil Modifié!', {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            setTimeout(() => { 
                this.props.history.push('/mur/?id='+this.state.userId);
            }, 1500)
      })
    .catch((err)=>console.log(err));
    }
    
    render (){
        return (
            <Container className="m-auto">
                  <Row className="bg-dark rounded my-3">
                        <Col align="center" className="my-3">
                            <WhiteTextTypography variant="h3">
                                Modifier mes données 
                            </WhiteTextTypography>
                        </Col>
                    </Row>

            <Form className="w-50 m-auto p-3">
                <Form.Group className="mb-3">
                    <Form.Label htmlFor="first">Prénom :</Form.Label>
                    <Form.Control  name="prenom" id="first" value={this.state.prenom} onChange={this.handlePrenom}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="lastname">Nom :</Form.Label>
                    <Form.Control name="nom" value={this.state.nom} id="lastname" onChange={this.handleNom} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="email">Changer Aresse mail :</Form.Label>
                    <Form.Control name="mail" type="email" value={this.state.mail} id="email" onChange={this.handleMail} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label htmlFor="password" >Changer Mot De Passe :</Form.Label>
                    <Form.Control name="password" type="password" value={this.state.password} id="password" onChange={this.handlePass} />
                </Form.Group>

                <Form.Group className="mb-3">
                    <FloatingLabel htmlFor="droits" controlId="floatingSelect" label="Droits">
                        <Form.Select aria-label="Floating label select" value={this.state.isAdmin} id="droits" onChange={this.handleIsAdmin} name="droits">
                            <option value="false">Classique</option>
                            <option value="true">Administrateur</option>
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3">
                    <FloatingLabel htmlFor="departement" controlId="floatingSelect" label="Département">
                        <Form.Select aria-label="Floating label select" value={this.state.team} id="departement" onChange={this.handleTeam} name="departement">
                                <option value="dev">Développement</option>
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
                        <Button variant="danger" onClick={this.handleSubmit}>
                            Modifier mon profil
                        </Button>
                </Form.Group>
            </Form>
        </Container>
        )
    }
}

export default withRouter(ProfileUpdateForm);