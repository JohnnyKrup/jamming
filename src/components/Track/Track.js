import React from 'react';
import './Track.css';

class Track extends React.Component {
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
                <a className="Track-action">+</a>
            </div>
        );
    }
}

export default Track;