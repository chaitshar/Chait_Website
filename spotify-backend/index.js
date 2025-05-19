require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const {
  SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN
} = process.env;

let accessToken = null;
let accessTokenExpires = 0;

async function getAccessToken() {
  if (accessToken && Date.now() < accessTokenExpires) return accessToken;
  const resp = await axios.post('https://accounts.spotify.com/api/token', new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: SPOTIFY_REFRESH_TOKEN,
    client_id: SPOTIFY_CLIENT_ID,
    client_secret: SPOTIFY_CLIENT_SECRET
  }).toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  accessToken = resp.data.access_token;
  accessTokenExpires = Date.now() + (resp.data.expires_in - 60) * 1000;
  return accessToken;
}

async function spotifyGet(endpoint, params = {}) {
  const token = await getAccessToken();
  const resp = await axios.get(`https://api.spotify.com/v1/${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
    params
  });
  return resp.data;
}

app.get('/api/spotify/top-artists', async (req, res) => {
  try {
    const data = await spotifyGet('me/top/artists', { time_range: 'short_term', limit: 10 });
    res.json(data.items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/api/spotify/top-tracks', async (req, res) => {
  try {
    const data = await spotifyGet('me/top/tracks', { time_range: 'short_term', limit: 10 });
    res.json(data.items);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Example for historical wrapped (use 'long_term' for all-time, 'medium_term' for 6 months)
app.get('/api/spotify/wrapped', async (req, res) => {
  try {
    const artists = await spotifyGet('me/top/artists', { time_range: 'long_term', limit: 10 });
    const tracks = await spotifyGet('me/top/tracks', { time_range: 'long_term', limit: 10 });
    res.json({ artists: artists.items, tracks: tracks.items });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3001, () => console.log('Spotify backend running on http://localhost:3001'));