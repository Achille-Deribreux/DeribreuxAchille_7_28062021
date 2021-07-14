import React from 'react';
import Header from '../components/header/header'
import SearchCompo from '../components/searchcompo'

class Search extends React.Component{

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