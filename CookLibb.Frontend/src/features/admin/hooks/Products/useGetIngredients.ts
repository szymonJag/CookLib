import { useQuery } from '@tanstack/react-query';
import { getIngredients } from '../../../../services/apiIngredients';
import { IIngredient } from '../../../../interfaces/IIngredient';
// import { IProduct } from '../../../../interfaces/IProduct';

export function useIngredients() {
  const { isLoading, data, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => getIngredients(),
  });

  const products: IIngredient[] = data;

  return { isLoading, products, error };
}
