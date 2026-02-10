import React, { useRef, useState } from 'react';
import { Play, Volume2, Maximize2, Settings } from 'lucide-react';
import { Button } from 'react-bootstrap';

interface VideoPlayerProps {
  thumbnail?: string;
  title: string;
  videoUrl?: string;
}

export function VideoPlayer({ thumbnail, title, videoUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showControls, setShowControls] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      setVolume(vol);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      className="position-relative bg-dark rounded overflow-hidden shadow-lg"
      style={{ aspectRatio: '16/9' }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element */}
      {videoUrl ? (
        <video
          ref={videoRef}
          src={videoUrl}
          className="w-100 h-100"
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
      ) : (
        <div className="w-100 h-100 d-flex align-items-center justify-content-center bg-gradient-to-br from-gray-800 to-gray-900">
          {thumbnail ? (
            <img
              src={thumbnail}
              alt={title}
              className="w-100 h-100 object-fit-cover opacity-60"
            />
          ) : (
            <Play className="w-16 h-16 text-secondary opacity-20" />
          )}
        </div>
      )}

      {/* Play Button Overlay */}
      {!isPlaying && (
        <button
          className="position-absolute top-50 start-50 translate-middle border-0 bg-transparent"
          onClick={togglePlay}
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <div className="w-16 h-16 rounded-circle bg-success bg-opacity-90 d-flex align-items-center justify-content-center shadow-lg">
            <Play className="w-8 h-8 text-white fill-current" style={{ marginLeft: '4px' }} />
          </div>
        </button>
      )}

      {/* Controls Bar */}
      <div 
        className={`position-absolute bottom-0 start-0 end-0 p-3 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-200 ${showControls || isPlaying ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Progress Bar */}
        <div className="w-100 mb-3">
          <input
            type="range"
            className="form-range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            style={{ height: '4px' }}
          />
        </div>

        <div className="d-flex align-items-center justify-content-between text-white">
          <div className="d-flex align-items-center gap-3">
            <Button variant="link" className="text-white p-0" onClick={togglePlay}>
              {isPlaying ? (
                <div className="w-5 h-5 d-flex align-items-center justify-content-center">
                  <div className="w-3 h-3 bg-white rounded me-1"></div>
                  <div className="w-3 h-3 bg-white rounded"></div>
                </div>
              ) : (
                <Play className="w-5 h-5 fill-current" />
              )}
            </Button>
            <div className="d-flex align-items-center gap-2">
              <Button variant="link" className="text-white p-0">
                <Volume2 className="w-5 h-5" />
              </Button>
              <input
                type="range"
                className="form-range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                style={{ width: '60px', height: '4px' }}
              />
            </div>
            <span className="small fw-medium">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="d-flex align-items-center gap-3">
            <Button variant="link" className="text-white p-0">
              <Settings className="w-5 h-5" />
            </Button>
            <Button variant="link" className="text-white p-0">
              <Maximize2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
