import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateIngredient } from '../../../../services/apiIngredients';
import { toast } from 'react-hot-toast';
import { IUpdateIngredientRequest } from '../../../../interfaces/IIngredient';
// import { IProduct } from '../../../../interfaces/IProduct';

interface IUpdateProps {
  product: IUpdateIngredientRequest;
  id: number;
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: updateProductMt } = useMutation({
    mutationFn: ({ product, id }: IUpdateProps) =>
      updateIngredient(product, id),
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
