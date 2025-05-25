
// Re-exporte as funções dos arquivos separados para manter compatibilidade
export * from './streakCalculation';
export * from './userLevel';
export * from './scheduleTracking';
// Importar diretamente do arquivo levelTracking para evitar conflitos de namespace
export {
  saveUnlockedLevel,
  getUnlockedLevels,
  shouldShowLevelOnboarding,
  isFirstAccessOfMonth
} from './levelTracking';
