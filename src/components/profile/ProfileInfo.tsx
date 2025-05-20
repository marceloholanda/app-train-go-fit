
import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';
import Button from '@/components/Button';
import ProfileObjectives from './ProfileObjectives';
import PhysicalDataCard from './PhysicalDataCard';
import PhysicalDataDialog from './PhysicalDataDialog';

interface ProfileInfoProps {
  userData: any;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileInfo = ({ userData, setIsEditing }: ProfileInfoProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [physicalData, setPhysicalData] = useState({
    age: userData?.profile?.age_exact || userData?.profile?.age ? Number(userData.profile.age_exact || 30) : 30,
    weight: userData?.profile?.weight_exact || userData?.profile?.weight ? Number(userData.profile.weight_exact || 70) : 70,
    height: userData?.profile?.height_exact || userData?.profile?.height ? Number(userData.profile.height_exact || 1.70) : 1.70,
  });
  
  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-bold text-lg">Seu Perfil</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          leftIcon={<Edit2 size={16} />}
          onClick={() => setIsEditing(true)}
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
    </div>
  );
};

export default ProfileInfo;
