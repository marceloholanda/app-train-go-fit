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
