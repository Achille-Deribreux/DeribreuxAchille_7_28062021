import React from 'react';
import Header from '../components/header/header'
import CreatePost from '../components/create_post/createPost'

class PostCreation extends React.Component {
    render(){
        return(
            <div>
                <Header />
                <CreatePost />
            </div>
            
        )
    }
}

export default PostCreation;