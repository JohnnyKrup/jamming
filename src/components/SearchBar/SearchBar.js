import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            term: ''
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeySearch = this.handleKeySearch.bind(this);
    }

    // update the state when changing the playList name
    handleChange(event){
        this.setState({term: event.target.value});
        event.preventDefault();
    }

    // search on Search button click
    handleSearch(event){        
        this.props.searchSpotify(this.state.term);
        event.preventDefault();
    }

    // search on Enter Key up
    handleKeySearch(event){
        if(event.key === 'Enter'){
            this.props.searchSpotify(this.state.term);
            event.preventDefault();
        }
    }

    render(){
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song Title" onChange={this.handleChange} onKeyUp={this.handleKeySearch}/>
                <a onClick={this.handleSearch} >SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;