import { toast } from 'react-hot-toast';
import { API_URL } from '../utils/constants';
import {
  IAddProductRequest,
  IUpdateProductRequest,
} from '../interfaces/IProduct';

const API_URL_INGREDIENTS = `${API_URL}/Ingredients`;

export async function getProducts(productName: string = '') {
  try {
    const parameters = productName.length > 0 ? `?Name=${productName}` : '';
    const url = `${API_URL_INGREDIENTS}/getbyName${parameters}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) throw new Error(data.error);

    return data.data;
  } catch (err) {
    console.error(`Error with fetching products: ${err}`);
  }
}

export async function getProductById(productId: number) {
  try {
    console.log('fetch product by id');
    const url = `${API_URL_INGREDIENTS}/getById/${productId}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) throw new Error(data.error);

    return data.data;
  } catch (err) {
    console.error(`Error with fetching prduct by id: ${err}`);
  }
}

export async function deleteProductById(productId: number) {
  try {
    const url = `${API_URL_INGREDIENTS}/delete/${productId}`;

    const response = await fetch(url, { method: 'delete' });
    const data = await response.json();
    console.log('data elo');
    console.log(data);

    if (data.error) throw new Error(data.error);

    return data.data;
  } catch (err) {
    console.error(`Error with deleting product: ${err}`);
    toast.error(`${err}`);
  }
}

export async function addProduct(product: IAddProductRequest) {
  try {
    console.log('fetch add product');
    const url = `https://localhost:7059/Ingredients/add`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
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

export async function updateProduct(
  product: IUpdateProductRequest,
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
