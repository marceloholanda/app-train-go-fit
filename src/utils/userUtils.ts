
// Weight range conversions
export const weightRangeToNumber = (weightRange: string): number => {
  switch(weightRange) {
    case 'under_60': return 55;
    case '60_75': return 67.5;
    case '75_90': return 82.5;
    case '90_110': return 100;
    case 'above_110': return 120;
    default: return 70;
  }
};

// Height range conversions
export const heightRangeToNumber = (heightRange: string): number => {
  switch(heightRange) {
    case 'under_160': return 1.55;
    case '160_175': return 1.675;
    case '175_185': return 1.80;
    case 'above_185': return 1.90;
    default: return 1.70;
  }
};

// Age range conversions
export const ageRangeToNumber = (ageRange: string): number => {
  switch(ageRange) {
    case 'under_18': return 16;
    case '18_29': return 24;
    case '30_44': return 37;
    case '45_59': return 52;
    case '60_plus': return 65;
    default: return 30;
  }
};

// IMC calculation
export const calculateIMC = (weight: number, height: number): number => {
  if (!weight || !height || height === 0) return 0;
  return weight / (height * height);
};

// IMC classification
export const getIMCClassification = (imc: number): string => {
  if (imc === 0) return 'Não calculado';
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 25) return 'Peso normal';
  if (imc < 30) return 'Sobrepeso';
  if (imc < 35) return 'Obesidade grau I';
  if (imc < 40) return 'Obesidade grau II';
  return 'Obesidade grau III';
};

// Update user data
export const saveUserData = (userData: any) => {
  try {
    localStorage.setItem('traingo-user', JSON.stringify(userData));
    return true;
  } catch (error) {
    console.error('Error saving user data:', error);
    return false;
  }
};
