import { useEffect, useMemo, useState } from 'react';
import { RoutineSelector } from '@/components/layout/RoutineSelector';
import { RoutineHeader } from '@/components/layout/RoutineHeader';
import { CurrentStepPanel } from '@/components/practice/CurrentStepPanel';
import { ControlsPanel } from '@/components/practice/ControlsPanel';
import { IllustrationPanel } from '@/components/practice/IllustrationPanel';
import { BreathingPanel } from '@/components/practice/BreathingPanel';
import { SequencePanel } from '@/components/practice/SequencePanel';
import { RoutineStepList } from '@/components/practice/RoutineStepList';
import { uiText } from '@/data/uiText';
import { globalSafetyNote, kapalBhatiSafety } from '@/data/safety';
import { illustrations } from '@/data/illustrations';
import { defaultRoutineId, routines } from '@/data/routines';
import { expandPerSideSteps, estimateRoutineSeconds } from '@/lib/routineEngine';
import { formatSeconds } from '@/lib/time';
import { speakStep } from '@/lib/audio';

function App() {
  const [selectedRoutineId, setSelectedRoutineId] = useState(defaultRoutineId);
  const [uiLanguage, setUiLanguage] = useState('en');
  const [audioLanguage, setAudioLanguage] = useState('en');
  const [muted, setMuted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [running, setRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [sequenceState, setSequenceState] = useState(null);
  const [completedIds, setCompletedIds] = useState(new Set());
  const [strokeCount, setStrokeCount] = useState(0);
  const t = uiText[uiLanguage];

  const routine = useMemo(() => routines.find((item) => item.id === selectedRoutineId), [selectedRoutineId]);
  const steps = useMemo(() => expandPerSideSteps(routine.steps, { left: t.left, right: t.right }), [routine, t.left, t.right]);
  const currentStep = steps[activeIndex];

  useEffect(() => {
    setActiveIndex(0);
    setRunning(false);
    setCompletedIds(new Set());
    setSequenceState(null);
    setStrokeCount(0);
  }, [selectedRoutineId, uiLanguage]);

  useEffect(() => {
    if (!currentStep) return;
    setTimeRemaining(currentStep.type === 'time' ? currentStep.duration : 0);
    setSequenceState(currentStep.type === 'sequence' ? { round: 0, substep: 0, tick: 4 } : null);
    setStrokeCount(0);
    speakStep({ step: currentStep, audioLanguage, mode: 'start', muted });
  }, [activeIndex, currentStep, audioLanguage, muted]);

  useEffect(() => {
    if (!running || !currentStep) return undefined;
    const interval = setInterval(() => {
      if (currentStep.type === 'time') {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            handleNext();
            return 0;
          }
          return prev - 1;
        });
        if (currentStep.breathing?.activeStrokeCounter) {
          setStrokeCount((prev) => prev + 1);
        }
      }
      if (currentStep.type === 'sequence') {
        setSequenceState((prev) => {
          if (!prev) return prev;
          if (prev.tick > 1) return { ...prev, tick: prev.tick - 1 };
          const nextSubstep = prev.substep + 1;
          if (nextSubstep < currentStep.sequence.length) return { ...prev, substep: nextSubstep, tick: 4 };
          const nextRound = prev.round + 1;
          if (nextRound < currentStep.reps) return { round: nextRound, substep: 0, tick: 4 };
          setTimeout(handleNext, 0);
          return prev;
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [running, currentStep]);

  const handleNext = () => {
    setCompletedIds((prev) => new Set(prev).add(currentStep.id));
    setRunning(false);
    setActiveIndex((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handleReset = () => {
    setRunning(false);
    setActiveIndex(0);
    setCompletedIds(new Set());
    setSequenceState(null);
    setStrokeCount(0);
  };

  const progressValue = steps.length ? (completedIds.size / steps.length) * 100 : 0;
  const approxDuration = formatSeconds(estimateRoutineSeconds(steps));
  const displayRoutine = {
    label: routine.label[uiLanguage],
    description: routine.description[uiLanguage],
    safety: routine.safety[uiLanguage],
  };
  const illustration = illustrations[currentStep?.illustrationKey] || illustrations.default;

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-6 md:px-6 xl:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <RoutineSelector
          t={t}
          routines={routines}
          selectedRoutineId={selectedRoutineId}
          onRoutineChange={setSelectedRoutineId}
          uiLanguage={uiLanguage}
          onUiLanguageChange={setUiLanguage}
          audioLanguage={audioLanguage}
          onAudioLanguageChange={setAudioLanguage}
          muted={muted}
          onMuteToggle={() => setMuted((prev) => !prev)}
        />

        <RoutineHeader
          t={t}
          title={t.appTitle}
          tagline={t.tagline}
          routine={displayRoutine}
          totalSteps={steps.length}
          approxDuration={approxDuration}
          globalSafetyNote={globalSafetyNote[uiLanguage]}
        />

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <CurrentStepPanel t={t} step={currentStep} uiLanguage={uiLanguage} />
              <ControlsPanel
                t={t}
                step={currentStep}
                running={running}
                timeRemaining={timeRemaining}
                sequenceState={sequenceState}
                onStart={() => setRunning(true)}
                onPause={() => setRunning(false)}
                onNext={handleNext}
                onReset={handleReset}
              />
            </div>

            <div className="rounded-3xl bg-white p-4 shadow-soft border border-slate-200">
              <div className="mb-2 text-sm font-semibold text-slate-700">{t.progress}</div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-slate-900 transition-all" style={{ width: `${progressValue}%` }} />
              </div>
              <div className="mt-2 text-sm text-slate-600">{t.completed}: {completedIds.size} / {steps.length}</div>
            </div>

            {currentStep && <IllustrationPanel t={t} illustration={illustration} step={currentStep} />}
            {currentStep?.breathing && <BreathingPanel t={t} breathing={currentStep.breathing} strokeCount={strokeCount} kapalBhatiSafety={kapalBhatiSafety[uiLanguage]} />}
            {currentStep?.type === 'sequence' && <SequencePanel t={t} step={currentStep} sequenceState={sequenceState} />}
          </div>

          <RoutineStepList t={t} steps={steps} activeIndex={activeIndex} completedIds={completedIds} />
        </div>
      </div>
    </div>
  );
}

export default App;
