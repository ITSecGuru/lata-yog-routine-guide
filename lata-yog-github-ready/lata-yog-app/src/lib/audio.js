import { audioPrompts } from '@/data/audioPrompts';

const languageMap = { en: 'en-US', hi: 'hi-IN', sa: 'hi-IN' };

export const speakStep = ({ step, audioLanguage = 'en', mode = 'default', muted = false }) => {
  if (muted || typeof window === 'undefined' || !window.speechSynthesis || !step) return false;

  const builder = audioPrompts[audioLanguage]?.[mode] || audioPrompts[audioLanguage]?.default || audioPrompts.en.default;
  const utterance = new SpeechSynthesisUtterance(builder(step));
  utterance.lang = languageMap[audioLanguage] || 'en-US';

  const voices = window.speechSynthesis.getVoices?.() || [];
  const match = voices.find((voice) => voice.lang?.toLowerCase().startsWith(utterance.lang.slice(0,2).toLowerCase()));
  if (match) utterance.voice = match;

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
  return true;
};
