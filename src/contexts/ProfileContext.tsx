
import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { useProfile, UserProfile } from '@/hooks/useProfile';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<any>;
  createProfile: (profileData: Partial<UserProfile>) => Promise<any>;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  profileError: string | null;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const profileHook = useProfile();
  const [profileError, setProfileError] = useState<string | null>(null);

  // Adicionar tratamento de erro específico para o perfil
  useEffect(() => {
    const handleProfileError = (error: Error) => {
      console.error("[TrainGO] Profile error:", error);
      setProfileError(error.message);
    };

    window.addEventListener('profileError', (e) => {
      const error = (e as CustomEvent<Error>).detail;
      handleProfileError(error);
    });

    return () => {
      window.removeEventListener('profileError', (e) => {
        const error = (e as CustomEvent<Error>).detail;
        handleProfileError(error);
      });
    };
  }, []);

  // Valor modificado incluindo o estado de erro
  const contextValue = {
    ...profileHook,
    profileError
  };

  // Renderizar estado de erro específico do perfil se necessário
  if (profileError && !profileHook.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background text-foreground">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded max-w-md w-full">
          <h2 className="font-bold text-lg mb-2">Erro ao carregar perfil</h2>
          <p>{profileError}</p>
          <button 
            onClick={() => {
              setProfileError(null);
              window.location.reload();
            }} 
            className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfileContext must be used within a ProfileProvider');
  }
  return context;
};
