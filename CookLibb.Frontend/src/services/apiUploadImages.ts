import { API_URL } from '../utils/constants';

const API_UPLOAD_URL = `${API_URL}/UploadImages/upload`;

export async function uploadImage(images: FileList, recipeId: number) {
  try {
    console.log(`KURWA FETCH IMAGES`, images);
    const url = `${API_UPLOAD_URL}?recipeId=${recipeId}`;
    console.log('fetch upload image');

    if (images.length === 0) return;

    const formData = new FormData();

    for (let i = 0; i < images.length; i++) {
      console.log(images[i]);
      formData.append('images', images[i]);
    }

    console.log(`kurwa co jest`, formData.values);

    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    console.log('response', response);
    const data = await response.json();

    if (response.status !== 200)
      throw new Error(data[0].errors[0].errorMessage);

    return data.data;
  } catch (err) {
    console.error(`Error with uploading image: ${err}`);
  }
}
