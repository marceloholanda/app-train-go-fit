export const isPremiumUser = (): boolean => {
  try {
    const userPlan = localStorage.getItem("traingo-plano") || "";
    return userPlan.toLowerCase() === 'premium';
  } catch (error) {
    console.error("Erro ao verificar plano do usuário:", error);
    return false;
  }
};

export const getUserData = () => {
  try {
    const userData = localStorage.getItem('traingo-user');
    if (userData) {
      return JSON.parse(userData);
    }
    return null;
  } catch (error) {
    console.error("Erro ao recuperar dados do usuário:", error);
    return null;
  }
};

export const saveUserData = (data: any) => {
  try {
    localStorage.setItem('traingo-user', JSON.stringify(data));
    return true;
  } catch (error) {
    console.error("Erro ao salvar dados do usuário:", error);
    return false;
  }
};

export const calculateIMC = (weight: number, height: number): number => {
  // Height should be in meters
  if (height <= 0 || weight <= 0) {
    return 0;
  }
  
  // Convert height to meters if it seems to be in centimeters
  const heightInMeters = height > 3 ? height / 100 : height;
  
  return weight / (heightInMeters * heightInMeters);
};

export const getIMCClassification = (imc: number): string => {
  if (imc < 18.5) return "Magreza";
  if (imc < 25) return "Normal";
  if (imc < 30) return "Sobrepeso";
  if (imc < 35) return "Obesidade I";
  if (imc < 40) return "Obesidade II";
  return "Obesidade III";
};

// Convert range values to approximate numeric values
export const weightRangeToNumber = (range: string): number => {
  switch(range) {
    case 'under_60': return 55;
    case '60_75': return 67.5;
    case '75_90': return 82.5;
    case '90_110': return 100;
    case 'above_110': return 115;
    default: return 70;
  }
};

export const heightRangeToNumber = (range: string): number => {
  switch(range) {
    case 'under_160': return 1.55;
    case '160_175': return 1.67;
    case '175_185': return 1.80;
    case 'above_185': return 1.90;
    default: return 1.70;
  }
};

export const ageRangeToNumber = (range: string): number => {
  switch(range) {
    case 'under_18': return 16;
    case '18_29': return 24;
    case '30_44': return 37;
    case '45_59': return 52;
    case '60_plus': return 65;
    default: return 30;
  }
};

// Get numeric representations of motivation type
export const getMotivationTypeLabel = (motivationType: string): string => {
  switch(motivationType) {
    case 'fast_results': return "Resultados rápidos";
    case 'discipline': return "Rotina constante";
    case 'fun': return "Diversão ao treinar";
    case 'challenge': return "Desafios físicos";
    default: return "Não definido";
  }
};

// Get numeric representations of training barriers
export const getTrainingBarrierLabel = (barrier: string): string => {
  switch(barrier) {
    case 'time': return "Falta de tempo";
    case 'motivation': return "Falta de motivação";
    case 'discipline': return "Falta de disciplina";
    case 'pain': return "Desconforto físico";
    default: return "Não definido";
  }
};
