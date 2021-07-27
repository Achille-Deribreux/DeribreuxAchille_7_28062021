import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, 
    withRouter
  } from "react-router-dom";
import { IconButton } from '@material-ui/core';

class UserCompo extends React.Component{

    renderAvatar = () => {
        let {firstname, lastname, profileurl} = this.props;
        if (profileurl){
            return  <Avatar alt="Profile Avatar" src={profileurl} />
        }
        else{
            return  <Avatar>{firstname[0]+lastname[0]}</Avatar>
        }
    }
    profileRedirect= () => {
        this.props.history.push("/mur/?id=" + this.props.id)
    }

render(){
    let {firstname, lastname, team, id} = this.props;
    if (team === "dev") {
         team = "Developpement"
    }
    else if (team === "hr"){
        team = "Human Ressources"
    }
    else if (team === "sales"){
        team = "Sales"
    }
    
    return(
    <Paper variant="outlined" elevation={3} >
        <Card>
            <Grid container alignContent='center' alignItems="center" direction='column'> 
                <Grid item xs={8}>
                    
                            <CardHeader
                                avatar={
                                this.renderAvatar()
                                }
                                title={firstname+" "+lastname}
                                subheader={team
                                }
                            />
                </Grid>

                <Grid item xs={4}>
                    <Button color="secondary" variant="contained" onClick={this.profileRedirect}>
                            Visit Profile
                    </Button>
                </Grid>
            </Grid>
        </Card>
    </Paper>
        
       

    )
}
}

export default withRouter(UserCompo) ;