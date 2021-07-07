import React from 'react';
import "./form.css";
import Button from '@material-ui/core/Button';

import TypeField from '../formItems/typeField'


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
            console.log(response)
            localStorage.setItem('token', response.token)
            /*window.location="./home"*/
        
        })
        .catch(function(error) {
            alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);
          });

     }

    render() {
        return(
            <section>
                     <TypeField name="mail" type="email" libelle="Adresse mail :" value={this.state.mail} onChange={this.handleMail} />
                    <TypeField name="password" type="password" libelle="Mot De Passe :" value={this.state.password} onChange={this.handlePass} />
                    <div>
                        <Button variant="contained" color="secondary" onClick={this.handleSubmit}>
                            Se connecter
                        </Button>
                    </div>
            </section>
        )
    }
}



export default FormLogin;