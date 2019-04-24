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
    }

    handleChange(event){
        this.setState({term: event.target.value});
        event.preventDefault();
    }

    handleSearch(event){        
        this.props.searchSpotify(this.state.term);
        event.preventDefault();
    }

    render(){
        return (
            <div className="SearchBar">
                <input placeholder="Enter A Song Title" onChange={this.handleChange} />
                <a onClick={this.handleSearch} >SEARCH</a>
            </div>
        );
    }
}

export default SearchBar;