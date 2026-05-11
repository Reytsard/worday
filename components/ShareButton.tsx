'use client'

import { useState, useEffect } from 'react';
import { WordEntry } from '@/lib/wordOfDay';

interface ShareButtonProps {
  entry: WordEntry;
}

export default function ShareButton({ entry }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare('share' in navigator);
  }, []);

  const shareText = `${entry.word.toUpperCase()}: ${entry.meanings[0]?.definitions[0]?.definition ?? ''}`;

  async function handleClick() {
    if (canShare) {
      try {
        await navigator.share({ text: shareText, title: 'Word of the Day' });
      } catch {
        // User cancelled or share failed — do nothing
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Clipboard write failed — do nothing
      }
    }
  }

  return (
    <button className="brutal-btn" onClick={handleClick} type="button">
      {canShare ? '↗ SHARE' : copied ? '✓ COPIED' : '⧉ COPY'}
    </button>
  );
}
