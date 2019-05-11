import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component{
    
    // 04.05 added the track.id as the key of each track element to identify the track
    createTrackList() {
        if(this.props.trackList){
            return this.props.trackList.map((track) => {
                return <Track 
                            track={track} 
                            key={track.id} 
                            addTrackToPlayList={this.props.addTrackToPlayList}
                            button={'+'}
                        />;
            });
        }
    }
    
    // 04.05 added the track.id as the key of each track element to identify the track
    createPlayList(){
        if(this.props.updatePlayList){
            return this.props.updatePlayList.map((track, i) => {
                return <Track 
                            track={track} 
                            key={track.id} 
                            removeTrackFromPlayList={this.props.removeTrackFromPlayList}
                            button={'-'}
                        />
            });
        }
    }

    render(){
        return (            
            <div className="TrackList">
                { this.createTrackList() }
                { this.createPlayList() }
            </div>         
        );
    }
    
}

export default TrackList;