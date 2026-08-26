import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function useSpeech() {
  const { lang } = useLanguage();
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const recRef = useRef(null);

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (recRef.current) {
        try { recRef.current.abort(); } catch (e) {}
      }
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const startListening = (onResultCallback) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      alert("Voice speech recognition is not supported in this browser. Please use Google Chrome or Edge.");
      return;
    }

    try {
      if (recRef.current) {
        recRef.current.abort();
      }

      const rec = new SR();
      rec.lang = lang.code; // e.g. hi-IN, te-IN, or-IN, en-IN
      rec.continuous = false;
      rec.interimResults = false;

      rec.onstart = () => {
        setListening(true);
      };

      rec.onresult = (e) => {
        const text = e.results[0][0].transcript;
        setTranscript(text);
        if (onResultCallback) onResultCallback(text);
      };

      rec.onend = () => {
        setListening(false);
      };

      rec.onerror = (err) => {
        console.warn("Speech recognition error:", err);
        setListening(false);
      };

      recRef.current = rec;
      rec.start();
    } catch (e) {
      console.error("Failed to start speech recognition:", e);
      setListening(false);
    }
  };

  const stopListening = () => {
    if (recRef.current) {
      try { recRef.current.stop(); } catch (e) {}
    }
    setListening(false);
  };

  const speak = (text) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    window.speechSynthesis.cancel();

    // Remove markdown asterisks or special symbols before speaking
    const cleanText = text.replace(/[*_#~[\]]/g, '').trim();
    if (!cleanText) return;

    const utter = new SpeechSynthesisUtterance(cleanText);
    utter.lang = lang.code;
    utter.rate = 0.95; // Slightly slower for clarity
    utter.pitch = 1.0;

    // Pick matching voice if available
    const voices = window.speechSynthesis.getVoices();
    const matchedVoice = voices.find(v => v.lang.startsWith(lang.code.split('-')[0]));
    if (matchedVoice) {
      utter.voice = matchedVoice;
    }

    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);

    window.speechSynthesis.speak(utter);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  return {
    listening,
    speaking,
    transcript,
    setTranscript,
    startListening,
    stopListening,
    speak,
    stopSpeaking
  };
}
