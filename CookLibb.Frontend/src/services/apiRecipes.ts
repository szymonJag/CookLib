import {
  IAddRecipeRequest,
  IRecipe,
  IRecipeRequest,
} from '../interfaces/IRecipe';
import { API_URL, RecipeStatus } from '../utils/constants';
import { handleResponse } from './apiBase';

const API_URL_RECIPES = `${API_URL}/Recipes`;
const API_URL_FAVOURITE = `${API_URL}/FavouriteRecipes`;

export async function addRecipe(recipe: IAddRecipeRequest, token: string) {
  try {
    const url = `${API_URL_RECIPES}/addRecipe`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authentication: `${token}`,
        'Access-Control-Allow-Origin': 'no-cors',
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

  return data.data;
}

export async function getShortRecipes(
  recipeName: string = '',
  recipeStatus: RecipeStatus,
  token: string
) {
  try {
    console.log(`recipeStatus`, recipeStatus);

    const nameQuery = recipeName.length > 0 ? `?Name=${recipeName}` : '';
    const statusQuery = recipeStatus
      ? `?Status=${recipeStatus}`
      : `?Status=${RecipeStatus.Wszystkie}`;
    const url = `${API_URL_RECIPES}/getShortAll${nameQuery}${statusQuery}`;

    console.log(url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: `Basic ${token}`,
      },
    });
    const data = await response.json();
    console.log(`data`, data);

    if (data.error) throw new Error(data.error);

    return data.data;
  } catch (err) {
    console.error(`Error with fetching recipe: ${err}`);
  }
}

export async function toggleFavouriteRecipe(recipeId: number, token: string) {
  try {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    headers.append('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    headers.append('Access-Control-Allow-Credentials', 'true');
    headers.append('Authorization', 'Basic ' + token);

    const url = `${API_URL_FAVOURITE}/toggleFavouriteRecipe/${recipeId}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
    });

    const data = await response.json();
    console.log(`data chuj`, data);

    if (response.status !== 200)
      throw new Error(data[0].errors[0].errorMessage);

    return data.data;
  } catch (err) {
    console.error(`Error with adding favourite recipe: ${err}`);
  }
}

export async function getUserFavouritesRecipes(id: number, token: string) {
  try {
    const url = `${API_URL_RECIPES}/getFavouritesByUserId/${id}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: `Basic ${token}`,
        'Access-Control-Allow-Origin': 'no-cors',
      },
    });
    const data = await response.json();

    console.log(`data`, data);

    if (response.status !== 200)
      throw new Error(data[0].errors[0].errorMessage);

    return data.data;
  } catch (err) {
    console.error(err);
  }
}

export async function getRecipesCreatedByUser(userId: number, token: string) {
  try {
    const url = `${API_URL_RECIPES}/getRecipesCreatedByUserId/${userId}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authentication: `Basic ${token}`,
        'Access-Control-Allow-Origin': 'no-cors',
      },
    });
    const data = await response.json();

    if (response.status !== 200)
      throw new Error(data[0].errors[0].errorMessage);

    return data.data;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteCreatedRecipe(userId: number, token: string) {
  try {
    const url = `${API_URL_RECIPES}/deleteRecipeById/${userId}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
        'Access-Control-Allow-Origin': 'no-cors',
      },
    });
    const data = await response.json();

    if (response.status !== 200)
      throw new Error(data[0].errors[0].errorMessage);

    return data.data;
  } catch (err) {
    console.error(err);
  }
}

export async function changeRecipeStatus(
  recipeId: number,
  newStatus: RecipeStatus,
  token: string
) {
  try {
    const url = `${API_URL_RECIPES}/changeRecipeStatus?RecipeId=${recipeId}&NewStatus=${newStatus}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
    });
    const data = await handleResponse(response);

    return data.data;
  } catch (err) {
    console.error(err);
  }
}

export async function editRecipe(
  recipe: IRecipeRequest,
  recipeId: number = 0,
  token: string
) {
  try {
    const url = `${API_URL_RECIPES}/update/${recipeId}`;
    console.log(url);
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(recipe),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${token}`,
      },
    });
    const data = await handleResponse(response);

    return data.data;
  } catch (err) {
    console.error(err);
  }
}
