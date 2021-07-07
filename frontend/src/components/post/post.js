import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


import userLogo from "../../assets/user.png";
import likeLogo from "../../assets/like.png";
import User from "./parts/user";

class Post extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: {}
        };
      }

      componentDidMount(){
        let token = localStorage.getItem('token');
        const {userId}=this.props;
        fetch("http://localhost:3000/api/auth/" + userId ,{
            headers:{
              'Authorization' : 'bearer ' + token
            }
          })
        .then(response => response.json())
        .then((userObject)=>{
            this.setState({
                isLoaded: true,
                items: userObject.user
              });
        })
        .catch(function(err){
            alert(err) // Affiche l'erreur dans une alert si erreur 
          });
      }
    render (){
        const { content, date, likes} = this.props;
        const  {isLoaded, items } = this.state;
      if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
        return(
            <Card>
                <CardHeader avatar={
                    <Avatar>
                        AD
                    </Avatar>}
                    title={items.firstname + " " + items.lastname}
                    subheader={date}
                >
                </CardHeader>
                <CardContent>
                    <Typography>
                        {content}
                    </Typography>
                </CardContent>
        
            </Card>
        )
    }
}
}

export default Post;