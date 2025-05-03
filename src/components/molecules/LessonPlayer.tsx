"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import ReactPlayer from "react-player"
import { Slider } from "@/components/atoms/slider"
import { Button } from "@/components/atoms/button"
import { Volume2, VolumeX, Maximize, Pause, Play, ChevronDown, RotateCcw, Loader2, Rewind } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu"
import { cn } from "@/lib/utils"

interface CustomVideoPlayerProps {
  url: string
  poster?: string
  title?: string
}

export default function LessonPlayer({ url, poster, title }: CustomVideoPlayerProps) {
  const t = useTranslations("lessonPage.lessonPlayer")
  const locale = useLocale()
  const isRTL = locale === "ar"

  const playerRef = useRef<ReactPlayer>(null)
  const playerContainerRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8)
  const [muted, setMuted] = useState(false)
  const [played, setPlayed] = useState(0)
  const [loaded, setLoaded] = useState(0)
  const [seeking, setSeeking] = useState(false)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [ended, setEnded] = useState(false)
  const [buffering, setBuffering] = useState(false)
  const [stalled, setStalled] = useState(false)
  const lastPlayedRef = useRef(0)
  const stalledTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [showSkipMessage, setShowSkipMessage] = useState<{ show: boolean; direction: "forward" | "backward" }>({
    show: false,
    direction: "forward",
  })

  // Format time in MM:SS
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`
  }

  // Handle player progress
  const handleProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    if (!seeking) {
      setPlayed(state.played)
      setLoaded(state.loaded)

      // Only show buffering if playback is actually stalled
      if (playing && !seeking) {
        // If played position hasn't changed significantly in the last update
        if (Math.abs(state.played - lastPlayedRef.current) < 0.001) {
          // Start a timeout to detect if we're truly stalled
          if (!stalledTimeoutRef.current) {
            stalledTimeoutRef.current = setTimeout(() => {
              setStalled(true)
            }, 500) // Wait 500ms before showing spinner
          }
        } else {
          // Playback is progressing, clear any stalled state
          if (stalledTimeoutRef.current) {
            clearTimeout(stalledTimeoutRef.current)
            stalledTimeoutRef.current = null
          }
          setStalled(false)
        }
      }

      lastPlayedRef.current = state.played
    }
  }

  // Handle seeking
  const handleSeekChange = (value: number[]) => {
    setPlayed(value[0])
    setSeeking(true)
  }

  const handleSeekMouseUp = (value: number[]) => {
    setSeeking(false)
    playerRef.current?.seekTo(value[0])
  }

  // Handle volume change
  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
    setMuted(value[0] === 0)
  }

  // Toggle mute
  const handleToggleMute = () => {
    setMuted(!muted)
  }

  // Toggle fullscreen
  const handleFullscreen = () => {
    if (playerContainerRef.current) {
      if (document.fullscreenElement) {
        document
          .exitFullscreen()
          .then(() => {
            // Reset screen orientation when exiting fullscreen (if available)
            if (screen.orientation && "unlock" in screen.orientation) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ; (screen.orientation as any).unlock()
            }
          })
          .catch((err) => {
            console.error("Error exiting fullscreen:", err)
          })
      } else {
        playerContainerRef.current
          .requestFullscreen()
          .then(() => {
            // Lock to landscape orientation when entering fullscreen (if available)
            if (screen.orientation && "lock" in screen.orientation) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ; (screen.orientation as any).lock("landscape").catch((err: Error) => {
                // Handle error (some devices or browsers may not support this)
                console.warn("Screen orientation lock not supported:", err)
              })
            }
          })
          .catch((err) => {
            console.error("Error entering fullscreen:", err)
          })
      }
    }
  }

  // Add this useEffect to handle cleanup when component unmounts
  useEffect(() => {
    return () => {
      // Unlock screen orientation when component unmounts (if still locked)
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock()
      }

      if (stalledTimeoutRef.current) {
        clearTimeout(stalledTimeoutRef.current)
      }
    }
  }, [])
  useEffect(() => {
    const handleKeyDown = (event: { key: string; preventDefault: () => void }) => {
      // Check if the player container is in focus or has focus within
      const isPlayerFocused =
        playerContainerRef.current &&
        (document.activeElement === playerContainerRef.current ||
          playerContainerRef.current.contains(document.activeElement))

      // Only handle keyboard events when player is focused or document has focus
      if (isPlayerFocused || document.activeElement === document.body) {
        // Toggle fullscreen with 'f' key
        if (event.key.toLowerCase() === "f") {
          event.preventDefault()
          handleFullscreen()
        }

        // You can add more keyboard shortcuts here
        // Play/Pause with space bar
        if (event.key === " " || event.key === "Spacebar") {
          event.preventDefault()
          setPlaying(!playing)
        }

        // Skip forward with right arrow
        if (event.key === "ArrowRight") {
          event.preventDefault()
          const currentTime = playerRef.current?.getCurrentTime() || 0
          playerRef.current?.seekTo(Math.min(currentTime + 10, duration), "seconds")
          setShowSkipMessage({ show: true, direction: "forward" })
          setTimeout(() => setShowSkipMessage({ show: false, direction: "forward" }), 1000)
        }

        // Skip backward with left arrow
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          const currentTime = playerRef.current?.getCurrentTime() || 0
          playerRef.current?.seekTo(Math.max(currentTime - 10, 0), "seconds")
          setShowSkipMessage({ show: true, direction: "backward" })
          setTimeout(() => setShowSkipMessage({ show: false, direction: "backward" }), 1000)
        }
      }
    }

    // Add event listener
    document.addEventListener("keydown", handleKeyDown)

    // Clean up
    return () => {
      document.removeEventListener("keydown", handleKeyDown)

      // Keep existing cleanup code
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock()
      }

      if (stalledTimeoutRef.current) {
        clearTimeout(stalledTimeoutRef.current)
      }
    }
  }, [playing, duration])

  // Handle video end
  const handleVideoEnded = () => {
    setPlaying(false)
    setEnded(true)
    setShowControls(true)
  }

  // Restart video
  const handleRestart = () => {
    playerRef.current?.seekTo(0)
    setEnded(false)
    setPlaying(true)
  }

  // Skip forward/backward
  const handleSkipForward = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent event bubbling
    const currentTime = playerRef.current?.getCurrentTime() || 0
    playerRef.current?.seekTo(Math.min(currentTime + 10, duration), "seconds")

    // Show skip message
    setShowSkipMessage({ show: true, direction: "forward" })
    setTimeout(() => setShowSkipMessage({ show: false, direction: "forward" }), 1000)

    // If video ended, restart playback
    if (ended) {
      setEnded(false)
    }
  }

  const handleSkipBackward = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent event bubbling
    const currentTime = playerRef.current?.getCurrentTime() || 0
    playerRef.current?.seekTo(Math.max(currentTime - 10, 0), "seconds")

    // Show skip message
    setShowSkipMessage({ show: true, direction: "backward" })
    setTimeout(() => setShowSkipMessage({ show: false, direction: "backward" }), 1000)

    // If video ended, restart playback
    if (ended) {
      setEnded(false)
    }
  }

  // Change playback rate
  const handlePlaybackRateChange = (rate: number) => {
    setPlaybackRate(rate)
  }

  // Toggle play/pause
  const handlePlayPause = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent event bubbling
    if (ended) {
      handleRestart()
    } else {
      setPlaying(!playing)
      // Show controls briefly
      setShowControls(true)
      // Hide controls after 1 second if video is playing
      if (!playing) {
        setTimeout(() => {
          if (playing) setShowControls(false)
        }, 1000)
      }
    }
  }

  // Handle buffering
  const handleBuffer = () => {
    setBuffering(true)
  }

  const handleBufferEnd = () => {
    setBuffering(false)
    setStalled(false)

    // Clear any stalled timeout
    if (stalledTimeoutRef.current) {
      clearTimeout(stalledTimeoutRef.current)
      stalledTimeoutRef.current = null
    }
  }

  // Show/hide controls on hover
  const handleMouseEnter = () => setShowControls(true)
  const handleMouseLeave = () => {
    if (!playing && !ended) {
      setShowControls(true)
    } else {
      setShowControls(false)
    }
  }

  // Clean up timeouts on unmount
  useEffect(() => {
    return () => {
      if (stalledTimeoutRef.current) {
        clearTimeout(stalledTimeoutRef.current)
      }
    }
  }, [])

  // Set direction based on locale
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr"
  }, [isRTL])

  return (
    <div
      ref={playerContainerRef}
      className="relative w-full bg- h-full  bg-[#23F6F0]/60 backdrop-blur-sm rounded-sm md:rounded-[40px] mx-auto  overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Video Player */}
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        volume={volume}
        muted={muted}
        playbackRate={playbackRate}
        onProgress={handleProgress}
        onDuration={setDuration}
        onEnded={handleVideoEnded}
        onBuffer={handleBuffer}
        onBufferEnd={handleBufferEnd}
        light={poster}
        className="absolute top-0 left-0 rounded-[40px]"
        style={{ pointerEvents: "none" }} // Prevent interaction with the player itself
        config={{
          file: {
            attributes: {
              controlsList: "nodownload",
            },
          },
        }}
      />

      {/* Loading Spinner - Only show when actually stalled */}
      {(stalled || (buffering && playing)) && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-black/60 backdrop-blur-sm rounded-full p-4">
            <Loader2 className="h-8 w-8 text-white animate-spin" />
          </div>
        </div>
      )}

      {/* Video Overlay for Play/Pause
      <div
        className="absolute inset-0 z-25"
        
      /> */}

      {/* Large Center Play/Pause Button - Visual Only */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 z-30 pointer-events-none ${showControls || !playing || ended ? "opacity-100" : "opacity-0"
          }`}
      >
        <div className="bg-black/30 backdrop-blur-sm rounded-full p-2 md:p-6 pointer-events-none">
          {ended ? (
            <RotateCcw className="xl:size-12 size-8 text-white" />
          ) : playing ? (
            <Pause className="xl:size-12 size-8 text-white" />
          ) : (
            <Play className="xl:size-12 size-8 text-white" />
          )}
        </div>
      </div>

      {/* Skip Buttons - Positioned with pointer-events-auto */}
      <div
        className={`absolute inset-y-0 ${isRTL ? "right-8" : "left-8"} flex items-center transition-opacity z-50 pointer-events-none 
          ${showControls || !playing || ended ? "opacity-100" : "opacity-0"}`}
      >
        <button
          className="bg-black/30 backdrop-blur-sm rounded-full p-2  md:p-3 cursor-pointer hover:bg-black/40 transition-colors hover:scale-110 active:scale-95 pointer-events-auto"
          onClick={handleSkipBackward}
          aria-label={t("skipBackward")}
        >
          <Rewind className="size-5 md:size-6 text-white rtl:rotate-180" />
        </button>
      </div>

      <div
        className={`absolute inset-y-0 ${isRTL ? "left-8" : "right-8"} flex items-center transition-opacity z-50 pointer-events-none
        ${showControls || !playing || ended ? "opacity-100" : "opacity-0"}`}
      >
        <button
          className="bg-black/30 backdrop-blur-sm rounded-full p-2  md:p-3 cursor-pointer hover:bg-black/40 transition-colors hover:scale-110 active:scale-95 pointer-events-auto"
          onClick={handleSkipForward}
          aria-label={t("skipForward")}
        >
          <Rewind className="size-5 md:size-6 text-white ltr:rotate-180" />
        </button>
      </div>

      {/* Skip Message */}
      {showSkipMessage.show && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 text-white px-4 py-2 rounded-full backdrop-blur-sm z-60">
          {showSkipMessage.direction === "forward" ? "+10 " : "-10 "}
          {t("seconds")}
        </div>
      )}

      {/* Custom Controls Overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300 z-40 ${showControls || !playing || ended ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => {
          if (ended) {
            handleRestart()
          } else {
            setPlaying(!playing)
            // Show controls briefly when clicking to play/pause
            setShowControls(true)
            // Hide controls after 1 second if video is playing
            if (!playing) {
              setTimeout(() => {
                if (playing) setShowControls(false)
              }, 1000)
            }
          }
        }}
      >
        {/* Title */}
        {title && (
          <div className={`absolute top-4 ${isRTL ? "right-4" : "left-4"} text-white font-medium`}>{title}</div>
        )}

        {/* Bottom Controls */}
        <div
          className="absolute bottom-0 left-0 right-0 px-2 py-0 md:py-4 md:px-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Creative Progress Bar */}
          <div className="relative md:mb-4">
            <div className="absolute md:-top-6 left-0 right-0 flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm px-2 md:py-0.5 rounded-full mt-6 !pb-0 pt-1 md:mt-0  text-xs text-white">
                {formatTime(duration * played)} / {formatTime(duration)}
              </div>
            </div>

            {/* Loading Progress */}
            <div className="relative h-3">
              <div className="absolute inset-0 bg-white/20 rounded-full overflow-hidden">
                {/* Loaded Progress */}
                <div
                  className="h-full bg-white/30 rounded-full"
                  style={{
                    width: `${loaded * 100}%`,
                    [isRTL ? "right" : "left"]: 0,
                  }}
                />

                {/* Played Progress */}
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full absolute top-0"
                  style={{
                    width: `${played * 100}%`,
                    [isRTL ? "right" : "left"]: 0,
                  }}
                />
              </div>

              {/* Custom thumb - positioned correctly for RTL/LTR */}
              <div
                className={cn(
                  "absolute top-1/2 w-5 h-5 bg-white rounded-full shadow-lg border-2 border-purple-500 z-10",
                )}
                style={{
                  [isRTL ? "right" : "left"]: `${played * 100}%`,
                  transform: `translateX(${isRTL ? "40%" : "-40%"}) translateY(-50%)`,
                }}
              />
            </div>

            <Slider
              value={[played]}
              min={0}
              max={0.999999}
              step={0.000001}
              onValueChange={handleSeekChange}
              onValueCommit={handleSeekMouseUp}
              className="absolute inset-0 opacity-0 cursor-pointer z-20"
              dir={isRTL ? "rtl" : "ltr"}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 -ms-[10px] md:ms-0">
              {/* Play/Pause Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handlePlayPause}
                className="text-white hover:bg-white/20 rounded-full w-10 h-10 hover:scale-110  active:scale-95 cursor-pointer"
              >
                {ended ? (
                  <RotateCcw className="h-5 w-5" />
                ) : playing ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>

              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleToggleMute}
                  className="text-white hover:bg-white/20 rounded-full w-8 h-8 hover:scale-110 active:scale-95 cursor-pointer"
                >
                  {muted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>

                <div className="w-20 hidden sm:block">
                  <Slider
                    value={[muted ? 0 : volume]}
                    min={0}
                    max={1}
                    step={0.01}
                    onValueChange={handleVolumeChange}
                    className="[&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-white cursor-pointer"
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 -me-[7px] md:me-0">
              {/* Playback Speed */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20 rounded-full h-8 px-2 text-xs font-mono hover:scale-110 active:scale-95 cursor-pointer"
                  >
                    {playbackRate}x
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align={isRTL ? "start" : "end"}>
                  {[0.5, 1, 1.5, 2, 3].map((rate) => (
                    <DropdownMenuItem
                      key={rate}
                      onClick={() => handlePlaybackRateChange(rate)}
                      className={`${playbackRate === rate ? "bg-accent" : ""} cursor-pointer`}
                    >
                      {rate}x
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Fullscreen Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleFullscreen}
                className="text-white hover:bg-white/20 rounded-full w-8 h-8 hover:scale-110 active:scale-95 cursor-pointer"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
