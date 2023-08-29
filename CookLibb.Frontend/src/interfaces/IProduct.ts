export interface IProduct {
  id: number;
  name: string;
  kcal: number;
  type: IProductType;
}

export interface IProductRequest {
  name: string;
  kcal: number;
  type: number;
}

export interface IAddProductRequest extends IProductRequest {}

export interface IUpdateProductRequest extends IProductRequest {
  id: number;
}

export interface IProductType {
  id: number;
  name: string;
}
