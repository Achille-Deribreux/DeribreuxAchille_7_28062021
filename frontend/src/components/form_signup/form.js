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
            team:'',
            isAdmin:'',
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
            <section>
                <form>
                    <Field name="prenom" libelle="Prénom : " value={this.state.prenom} onChange={this.handlePrenom}/>
                    <Field name="nom" libelle="Nom :" value={this.state.nom} onChange={this.handleNom}/>
                    <TypeField name="mail" type="email" libelle="Adresse mail :" value={this.state.mail} onChange={this.handleMail} />
                    <TypeField name="password" type="password" libelle="Mot De Passe :" value={this.state.password} onChange={this.handlePass} />
                    <div>
                        <label htmlFor="droits"> Droits :</label>
                        <select value={this.state.isAdmin} onChange={this.handleIsAdmin} name="droits" id="droits">
                            <option value="false" selected>Classique</option>
                            <option value="true">Administrateur</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="departement"> Département :</label>
                        <select value={this.state.team} onChange={this.handleTeam} name="departement" id="departement">
                            <option value="dev" selected>Développement</option>
                            <option value="hr">Ressources Humaines</option>
                            <option value="sales">Ventes</option>
                        </select>
                    </div>
                    <div>
                    <label htmlFor="file"> Photo de profil :</label>
                    <input type="file" id="file" onChange={this.handleFileChange}/>
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