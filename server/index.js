const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

const tracks = [
  { id: 1, title: 'Sunrise Pop', mood: 'Happy', genre: 'Pop', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
  { id: 2, title: 'Lo-fi Rain', mood: 'Sad', genre: 'Lo-fi', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
  { id: 3, title: 'Epic Dreams', mood: 'Energetic', genre: 'Cinematic', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 4, title: 'EDM Chill', mood: 'Chill', genre: 'EDM', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' },
];

app.get('/api/tracks', (req, res) => {
  const { mood, genre } = req.query;
  const filtered = tracks.filter(t => t.mood === mood && t.genre === genre);
  const random = filtered[Math.floor(Math.random() * filtered.length)] || tracks[0];
  res.json(random);
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
