import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component{
    createTrackList() {
        if(this.props.trackList){
            return this.props.trackList.map((track, i) => {
                return <Track track={track} key={i} />;
            });
        }
    }


    render(){
        return (            
            <div className="TrackList">
                {
                    this.createTrackList()
                }
            </div>         
        );
    }
    
}

export default TrackList;