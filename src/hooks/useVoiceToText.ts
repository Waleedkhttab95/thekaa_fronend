import { useState, useRef, useEffect } from "react";

// Main hook for voice recording and conversion
export const useVoiceToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [textMessage, setTextMessage] = useState<string | null>(null);
  const [voiceBlob, setVoiceBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start recording function
  const startRecording = async () => {
    try {
      setError(null);
      audioChunksRef.current = [];
      setRecordingTime(0);

      // Get microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Create media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      // Set up data handler
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // Start the recorder
      mediaRecorder.start();
      setIsRecording(true);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error("Error starting recording:", err);
      setError("Could not access microphone");
    }
  };

  // Stop recording and process the audio
  const stopRecording = async () => {
    if (
      !mediaRecorderRef.current ||
      mediaRecorderRef.current.state === "inactive"
    ) {
      return;
    }

    return new Promise<void>((resolve) => {
      if (mediaRecorderRef.current) {
        // Set up onstop handler to process audio
        mediaRecorderRef.current.onstop = async () => {
          // Clear timer
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }

          // Stop all tracks
          if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
          }

          setIsRecording(false);

          // Create audio blob
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm",
          });

          try {
            setIsProcessing(true);
            setVoiceBlob(audioBlob); // Set the audio blob to state
            // Send to Speech-to-Text API
            // const text = await sendToSpeechToTextAPI(audioBlob);

            // Add the transcribed message to the chat
            setTextMessage("temp voice message"); // Replace with actual text

            setIsProcessing(false);
            resolve();
          } catch (err) {
            console.error("Error processing audio:", err);
            setError("Failed to convert speech to text");
            setIsProcessing(false);
            resolve();
          }
        };

        // Stop recording
        mediaRecorderRef.current.stop();
      }
    });
  };

  // Cancel recording
  const cancelRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();

      // Clear timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }

      // Stop all tracks
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      setIsRecording(false);
      audioChunksRef.current = [];
    }
  };

  // Send audio to Speech-to-Text API
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sendToSpeechToTextAPI = async (audioBlob: Blob): Promise<string> => {
    // Create form data for the API request
    const formData = new FormData();
    formData.append("audio", audioBlob, "recording.webm");

    // Replace with your actual API endpoint
    const response = await fetch(
      "https://your-speech-to-text-api.com/transcribe",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Speech-to-text API error");
    }

    const data = await response.json();
    return data.text; // Adjust based on your API response format
  };

  // Format seconds to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      cancelRecording();
    };
  }, []);

  return {
    isRecording,
    isProcessing,
    recordingTime,
    formattedTime: formatTime(recordingTime),
    error,
    startRecording,
    stopRecording,
    cancelRecording,
    textMessage,
    voiceBlob,
  };
};
