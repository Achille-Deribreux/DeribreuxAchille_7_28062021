import React from 'react';


class Like extends React.Component{
    render (){
        const {likes} = this.props;
        return (<div style={{display: "flex",justifyContent:"center"}}>
            <p>{likes} j'aime</p>
        </div>)
    }
}

export default Like;