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
                        <img src={this.props.track.image} />
                        <h3>{this.props.track.track}</h3>
                    </div>
                    <p>{`${this.props.track.artist} | ${this.props.track.album}`}</p>
                </div>
                <a className="Track-action" onClick={this.handleClick}>{this.props.button}</a>
            </div>
        );
    }
}

export default Track;