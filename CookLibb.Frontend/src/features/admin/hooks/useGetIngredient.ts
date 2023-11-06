import { useQuery } from '@tanstack/react-query';
import { getIngredientById } from '../../../services/apiIngredients';
import { IIngredient } from '../../../interfaces/IIngredient';
import { useParams } from 'react-router-dom';

export function useGetProduct() {
  const params = useParams();
  const { productId } = params;

  const { isLoading, data, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getIngredientById(Number(productId)),
    enabled: productId !== typeof undefined,
    // onError: navigate('/error'),
  });

  const product: IIngredient = data;

  return { isLoading, product, error };
}
