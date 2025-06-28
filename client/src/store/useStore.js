import { create } from 'zustand';

export const useStore = create((set) => ({
  mood: 'Happy',
  genre: 'Pop',
  track: null,
  likedTracks: JSON.parse(localStorage.getItem('likedTracks')) || [],
  setMood: (mood) => set({ mood }),
  setGenre: (genre) => set({ genre }),
  setTrack: (track) => set({ track }),
  toggleLike: (trackId) => set((state) => {
    const liked = state.likedTracks.includes(trackId)
      ? state.likedTracks.filter((id) => id !== trackId)
      : [...state.likedTracks, trackId];
    localStorage.setItem('likedTracks', JSON.stringify(liked));
    return { likedTracks: liked };
  }),
}));
