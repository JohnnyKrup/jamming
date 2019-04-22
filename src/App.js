import React from 'react';
import './App.css';
import TrackList from './components/TrackList/TrackList';
import PlayList from './components/PlayList/PlayList';
import SearchBar from './components/SearchBar/SearchBar';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <TrackList />
            <PlayList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
