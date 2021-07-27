import React from 'react';
import Header from '../components/header/header'
import ModifyPost from '../components/modifyPost'
import { ToastContainer, toast } from 'react-toastify';


class PostModification extends React.Component {
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
                <ModifyPost />
            </div>
            
        )
    }
}

export default PostModification;