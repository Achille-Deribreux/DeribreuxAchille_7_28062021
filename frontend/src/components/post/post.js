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
import FavoriteIcon from '@material-ui/icons/Favorite';
import CancelIcon from '@material-ui/icons/Cancel';
import ChatIcon from '@material-ui/icons/Chat';
import { toast } from 'react-toastify';

import {
  withRouter
} from "react-router-dom";

var dateFormat = require('dateformat');


class Post extends React.Component{
    constructor(props) {
        super(props);
        
        this.state = {
          error: null,
          isLoaded: false,
          items: {},
          connectedUserId :'',
          likes:0,
          userliked : ""
        };
      }

    componentDidMount(){
        this.apiCall()
    }
  
      editRedirect = () => {
        const {id} = this.props;
        this.props.history.push("/update/?id="+id);
      }

      deletePost = () => {
        const deleteBody = new FormData();
        const {userId,id} = this.props;
        
        deleteBody.append('postId', this.props.id);
        deleteBody.append('author', userId);
  
        fetch("http://localhost:3000/api/post/delete",{
          method:'DELETE',
            headers:{
              'Authorization' : 'bearer ' + localStorage.getItem('token')
            },
            body : deleteBody
          })
          .then((res)=>{
            toast.success('Post supprimé !', {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
              setTimeout(() => {
                this.props.reload();
                this.props.history.push('/home');
              }, 1500)
          })
          .catch((res)=>console.log(res))
      }


      apiCall(){
        let token = localStorage.getItem('token');
        const {userId,id}=this.props;

        fetch("http://localhost:3000/api/post/getpost/"+id,{
          headers:{
            'Authorization' : 'bearer ' + token
          }
        })
        .then(response => response.json())
        .then((res)=>{
          this.setState({
            likes : res.likes,
            userliked:res.userliked
          })
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
              fetch("http://localhost:3000/api/auth/getuserId",{
                  headers:{
                      'Authorization' : 'bearer ' + token
                  }
              })
              .then(response => response.json())
              .then((res) => {
                this.setState({
                  connectedUserId : res.userId.userId
                })
              })
              .catch(function(err){
                alert(err) // Affiche l'erreur dans une alert si erreur 
              });
        })
        .catch(function(err){
            alert(err) // Affiche l'erreur dans une alert si erreur 
          });
        })
        .catch(function(err){
          alert(err) // Affiche l'erreur dans une alert si erreur 
      })
      }

      profileRedirect = () => {
        this.props.history.push("/mur/?id="+this.props.userId)
      }
      showFullPost = () => {
        this.props.history.push("/post/?id="+this.props.id)
      }

      renderAvatar = () => {
        if (this.state.items.profileurl){
            return  <Avatar alt="Profile Avatar" src={this.state.items.profileurl} />
        }
        else{
            return <Avatar>{this.state.items.firstname[0]+this.state.items.lastname[0]} </Avatar>
        }
    }
    unlikePost = () => {
      const unlikePostBody = new FormData();
      unlikePostBody.append("userId",this.state.connectedUserId)
      unlikePostBody.append("postId",this.props.id)

      fetch("http://localhost:3000/api/post/unlikePost",{
        method:'PUT',
          headers:{
            'Authorization' : 'bearer ' + localStorage.getItem('token')
          },
          body : unlikePostBody
        })
        .then((results) => {
          this.apiCall()
        })
      .catch(function(err){
        alert(err) // Affiche l'erreur dans une alert si erreur 
      });
    }

    likePost = () => {
      const likePostBody = new FormData();
      likePostBody.append("userId",this.state.connectedUserId)
      likePostBody.append("postId",this.props.id)

      fetch("http://localhost:3000/api/post/likePost",{
        method:'PUT',
          headers:{
            'Authorization' : 'bearer ' + localStorage.getItem('token')
          },
          body : likePostBody
        })
        .then((results) => {
          this.apiCall()
        })
      .catch(function(err){
        alert(err) // Affiche l'erreur dans une alert si erreur 
      });

    }


    renderLikeButton(){
    const {userliked} = this.state;
    let userLikedArray = userliked.split(';');
      if (userLikedArray.includes(this.state.connectedUserId.toString())){
        return(<IconButton aria-label="add to favorites" onClick={this.unlikePost}>
                  {this.state.likes}
                  <FavoriteIcon style={{ color: 'red' }}/>
        </IconButton>)
      }else{
        return(<IconButton aria-label="add to favorites" onClick={this.likePost}>
                  {this.state.likes}
                  <FavoriteIcon />
        </IconButton>)
      }
    }

      cardActionsRender = () => {
        if ((this.props.userId === this.state.connectedUserId) || (this.state.items.isAdmin === true) ){
            return(
              <CardActions disableSpacing>
                {this.renderLikeButton()}
                  <IconButton aria-label="See comments" onClick={this.showFullPost}>
                    <ChatIcon />
                  </IconButton>
                  <IconButton onClick={this.editRedirect}>
                        <EditIcon />
                  </IconButton>
                  <IconButton onClick={this.deletePost}>
                        <CancelIcon />
                  </IconButton>
              </CardActions>
            )
        }
        else{
          return(
          <CardActions disableSpacing>
          {this.renderLikeButton()}
          <IconButton aria-label="See comments" onClick={this.showFullPost}>
            <ChatIcon />
          </IconButton>
        </CardActions>
          )
        }
      }
    render (){
        const { content, date, imgUrl, likes, userId} = this.props;
        const  {isLoaded, items } = this.state;

      if (!isLoaded) {
      return <div>Chargement…</div>;
    } else {
        return(
            <Card>
                <CardHeader 
                  onClick={this.profileRedirect} avatar={
                  this.renderAvatar()}
                  title={items.firstname + " " + items.lastname}
                  subheader={dateFormat(date, "HH:MM dd-mm-yyyy")}
                />
                <CardContent>
                    <Typography>
                        {content}
                    </Typography>
                </CardContent>
                <CardMedia
                component="img"
                  image={imgUrl}
                />
                {this.cardActionsRender()}
            </Card>
        )
    }
}
}

export default withRouter(Post);