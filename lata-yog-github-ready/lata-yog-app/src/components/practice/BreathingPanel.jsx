import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { getBreathInstruction } from '@/lib/breathing';

export function BreathingPanel({ t, breathing, strokeCount, kapalBhatiSafety }) {
  if (!breathing) return null;
  const instruction = getBreathInstruction(breathing, t);
  return (
    <Card className="card-grid">
      <div className="text-sm font-semibold text-slate-700">{t.breathingGuide}</div>
      <div className="flex items-center gap-5">
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: breathing.pattern === 'kapalbhati' ? 1 : 4, repeat: Infinity, ease: 'easeInOut' }}
          className="h-20 w-20 rounded-full bg-slate-900/90"
        />
        <div>
          <div className="text-lg font-semibold text-slate-900">{breathing.label}</div>
          <div className="text-sm text-slate-600">{instruction}</div>
          {breathing.activeStrokeCounter && <div className="mt-2 text-sm font-medium text-slate-800">Strokes: {strokeCount}</div>}
        </div>
      </div>
      {breathing.pattern === 'kapalbhati' && (
        <div className="rounded-2xl bg-amber-50 p-3 text-sm text-amber-900">{kapalBhatiSafety}</div>
      )}
    </Card>
  );
}
