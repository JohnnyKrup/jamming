import React from 'react';
import './PlayList.css';
import TrackList from '../TrackList/TrackList';

class PlayList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            playListName: '',
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({playListName: event.target.value});
        event.preventDefault();
    }

    render(){
        return (
            <div className="Playlist">
                <input placeholder='New Playlist' onChange={this.handleChange} />
                <TrackList 
                    updatePlayList={this.props.updatePlayList} 
                    removeTrackFromPlayList={this.props.removeTrackFromPlayList} 
                />
                <a className="Playlist-save">SAVE TO SPOTIFY</a>
            </div>
        );
    }
}

export default PlayList;