import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addIngredient } from '../../../services/apiIngredients';
import { toast } from 'react-hot-toast';
import { IAddIngredientRequest } from '../../../interfaces/IIngredient';
import { useUserContext } from '../../../contexts/UserContext';

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const userContext = useUserContext();
  const token = userContext.token;

  const { isLoading: isCreating, mutate: createProductMt } = useMutation(
    async (product: IAddIngredientRequest) => addIngredient(product, token),
    {
      onSuccess: (data) => {
        console.log(`data`, data);
        toast.success(`Produkt ${data.name} został dodany!`);
        queryClient.invalidateQueries({
          queryKey: ['products'],
        });
      },
      onError: (err: Error) => {
        console.log(`err`, err.message);
        toast.error(
          `Coś poszło nie tak, sprawdź console log po więcej informacji`
        );
      },
    }
  );

  return { isCreating, createProductMt };
}
