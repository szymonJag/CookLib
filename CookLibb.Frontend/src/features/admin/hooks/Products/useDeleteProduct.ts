import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProductById } from '../../../../services/apiProducts';
import { toast } from 'react-hot-toast';
// import { IProduct } from '../../../../interfaces/IProduct';

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteProduct } = useMutation({
    mutationFn: deleteProductById,
    onSuccess: () => {
      toast.success('Produkt został usunięty');

      queryClient.invalidateQueries({
        queryKey: ['products'],
      });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return { isDeleting, deleteProduct };
}
