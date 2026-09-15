"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

interface PerformanceVideoPlayerProps {
  className?: string;
  videoSrc?: string;
}

export default function PerformanceVideoPlayer({
  className = "",
  videoSrc = "/ASMR_PROMEC_LAPTOP_compressed.mp4",
}: PerformanceVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Autoplay attempt
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay was prevented
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = percentage * duration;

    video.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Glow / Spotlight Background */}
      <div className="relative w-full flex flex-col items-center">
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] bg-white/80 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Video Card Container */}
        <div
          ref={containerRef}
          className="relative w-full max-w-[560px] rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-[0_20px_50px_rgba(15,40,75,0.25)] border border-white/80 bg-black/90 group transition-all"
        >
          {/* Main Video Element */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onClick={togglePlay}
            className="w-full h-auto aspect-[16/10] sm:aspect-[4/3] object-cover cursor-pointer block"
          >
            <source src="/aquaforceforautocare/ASMR_PROMEC_LAPTOP_compressed.mp4" type="video/mp4" />
            <source src="/ASMR_PROMEC_LAPTOP_compressed.mp4" type="video/mp4" />
            <source src="/aquaforceforautocare/ASMR%20PROMEC%20LAPTOP.mp4" type="video/mp4" />
            <source src="/ASMR%20PROMEC%20LAPTOP.mp4" type="video/mp4" />
          </video>

          {/* Top Right Mute / Unmute Button */}
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-white transition-all transform hover:scale-105 active:scale-95 shadow-lg border border-white/10 cursor-pointer"
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            ) : (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            )}
          </button>

          {/* Bottom Control Bar */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent pt-8 pb-3 px-3 sm:pb-4 sm:px-4 z-20 flex items-center gap-2.5 sm:gap-3 text-white">
            {/* Play/Pause Button */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="p-1.5 sm:p-2 rounded-lg hover:bg-white/20 transition-colors text-white cursor-pointer shrink-0"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />
              ) : (
                <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white ml-0.5" />
              )}
            </button>

            {/* Time Indicator */}
            <div className="text-[11px] sm:text-xs font-mono font-medium tracking-wider text-white/90 shrink-0 select-none">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>

            {/* Progress / Scrub Bar */}
            <div
              onClick={handleSeek}
              className="flex-1 relative flex items-center cursor-pointer group/bar py-2"
            >
              <div className="w-full h-1 sm:h-1.5 bg-white/30 rounded-full overflow-hidden relative transition-all group-hover/bar:h-2">
                <div
                  className="h-full bg-white rounded-full transition-all duration-75"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Fullscreen Button */}
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label="Toggle Fullscreen"
              className="p-1.5 sm:p-2 rounded-lg hover:bg-white/20 transition-colors text-white cursor-pointer shrink-0"
            >
              <Maximize className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </button>
          </div>
        </div>

        {/* WATCH THE CLEANING IN ACTION Divider */}
        <div className="flex items-center justify-center gap-3 mt-4 sm:mt-5 w-full max-w-[420px] px-4">
          <div className="h-[1px] bg-slate-400/60 flex-1" />
          <span className="text-[10px] sm:text-[11px] font-bold font-montserrat tracking-[0.18em] text-slate-700 uppercase whitespace-nowrap">
            WATCH THE CLEANING IN ACTION
          </span>
          <div className="h-[1px] bg-slate-400/60 flex-1" />
        </div>
      </div>
    </div>
  );
}
