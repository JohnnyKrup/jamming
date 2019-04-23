import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            term: '',
            accessToken: ''
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({term: event.target.value});
        console.log(this.state.term);
    }

    handleSearch(event){
        // if(this.state.accessToken == ''){
        //     event.
        // }
        this.props.searchSpotify(this.state.term);
        event.preventDefault();
        console.log(`Search pressed with the Term: ${this.state.term}`);
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