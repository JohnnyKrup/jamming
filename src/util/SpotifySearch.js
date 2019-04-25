import queryString from 'query-string';
import { create } from 'domain';

let parsed = queryString.parse(window.location.search);
let accessToken = parsed.access_token;

function checkAccessToken(){           
    window.location.href.includes('localhost') 
        ? window.location.replace('http://localhost:8888/login')
        : window.location.replace('https://jamming-backend.herokuapp.com/login')
}

export const Spotify = {    

    // search albums, artists or tracks from Spotify through Spotify API
    async search(term){

        // if no search term was given, abort the search
        if(term === '' || term == null){
            return;
        }

        // check if there is no access token => first login        
        if(typeof accessToken === 'undefined'){
            checkAccessToken();
        }

        // search for tracks, since it contains ablbums and artists
        // limit search results to 5 results
        const response = await fetch(`https://api.spotify.com/v1/search?q=${term}&type=track&limit=5`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        });

        // check if there was error on an existing access token
        // i.e. access token expired
        if(response.status === 401){
            checkAccessToken();
        }

        // get the array with the search results
        const jsonResponse = await response.json();
        if(typeof jsonResponse.tracks.items !== 'undefined'){
            return jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    album: track.album.name,
                    artist: track.artists[0].name,
                    track: track.name,
                    image: track.album.images[0].url
                }
            })
        }        
    },

    // save the playlist to the current users Spotify account
    async savePlayList(user, playListName, playList){
        // if one of the params is not defined, abort the process
        if(typeof user == 'undefined' || typeof playListName == 'undefined' || typeof playList == 'undefined'){
            console.log('missing save criteria, save aborted!');
            return;
        }

        // check if there is no access token => first login
        if(typeof accessToken === 'undefined'){
            accessToken();
        }

        //createPL and return playlist
        const pl = await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
            headers: {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                name: playListName,
                public: false
            })
        }).then(res => res.json())
        .then(response => {
            console.log('Success:', JSON.stringify(response))
            return response;
        })
        .catch(error => console.error('Error:', error));
        
        
        // create an array of track uris
        const uris = playList.map(track => {
            return `spotify:track:${track.id}`;
        });

        // save tracks to PL(ID)
        await fetch(`https://api.spotify.com/v1/playlists/${pl.id}/tracks`, {
            headers: {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                uris: uris
            })
        }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
    }
}