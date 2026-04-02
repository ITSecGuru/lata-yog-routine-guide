import { Card } from '@/components/ui/Card';

export function IllustrationPanel({ t, illustration, step }) {
  return (
    <Card className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 p-6 text-center">
        <div className="text-6xl">{illustration.icon}</div>
        <div className="mt-3 text-lg font-semibold text-slate-900">{step.displayName || step.name}</div>
        {step.sanskrit && <div className="text-sm text-slate-600">{step.sanskrit}</div>}
        {step.commonName && <div className="text-sm text-slate-500">{step.commonName}</div>}
        <div className="mt-3 text-sm text-slate-600">{illustration.cue}</div>
      </div>
      <div className="grid gap-3">
        <div className="rounded-2xl border border-dashed border-slate-300 p-4">
          <div className="text-sm font-semibold text-slate-700">{t.pictureLink}</div>
          <div className="mt-2 text-sm text-slate-500">{t.picturePlaceholder}</div>
        </div>
        <div className="rounded-2xl border border-dashed border-slate-300 p-4">
          <div className="text-sm font-semibold text-slate-700">{t.videoLink}</div>
          <div className="mt-2 text-sm text-slate-500">{t.videoPlaceholder}</div>
        </div>
      </div>
    </Card>
  );
}
