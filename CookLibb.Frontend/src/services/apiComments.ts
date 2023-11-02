import { IAddCommentRequest } from '../interfaces/IComment';
import { API_URL } from '../utils/constants';

const API_URL_COMMENTS = `${API_URL}/Comments`;

export async function addComment(comment: IAddCommentRequest, token: string) {
  try {
    console.log('fetch add comment');
    const url = `${API_URL_COMMENTS}/add`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify(comment),
    });

    console.log('response', response);
    const data = await response.json();

    if (response.status !== 200)
      throw new Error(data[0].errors[0].errorMessage);

    return data.data;
  } catch (err) {
    console.error(`Error with adding product: ${err}`);
  }
}

export async function getCommentsByRecipeId(recipeId: number, token: string) {
  console.log(token);
  try {
    console.log('fetch get comments');
    const url = `${API_URL_COMMENTS}/getbyRecipeId/${recipeId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Basic ${token}`,
      },
    });

    console.log('response', response);
    const data = await response.json();

    if (response.status !== 200)
      throw new Error(data[0].errors[0].errorMessage);

    return data.data;
  } catch (err) {
    console.error(`Error with adding product: ${err}`);
  }
}

export async function deleteCommentById(commentId: number, token: string) {
  try {
    const url = `${API_URL_COMMENTS}/delete/${commentId}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
    });

    console.log('response', response);
    const data = await response.json();
    if (response.status !== 200)
      throw new Error(data[0].errors[0].errorMessage);

    return data.data;
  } catch (err) {
    console.error(`Error with adding product: ${err}`);
  }
}
