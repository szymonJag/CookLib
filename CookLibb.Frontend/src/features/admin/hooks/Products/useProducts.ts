import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../../../../services/apiProducts';
import { IProduct } from '../../../../interfaces/IProduct';
// import { IProduct } from '../../../../interfaces/IProduct';

export function useProducts() {
  const { isLoading, data, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
  });

  const products: IProduct[] = data;

  return { isLoading, products, error };
}
