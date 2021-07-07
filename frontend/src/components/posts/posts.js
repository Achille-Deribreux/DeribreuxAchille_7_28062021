import React from 'react';
import "./posts.css";


class Posts extends React.Component{
    render(){
        const {postArray} = this.props;
        console.log(postArray);
        return(
            <div>{postArray}</div>
        )
        
    }
}

export default Posts;