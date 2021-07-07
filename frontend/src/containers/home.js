import React from 'react';
import Header from '../components/header/header'
import Post from '../components/post/post'
import Posts from '../components/posts/posts'

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
        console.log(results)
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

          {items.map(item => (
            <Post content={item.content} likes={item.likes} userId={item.userid} date={item.time}/>
          ))}

      </div>
    );
  }
}
}
export default Home;