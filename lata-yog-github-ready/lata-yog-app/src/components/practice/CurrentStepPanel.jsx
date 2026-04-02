import { Card } from '@/components/ui/Card';

export function CurrentStepPanel({ t, step, uiLanguage }) {
  if (!step) return null;
  return (
    <Card>
      <div className="text-sm font-semibold text-slate-500">{t.currentActivity}</div>
      <h3 className="mt-2 text-2xl font-bold text-slate-900">{step.displayName || step.name}</h3>
      {step.sanskrit && <div className="mt-1 text-sm text-slate-600">{step.sanskrit}</div>}
      {step.commonName && <div className="mt-1 text-sm text-slate-500">{step.commonName}</div>}
      <div className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
        <span className="font-semibold">{t.note}: </span>
        {uiLanguage === 'hi' && step.hindiNote ? step.hindiNote : step.note}
      </div>
    </Card>
  );
}
