
import React, { createContext, useContext, ReactNode } from 'react';
import { useProfile, UserProfile } from '@/hooks/useProfile';

interface ProfileContextType {
  profile: UserProfile | null;
  isLoading: boolean;
  updateProfile: (profileData: Partial<UserProfile>) => Promise<any>;
  createProfile: (profileData: Partial<UserProfile>) => Promise<any>;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const profileHook = useProfile();
  
  return (
    <ProfileContext.Provider value={profileHook}>
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
