import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteIngredientById } from '../../../../services/apiIngredients';
import { toast } from 'react-hot-toast';
// import { IProduct } from '../../../../interfaces/IProduct';

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteProduct } = useMutation({
    mutationFn: deleteIngredientById,
    onSuccess: (context) => {
      if (context.response && context.response.status === 400)
        toast.error('Coś poszło nie tak');
      toast.success('Produkt został usunięty');

      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isDeleting, deleteProduct };
}
