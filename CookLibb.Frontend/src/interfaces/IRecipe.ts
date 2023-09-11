import { IPreparationStep } from './IPreparationStep';
import { IAddRecipeIngredient, IIngredient } from './IIngredient';
import { IImage } from './IImages';

export interface IRecipeTag {
  id: number;
  tagId: number;
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

export interface IRecipe {
  id: number;
  name: string;
  servingSize: number;
  preparationTime: number;
  createDate: Date | null;
  ingredients: IIngredient[];
  preparationSteps: IPreparationStep[];
  // comments: IComments;
  recipeTags: IRecipeTag[];
  images: IImage[];
  // author: IUser;
}

export interface IShortRecipe {
  id: number;
  name: string;
  servingSize: number;
  preparationTime: number;
  images: string[];
  recipeTags: IRecipeTag[];
}
