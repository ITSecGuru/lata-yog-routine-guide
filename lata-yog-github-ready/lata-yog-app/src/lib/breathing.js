export const getBreathInstruction = (breathing, t) => {
  if (!breathing) return null;
  if (breathing.pattern === 'kapalbhati') {
    return `${t.activeExhale} • ${t.passiveInhale}`;
  }
  return `Inhale ${breathing.inhale ?? 4}s • Exhale ${breathing.exhale ?? 4}s`;
};
