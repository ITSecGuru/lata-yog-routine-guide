import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

export function RoutineHeader({ t, title, tagline, routine, totalSteps, approxDuration, globalSafetyNote }) {
  return (
    <Card className="card-grid">
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          <p className="mt-1 text-sm text-slate-600">{tagline}</p>
          <h2 className="mt-4 text-xl font-semibold text-slate-800">{routine.label}</h2>
          <p className="mt-1 text-sm text-slate-600">{routine.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge>{t.totalSteps}: {totalSteps}</Badge>
          <Badge>{t.approxDuration}: {approxDuration}</Badge>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl bg-amber-50 p-3">
          <div className="text-sm font-semibold text-amber-900">{t.routineSafetyTitle}</div>
          <div className="mt-1 text-sm text-amber-900/90">{routine.safety}</div>
        </div>
        <div className="rounded-2xl bg-rose-50 p-3">
          <div className="text-sm font-semibold text-rose-900">{t.globalSafetyTitle}</div>
          <div className="mt-1 text-sm text-rose-900/90">{globalSafetyNote}</div>
        </div>
      </div>
    </Card>
  );
}
