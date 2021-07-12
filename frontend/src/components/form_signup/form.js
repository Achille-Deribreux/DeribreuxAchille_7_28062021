import React from 'react';
import "./form.css";
import Button from '@material-ui/core/Button';

import Field from '../formItems/field'
import TypeField from '../formItems/typeField'


class FormSignup extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            prenom:'',
            nom:'',
            mail : '',
            password:'',
            team:''
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

    handleTeam = (e) => {
        this.setState({
            team: e.target.value
        })
        console.log(e.target.value)
    }
    signupResponseTranfer = (response) => {
        this.props.signupResponseTranfer(response);
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const data = JSON.stringify(this.state);
        console.log(data)
        this.setState({
            prenom:'',
            nom:'',
            mail : '',
            password:'',
            team:''
        })
        fetch("http://localhost:3000/api/auth/signup",{
            method: 'POST',
            headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' 
            },
            body: data
        })
        .then(response => response.json())
        .then((response) => {
            console.log(response)
            localStorage.setItem('token', response.token)
            localStorage.setItem('uid', response.userId)
            this.signupResponseTranfer(response);
        
        })
        .catch(function(error) {
            alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);
          });
    }
    render(){ 
        return(
            <section>
                <form>
                    <Field name="prenom" libelle="Prénom : " value={this.state.prenom} onChange={this.handlePrenom}/>
                    <Field name="nom" libelle="Nom :" value={this.state.nom} onChange={this.handleNom}/>
                    <TypeField name="mail" type="email" libelle="Adresse mail :" value={this.state.mail} onChange={this.handleMail} />
                    <TypeField name="password" type="password" libelle="Mot De Passe :" value={this.state.password} onChange={this.handlePass} />
                    
                    <div>
                        <label htmlFor="departement"> Département :</label>
                        <select value={this.state.team} onChange={this.handleTeam} name="departement" id="departement">
                            <option value="-">-</option>
                            <option value="dev">Développement</option>
                            <option value="hr">Ressources Humaines</option>
                            <option value="sales">Ventes</option>
                        </select>
                    </div>
                    <div>
                        <Button variant="contained" color="secondary" onClick={this.handleSubmit}>
                            S'inscrire
                        </Button>
                    </div>
                </form>
            </section>
    )}

}



export default FormSignup;