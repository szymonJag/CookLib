import { IPreparationStep } from './IPreparationStep';
import { IAddRecipeIngredient } from './IIngredient';

export interface IRecipeTag {
  id: number;
  name: string;
}

export interface IRecipeRequest {
  name: string;
  preparationTime: number;
  servingSize: number;
}

export interface IAddRecipeRequest extends IRecipeRequest {
  preparationSteps: IPreparationStep[];
  recipeTags: number[];
  authorId: number;
  ingredients: IAddRecipeIngredient[];
}
