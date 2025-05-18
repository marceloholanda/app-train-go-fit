
import React, { useState, useEffect } from 'react';
import { Exercise } from '@/types/workout';
import { diagnoseExerciseImages, getAllUniqueExercises } from '@/utils/workoutRecommendation/exerciseImageDiagnostic';
import { getExerciseImageUrl, FALLBACK_IMAGE_URL } from '@/utils/workoutRecommendation/exerciseImages';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface DiagnosticResult {
  name: string;
  normalized: string;
  url: string;
  exists: boolean;
}

const ExerciseImageDiagnostic: React.FC = () => {
  const [diagnosticResults, setDiagnosticResults] = useState<DiagnosticResult[]>([]);
  const [summary, setSummary] = useState({ total: 0, found: 0, missing: [] as string[] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const runDiagnostic = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Get user's workout plan from localStorage
      const userData = localStorage.getItem('traingo-user');
      if (!userData) {
        setError('Nenhum plano de treino encontrado. Por favor, complete o onboarding primeiro.');
        setIsLoading(false);
        return;
      }
      
      const user = JSON.parse(userData);
      const workoutPlan = user.workoutPlan;
      
      if (!workoutPlan) {
        setError('Plano de treino não encontrado nos dados do usuário.');
        setIsLoading(false);
        return;
      }
      
      // Extract all unique exercises from the workout plan
      const allExercises = getAllUniqueExercises(workoutPlan);
      
      // Run diagnostic
      const results = await diagnoseExerciseImages(allExercises);
      
      setDiagnosticResults(results.results);
      setSummary({
        total: results.total,
        found: results.found,
        missing: results.missing
      });
      
      // Log results to console for developer reference
      console.table(results.results);
      
    } catch (err) {
      setError(`Erro ao executar diagnóstico: ${err instanceof Error ? err.message : String(err)}`);
      console.error('[TrainGO] Erro no diagnóstico:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    runDiagnostic();
  }, []);
  
  const percentFound = summary.total > 0 
    ? Math.round((summary.found / summary.total) * 100) 
    : 0;
  
  return (
    <div className="container max-w-4xl mx-auto py-6">
      <h2 className="text-2xl font-bold mb-6">Diagnóstico de Imagens de Exercícios</h2>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="p-4 bg-traingo-gray rounded-lg mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium">Resumo</h3>
            <p className="text-sm text-gray-400">
              {isLoading ? 'Verificando imagens...' : `Encontradas ${summary.found} de ${summary.total} imagens`}
            </p>
          </div>
          <Button 
            onClick={runDiagnostic} 
            disabled={isLoading}
            size="sm"
            variant="outline"
            className="gap-2"
          >
            <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            {isLoading ? 'Analisando...' : 'Verificar novamente'}
          </Button>
        </div>
        
        <Progress value={percentFound} className="h-2 mb-2" />
        
        <div className="flex items-center justify-between text-sm">
          <span>{percentFound}% concluído</span>
          <span>
            {summary.found} encontrados, {summary.total - summary.found} ausentes
          </span>
        </div>
      </div>
      
      {summary.missing.length > 0 && (
        <div className="mb-6">
          <h3 className="font-medium mb-2">Imagens ausentes ({summary.missing.length})</h3>
          <div className="bg-yellow-950/30 border border-yellow-700/30 rounded-lg p-4">
            <ul className="list-disc pl-5 space-y-1">
              {summary.missing.map((name, idx) => (
                <li key={idx} className="text-sm text-yellow-300">{name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        <h3 className="font-medium mb-2">Detalhes por exercício</h3>
        
        {isLoading ? (
          <div className="text-center py-10">
            <div className="w-10 h-10 border-4 border-t-transparent border-traingo-primary rounded-full animate-spin mx-auto mb-4" />
            <p>Analisando {diagnosticResults.length || '...'} exercícios</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {diagnosticResults.map((result, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-lg border flex gap-4 items-center ${
                  result.exists 
                    ? 'border-green-600/30 bg-green-950/10' 
                    : 'border-red-600/30 bg-red-950/10'
                }`}
              >
                <div className="w-12 h-12 bg-black rounded-md overflow-hidden flex items-center justify-center">
                  {result.exists ? (
                    <img 
                      src={result.url} 
                      alt={result.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = FALLBACK_IMAGE_URL;
                      }}
                    />
                  ) : (
                    <XCircle className="text-red-500" size={24} />
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm">{result.name}</h4>
                    {result.exists ? (
                      <CheckCircle className="text-green-500" size={16} />
                    ) : (
                      <XCircle className="text-red-500" size={16} />
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">{result.normalized}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExerciseImageDiagnostic;
