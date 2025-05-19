
import React from 'react';
import Button from '@/components/Button';
import ProfileEditHeader from './ProfileEditHeader';
import ProfileFormFields from './ProfileFormFields';
import { useProfileEditForm } from '@/hooks/useProfileEditForm';

interface ProfileEditFormProps {
  userData: any;
  onCancel: () => void;
  onSave: (updatedUser: any) => void;
}

const ProfileEditForm = ({ userData, onCancel, onSave }: ProfileEditFormProps) => {
  const { formData, isSubmitting, handleChange, handleSubmit } = useProfileEditForm({
    userData,
    onSave
  });

  return (
    <div className="p-6">
      <ProfileEditHeader onCancel={onCancel} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <ProfileFormFields 
          formData={formData}
          handleChange={handleChange}
        />

        <Button 
          type="submit" 
          fullWidth 
          isLoading={isSubmitting}
          disabled={isSubmitting}
          className="mt-6"
        >
          Salvar e Atualizar Plano
        </Button>
      </form>
    </div>
  );
};

export default ProfileEditForm;
