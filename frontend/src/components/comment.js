import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CancelIcon from '@material-ui/icons/Cancel';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, 
    withRouter
  } from "react-router-dom";
  

class Comment extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            connectedUserId :''
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
                isLoaded: true,
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
    }

    renderAvatar = () => {
        if (this.state.items.profileurl){
            return  <Avatar alt="Profile Avatar" src={this.state.items.profileurl} />
        }
        else{
            return <Avatar>{this.state.items.firstname[0]+this.state.items.lastname[0]} </Avatar>
        }
    }

    renderActions = () => {
        if ((this.props.userId === this.state.connectedUserId) || (this.state.items.isAdmin === true)) {
            return(
                <ListItemIcon onClick={this.deleteComment}>
                    <CancelIcon />
                </ListItemIcon>
            )
        }
        else {
            return
        }
    }

    deleteComment = () => {
        const {userId, id}=this.props;
        const deleteBody = new FormData();
        deleteBody.append("author" , userId)
        deleteBody.append("commentId", id)
        fetch("http://localhost:3000/api/post/deleteComment",{
          method:'DELETE',
            headers:{
              'Authorization' : 'bearer ' + localStorage.getItem('token')
            },
            body : deleteBody
          })
          .then((res)=>{
            toast.success('Commentaire supprimé !', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                setTimeout(() => { 
                    this.props.reload()
                }, 1500)
          })
          .catch((res)=>console.log(res))
    }
    
    render () {
        const  {isLoaded, items } = this.state;
        const {content} = this.props;
        if (!isLoaded) {
            return <div>Chargement…</div>;
          } else {
              return(
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    {this.renderAvatar()}
                </ListItemAvatar>
                
                <ListItemText
                primary={items.firstname + " " +items.lastname}
                secondary={
                    <React.Fragment>
                    <Typography
                        component="span"
                        variant="body2"
                        color="textPrimary"
                    >
                        {content}
                    </Typography>
                    </React.Fragment>
                }
                />
                {this.renderActions()}
            </ListItem>
            
            )
    }
}
}

export default withRouter(Comment);