
/**
 * Salva o nível desbloqueado no histórico de níveis do usuário
 */
export const saveUnlockedLevel = (level: string): void => {
  try {
    // Salvar o nível atual no localStorage se for novo
    const nivelAtual = localStorage.getItem('traingo-nivel-atual');
    
    if (nivelAtual !== level) {
      // Atualiza o nível atual
      localStorage.setItem('traingo-nivel-atual', level);
      
      // Adiciona o novo nível ao histórico de níveis desbloqueados
      let niveisDesbloqueados = [];
      const savedLevels = localStorage.getItem('traingo-niveis-desbloqueados');
      
      if (savedLevels) {
        niveisDesbloqueados = JSON.parse(savedLevels);
      }
      
      // Verifica se o nível já existe no histórico
      const jaExiste = niveisDesbloqueados.some(
        (item: {nivel: string}) => item.nivel === level
      );
      
      if (!jaExiste) {
        niveisDesbloqueados.push({
          nivel: level,
          date: new Date().toISOString().split('T')[0]
        });
        
        localStorage.setItem('traingo-niveis-desbloqueados', JSON.stringify(niveisDesbloqueados));
      }
    }
  } catch (error) {
    console.error('Erro ao salvar nível desbloqueado:', error);
  }
};

/**
 * Obtém todos os níveis desbloqueados pelo usuário
 */
export const getUnlockedLevels = (): {nivel: string, date: string}[] => {
  try {
    const savedLevels = localStorage.getItem('traingo-niveis-desbloqueados');
    if (!savedLevels) return [];
    
    return JSON.parse(savedLevels);
  } catch (error) {
    console.error('Erro ao obter níveis desbloqueados:', error);
    return [];
  }
};

/**
 * Verifica se o app deve exibir o banner de onboarding de nível
 */
export const shouldShowLevelOnboarding = (): boolean => {
  try {
    // Verifica se existe um nível salvo
    const nivelAtual = localStorage.getItem('traingo-nivel-atual');
    if (!nivelAtual) return false;
    
    // Verifica se já mostrou o banner este mês
    const lastShown = localStorage.getItem('traingo-level-onboarding-lastshown');
    if (!lastShown) {
      // Nunca mostrou, deve mostrar e salvar a data
      const currentMonth = new Date().getMonth();
      localStorage.setItem('traingo-level-onboarding-lastshown', currentMonth.toString());
      return true;
    }
    
    // Verifica se já mostrou neste mês
    const currentMonth = new Date().getMonth();
    const lastShownMonth = parseInt(lastShown, 10);
    
    if (currentMonth !== lastShownMonth) {
      // Mês diferente, deve mostrar e atualizar a data
      localStorage.setItem('traingo-level-onboarding-lastshown', currentMonth.toString());
      return true;
    }
    
    // Já mostrou neste mês
    return false;
  } catch (error) {
    console.error('Erro ao verificar exibição do onboarding de nível:', error);
    return false;
  }
};

/**
 * Verifica se é o primeiro acesso do usuário no mês atual
 */
export const isFirstAccessOfMonth = (): boolean => {
  try {
    const lastAccessMonth = localStorage.getItem('traingo-last-access-month');
    const currentMonth = new Date().getMonth();
    
    if (!lastAccessMonth || parseInt(lastAccessMonth, 10) !== currentMonth) {
      // Atualiza o mês de último acesso
      localStorage.setItem('traingo-last-access-month', currentMonth.toString());
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Erro ao verificar primeiro acesso do mês:', error);
    return false;
  }
};
