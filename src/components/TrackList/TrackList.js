import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component{
    
    createTrackList() {
        if(this.props.trackList){
            // console.log('SearchList:')
            // console.log(this.props.trackList);
            return this.props.trackList.map((track, i) => {
                return <Track 
                            track={track} 
                            key={i} 
                            addTrackToPlayList={this.props.addTrackToPlayList}
                            button={'+'}
                        />;
            });
        }
    }

    createPlayList(){
        if(this.props.updatePlayList){
            // console.log('Updated PlayList:')
            // console.log(this.props.updatePlayList);
            return this.props.updatePlayList.map((track, i) => {
                return <Track 
                            track={track} 
                            key={i} 
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