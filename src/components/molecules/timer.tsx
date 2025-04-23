"use client";
import { useEffect, useState } from "react";

type TimerProps = {
  minutes: number;
  onComplete?: (timeTaken: number) => void;
};

export default function Timer({ minutes, onComplete }: TimerProps) {
  const duration = minutes * 60;
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete?.(duration);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, duration, onComplete]);

  const radius = 45;
  const stroke = 12;
  const baseStroke = 7;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const progress = (timeLeft / duration) * circumference;

  const displayMinutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const displaySeconds = (timeLeft % 60).toString().padStart(2, "0");

  return (
    <div className="flex items-center justify-center h-25 w-28 relative">
      <svg height={radius * 2} width={radius * 2}>
        <defs>
          <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="5%" stopColor="#00f0ff" />
            <stop offset="70%" stopColor="#ff9fff" />
          </linearGradient>
        </defs>
        <circle
          stroke="#ffffff"
          fill="transparent"
          strokeWidth={baseStroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="url(#gradient)"
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className="transition-all duration-1000 ease-linear"
        />
      </svg>
      <div className="absolute text-xl font-semibold text-gray-900">
        {displayMinutes}:{displaySeconds}
      </div>
    </div>
  );
}
