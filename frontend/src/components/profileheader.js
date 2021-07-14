import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Avatar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';


class ProfileHeader extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: [],
          id : ''
        };
      }
    
      componentDidMount() {
        let token = localStorage.getItem('token');
        const id = (new URL(document.location)).searchParams.get('id');
        fetch("http://localhost:3000/api/auth/".concat(id),{
          headers:{
            'Authorization' : 'bearer ' + token
          }
        })
          .then(response => response.json())
          .then((results) => {
              this.setState({
                isLoaded: true,
                items: results
              });
            })
          .catch(function(err){
            alert(err) // Affiche l'erreur dans une alert si erreur 
          });
      }
      render(){
        const  {isLoaded, items } = this.state;
          if (!isLoaded) {
          return <div>Chargement…</div>;
        } else {
            return(
                <Grid container alignContent='center' alignItems="center" direction='row' spacing={3}>
                    <Grid item xs={4}>
                        <Avatar>
                        {items.user.firstname[0]+items.user.lastname[0]}
                        </Avatar>
                    </Grid>
                    <Grid item xs={8}>
                    <Typography variant="h2" gutterBottom>
                    {items.user.firstname+" "+items.user.lastname}
                    </Typography>
                    </Grid>
                </Grid>
            )
      }
    }
}

export default ProfileHeader;