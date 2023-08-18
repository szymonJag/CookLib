import { toast } from 'react-hot-toast';
import { API_URL } from '../utils/constants';
import { IAddProductRequest } from '../interfaces/IProduct';

export async function getProducts(productName: string = '') {
  try {
    const parameters = productName.length > 0 ? `?Name=${productName}` : '';
    const url = `${API_URL}/Ingredients/getbyName${parameters}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) throw new Error(data.error);

    return data.data;
  } catch (err) {
    console.error(`Error with fetching products: ${err}`);
  }
}

export async function deleteProductById(productId: number) {
  try {
    const url = `${API_URL}/Ingredients/delete/${productId}`;

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
    console.log(product);
    const url = `${API_URL}/Ingredients/add`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();

    if (data.error) throw new Error(data.error);

    return data.data;
  } catch (err) {
    console.error(`Error with adding product: ${err}`);
  }
}
