import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Volume2, Maximize2, Settings } from 'lucide-react';
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
  const [showControls, setShowControls] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Auto-hide controls when playing, show when paused
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isPlaying && !isDragging) {
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    } else {
      setShowControls(true);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying, isDragging]);

  // Show controls on mouse movement
  const handleMouseMove = () => {
    setShowControls(true);
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(error => {
          console.error('Video play error:', error);
          setVideoError(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setCurrentTime(current);
      if (total && !isNaN(total)) {
        setDuration(total);
      }
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      const total = videoRef.current.duration;
      if (total && !isNaN(total)) {
        setDuration(total);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current && !isNaN(time)) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleSeekStart = () => {
    setIsDragging(true);
  };

  const handleSeekEnd = (e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const time = parseFloat(target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
    setIsDragging(false);
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
      onMouseMove={handleMouseMove}
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
          onLoadedMetadata={handleLoadedMetadata}
          onError={(e) => {
            console.error('Video element error occurred:', e);
            console.error('Video error details:', {
              error: e,
              videoUrl: videoUrl,
              videoElement: videoRef.current
            });
            setVideoError(true);
          }}
          onLoadStart={() => console.log('Video loading started...')}
          onCanPlay={() => console.log('Video can play')}
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

      {/* Error State */}
      {videoError && (
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-90">
          <div className="text-center text-white p-4">
            <h5 className="mb-3">Video Error</h5>
            <p className="mb-3">Unable to load video. Check console for details.</p>
            <small className="text-muted">URL: {videoUrl}</small>
          </div>
        </div>
      )}

      {/* Play/Pause Button Overlay - Only when paused */}
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
        className={`position-absolute bottom-0 start-0 end-0 p-3 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-200 ${showControls ? 'opacity-100' : 'opacity-0'}`}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        {/* Progress Bar */}
        <div className="w-100 mb-3">
          <input
            type="range"
            className="form-range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            onMouseDown={handleSeekStart}
            onMouseUp={handleSeekEnd}
            onTouchStart={handleSeekStart}
            onTouchEnd={handleSeekEnd}
            style={{ height: '6px', cursor: 'pointer' }}
          />
        </div>

        <div className="d-flex align-items-center justify-content-between text-white">
          <div className="d-flex align-items-center gap-3">
            <Button variant="link" className="text-white p-0" onClick={togglePlay}>
              {isPlaying ? (
                <Pause className="w-5 h-5" />
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
