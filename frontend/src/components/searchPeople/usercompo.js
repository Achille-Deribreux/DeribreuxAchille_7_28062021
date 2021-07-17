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
    Link
  } from "react-router-dom";

class UserCompo extends React.Component{
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
    <Paper>
        <Card>
            <Grid container alignContent='center' alignItems="center" direction='column'> 
                <Grid item xs={8}>
                    
                            <CardHeader
                                avatar={
                                <Avatar>
                                {firstname[0]+lastname[0]}
                                </Avatar>
                                }
                                title={firstname+" "+lastname}
                                subheader={team
                                }
                            />
                </Grid>

                <Grid item xs={4}>
                    <Link to={"/mur/?id=" + id}>
                        <Button variant="contained" color="default">
                                Visit Profile
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Card>
    </Paper>
        
       

    )
}
}

export default UserCompo ;