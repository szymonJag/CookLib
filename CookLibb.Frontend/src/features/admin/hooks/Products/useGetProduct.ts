import { useQuery } from '@tanstack/react-query';
import { getProductById } from '../../../../services/apiProducts';
import { IProduct } from '../../../../interfaces/IProduct';
import { useParams } from 'react-router-dom';

export function useGetProduct() {
  const params = useParams();
  const { productId } = params;
  console.log('PRODUKT ID');
  console.log(productId);

  const { isLoading, data, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProductById(Number(productId)),
    enabled: productId !== typeof undefined,
    // onError: navigate('/error'),
  });

  const product: IProduct = data;

  return { isLoading, product, error };
}
