import { IIngredient } from '../interfaces/IIngredient';
import { IRecipe } from '../interfaces/IRecipe';
import { IngredientTypes } from './constants';

export const IngredientsData: IIngredient[] = [
  { id: 1, kcal: 123, name: 'chuj', type: IngredientTypes[2] },
  { id: 2, kcal: 321, name: 'penis', type: IngredientTypes[2] },
  { id: 3, kcal: 213, name: 'laga', type: IngredientTypes[4] },
  { id: 4, kcal: 312, name: 'sisior', type: IngredientTypes[2] },
  { id: 5, kcal: 231, name: 'fiut', type: IngredientTypes[5] },
  { id: 6, kcal: 231, name: 'fiutek', type: IngredientTypes[3] },
  { id: 7, kcal: 231, name: 'fiutek', type: IngredientTypes[4] },
  { id: 8, kcal: 231, name: 'fiutek', type: IngredientTypes[4] },
  { id: 9, kcal: 231, name: 'fiutek', type: IngredientTypes[4] },
  { id: 10, kcal: 231, name: 'fiutek', type: IngredientTypes[4] },
  { id: 11, kcal: 231, name: 'fiutek', type: IngredientTypes[4] },
];

export const DefaultRecipe: IRecipe = {
  id: 0,
  name: '',
  preparationTime: 0,
  servingSize: 0,
  createDate: null,
  images: [],
  ingredients: [],
  preparationSteps: [],
  recipeTags: [],
};
