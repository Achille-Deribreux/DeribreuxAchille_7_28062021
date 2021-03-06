import React from 'react';
import Header from '../components/header/header'
import CreatePost from '../components/create_post/createPost'
import { ToastContainer } from 'react-toastify';


class PostCreation extends React.Component {

    componentDidMount(){
        document.title = "Groupomania | Créer un post";    
    }
    render(){
        return(
            <div>
                <Header />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    />
                    {/* Same as */}
                    <ToastContainer />
                <CreatePost />
            </div>
            
        )
    }
}

export default PostCreation;