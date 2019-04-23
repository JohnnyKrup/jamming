import React from 'react';
import './App.css';
import TrackList from './components/TrackList/TrackList';
import PlayList from './components/PlayList/PlayList';
import SearchBar from './components/SearchBar/SearchBar';
import {Spotify} from './util/SpotifySearch';


let fakeTrack1 = {
  album: 'Album Name1',
  artist: 'Artist Name1',
  track: 'Track Name1'
}

let fakeTrack2 = {
  album: 'Album Name2',
  artist: 'Artist Name2',
  track: 'Track Name2'
}

let fakeTrack3 = {
  album: 'Album Name3',
  artist: 'Artist Name3',
  track: 'Track Name3'
}

let fakePlayListTrack1 = {
  album: 'Album Name1',
  artist: 'Artist Name1',
  track: 'Track Name1'
}

let fakePlayListTrack2 = {
  album: 'Album Name2',
  artist: 'Artist Name2',
  track: 'Track Name2'
}

const fakeTrackList = [fakeTrack1, fakeTrack2, fakeTrack3];
const fakePlayList = [fakePlayListTrack1, fakePlayListTrack2];

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {trackList: []};
    this.searchSpotify = this.searchSpotify.bind(this);
  }

  searchSpotify(term){
    //alert('Search App.js');
    Spotify.search(term).then(result => {
      this.setState({trackList: result});
    })
    
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar searchSpotify={this.searchSpotify} />
          <div className="App-playlist">
            <div className="SearchResults">
              <h2>Results</h2>
              <TrackList trackList={this.state.trackList}/>
            </div>
            <PlayList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
