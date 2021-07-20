import React from 'react';
import Header from '../components/header/header'
import Grid from '@material-ui/core/Grid';
import ProfileUpdateForm from '../components/profileUpdate/profileUpdateForm'
class ProfileUpdate extends React.Component{

    render (){
        return (
            <div>
                <Header />
                <Grid>
                    <ProfileUpdateForm />
                </Grid>
            </div>
        )
    }
}

export default ProfileUpdate;