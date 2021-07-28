import React from 'react';
import Header from '../components/header/header'
import SearchCompo from '../components/searchPeople/searchcompo'

class Search extends React.Component{
    componentDidMount(){
        document.title = "Groupomania | Chercher un collègue";    
    }

    render(){
        return(
            <div>
                <Header />
                <SearchCompo />
            </div>
        )
    }
}

export default Search;