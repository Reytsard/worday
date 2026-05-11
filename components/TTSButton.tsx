'use client'

import { useState, useEffect } from 'react';

interface TTSButtonProps {
  word: string;
  audioUrl?: string | null;
}

export default function TTSButton({ word, audioUrl }: TTSButtonProps) {
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    setSupported(!!audioUrl || 'speechSynthesis' in window);
  }, [audioUrl]);

  function handleSpeak() {
    if (audioUrl) {
      new Audio(audioUrl).play();
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      window.speechSynthesis.speak(utterance);
    }
  }

  return (
    <button
      className="brutal-btn"
      onClick={handleSpeak}
      disabled={!supported}
      type="button"
    >
      ▶ SPEAK
    </button>
  );
}
