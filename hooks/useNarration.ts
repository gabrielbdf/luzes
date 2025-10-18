import { useCallback, useRef, useEffect } from 'react';
import { audioAssets } from '../audioAssets';
import { AudioKey } from '../types';

// Helper to load and decode audio file
async function loadAudioFile(url: string, ctx: AudioContext): Promise<AudioBuffer> {
  console.log('Loading audio from:', url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch audio: ${response.status} ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  console.log('Fetched arrayBuffer size:', arrayBuffer.byteLength);
  return await ctx.decodeAudioData(arrayBuffer);
}

export const useNarration = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const currentSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const audioBufferCacheRef = useRef<Map<AudioKey, AudioBuffer>>(new Map());

  useEffect(() => {
    // Using 'any' for webkitAudioContext to support older Safari versions
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const resumeOnInteraction = async () => {
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        try {
          await audioContextRef.current.resume();
          console.log('Audio context resumed on user interaction');
        } catch (error) {
          console.error('Failed to resume on interaction:', error);
        }
      }
    };

    // Resume on first user interaction
    const handleInteraction = () => {
      resumeOnInteraction();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      cancel();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAudioBuffer = useCallback(async (key: AudioKey): Promise<AudioBuffer | null> => {
    console.log('Getting audio buffer for key:', key);
    if (audioBufferCacheRef.current.has(key)) {
        console.log('Audio buffer cached for', key);
        return audioBufferCacheRef.current.get(key)!;
    }

    if (!audioContextRef.current) {
      console.error('No audio context');
      return null;
    }

    const audioUrl = audioAssets[key];
    console.log('Audio URL:', audioUrl);
    if (!audioUrl || audioUrl.startsWith('// PLACEHOLDER')) {
        console.error(`Audio asset for key "${key}" not found or is a placeholder.`);
        return null;
    }

    try {
        const audioBuffer = await loadAudioFile(audioUrl, audioContextRef.current);
        audioBufferCacheRef.current.set(key, audioBuffer);
        console.log('Audio buffer loaded and cached for', key);
        return audioBuffer;
    } catch (error) {
        console.error(`Error loading audio for key "${key}":`, error);
        return null;
    }
  }, []);

  const cancel = useCallback(() => {
    if (currentSourceRef.current) {
      try {
        currentSourceRef.current.stop();
        currentSourceRef.current.disconnect();
      } catch (error) {
        console.warn("Audio source could not be stopped:", error);
      }
      currentSourceRef.current = null;
    }
  }, []);

  const playAudioBuffer = useCallback((buffer: AudioBuffer) => {
    if (!audioContextRef.current) return;
    
    cancel();
    
    if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
    }
    
    const source = audioContextRef.current.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContextRef.current.destination);
    source.start();
    
    currentSourceRef.current = source;
    source.onended = () => {
        if (currentSourceRef.current === source) {
            currentSourceRef.current = null;
        }
    };
  }, [cancel]);

  const speak = useCallback(async (key: AudioKey) => {
    console.log('Speaking key:', key);
    if (!key) return;
    
    const buffer = await getAudioBuffer(key);
    if (buffer) {
        console.log('Playing audio buffer');
        playAudioBuffer(buffer);
    } else {
        console.error("Failed to get audio buffer for playback.");
    }

  }, [getAudioBuffer, playAudioBuffer]);


  return { speak, cancel };
};