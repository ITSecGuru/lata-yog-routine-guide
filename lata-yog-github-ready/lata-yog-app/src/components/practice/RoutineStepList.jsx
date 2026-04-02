import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

const badgeText = (step) => {
  if (step.type === 'time') return `${step.duration} sec`;
  if (step.type === 'reps') return `${step.reps} reps`;
  if (step.type === 'sequence') return `${step.reps} rounds`;
  return '';
};

export function RoutineStepList({ t, steps, activeIndex, completedIds }) {
  return (
    <Card className="h-full">
      <div className="mb-4 text-lg font-semibold text-slate-900">{t.routineSteps}</div>
      <div className="grid gap-2">
        {steps.map((step, index) => {
          const isActive = index === activeIndex;
          const isComplete = completedIds.has(step.id);
          return (
            <div key={step.id} className={`rounded-2xl border p-3 transition ${isActive ? 'border-slate-900 bg-slate-900 text-white' : isComplete ? 'border-emerald-200 bg-emerald-50 text-emerald-900' : 'border-slate-200 bg-white text-slate-900'}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium">{index + 1}. {step.displayName || step.name}</div>
                  {step.sanskrit && <div className="text-xs opacity-80">{step.sanskrit}</div>}
                  {step.commonName && <div className="text-xs opacity-70">{step.commonName}</div>}
                  {step.note && <div className="mt-1 text-xs opacity-80">{step.note}</div>}
                </div>
                <Badge className={isActive ? 'bg-white/15 text-white' : ''}>{badgeText(step)}</Badge>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
