import React from 'react';

class Field extends React.Component{
    render (){
        const {name, libelle, value, onChange} = this.props;
        return(
            <div>
                <label htmlFor={name}>{libelle}</label>
                <input type="text" value={value} onChange={onChange} id={name} name={name}></input>
            </div>
        )
    }
}

export default Field;