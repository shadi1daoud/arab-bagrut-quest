
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward, SkipBack } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from 'framer-motion';

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
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showChapterTooltip, setShowChapterTooltip] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
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
      video.play().catch(error => {
        console.error("Video play error:", error);
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

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
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
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
      ref={containerRef}
      className="video-container relative rounded-xl overflow-hidden bg-black aspect-video shadow-[0_0_20px_rgba(0,0,0,0.3)] border border-white/5"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      onMouseEnter={() => setShowControls(true)}
    >
      <video 
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        className="w-full h-full object-contain"
        onClick={handlePlayPause}
        playsInline
      />
      
      {/* Video controls */}
      <AnimatePresence>
        {showControls && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex flex-col justify-between p-4 bg-gradient-to-t from-black/80 to-transparent"
          >
            <div className="flex justify-end">
              {chapters.length > 0 && (
                <div className="bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center text-xs text-white">
                  <span className="font-['Noto_Sans_Arabic']">الفصل الحالي:</span>
                  <span className="mx-1">|</span>
                  {getCurrentChapter()}
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              {/* Chapter markers */}
              <div className="relative h-1.5 bg-gray-700/50 rounded-full" ref={progressBarRef}>
                {chapters.map((chapter, idx) => (
                  <div 
                    key={idx}
                    className="absolute top-0 bottom-0 w-1 bg-white/70 transform -translate-x-1/2 cursor-pointer hover:bg-white transition-colors"
                    style={{ left: `${(chapter.time / duration) * 100}%` }}
                    onClick={() => skipTo(chapter.time)}
                    onMouseEnter={() => setShowChapterTooltip(idx)}
                    onMouseLeave={() => setShowChapterTooltip(null)}
                  >
                    {showChapterTooltip === idx && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                        {chapter.title} ({formatTime(chapter.time)})
                      </div>
                    )}
                  </div>
                ))}
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={0.1}
                  onValueChange={handleProgressChange}
                  className="absolute inset-0 flex cursor-pointer"
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
                    className="h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    {isPlaying ? <Pause className="h-5 w-5 text-white" /> : <Play className="h-5 w-5 text-white" />}
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
                    <div className="w-16 hidden md:block group-hover:block">
                      <Slider
                        value={[isMuted ? 0 : volume]}
                        min={0}
                        max={1}
                        step={0.01}
                        onValueChange={handleVolumeChange}
                        className="cursor-pointer"
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
                    <Maximize className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Play/Pause overlay */}
      <AnimatePresence>
        {!isPlaying && !showControls && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <button
              onClick={handlePlayPause}
              className="h-16 w-16 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-[#FF4B1A]/80 transition-all duration-300 text-white border border-white/20"
            >
              <Play className="h-6 w-6 ml-1" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
  
  // Helper function to determine current chapter
  function getCurrentChapter() {
    if (!chapters.length) return null;
    
    // Find the last chapter that starts before the current time
    let currentChapter = chapters[0].title;
    for (let i = 0; i < chapters.length; i++) {
      if (chapters[i].time <= currentTime) {
        currentChapter = chapters[i].title;
      } else {
        break;
      }
    }
    
    return currentChapter;
  }
};

export default VideoPlayer;
