import queryString from 'query-string';

let parsed = queryString.parse(window.location.search);
let accessToken = parsed.access_token;

export const Spotify = {    

    async search(term){
        console.log(accessToken)
        if(typeof accessToken === 'undefined'){            
            window.location.replace('http://localhost:8888/login')
        }

        const response = await fetch(`https://api.spotify.com/v1/search?q=${term}&type=track`, {
            headers: {Authorization: `Bearer ${accessToken}`}
        });

        console.log(response)
        const jsonResponse = await response.json();
        console.log(jsonResponse)

        if(jsonResponse.tracks.items){
            return jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    album: track.album.name,
                    artist: track.artists[0].name,
                    track: track.name
                }
            })
        }
        
    }
}