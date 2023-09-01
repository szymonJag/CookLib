import { IAddRecipeRequest } from '../interfaces/IRecipe';
import { API_URL } from '../utils/constants';

const API_URL_RECIPES = `${API_URL}/Recipes`;

export async function addRecipe(recipe: IAddRecipeRequest) {
  try {
    console.log('fetch add recipe');
    const url = `${API_URL_RECIPES}/addRecipe`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
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
