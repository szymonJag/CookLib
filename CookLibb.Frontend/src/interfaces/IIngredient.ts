export interface IIngredient {
  id: number;
  name: string;
  kcal: number;
  type: IIngredientType;
}

export interface IRecipeIngredient {
  ingredient: IIngredient;
  amount: number;
  measurement: string;
}

export interface IIngredientRequest {
  name: string;
  kcal: number;
  type: number;
}

export interface IAddIngredientRequest extends IIngredientRequest {}

export interface IUpdateIngredientRequest extends IIngredientRequest {
  id: number;
}

export interface IIngredientType {
  id: number;
  name: string;
}

export interface IAddRecipeIngredient {
  ingredientId: number;
  measurementTypeId: number;
  amount: number;
}
