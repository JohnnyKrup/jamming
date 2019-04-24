import React from 'react';
import './App.css';
import TrackList from './components/TrackList/TrackList';
import PlayList from './components/PlayList/PlayList';
import SearchBar from './components/SearchBar/SearchBar';
import {Spotify} from './util/SpotifySearch';


function arrayRemove(arr, value) {
  return arr.filter(function(ele){
      return ele != value;
  });
}

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      trackList: [],
      playList: []
    };

    this.searchSpotify = this.searchSpotify.bind(this);
    this.addTrackToPlayList = this.addTrackToPlayList.bind(this);
    this.updatePlayList = this.updatePlayList.bind(this);
    this.removeTrackFromPlayList = this.removeTrackFromPlayList.bind(this);
  }

  searchSpotify(term){
    Spotify.search(term).then(result => {
      // keyWord "this" was used, need to bind "this" in the constructor
      this.setState({trackList: result});
    })    
  }

  updatePlayList(playlist){
    this.setState({playList: playlist});
  }

  addTrackToPlayList(track){
    this.state.playList.push(track);
    this.updatePlayList(this.state.playList);
    //this.updatePlayList(this.state.playList.push(track));
  }

  removeTrackFromPlayList(track){
    this.state.playList = this.state.playList.filter(ele => ele.id != track.id);
    this.updatePlayList(this.state.playList);
    // this.updatePlayList(this.state.playList.filter(ele => ele.id != track.id));
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
              <TrackList 
                trackList={this.state.trackList} 
                addTrackToPlayList={this.addTrackToPlayList}
              />
            </div>
            <PlayList 
              updatePlayList={this.state.playList}
              removeTrackFromPlayList={this.removeTrackFromPlayList}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
