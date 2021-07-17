import React from 'react';
import Header from '../components/header/header'
import ModifyPost from '../components/modifyPost'



class PostModification extends React.Component {
    render(){
        return(
            <div>
                <Header />
                <ModifyPost />
            </div>
            
        )
    }
}

export default PostModification;