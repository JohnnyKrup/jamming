import React from 'react';
import './Track.css';

class Track extends React.Component {
    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(event){
        const track = {
            id: this.props.track.id,
            image: this.props.track.image,
            track: this.props.track.track,
            artist: this.props.track.artist,
            album: this.props.track.album
        };

        /* 
        based on the track action button it is determined if a track gets added
        to the playList or if the current track is a playList track an needs to 
        be removed from the current playList
        */
        if(this.props.button === '+'){
            this.props.addTrackToPlayList(track)
        }
        else if(this.props.button === '-'){
            this.props.removeTrackFromPlayList(track)
        }
        event.preventDefault();
    }

    render(){
        return (
            <div className="Track">
                <div className="Track-information">
                    <div className="Track-title-row">
                        <iframe src={`https://open.spotify.com/embed/track/${this.props.track.id}`}
                                allowtransparency="true" 
                                allow="encrypted-media">
                        </iframe> 
                        <div>
                            <h3>{this.props.track.track}</h3>
                            <p>{`${this.props.track.artist} | ${this.props.track.album}`}</p>
                        </div>
                    </div>                    
                </div>
                <a className="Track-action" onClick={this.handleClick}>{this.props.button}</a>
            </div>
        );
    }    
}

export default Track;