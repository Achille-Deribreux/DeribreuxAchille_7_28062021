import React from 'react';
import "./form.css";
import Button from '@material-ui/core/Button';


function FormLogin (){
    return(
        <section>
            <form>
                <div>
                    <label for="input_mail">Adresse mail :</label>
                    <br></br>
                    <input type="text" name="mail" id="input_mail"/>
                </div>
                <div>
                    <label for="password">Password :</label>
                    <br></br>
                    <input type="password" name="password" id="password"/>
                </div>
                <div>
                    <Button variant="contained" color="secondary">
                        Se connecter
                    </Button>
                </div>
            </form>
        </section>
    )
}



export default FormLogin;