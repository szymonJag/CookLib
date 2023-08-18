export interface IProduct {
  id: number;
  name: string;
  kcal: number;
  type: IProductType;
}

export interface IAddProductRequest {
  name: string;
  kcal: number;
  type: number;
}

export interface IProductType {
  id: number;
  name: string;
}
