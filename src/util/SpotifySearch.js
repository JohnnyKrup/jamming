import queryString from 'query-string';

let parsed = queryString.parse(window.location.search);
let accessToken = parsed.access_token;

export const Spotify = {    

    // search albums, artists or tracks from Spotify through Spotify API
    async search(term){
        console.log(accessToken)
        // check if there is no access token => first login
        if(typeof accessToken === 'undefined'){            
            window.location.replace('http://localhost:8888/login')
        }

        const response = await fetch(`https://api.spotify.com/v1/search?q=${term}&type=track&limit=5`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        });

        // check if there was error on an existing access token
        // i.e. access token expired
        if(response.status === 401){
            window.location.replace('http://localhost:8888/login')
        }

        console.log(response)
        const jsonResponse = await response.json();
        console.log(jsonResponse)

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

    // Save a PlayList to the users SpotifyAccount via Spotify API
    savePlayList (playListName, playList){
        // todo
    }
}