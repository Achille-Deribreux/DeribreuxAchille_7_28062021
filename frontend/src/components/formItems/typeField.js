import React from 'react';

class TypeField extends React.Component{
    render (){
        const {name, libelle, value, type, onChange} = this.props;
        return(
            <div>
                <label htmlFor={name}>{libelle}</label>
                <input type={type} value={value} onChange={onChange} id={name} name={name}></input>
            </div>
        )
    }
}

export default TypeField;