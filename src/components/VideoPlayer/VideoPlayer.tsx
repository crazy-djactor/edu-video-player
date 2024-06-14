import React, {useRef, useState} from 'react';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull'
import './VideoPlayer.css';




const VideoPlayer: React.FC<{videoUrl: string}> = ({ videoUrl }) => {
    const playerRef = useRef<ReactPlayer>(null);
    const [playing, setPlaying] = useState(true);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [volume, setVolume] = useState(1);

    const handleFullScreen = () => {
        // @ts-ignore
        screenfull.request(document.querySelector('.react-player'))
        // if (playerRef.current) {
        //     const player = playerRef.current.getInternalPlayer();
        //     if (player.requestFullscreen) {
        //         player.requestFullscreen();
        //     } else if (player.webkitRequestFullscreen) {
        //         player.webkitRequestFullscreen();
        //     } else if (player.mozRequestFullScreen) {
        //         player.mozRequestFullScreen();
        //     } else if (player.msRequestFullscreen) {
        //         player.msRequestFullscreen();
        //     }
        // }
    };

    const handleSpeedChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSpeed = parseFloat(event.target.value);
        setPlaybackSpeed(newSpeed);
    };

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(event.target.value);
        setVolume(newVolume);
    };

    return (
        <div className="video-player-wrapper">
            <ReactPlayer
                ref={playerRef}
                url={videoUrl}
                playing={playing}
                playbackRate={playbackSpeed}
                volume={volume}
                controls={true}
                className="react-player"
            />
            <div className="controls">
                <label>
                    Speed:
                    <select value={playbackSpeed} onChange={handleSpeedChange}>
                        <option value="0.5">0.5x</option>
                        <option value="1">1x</option>
                        <option value="1.5">1.5x</option>
                        <option value="2">2x</option>
                    </select>
                </label>
                <label>
                    Volume:
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                    />
                </label>
                <button className="fullscreen-button" onClick={handleFullScreen}>
                    Full Screen
                </button>
            </div>
        </div>
    );
};

export default VideoPlayer;
