import React from 'react';
import Header from '../components/header/header'
import Grid from '@material-ui/core/Grid';
import ProfileUpdateForm from '../components/profileUpdate/profileUpdateForm'
import { ToastContainer } from 'react-toastify';

class ProfileUpdate extends React.Component{
    componentDidMount(){
        document.title = "Groupomania | Modifier son profil";    
    }

    render (){
        return (
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
                <Grid>
                    <ProfileUpdateForm />
                </Grid>
            </div>
        )
    }
}

export default ProfileUpdate;