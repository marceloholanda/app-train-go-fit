
import React, { useState } from 'react';
import { extractAllExercises, generateExerciseTable, generateExerciseCSV } from '@/utils/workoutRecommendation/exerciseExtractor';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ExerciseListExtractor = () => {
  const [showTable, setShowTable] = useState(false);
  const exercises = extractAllExercises();
  
  const downloadCSV = () => {
    const csv = generateExerciseCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'traingo_exercicios.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  return (
    <div className="container mx-auto p-6">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Lista de Exercícios - TrainGO</CardTitle>
          <CardDescription>
            Total de exercícios únicos: {exercises.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 mb-4">
            Esta lista contém todos os exercícios atualmente cadastrados no sistema TrainGO.
            Use-a para criar imagens correspondentes a cada exercício, garantindo que o nome normalizado
            seja utilizado como nome do arquivo de imagem.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => setShowTable(!showTable)}>
            {showTable ? 'Ocultar Lista' : 'Mostrar Lista'}
          </Button>
          <Button onClick={downloadCSV} variant="outline">
            Baixar CSV
          </Button>
        </CardFooter>
      </Card>
      
      {showTable && (
        <Tabs defaultValue="table" className="w-full">
          <TabsList>
            <TabsTrigger value="table">Tabela</TabsTrigger>
            <TabsTrigger value="list">Lista Simples</TabsTrigger>
          </TabsList>
          
          <TabsContent value="table">
            <div className="overflow-x-auto">
              <div dangerouslySetInnerHTML={{ __html: generateExerciseTable() }} />
            </div>
          </TabsContent>
          
          <TabsContent value="list">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exercises.map((ex, index) => (
                <div key={index} className="p-4 border border-gray-700 rounded-lg">
                  <p className="font-medium">{ex.nome}</p>
                  <p className="text-sm text-gray-400">Grupo: {ex.grupoMuscular}</p>
                  <p className="text-sm text-gray-400">Ambiente: {ex.ambiente}</p>
                  <p className="text-xs text-gray-500 mt-2">{ex.normalized}.png</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default ExerciseListExtractor;
