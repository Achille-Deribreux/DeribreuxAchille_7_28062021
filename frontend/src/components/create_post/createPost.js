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
                    <Button size="large" variant="contained" color="primary">
                        Publier
                    </Button>
                </Grid>
            </Grid>
            
        )
    }
}

export default CreatePost;

