import React from 'react';
import Header from '../components/header/header'
import Post from '../components/post/post'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class Home extends React.Component{
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
    fetch("http://localhost:3000/api/post/home",{
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
     
      <div>
          <Header />
          <Grid container alignContent='center' alignItems="center" direction='row' spacing={3}>
{/* Condition ici */}
          {items.map(item => (
            
              <Grid item xs={12} key={item.id} >
                <Paper>
                <Post key = {item.id} id={item.id} content={item.content} imgUrl={item.imageUrl}likes={item.likes} userId={item.userid} date={item.createdAt}/>
                </Paper>
              </Grid>
          ))}
          </Grid>

      </div>
    );
  }
}
}
export default Home;