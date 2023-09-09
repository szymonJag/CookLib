import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { uploadImage } from '../../../services/apiUploadImages';

type UploadImageParams = {
  images: FileList;
  recipeId: number;
};

export function useUploadImage() {
  const queryClient = useQueryClient();

  const { isLoading: isUploading, mutate: uploadImageMt } = useMutation({
    mutationFn: ({ images, recipeId }: UploadImageParams) =>
      uploadImage(images, recipeId),
    onSuccess: () => {
      toast.success(`Images added`);
      queryClient.invalidateQueries({
        queryKey: ['images'],
      });
    },
    onError: (err: Error) => {
      console.log(`err`, err.message);
      toast.error(`Something went wrong`);
    },
  });

  return { isUploading, uploadImageMt };
}
