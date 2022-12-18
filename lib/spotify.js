import SpotifyWebApi from 'spotify-web-api-node';

const scopes = [
    'user-read-email',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-read-email',
    'streaming',
    'user-read-private',
    'user-library-read',
    'user-top-read',
    'user-modify-playback-state',
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-read-recently-played',
    'user-follow-read'
].join(',');
const params = {
    scope: scopes
};

const queryParamString = new URLSearchParams(params).toString();

const LOGIN_URL = `http://accounts.spotify.com/authorize?${queryParamString}`;

const spotifyApi = new SpotifyWebApi({
  clientId: "49bd11bbfc6e4192a43d3d847ff18db5",
  clientSecret: "10c5dfa0f95c428f8789e875b7440d7e",
});
export default spotifyApi
export {LOGIN_URL}