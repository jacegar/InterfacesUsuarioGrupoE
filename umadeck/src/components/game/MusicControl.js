import "../styles/game/MusicControl.css";
import { useState, useRef, useEffect } from "react";

function MusicControl(){
    const backgroundMusicRef = useRef(new Audio("/assets/sounds/background.mp3"));

    const [isMusicPlaying, setIsMusicPlaying] = useState(true);
    const [volume, setVolume] = useState(0.1);

    useEffect(() => {
        const backgroundMusic = backgroundMusicRef.current;
        backgroundMusic.loop = true;
        backgroundMusic.volume = volume;
        
        backgroundMusic.play().catch((error) => {
            console.error("Error al reproducir la música de fondo:", error);
        });
    
        return () => {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        };
    });

    const toggleMusic = () => {
        const backgroundMusic = backgroundMusicRef.current;
        if (isMusicPlaying) {
            backgroundMusic.volume = 0;
            setVolume(0);
        } else {
            backgroundMusic.volume = 0.1;
            setVolume(0.1);
        }
        setIsMusicPlaying(!isMusicPlaying);
    };

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        const backgroundMusic = backgroundMusicRef.current;

        if (newVolume > 0) {
            setIsMusicPlaying(true);
            backgroundMusic.volume = newVolume;
            backgroundMusic.play().catch((error) => {
                console.error("Error al reproducir la música de fondo:", error);
            });
        } else {
            setIsMusicPlaying(false);
            backgroundMusic.volume = 0;
        }
    };

    return(
        <div className="music-controls">
            <img
                src={isMusicPlaying ? "/assets/images/image8.png" : "/assets/images/image9.png"}
                alt="Toggle Music"
                className="music-toggle"
                onClick={toggleMusic}
                tabIndex="0"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleMusic();
                    }
                }}
            />
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
                aria-label="Volumen"
            />
        </div>
    );
}

export default MusicControl;