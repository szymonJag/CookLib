import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct } from '../../../../services/apiProducts';
import { toast } from 'react-hot-toast';
import { IAddProductRequest } from '../../../../interfaces/IProduct';
// import { IProduct } from '../../../../interfaces/IProduct';

// export function useCreateProduct() {
//   const queryClient = useQueryClient();

//   const { isLoading: isCreating, mutate: createProductMt } = useMutation({
//     mutationFn: (product: IAddProductRequest) => addProduct(product),
//     onSuccess: (context) => {
//       if (context.response && context.response.status === 200)
//         toast.success('Produkt został dodany');
//       else toast.error('Coś poszło nie tak');

//       queryClient.invalidateQueries({
//         queryKey: ['products'],
//       });
//     },
//     onError: (err: Error) => toast.error(err.message),
//   });

//   return { isCreating, createProductMt };
// }

export function useCreateProduct() {
  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate: createProductMt } = useMutation(
    async (product: IAddProductRequest) => addProduct(product), // Pass the async addProduct function directly
    {
      onSuccess: (data) => {
        // The data parameter here will hold the response from the addProduct function
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
