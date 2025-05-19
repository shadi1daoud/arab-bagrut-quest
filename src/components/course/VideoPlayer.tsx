
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface VideoChapter {
  time: number; // in seconds
  title: string;
}

interface VideoPlayerProps {
  videoSrc: string;
  chapters?: VideoChapter[];
  poster?: string;
  onVideoEnd?: () => void;
}

const VideoPlayer = ({ videoSrc, chapters = [], poster, onVideoEnd }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const controlsTimeout = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (onVideoEnd) onVideoEnd();
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
    };
  }, [onVideoEnd]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (values: number[]) => {
    const newTime = values[0];
    setCurrentTime(newTime);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (values: number[]) => {
    const newVolume = values[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleFullScreen = () => {
    const videoContainer = document.querySelector('.video-container');
    if (!videoContainer) return;

    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const skipTo = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) {
      window.clearTimeout(controlsTimeout.current);
    }
    controlsTimeout.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  return (
    <div 
      className="video-container relative rounded-xl overflow-hidden bg-black aspect-video"
      onMouseMove={handleMouseMove}
    >
      <video 
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        className="w-full h-full object-contain"
        onClick={handlePlayPause}
      />
      
      {/* Video controls */}
      <div 
        className={cn(
          "absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 to-transparent transition-opacity duration-300",
          showControls ? "opacity-100" : "opacity-0"
        )}
      >
        <div></div>
        
        <div className="space-y-2">
          {/* Chapter markers */}
          <div className="relative h-1 bg-gray-700/50 rounded-full" ref={progressBarRef}>
            {chapters.map((chapter, idx) => (
              <div 
                key={idx}
                className="absolute top-0 bottom-0 w-0.5 bg-white/50 transform -translate-x-1/2 cursor-pointer hover:bg-white transition-colors"
                style={{ left: `${(chapter.time / duration) * 100}%` }}
                onClick={() => skipTo(chapter.time)}
                title={chapter.title}
              />
            ))}
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={0.1}
              onValueChange={handleProgressChange}
              className="absolute inset-0 flex cursor-pointer"
              // Fixed: Using inline style instead of trackClassName
              style={{
                "--slider-track-color": "linear-gradient(to right, #FF4B1A, #FF794B)"
              } as React.CSSProperties}
            />
          </div>
          
          {/* Controls bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={handlePlayPause}
                className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                {isPlaying ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white" />}
              </button>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => skipTo(Math.max(0, currentTime - 10))}
                  className="text-white hover:text-[#FF4B1A] transition-colors"
                >
                  <SkipBack className="h-4 w-4" />
                </button>
                <button
                  onClick={() => skipTo(Math.min(duration, currentTime + 10))}
                  className="text-white hover:text-[#FF4B1A] transition-colors"
                >
                  <SkipForward className="h-4 w-4" />
                </button>
              </div>
              
              <div className="text-xs text-white font-mono">
                <span>{formatTime(currentTime)}</span>
                <span className="mx-1">/</span>
                <span>{formatTime(duration || 0)}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 group">
                <button onClick={toggleMute}>
                  {isMuted ? 
                    <VolumeX className="h-4 w-4 text-white" /> : 
                    <Volume2 className="h-4 w-4 text-white" />
                  }
                </button>
                <div className="w-16 hidden group-hover:block">
                  <Slider
                    value={[isMuted ? 0 : volume]}
                    min={0}
                    max={1}
                    step={0.01}
                    onValueChange={handleVolumeChange}
                    className="cursor-pointer"
                    // Fixed: Using inline style instead of trackClassName
                    style={{
                      "--slider-track-color": "white"
                    } as React.CSSProperties}
                  />
                </div>
              </div>
              
              <button 
                onClick={handleFullScreen}
                className="text-white hover:text-[#FF4B1A] transition-colors"
              >
                <Maximize className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
