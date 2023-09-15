import { IAddRecipeRequest, IRecipe } from '../interfaces/IRecipe';
import { API_URL } from '../utils/constants';

const API_URL_RECIPES = `${API_URL}/Recipes`;

export async function addRecipe(recipe: IAddRecipeRequest) {
  try {
    const url = `${API_URL_RECIPES}/addRecipe`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recipe),
    });

    const data = await response.json();

    if (response.status !== 200)
      throw new Error(data[0].errors[0].errorMessage);

    return data.data;
  } catch (err) {
    console.error(`Error with adding product: ${err}`);
  }
}

export async function getRecipeById(id: number): Promise<IRecipe> {
  const url = `${API_URL_RECIPES}/getById/${id}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(`getById`, data);

  return data.data;
}

export async function getShortRecipes(recipeName: string) {
  try {
    const parameters = recipeName.length > 0 ? `?Name=${recipeName}` : '';
    const url = `${API_URL_RECIPES}/getShortAll${parameters}`;

    const response = await fetch(url);
    const data = await response.json();
    console.log(`data`, data);

    if (data.error) throw new Error(data.error);

    return data.data;
  } catch (err) {
    console.error(`Error with fetching recipe: ${err}`);
  }
}
