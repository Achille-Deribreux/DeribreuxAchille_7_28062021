import React from 'react';
import Header from '../components/header/header'
import Post from '../components/post/post'
import ProfileHeader from '../components/profileheader'
import Grid from '@material-ui/core/Grid';

class Home extends React.Component{
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
      this.setState({id : id});
      fetch("http://localhost:3000/api/post/".concat(id),{
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
      const  {isLoaded, items, id } = this.state;
        if (!isLoaded) {
        return <div>Chargement…</div>;
      } else {
      return (
        <div>
            <Header />
            <ProfileHeader userId={id} />
            <Grid container alignContent='center' alignItems="center" direction='row' spacing={3}>
            {items.map(item => (
              <Grid item xs={12} md={4} lg={3} key={item.id} >
              <Post key = {item.id} id={item.id} imgUrl={item.imageUrl} content={item.content} likes={item.likes} userId={item.userid} date={item.time}/>
              </Grid>
            ))}
             </Grid>
        </div>
      );
    }
  }
  }
  export default Home;