import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link, 
    withRouter
  } from "react-router-dom";
  import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Alert from '@material-ui/lab/Alert'; 
import Snackbar from '@material-ui/core/Snackbar';


class ModifyPost extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            content:'',
            file:'',
            userId:''
        }
    }
    
    componentWillMount(){
        let token = localStorage.getItem('token');
        const postId = (new URL(document.location)).searchParams.get('id');
        fetch("http://localhost:3000/api/post/getpost/"+postId,{
            headers:{
              'Authorization' : 'bearer ' + token
            }
          })
          .then(response => response.json())
          .then((post)=>{
              console.log(post)
              this.setState({
                content: post.content,
                  file: post.imageUrl,
                  userId : post.userid
                });
          })
          .catch(function(err){
              alert(err) // Affiche l'erreur dans une alert si erreur 
            });
    }

    handleContentChange = (e) => {
        console.log(e.target.value)
        this.setState({
            content : e.target.value
        })
    }

    handleFileChange = (e) => {
        console.log(e.target.files[0])
        this.setState({
            file : e.target.files[0]
        })
    }
    
    handleSubmit = (e) => {
        console.log("body user id", this.state.userId);
        const postId = (new URL(document.location)).searchParams.get('id');
        const data = new FormData();
        data.append("postId", postId)
        data.append("author", this.state.userId)
        data.append("content", this.state.content)
        if (this.state.file !== ''){
        data.append("file", this.state.file)
        }
        let token = localStorage.getItem('token');
        fetch("http://localhost:3000/api/post/update", {
            method: 'POST',
            headers:{
                'Authorization' : 'bearer ' + token
            },
            body: data
    })
    .then(response => response.json())
    .then((res) => {
        toast.success('Post Modifié !', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            });
        this.props.history.push("/mur/?id="+res.userId);
    })
    .catch((err)=>console.log(err));
    }

    render(){
        return(<div>
            <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss={false}
draggable={false}
pauseOnHover
/>
<Card>
                <CardContent>
                    <Typography>
                    <textarea name="content" id="content" value={this.state.content} onChange={this.handleContentChange}></textarea>
                    </Typography>
                </CardContent>
                <CardMedia
                component="img"
         image={this.state.file}
      />                    
      <CardActions disableSpacing>
      <input type="file" id="file" onChange={this.handleFileChange}/>
      
      </CardActions>
      <Button size="large" variant="contained" color="primary" onClick={this.handleSubmit}>
                        Modifier
                    </Button>
            </Card>

        </div>
        )
    }
}

export default withRouter(ModifyPost);