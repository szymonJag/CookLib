import { API_URL } from '../utils/constants';

const API_URL_TAGS = `${API_URL}/Tags`;

export async function getTags(productName: string = '') {
  try {
    const parameters = productName.length > 0 ? `?Name=${productName}` : '';
    const url = `${API_URL_TAGS}/getbyName${parameters}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) throw new Error(data.error);

    return data.data;
  } catch (err) {
    console.error(`Error with fetching tags: ${err}`);
  }
}
