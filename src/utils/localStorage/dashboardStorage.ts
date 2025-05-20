
/**
 * Utilities for handling dashboard-related localStorage operations
 */

// Load user data from localStorage
export const loadLocalUserData = () => {
  try {
    const localStorageUser = localStorage.getItem('traingo-user');
    if (localStorageUser) {
      return JSON.parse(localStorageUser);
    }
    return null;
  } catch (error) {
    console.error("[TrainGO] Error reading localStorage:", error);
    return null;
  }
};

// Save user data to localStorage
export const saveLocalUserData = (userData: any) => {
  try {
    localStorage.setItem('traingo-user', JSON.stringify(userData));
    return true;
  } catch (error) {
    console.error("[TrainGO] Error saving to localStorage:", error);
    return false;
  }
};
