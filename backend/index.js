require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors({
  origin: [
    'https://chaitanyasharma.life',
    'https://www.chaitanyasharma.life',
    'https://chaitshar.vercel.app', // add your Vercel domain if needed
  ]
}));

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// --- Spotify Endpoints ---
app.get('/api/spotify/top-artists', async (req, res) => {
  // TODO: Implement Spotify API logic
  res.json([{ name: 'Artist 1' }, { name: 'Artist 2' }]);
});

app.get('/api/spotify/top-tracks', async (req, res) => {
  // TODO: Implement Spotify API logic
  res.json([{ name: 'Track 1', artists: [{ name: 'Artist 1' }] }, { name: 'Track 2', artists: [{ name: 'Artist 2' }] }]);
});

// --- Strava Endpoints (placeholder) ---
app.get('/api/strava/activities', async (req, res) => {
  // TODO: Implement Strava API logic
  res.json([{ name: 'Morning Ride', distance: 12000 }, { name: 'Evening Run', distance: 5000 }]);
});

// --- Google Fit Endpoints (placeholder) ---
app.get('/api/googlefit/steps', async (req, res) => {
  // TODO: Implement Google Fit API logic
  res.json({ steps: 12345 });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`)); 