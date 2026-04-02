export const audioPrompts = {
  en: {
    default: (step) => `Now practise ${step.displayName}.`,
    start: (step) => `Starting ${step.displayName}.`,
  },
  hi: {
    default: (step) => `अब ${step.displayName} का अभ्यास करें।`,
    start: (step) => `${step.displayName} शुरू करें।`,
  },
  sa: {
    default: (step) => `अधुना ${step.sanskrit || step.displayName} अभ्यासं कुरुत।`,
    start: (step) => `${step.sanskrit || step.displayName} आरभ्यताम्।`,
  },
};
