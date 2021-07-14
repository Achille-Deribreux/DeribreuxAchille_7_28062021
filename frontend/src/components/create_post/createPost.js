import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Axios from 'axios';

class CreatePost extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            content:'',
            file:''
        }
    }
    handleContentChange = (e) => {
        console.log(e.target.value)
        this.setState({
            content : e.target.value
        })
    }

    handleFileChange = (e) => {
        console.log(e.target.value)
        this.setState({
            file : e.target.files[0]
        })
    }
    handleSubmit = (e) => {
        const data = new FormData();
        data.append("content", this.state.content)
        data.append("file", this.state.file)
        let token = localStorage.getItem('token');

        Axios.post("http://localhost:3000/api/post/write", data)
        .then((res) => console.log(res))
        .catch((err)=>console.log(err));
        //Reset state
    }
    
    render(){
        return(
            <Grid container
            spacing={1}
            direction="column"
            alignItems="center"
            justify="center">
                <form action="#">
                <Grid item xs={12}>
                    <Box m={4}>
                        <textarea name="content" id="content" value={this.state.content} onChange={this.handleContentChange}></textarea>
                    </Box>

                    <Box m={4}>
                        <input type="file" id="file" onChange={this.handleFileChange}/>
                    </Box>
                </Grid>

                <Grid item xs={12}>
                    <Button size="large" variant="contained" color="primary" onClick={this.handleSubmit}>
                        Publier
                    </Button>
                </Grid>
                </form>
            </Grid>
            
        )
    }
}


export default CreatePost;

