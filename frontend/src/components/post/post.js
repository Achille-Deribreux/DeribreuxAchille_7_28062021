import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CancelIcon from '@material-ui/icons/Cancel';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import userLogo from "../../assets/user.png";
import likeLogo from "../../assets/like.png";
import Buttons from "../post/parts/buttons"
import Like from "./parts/like";

class Post extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          items: {},
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
        const { content, date, imgUrl, likes, userId} = this.props;
        const  {isLoaded, items } = this.state;
      if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
        return(
            <Card>
              <Link to={"/mur/?id="+userId}>
                <CardHeader avatar={
                      <Avatar>
                        {items.firstname[0]+items.lastname[0]}
                      </Avatar>}
                      title={items.firstname + " " + items.lastname}
                      subheader={date}
                  >
                  </CardHeader>
              </Link>
                <CardContent>
                    <Typography>
                        {content}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton>
                        <EditIcon />
                  </IconButton>
                  <IconButton>
                        <CancelIcon />
                  </IconButton>
                </CardActions>
                    
            </Card>
        )
    }
}
}

export default Post;