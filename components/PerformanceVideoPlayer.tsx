"use client";

import { useState, useRef, useEffect, useCallback } from "react";
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
  const [isSliding, setIsSliding] = useState(false);
  const [outgoingSlide, setOutgoingSlide] = useState<0 | 1 | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);
  const autoReturnTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Touch Swipe State
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Autoplay video on initial mount if on video slide
  useEffect(() => {
    if (activeSlide === 0 && !isSliding) {
      const video = videoRef.current;
      if (!video) return;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => setIsPlaying(false));
      }
    }
  }, [activeSlide, isSliding]);

  // Unified transition: ALWAYS slides from right to left in both directions
  const triggerNextSlide = useCallback(() => {
    if (isSliding) return;

    if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
    if (autoReturnTimerRef.current) clearTimeout(autoReturnTimerRef.current);

    const fromSlide = activeSlide;
    const toSlide: 0 | 1 = fromSlide === 0 ? 1 : 0;

    setOutgoingSlide(fromSlide);
    setIsSliding(true);

    // If entering video slide (0), prepare & start playback immediately
    if (toSlide === 0 && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }

    // Complete slide transition after 700ms
    slideTimerRef.current = setTimeout(() => {
      setActiveSlide(toSlide);
      setIsSliding(false);
      setOutgoingSlide(null);

      // If settled on product image (1), pause video to free up CPU/GPU
      if (toSlide === 1 && videoRef.current) {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }, 700);
  }, [activeSlide, isSliding]);

  // When video completes, auto-slide to Product Image (right-to-left)
  const handleVideoEnded = () => {
    triggerNextSlide();
  };

  // When on Product Image, automatically return to video after 6 seconds
  useEffect(() => {
    if (activeSlide === 1 && !isSliding) {
      autoReturnTimerRef.current = setTimeout(() => {
        triggerNextSlide();
      }, 6000);
    }
    return () => {
      if (autoReturnTimerRef.current) clearTimeout(autoReturnTimerRef.current);
    };
  }, [activeSlide, isSliding, triggerNextSlide]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (slideTimerRef.current) clearTimeout(slideTimerRef.current);
      if (autoReturnTimerRef.current) clearTimeout(autoReturnTimerRef.current);
    };
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

  // Touch Swipe Handlers (Any swipe triggers right-to-left slide transition)
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
    if (Math.abs(distance) > 40) {
      triggerNextSlide();
    }
  };

  // Style calculator for strictly right-to-left slide transitions
  const getSlideStyle = (slideIndex: 0 | 1): React.CSSProperties => {
    const base: React.CSSProperties = {
      willChange: "transform",
    };

    if (!isSliding) {
      if (slideIndex === activeSlide) {
        return {
          ...base,
          transform: "translate3d(0, 0, 0)",
          transition: "none",
          zIndex: 10,
          opacity: 1,
          pointerEvents: "auto",
        };
      } else {
        return {
          ...base,
          transform: "translate3d(100%, 0, 0)",
          transition: "none",
          zIndex: 0,
          opacity: 0,
          pointerEvents: "none",
        };
      }
    }

    // During sliding transition (always right to left):
    if (slideIndex === outgoingSlide) {
      // Exiting slide: moves from 0 to -100% (to the left)
      return {
        ...base,
        transform: "translate3d(-100%, 0, 0)",
        transition: "transform 700ms cubic-bezier(0.25, 1, 0.5, 1)",
        zIndex: 10,
        opacity: 1,
        pointerEvents: "none",
      };
    } else {
      // Incoming slide: moves from +100% to 0 (from the right to center)
      return {
        ...base,
        transform: "translate3d(0, 0, 0)",
        transition: "transform 700ms cubic-bezier(0.25, 1, 0.5, 1)",
        zIndex: 20,
        opacity: 1,
        pointerEvents: "auto",
      };
    }
  };

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Glow / Spotlight Background */}
      <div className="relative w-full flex flex-col items-center">
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 lg:w-[480px] lg:h-[480px] bg-white/80 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Outer Card Container / Slider Track Viewport */}
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative w-full max-w-[560px] lg:max-w-[580px] aspect-[16/10] sm:aspect-[4/3] overflow-hidden rounded-[20px] sm:rounded-[24px]"
        >
          {/* Slide 0: Video Player Card */}
          <div
            style={getSlideStyle(0)}
            className="absolute inset-0 w-full h-full bg-black rounded-[20px] sm:rounded-[24px] overflow-hidden border border-white/80 shadow-sm"
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

            {/* Bottom Video Controls Bar */}
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

          {/* Slide 1: Product Image (Clean Transparent Background, Centered) */}
          <div
            style={getSlideStyle(1)}
            onClick={triggerNextSlide}
            title="Click to watch video"
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-transparent cursor-pointer select-none group"
          >
            <div className="relative w-full h-full flex items-center justify-center p-3 sm:p-6">
              <img
                src="/aquaforceforautocare/images/Remainig%20images/features%20image.webp"
                alt="Aquaforce 1400 PSI TECH portable high pressure washer machine"
                className="w-full h-full max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-[1.03] drop-shadow-[0_15px_30px_rgba(15,40,75,0.12)]"
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
