import React from 'react';
import UserCompo from './usercompo'
import Grid from '@material-ui/core/Grid';

class SearchCompo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: []
        };
      }
    
      componentDidMount() {
        let token = localStorage.getItem('token');
        fetch("http://localhost:3000/api/auth/getusers",{
          headers:{
            'Authorization' : 'bearer ' + token
          }
        })
        //mieux que localstorage pour passer token? 
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
        return (
            <Grid container alignContent='center' alignItems="center" direction='row' spacing={3}>
                    {items.map(item => (
                    <Grid item xs={12} md={4} lg={3} key={item.id} >
                        <UserCompo id={item.id }firstname={item.firstname} lastname={item.lastname} team={item.team}/>
                    </Grid>
                    ))}
                
            </Grid>
        );
      }
    }
}

export default SearchCompo ;