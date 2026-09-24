"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

interface PerformanceVideoPlayerProps {
  className?: string;
  videoSrc?: string;
}

export default function PerformanceVideoPlayer({
  className = "",
}: PerformanceVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeSlide, setActiveSlide] = useState<0 | 1>(0); // 0 = Video, 1 = Product Image
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);


  // Touch Swipe State
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  useEffect(() => {
    if (activeSlide === 0) {
      const video = videoRef.current;
      if (!video) return;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [activeSlide]);

  // When video completes, auto scroll horizontally to Product Image!
  const handleVideoEnded = () => {
    setIsPlaying(false);
    setActiveSlide(1);
  };

  // When on Product Image, automatically return to video after 6 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeSlide === 1) {
      timer = setTimeout(() => {
        setActiveSlide(0);
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }, 6000);
    }
    return () => clearTimeout(timer);
  }, [activeSlide]);

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

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 40) {
      // Swiped Left -> go to Product Image
      setActiveSlide(1);
    } else if (distance < -40) {
      // Swiped Right -> go to Video
      setActiveSlide(0);
    }
  };

  const goToSlide = (slide: 0 | 1) => {
    setActiveSlide(slide);
    if (slide === 0 && videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Glow / Spotlight Background */}
      <div className="relative w-full flex flex-col items-center">
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] bg-white/80 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Outer Card Container */}
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full max-w-[560px] lg:max-w-[580px] flex items-center justify-center transition-all"
        >
          {/* Slide 0: Video Player Card */}
          <div
            className={`w-full aspect-[16/10] sm:aspect-[4/3] bg-black rounded-[20px] sm:rounded-[24px] overflow-hidden border border-white/80 shadow-sm transition-opacity duration-700 ${
              activeSlide === 0
                ? "opacity-100 relative z-10"
                : "opacity-0 pointer-events-none absolute inset-0 invisible -z-10"
            }`}
          >
            <video
              ref={videoRef}
              autoPlay
              muted={isMuted}
              playsInline
              onEnded={handleVideoEnded}
              onClick={togglePlay}
              className="w-full h-full object-cover cursor-pointer block"
            >
              <source src="/aquaforceforautocare/ASMR_PROMEC_LAPTOP_compressed.mp4" type="video/mp4" />
              <source src="/ASMR_PROMEC_LAPTOP_compressed.mp4" type="video/mp4" />
              <source src="/aquaforceforautocare/ASMR%20PROMEC%20LAPTOP.mp4" type="video/mp4" />
              <source src="/ASMR%20PROMEC%20LAPTOP.mp4" type="video/mp4" />
            </video>

            {/* Mute/Unmute Button (Video Slide Only) */}
            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute video" : "Mute video"}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md text-white transition-all transform hover:scale-105 active:scale-95 shadow-md border border-white/10 cursor-pointer"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              )}
            </button>

            {/* Bottom Video Controls Bar (Clean - No Dark Gradient Shade) */}
            <div className="absolute bottom-3 inset-x-3 sm:bottom-4 sm:inset-x-4 z-20 flex items-center justify-between text-white pointer-events-none">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause" : "Play"}
                className="p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-xs transition-colors text-white cursor-pointer shrink-0 pointer-events-auto"
              >
                {isPlaying ? (
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white" />
                ) : (
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-white text-white ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label="Toggle Fullscreen"
                className="p-2 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-xs transition-colors text-white cursor-pointer shrink-0 pointer-events-auto"
              >
                <Maximize className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Slide 1: Product Image (Clean, Transparent Background, Large & Centered - Zero Edge Shadow, Zero Seams) */}
          <div
            onClick={() => goToSlide(0)}
            title="Click to watch video"
            className={`w-full flex items-center justify-center bg-transparent cursor-pointer select-none transition-opacity duration-700 ${
              activeSlide === 1
                ? "opacity-100 relative z-10"
                : "opacity-0 pointer-events-none absolute inset-0 invisible -z-10"
            }`}
          >
            <div className="relative w-full h-[320px] xs:h-[360px] sm:h-[420px] lg:h-[480px] xl:h-[520px] flex items-center justify-center">
              <img
                src="/aquaforceforautocare/images/Remainig%20images/features%20image.webp"
                alt="Aquaforce 1400 PSI TECH portable high pressure washer machine"
                className="w-full h-full max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-[1.02]"
              />
            </div>
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
