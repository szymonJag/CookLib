import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { uploadImage } from '../../../services/apiUploadImages';

export type uploadImageType = {
  images: FileList;
  recipeId: number;
};

export function useUploadImage() {
  const queryClient = useQueryClient();

  const { isLoading: isUploading, mutate: uploadImageMt } = useMutation(
    // async ({ images, recipeId }: { images: FileList; recipeId: number }) => {
    //   return uploadImage(images, recipeId);
    // },

    {
      mutationFn: ({ images, recipeId }: uploadImageType) =>
        uploadImage(images, recipeId),
      onSuccess: () => {
        toast.success(`Zdjęcia dodały się prawidłowo`);
        queryClient.invalidateQueries({
          queryKey: ['images'],
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

  return { isUploading, uploadImageMt };
}
