import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatSeconds } from '@/lib/time';

export function ControlsPanel({ t, step, running, timeRemaining, sequenceState, onStart, onPause, onNext, onReset }) {
  if (!step) return null;
  return (
    <Card className="card-grid">
      <div className="flex flex-wrap gap-2">
        {step.type === 'time' && <Badge>{t.timer}: {formatSeconds(timeRemaining)}</Badge>}
        {step.type === 'reps' && <Badge>{t.reps}: {step.reps}</Badge>}
        {step.type === 'sequence' && sequenceState && (
          <>
            <Badge>{t.sequence}: {step.reps} {t.rounds}</Badge>
            <Badge>{t.round}: {sequenceState.round + 1}/{step.reps}</Badge>
            <Badge>{t.substep}: {sequenceState.substep + 1}/{step.sequence.length}</Badge>
          </>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        <Button onClick={onStart}>{t.start}</Button>
        <Button variant="secondary" onClick={onPause}>{t.pause}</Button>
        <Button variant="secondary" onClick={onNext}>{t.completeNext}</Button>
        <Button variant="secondary" onClick={onReset}>{t.reset}</Button>
      </div>
      <div className="text-sm text-slate-500">{running ? 'Running' : 'Paused'}</div>
    </Card>
  );
}
