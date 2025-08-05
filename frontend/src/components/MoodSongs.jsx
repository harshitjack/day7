import React from 'react';
import './MoodSongs.css';

const MoodSongs = ({ songs }) => {
  return (
    <div className="mood-songs">
      <h2>Recommended Songs</h2>

      {songs.length === 0 ? (
        <p>No songs found. Please detect your mood.</p>
      ) : (
        songs.map((song, index) => (
          <div className="song" key={index}>
            <div className="title">
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </div>
            <div className="play-pause-button">
             <audio src={song.audio} controls></audio>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MoodSongs;

