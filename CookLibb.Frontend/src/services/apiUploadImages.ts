import { API_URL } from '../utils/constants';
import { handleResponse } from './apiBase';

const API_UPLOAD_URL = `${API_URL}/UploadImages`;

export async function uploadImage(images: FileList, recipeId: number) {
  try {
    const url = `${API_UPLOAD_URL}/uploadRecipeImage?recipeId=${recipeId}`;

    if (images.length === 0) return;

    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      console.log(images[i]);
      formData.append('images', images[i]);
    }

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.status !== 200)
      throw new Error(data[0].errors[0].errorMessage);

    return data.data;
  } catch (err) {
    console.error(`Error with uploading image: ${err}`);
  }
}

export async function editImage(images: FileList, recipeId: number = 0) {
  try {
    const url = `${API_UPLOAD_URL}/editImage?recipeId=${recipeId}`;

    if (images.length === 0) return;

    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      console.log(images[i]);
      formData.append('images', images[i]);
    }

    const response = await fetch(url, {
      method: 'PUT',
      body: formData,
    });

    const data = await handleResponse(response);

    return data.data;
  } catch (err) {
    console.error(`Error with uploading image: ${err}`);
  }
}

export async function uploadAvatar(image: FileList, userId: number) {
  try {
    console.log(`image`, image);
    console.log(`userId`, userId);

    const url = `${API_UPLOAD_URL}/uploadAvatar?userId=${userId}`;

    if (image.length === 0) return;

    const formData = new FormData();

    formData.append('image', image[0]);

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (response.status !== 200)
      throw new Error(data[0].errors[0].errorMessage);

    return data.data;
  } catch (err) {
    console.error(`Error with uploading image: ${err}`);
  }
}
