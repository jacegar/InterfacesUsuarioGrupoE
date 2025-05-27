import "../styles/game/MusicControl.css";
import { useState, useRef, useEffect } from "react";

function MusicControl() {
    const backgroundMusicRef = useRef(new Audio("/assets/sounds/background.mp3"));

    const [isMusicPlaying, setIsMusicPlaying] = useState(true);
    const [volume, setVolume] = useState(0.1);
    const sliderRef = useRef(null);

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
    }, []);

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

        if (sliderRef.current) {
            sliderRef.current.style.display = 'block';
            setTimeout(() => sliderRef.current.focus(), 10);
        }
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

    return (
        <div 
            className="music-controls"
            role="group" 
            aria-label="Controles de música"
        >
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
                ref={sliderRef}
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="volume-slider"
                aria-label="Volumen"
                tabIndex="0"
                onKeyDown={(e) => {
                    const step = 0.05;
                    let newVolume = volume;
                    
                    switch(e.key) {
                        case 'ArrowRight':
                        case 'ArrowUp':
                            newVolume = Math.min(1, volume + step);
                            e.preventDefault();
                            break;
                        case 'ArrowLeft':
                        case 'ArrowDown':
                            newVolume = Math.max(0, volume - step);
                            e.preventDefault();
                            break;
                        default:
                            return;
                    }
                    
                    if (newVolume !== volume) {
                        setVolume(newVolume);
                        const backgroundMusic = backgroundMusicRef.current;
                        
                        if (newVolume > 0) {
                            setIsMusicPlaying(true);
                            backgroundMusic.volume = newVolume;
                            backgroundMusic.play().catch(error => {
                                console.error("Error al reproducir la música de fondo:", error);
                            });
                        } else {
                            setIsMusicPlaying(false);
                            backgroundMusic.volume = 0;
                        }
                    }
                }}
                onFocus={() => {
                    if (sliderRef.current) {
                        sliderRef.current.style.display = 'block';
                    }
                }}
                onBlur={(e) => {
                    if (!e.currentTarget.parentElement.matches(':hover')) {
                        setTimeout(() => {
                            if (sliderRef.current) {
                                sliderRef.current.style.display = '';
                            }
                        }, 100);
                    }
                }}
            />
        </div>
    );
}

export default MusicControl;