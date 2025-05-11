
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
