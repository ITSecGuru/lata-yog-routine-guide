import { Card } from '@/components/ui/Card';
import { Select } from '@/components/ui/Select';

export function RoutineSelector({ t, routines, selectedRoutineId, onRoutineChange, uiLanguage, onUiLanguageChange, audioLanguage, onAudioLanguageChange, muted, onMuteToggle }) {
  return (
    <Card className="card-grid md:grid-cols-5">
      <div className="md:col-span-2">
        <div className="mb-2 text-sm font-semibold text-slate-700">{t.selectRoutine}</div>
        <Select value={selectedRoutineId} onChange={(e) => onRoutineChange(e.target.value)} className="w-full">
          {routines.map((routine) => (
            <option key={routine.id} value={routine.id}>{routine.label[uiLanguage]}</option>
          ))}
        </Select>
      </div>
      <div>
        <div className="mb-2 text-sm font-semibold text-slate-700">{t.uiLanguage}</div>
        <Select value={uiLanguage} onChange={(e) => onUiLanguageChange(e.target.value)} className="w-full">
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
        </Select>
      </div>
      <div>
        <div className="mb-2 text-sm font-semibold text-slate-700">{t.audioLanguage}</div>
        <Select value={audioLanguage} onChange={(e) => onAudioLanguageChange(e.target.value)} className="w-full">
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="sa">Sanskrit</option>
        </Select>
      </div>
      <div className="flex items-end">
        <button onClick={onMuteToggle} className="w-full rounded-2xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50">{muted ? t.unmute : t.mute}</button>
      </div>
    </Card>
  );
}
