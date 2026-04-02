import { Card } from '@/components/ui/Card';

export function SequencePanel({ t, step, sequenceState }) {
  if (!step || step.type !== 'sequence' || !sequenceState) return null;
  return (
    <Card className="card-grid">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm font-semibold text-slate-700">{t.sequence}</div>
          <div className="text-lg font-semibold text-slate-900">{step.displayName || step.name}</div>
        </div>
        <div className="text-sm text-slate-600">{t.round} {sequenceState.round + 1} / {step.reps}</div>
      </div>
      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
        {step.sequence.map((substep, index) => (
          <div
            key={`${substep.name}-${index}`}
            className={`rounded-2xl border p-3 text-sm ${index === sequenceState.substep ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 bg-slate-50 text-slate-700'}`}
          >
            <div className="font-medium">{index + 1}. {substep.name}</div>
            <div className="text-xs opacity-80">{substep.sanskrit}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
