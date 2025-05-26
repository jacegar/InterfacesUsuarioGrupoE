import "../styles/game/MusicControl.css";
import { useState, useRef, useEffect } from "react";

function MusicControl(){
    // Referencia para la música de fondo
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
    
        // Detén la música cuando el componente se desmonte
        return () => {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0; // Reinicia la música
        };
    }, []); // Solo se ejecuta una vez al montar el componente

    const toggleMusic = () => {
        const backgroundMusic = backgroundMusicRef.current;
        if (isMusicPlaying) {
            backgroundMusic.volume = 0; // Mute the music
            setVolume(0); // Set the slider to 0
        } else {
            backgroundMusic.volume = 0.1; // Restore default volume
            setVolume(0.1); // Update the slider to match the volume
        }
        setIsMusicPlaying(!isMusicPlaying);
    };

    const handleVolumeChange = (event) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
        const backgroundMusic = backgroundMusicRef.current;

        if (newVolume > 0) {
            setIsMusicPlaying(true); // Unmute if volume is increased
            backgroundMusic.volume = newVolume;
            backgroundMusic.play().catch((error) => {
                console.error("Error al reproducir la música de fondo:", error);
            });
        } else {
            setIsMusicPlaying(false); // Mute if volume is set to 0
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