import React, { useState } from 'react';
import { API_URL } from '../utils/constants';
import Input from './Input';

const API_UPLOAD_URL = `${API_URL}/UploadImages/upload`;

const UploadImage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await fetch(API_UPLOAD_URL, {
        method: 'POST',
        body: formData,
      });

      console.log(response);

      if (response.ok) {
        console.log('Zdjęcie zostało przesłane.');
      } else {
        console.error('Wystąpił błąd podczas przesyłania zdjęcia.');
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas przesyłania zdjęcia:', error);
    }
  };

  return (
    <div>
      <Input
        type='file'
        accept='image/*'
        maxLength={3}
        onChange={handleImageChange}
      />
      <button onClick={handleUpload}>Prześlij Zdjęcie</button>
    </div>
  );
};

export default UploadImage;
