const express = require('express');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

const spotifyApi = new SpotifyWebApi({
  clientId: 'BONGWAS_SPOTIFY_ID',
  clientSecret: 'BONGWAS_SPOTIFY_PASSCODE',
  redirectUri: 'http://localhost:3000/callback'
});

// Set up OAuth 2.0 authentication
app.get('/login', (req, res) => {
  const scopes = ['user-read-private', 'user-read-email', 'user-library-read', 'user-library-modify'];
  const authorizeURL = spotifyApi.createAuthorizeURL(scopes, 'STATE');
  res.redirect(authorizeURL);
});

app.get('/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { body: { access_token, refresh_token } } = await spotifyApi.authorizationCodeGrant(code);
    spotifyApi.setAccessToken(access_token);
    spotifyApi.setRefreshToken(refresh_token);
    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
});

// Search for tracks, albums, artists, or playlists
app.get('/search', async (req, res) => {
  const { query, type } = req.query;
  try {
    const { body: { tracks, albums, artists, playlists } } = await spotifyApi.search(query, [type]);
    res.json({ tracks, albums, artists, playlists });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
});

// Control playback of tracks
app.post('/play', async (req, res) => {
  const { id } = req.body;
  try {
    await spotifyApi.play({ uris: [`spotify:track:${id}`] });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
});

app.post('/pause', async (req, res) => {
  try {
    await spotifyApi.pause();
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error');
  }
});

// Deploy the bot to a cloud platform
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
