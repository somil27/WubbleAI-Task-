import React, { useState } from 'react';
import { useStore } from './store/useStore';
import axios from 'axios';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const { mood, genre, setMood, setGenre, track, setTrack, toggleLike, likedTracks } = useStore();
  const [loading, setLoading] = useState(false);

  const moods = ['Happy', 'Sad', 'Energetic', 'Chill'];
  const genres = ['Pop', 'Lo-fi', 'Cinematic', 'EDM'];

  const fetchTrack = async () => {
    setLoading(true);
    setTimeout(async () => {
      const res = await axios.get(`http://localhost:5000/api/tracks?mood=${mood}&genre=${genre}`);
      setTrack(res.data);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      {/* Toggle Dark Mode Button */}
      <div className="w-full flex justify-end p-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-300 dark:bg-gray-700 text-black dark:text-white px-4 py-2 rounded-full transition-colors duration-300"
        >
          {darkMode ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {/* Main App Container */}
      <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-blue-200 dark:from-gray-800 dark:via-gray-900 dark:to-black flex flex-col items-center justify-center p-4 animate-pulse font-poppins text-black dark:text-white">
        <h1 className="text-3xl font-bold mb-6">🎵 Wubble QuickTune Mini</h1>

        <div className="mb-4 text-lg">
          <label className="mr-2 font-medium">Mood:</label>
          <select className="p-2 rounded shadow-sm text-black" onChange={(e) => setMood(e.target.value)} value={mood}>
            {moods.map((m) => <option key={m}>{m}</option>)}
          </select>

          <label className="ml-6 mr-2 font-medium">Genre:</label>
          <select className="p-2 rounded shadow-sm text-black" onChange={(e) => setGenre(e.target.value)} value={genre}>
            {genres.map((g) => <option key={g}>{g}</option>)}
          </select>
        </div>

        {/* Generate Preview Button */}
        <button
          onClick={fetchTrack}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-6 py-2 rounded-full hover:scale-105 hover:shadow-xl transition-all duration-300 ease-in-out"
        >
          {loading ? 'Generating...' : '🎼 Generate Preview'}
        </button>

        {/* After Track is Loaded */}
        {track && !loading && (
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mt-6 max-w-xl w-full text-center hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">🎧 {track.title}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
              Mood: <span className="font-medium text-blue-700 dark:text-blue-400">{track.mood}</span> | Genre: <span className="font-medium text-purple-700 dark:text-purple-400">{track.genre}</span>
            </p>

            <audio controls src={track.url} className="my-4 mx-auto w-full max-w-md rounded-xl shadow-md" />

            {/* Button Container */}
            <div className="flex gap-4 justify-center">
              {/* Download Button */}
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-medium shadow-md hover:scale-105 transition-transform duration-300"
                onClick={() => window.open(track.url, '_blank')}
              >
                ⬇ Download
              </button>

              {/* Like Button */}
              <button
                onClick={() => toggleLike(track.id)}
                className={`px-4 py-2 rounded-full font-medium shadow-md transition-transform duration-300 ${
                  likedTracks.includes(track.id)
                    ? 'bg-red-400 text-white hover:scale-105'
                    : 'bg-gray-300 text-black dark:bg-gray-600 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-500 hover:scale-105'
                }`}
              >
                {likedTracks.includes(track.id) ? '♥ Liked' : '♡ Like'}
              </button>
            </div>
          </div>
        )}

        {/* MyFooter */}
        <footer className="text-sm text-center text-gray-600 dark:text-gray-400 mt-10">
          Built by Somil Shankar Gupta © 2025
        </footer>
      </div>
    </div>
  );
}

export default App;
