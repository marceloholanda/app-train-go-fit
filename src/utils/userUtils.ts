/**
 * Verifica se o usuário tem plano premium
 */
export const isPremiumUser = (): boolean => {
  try {
    const userData = localStorage.getItem('traingo-user');
    if (!userData) return false;
    
    const user = JSON.parse(userData);
    return user.plan === 'premium';
  } catch (error) {
    console.error('Erro ao verificar status premium:', error);
    return false;
  }
};

/**
 * Salva os dados do usuário no localStorage
 */
export const saveUserData = (userData: any): void => {
  try {
    localStorage.setItem('traingo-user', JSON.stringify(userData));
  } catch (error) {
    console.error('Erro ao salvar dados do usuário:', error);
  }
};

/**
 * Calcula o Índice de Massa Corporal
 * @param weight - Peso em kg
 * @param height - Altura em metros
 * @returns número representando o IMC
 */
export const calculateIMC = (weight: number, height: number): number => {
  if (!weight || !height || height === 0) return 0;
  return weight / (height * height);
};

/**
 * Retorna a classificação do IMC de acordo com a OMS
 * @param imc - Valor do IMC calculado
 * @returns string com a classificação
 */
export const getIMCClassification = (imc: number): string => {
  if (imc === 0) return 'Não calculado';
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 25) return 'Peso normal';
  if (imc < 30) return 'Sobrepeso';
  if (imc < 35) return 'Obesidade grau 1';
  if (imc < 40) return 'Obesidade grau 2';
  return 'Obesidade grau 3';
};

/**
 * Converte a faixa etária em um valor numérico aproximado
 */
export const ageRangeToNumber = (ageRange: string): number => {
  switch (ageRange) {
    case 'under_18':
      return 16;
    case '18_29':
      return 24;
    case '30_44':
      return 37;
    case '45_59':
      return 52;
    case '60_plus':
      return 65;
    default:
      return 30; // valor padrão
  }
};

/**
 * Converte a faixa de peso em um valor numérico aproximado (kg)
 */
export const weightRangeToNumber = (weightRange: string): number => {
  switch (weightRange) {
    case 'under_60':
      return 55;
    case '60_75':
      return 68;
    case '75_90':
      return 83;
    case '90_110':
      return 100;
    case 'above_110':
      return 120;
    default:
      return 70; // valor padrão
  }
};

/**
 * Converte a faixa de altura em um valor numérico aproximado (m)
 */
export const heightRangeToNumber = (heightRange: string): number => {
  switch (heightRange) {
    case 'under_160':
      return 1.55;
    case '160_175':
      return 1.68;
    case '175_185':
      return 1.80;
    case 'above_185':
      return 1.90;
    default:
      return 1.70; // valor padrão
  }
};

/**
 * Verifica se o usuário já viu a mensagem de boas-vindas premium
 */
export const hasSeenPremiumWelcome = (): boolean => {
  try {
    return localStorage.getItem('traingo-premium-welcome-seen') === 'true';
  } catch (error) {
    console.error('Erro ao verificar status de boas-vindas premium:', error);
    return false;
  }
};

/**
 * Marca que o usuário já viu a mensagem de boas-vindas premium
 */
export const markPremiumWelcomeSeen = (): void => {
  try {
    localStorage.setItem('traingo-premium-welcome-seen', 'true');
  } catch (error) {
    console.error('Erro ao marcar boas-vindas premium como visto:', error);
  }
};

/**
 * Reseta o status de visualização da mensagem de boas-vindas premium
 * Útil para testes ou após logout
 */
export const resetPremiumWelcomeStatus = (): void => {
  try {
    localStorage.removeItem('traingo-premium-welcome-seen');
  } catch (error) {
    console.error('Erro ao resetar status de boas-vindas premium:', error);
  }
};
