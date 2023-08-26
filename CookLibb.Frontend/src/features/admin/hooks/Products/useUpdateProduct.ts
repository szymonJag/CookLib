import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProduct } from '../../../../services/apiProducts';
import { toast } from 'react-hot-toast';
import { IUpdateProductRequest } from '../../../../interfaces/IProduct';
// import { IProduct } from '../../../../interfaces/IProduct';

interface IUpdateProps {
  product: IUpdateProductRequest;
  id: number;
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateProductMt } = useMutation({
    mutationFn: ({ product, id }: IUpdateProps) => updateProduct(product, id),
    onSuccess: () => {
      toast.success('Produkt został dodany');

      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isUpdating, updateProductMt };
}
