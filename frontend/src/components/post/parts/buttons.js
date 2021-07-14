import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';


class Buttons extends React.Component{


render () {
    return(
        <Fab color="secondary" aria-label="edit">
            <EditIcon />
        </Fab>
    )
}
}



export default Buttons;