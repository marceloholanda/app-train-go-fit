
import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';
import Button from '@/components/Button';
import ProfileObjectives from './ProfileObjectives';
import PhysicalDataCard from './PhysicalDataCard';
import PhysicalDataDialog from './PhysicalDataDialog';
import PremiumRestrictionModal from './PremiumRestrictionModal';
import ProfileEditForm from './ProfileEditForm';

interface ProfileInfoProps {
  userData: any;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileInfo = ({ userData, setIsEditing }: ProfileInfoProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const [physicalData, setPhysicalData] = useState({
    age: userData?.profile?.age_exact || userData?.profile?.age ? Number(userData.profile.age_exact || 30) : 30,
    weight: userData?.profile?.weight_exact || userData?.profile?.weight ? Number(userData.profile.weight_exact || 70) : 70,
    height: userData?.profile?.height_exact || userData?.profile?.height ? Number(userData.profile.height_exact || 1.70) : 1.70,
  });
  
  const isPremium = userData?.isPremium || false;
  
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);
  
  const handleEditClick = () => {
    if (isPremium) {
      setIsEditFormOpen(true);
    } else {
      setIsPremiumModalOpen(true);
    }
  };
  
  const handleSaveProfile = (updatedUserData: any) => {
    setIsEditFormOpen(false);
  };

  if (isEditFormOpen) {
    return <ProfileEditForm 
      userData={userData} 
      onCancel={() => setIsEditFormOpen(false)} 
      onSave={handleSaveProfile} 
    />;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-lg">Seu Perfil</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          leftIcon={<Edit2 size={16} />}
          onClick={handleEditClick}
        >
          Editar Perfil
        </Button>
      </div>

      <ProfileObjectives userData={userData} />
      <PhysicalDataCard 
        userData={userData} 
        physicalData={physicalData} 
        onEditClick={handleOpenDialog}
      />
      
      <PhysicalDataDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        physicalData={physicalData}
        setPhysicalData={setPhysicalData}
        userData={userData}
      />
      
      <PremiumRestrictionModal 
        isOpen={isPremiumModalOpen} 
        onClose={() => setIsPremiumModalOpen(false)} 
      />
    </div>
  );
};

export default ProfileInfo;
