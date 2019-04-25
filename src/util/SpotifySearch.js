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
        // check if there is no access token => first login        
        if(typeof accessToken === 'undefined'){
            checkAccessToken();
        }

        const response = await fetch(`https://api.spotify.com/v1/search?q=${term}&type=track&limit=5`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        });

        // check if there was error on an existing access token
        // i.e. access token expired
        if(response.status === 401){
            checkAccessToken();
        }

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

/*     async createNewPlayList(user, playListName){
        await fetch(`https://api.spotify.com/v1/users/${user.id}/playlists`, {
            headers: {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                name: playListName,
                public: false
            })
        }).then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
        .catch(error => console.error('Error:', error));
    },

    async getPlayListID(playListName){
        const response = await fetch(`https://api.spotify.com/v1/me/playlists`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        })
        
        const jsonResponse = await response.json();
        if(jsonResponse)
        {
            let id;
            jsonResponse(data => {
                if(data.name == playListName){
                    return id = data.id;
                }
            })
            return id;
        }        
    },

 // Save a PlayList to the users SpotifyAccount via Spotify API
 async savePlayList (user, playListName, playList){
    // check if there is no access token => first login
    if(typeof accessToken === 'undefined'){
        accessToken();
    }

    console.log('User ID: ', user.id);
    // Create a new playlist
    Spotify.createNewPlayList(user);
    
    // get current users playlists and filter the id of the newly created playlist
    let playListID = Spotify.getPlayListID(playListName);
    console.log('PlayList ID: ', playListID);

    // create an array of track uris
    const uris = playList.map(track => {
        return `spotify:track:${track.id}`;
    });

    console.log('uris: ', uris);

    await fetch(`https://api.spotify.com/v1/playlists/${playListID}/tracks`, {
        headers: {Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json'},
        method: 'POST',
        body: JSON.stringify({
            uris: uris
        })
    }).then(res => res.json())
    .then(response => console.log('Success:', JSON.stringify(response)))
    .catch(error => console.error('Error:', error));    
} */

    async savePlayList(user, playListName, playList){
        console.log(accessToken)
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

        console.log('uris: ', uris);
        console.log('PL: ', pl);
        console.log('PL_ID: ', pl.id);

        //await save tracks to PL(ID)
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