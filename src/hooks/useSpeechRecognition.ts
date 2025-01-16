"use client";

import { useState, useCallback, useEffect } from "react";

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      // ブラウザのSpeechRecognitionを取得
      const SpeechRecognition: new () => SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.lang = "ja-JP";
        recognition.continuous = false;
        recognition.interimResults = false;
        setRecognition(recognition);
      }
    }
  }, []);

  const startListening = useCallback(
    (onResult: (text: string) => void) => {
      if (!recognition) return;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const text = event.results[0][0].transcript;
        onResult(text);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.onerror = (event: SpeechRecognitionEvent) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      try {
        recognition.start();
        setIsListening(true);
      } catch (error) {
        console.error("Failed to start speech recognition:", error);
      }
    },
    [recognition]
  );

  const stopListening = useCallback(() => {
    if (!recognition) return;

    try {
      recognition.stop();
      setIsListening(false);
    } catch (error) {
      console.error("Failed to stop speech recognition:", error);
    }
  }, [recognition]);

  return {
    isListening,
    startListening,
    stopListening,
    isSupported: !!recognition,
  };
}
