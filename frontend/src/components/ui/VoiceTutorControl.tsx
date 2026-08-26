"use client";

import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, VolumeX, Sparkles } from "lucide-react";

interface VoiceTutorControlProps {
  onSpeechInput: (text: string) => void;
  lastAiResponse?: string;
}

export default function VoiceTutorControl({ onSpeechInput, lastAiResponse }: VoiceTutorControlProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      setSpeechSupported(true);
    }
  }, []);

  const toggleListening = () => {
    if (!speechSupported) {
      alert("Voice recognition is not supported in this browser mode. Simulating voice input...");
      onSpeechInput("Can you explain how SystemVerilog interfaces prevent race conditions?");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;

    if (!isListening) {
      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setIsListening(false);
        onSpeechInput(transcript);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      setIsListening(false);
    }
  };

  const speakResponse = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window && lastAiResponse) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(lastAiResponse);
        utterance.onend = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-brand-elevated/80 border border-brand-border px-3 py-1.5 rounded-lg text-xs">
      <button
        onClick={toggleListening}
        className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md font-semibold transition-all ${
          isListening
            ? "bg-rose-500/20 text-rose-400 border border-rose-500/40 animate-pulse"
            : "bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 border border-indigo-500/30"
        }`}
      >
        {isListening ? <MicOff className="h-3.5 w-3.5" /> : <Mic className="h-3.5 w-3.5" />}
        <span>{isListening ? "Listening..." : "Voice Query"}</span>
      </button>

      {lastAiResponse && (
        <button
          onClick={speakResponse}
          className={`p-1.5 rounded-md border transition-all ${
            isSpeaking
              ? "bg-cyan-500/20 text-cyan-300 border-cyan-500/40"
              : "text-brand-textDim hover:text-brand-textMain border-brand-border"
          }`}
          title="Speak Response"
        >
          {isSpeaking ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
        </button>
      )}
    </div>
  );
}
