import { toast } from 'react-hot-toast';
import { API_URL } from '../utils/constants';
import {
  IAddIngredientRequest,
  IUpdateIngredientRequest,
} from '../interfaces/IIngredient';

const API_URL_INGREDIENTS = `${API_URL}/Ingredients`;

export async function getIngredients(ingredientName: string = '') {
  try {
    const parameters =
      ingredientName.length > 0 ? `?Name=${ingredientName}` : '';
    const url = `${API_URL_INGREDIENTS}/getbyName${parameters}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) throw new Error(data.error);

    return data.data;
  } catch (err) {
    console.error(`Error with fetching ingredient: ${err}`);
  }
}

export async function getIngredientById(ingredientId: number) {
  try {
    console.log('fetch Ingredient by id');
    const url = `${API_URL_INGREDIENTS}/getById/${ingredientId}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) throw new Error(data.error);

    return data.data;
  } catch (err) {
    console.error(`Error with fetching Ingredient by id: ${err}`);
  }
}

export async function deleteIngredientById(ingredientId: number) {
  try {
    const url = `${API_URL_INGREDIENTS}/delete/${ingredientId}`;

    const response = await fetch(url, { method: 'delete' });
    const data = await response.json();
    console.log('data elo');
    console.log(data);

    if (data.error) throw new Error(data.error);

    return data.data;
  } catch (err) {
    console.error(`Error with deleting Ingredient: ${err}`);
    toast.error(`${err}`);
  }
}

export async function addIngredient(
  ingredient: IAddIngredientRequest,
  token: string
) {
  try {
    console.log('fetch add product');
    const url = `${API_URL_INGREDIENTS}/add`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
      body: JSON.stringify(ingredient),
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

export async function updateIngredient(
  product: IUpdateIngredientRequest,
  id: number
) {
  try {
    const url = `${API_URL_INGREDIENTS}/update/${id}`;
    console.log(url);

    console.log(JSON.stringify(product));
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    console.log(response);

    const data = await response.json();
    if (data.error) throw new Error(data.error);

    return data.data;
  } catch (err) {
    console.error(`Error with adding product: ${err}`);
  }
}
