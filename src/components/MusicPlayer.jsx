
import { useRef, useState } from "react";
import { Music2, Pause } from "lucide-react";

function MusicPlayer() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  async function enterSelah() {
    const audio = audioRef.current;

    try {
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.error("Music playback failed:", error);
    }

    setHasEntered(true);
  }

  async function toggleMusic() {
    const audio = audioRef.current;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Unable to play music:", error);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/music/selah-music.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {!hasEntered && (
        <div className="welcome-screen">
          <div className="welcome-content">
            <span className="welcome-symbol">✧</span>

            <p className="welcome-label">
              A MOMENT OF STILLNESS
            </p>

            <h1>Welcome to Selah</h1>

            <p className="welcome-message">
              Take a breath. Be still.
              <br />
              Let His words find you.
            </p>

            <button
              className="welcome-button"
              onClick={enterSelah}
            >
              Enter Selah <span>♡</span>
            </button>

            <p className="welcome-footer">
              Find peace in His presence.
            </p>
          </div>
        </div>
      )}

      {hasEntered && (
        <div className="music-player">
          <button
            className={`music-toggle ${isPlaying ? "playing" : ""}`}
            onClick={toggleMusic}
            aria-label={isPlaying ? "Pause music" : "Play music"}
            title={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <Pause size={19} />
            ) : (
              <Music2 size={19} />
            )}
          </button>
        </div>
      )}
    </>
  );
}

export default MusicPlayer;
