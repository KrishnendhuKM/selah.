
import { useState } from "react";
import { Music2, X } from "lucide-react";

function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="music-player">

      <button
        className="music-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close music player" : "Open music player"}
        title="Selah music"
      >
        {isOpen ? <X size={19} /> : <Music2 size={19} />}
      </button>

      {isOpen && (
        <div className="music-panel">

          <div className="music-heading">
            <div>
              <p className="music-label">A MOMENT OF PEACE</p>
              <h3>Selah Music</h3>
            </div>

            <button
              className="music-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close music player"
            >
              <X size={17} />
            </button>
          </div>

          <p className="music-track">
            Love Story × Golden Brown
          </p>

          <p className="music-artist">
            Indila × The Stranglers
          </p>

          <iframe
            width="100%"
            height="152"
            src="https://www.youtube-nocookie.com/embed/ZxZTuZitCuQ?rel=0"
            title="Love Story x Golden Brown mashup"
            allow="encrypted-media; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />

          <p className="music-note">
            Listen, breathe, and be still. ♡
          </p>

        </div>
      )}

    </div>
  );
}

export default MusicPlayer;
