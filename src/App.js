import React from 'react';
import queryString from 'query-string';
import './App.css';
import TrackList from './components/TrackList/TrackList';
import SearchBar from './components/SearchBar/SearchBar';
import {Spotify} from './util/SpotifySearch';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      trackList: [],
      playList: [],
      playListName: '',
      user: {}
    };

    this.searchSpotify = this.searchSpotify.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addTrackToPlayList = this.addTrackToPlayList.bind(this);
    this.updatePlayList = this.updatePlayList.bind(this);
    this.removeTrackFromPlayList = this.removeTrackFromPlayList.bind(this);
    this.savePlaylistToSpotify = this.savePlaylistToSpotify.bind(this);
  }

  componentDidMount(){
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken){
      return;
    }

    fetch('https://api.spotify.com/v1/me', 
    { headers: {'Authorization': 'Bearer ' + accessToken} })
    .then(response => response.json())
    .then(data => this.setState({
      user: {
        id: data.id,
        href: data.href,
        uri: data.uri
      }
    }))
  }

  // search for artist, track or album 
  searchSpotify(term){
    Spotify.search(term).then(result => {
      this.setState({trackList: result});
    })    
  }

  handleChange(event){
    this.setState({playListName: event.target.value});
    event.preventDefault();
  }

  updatePlayList(playlist){
    this.setState({playList: playlist});
  }

  addTrackToPlayList(track){
    this.state.playList.push(track);
    this.updatePlayList(this.state.playList);
  }

  removeTrackFromPlayList(track){
    this.state.playList = this.state.playList.filter(ele => ele.id != track.id);
    this.updatePlayList(this.state.playList);
  }

  savePlaylistToSpotify(){
    if(this.state.user && this.state.playListName && this.state.playList){
      Spotify.savePlayList(this.state.user, this.state.playListName, this.state.playList);
      this.setState(
        {
          playList: [], 
          playListName: ''
        }
      );
    }
    
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
            <div className="Playlist">
                <input type="text" name="PlayList" value={this.state.playListName} placeholder='New Playlist' onChange={this.handleChange} />
                <TrackList 
                  updatePlayList={this.state.playList}
                  removeTrackFromPlayList={this.removeTrackFromPlayList}              
                />
                <a className="Playlist-save" onClick={this.savePlaylistToSpotify} >SAVE TO SPOTIFY</a>
            </div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
