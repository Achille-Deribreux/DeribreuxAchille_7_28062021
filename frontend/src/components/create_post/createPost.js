import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

class CreatePost extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            content:''
        }
    }
    handleContentChange = (e) => {
        console.log(e.target.value)
        this.setState({
            content : e.target.value
        })
    }
    handleSubmit = (e) => {
        const data = JSON.stringify(this.state);
        let token = localStorage.getItem('token');
        //Reset state
        fetch("http://localhost:3000/api/post/write",{
            method: 'POST',
            headers: { 
            'Accept': 'application/json', 
            'Content-Type': 'application/json' ,
            'Authorization' : 'bearer ' + token
           
            },
            body: data
        })
        .then(response => response.json())
        .then((response) => {
            console.log(response)
        })
        .catch(function(error) {
            alert('Il y a eu un problème avec l\'opération fetch: ' + error.message);
          });
 
    }

    render(){
        return(
            <Grid container
            spacing={1}
            direction="column"
            alignItems="center"
            justify="center">

                <Grid item xs={12}>
                    <Box m={4}>
                        <textarea name="content" id="content" value={this.state.content} onChange={this.handleContentChange}></textarea>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Button size="large" variant="contained" color="primary" onClick={this.handleSubmit}>
                        Publier
                    </Button>
                </Grid>
            </Grid>
            
        )
    }
}

export default CreatePost;

