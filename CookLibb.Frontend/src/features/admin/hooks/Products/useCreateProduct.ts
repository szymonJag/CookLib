import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct } from '../../../../services/apiProducts';
import { toast } from 'react-hot-toast';
import { IAddProductRequest } from '../../../../interfaces/IProduct';
// import { IProduct } from '../../../../interfaces/IProduct';

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createProduct } = useMutation({
    mutationFn: (product: IAddProductRequest) => addProduct(product),
    onSuccess: () => {
      toast.success('Produkt został dodany');

      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isCreating, createProduct };
}
