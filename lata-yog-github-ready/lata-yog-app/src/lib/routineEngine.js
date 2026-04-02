const cloneStep = (step, sideLabel, suffix) => ({
  ...step,
  id: `${step.id}-${suffix}`,
  originalId: step.id,
  side: suffix,
  displayName: `${step.name} (${sideLabel})`,
});

export const expandPerSideSteps = (steps, labels) =>
  steps.flatMap((step) => {
    if (!step.perSide) return [{ ...step, displayName: step.name }];
    return [
      cloneStep(step, labels.left, 'left'),
      cloneStep(step, labels.right, 'right'),
    ];
  });

export const estimateStepSeconds = (step) => {
  if (step.type === 'time') return step.duration;
  if (step.type === 'reps') return step.reps * 4;
  if (step.type === 'sequence') return step.reps * step.sequence.length * 4;
  return 0;
};

export const estimateRoutineSeconds = (steps) => steps.reduce((sum, step) => sum + estimateStepSeconds(step), 0);
