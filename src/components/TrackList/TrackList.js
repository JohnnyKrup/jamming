import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component{
    render(){
        return (
            <div className="SearchResults">
                <h2>Results</h2>
                <div className="TrackList">
                    <Track />
                    <Track />
                    <Track />
                    <Track />
                    <Track />
                </div>
            </div>            
        );
    }
}

export default TrackList;