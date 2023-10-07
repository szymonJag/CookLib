import styled from 'styled-components';
import Button, { InputFile } from '../../../ui/Button';
import { useRef, useState } from 'react';
import { Avatar } from '../../../ui/Avatar';
import { useUploadUserAvatar } from '../hooks/useUploadUserAvatar';
import { useUserContext } from '../../../contexts/UserContext';
import { UserSectionHeading } from './UserSectionHeading';

const AvatarUploadLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`;

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

function AvatarUpload() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImages, setSelectedImage] = useState<FileList | null>(null);
  const { uploadAvatarMt } = useUploadUserAvatar();
  const userContext = useUserContext();
  const userId = (userContext.user && userContext.user!.id) || 0;

  const handleButtonClick = () => {
    if (selectedImages && selectedImages?.length > 0) {
      uploadAvatarMt({ images: selectedImages, userId });
      setSelectedImage(null);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(selectedImages);
    if (files) {
      setSelectedImage(files);
    }
  };

  return (
    <AvatarUploadLayout>
      <UserSectionHeading as='h3'>Zdjęcie profilowe</UserSectionHeading>
      <Avatar src={userContext.user?.avatarURL} alt='avatar' size='medium' />
      <InputFile
        size='small'
        variation='primary'
        type='file'
        accept='image/*'
        maxLength={3}
        multiple={false}
        onChange={handleImageChange}
        ref={fileInputRef}
      />
      <AvatarSection>
        <span>Wybierz plik a następnie</span>
        <Button
          onClick={handleButtonClick}
          size='small'
          variation='primary'
          type='button'
          disabled={selectedImages === null}
        >
          Prześlij
        </Button>
      </AvatarSection>
    </AvatarUploadLayout>
  );
}

export default AvatarUpload;
