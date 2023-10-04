import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { uploadAvatar } from '../../../services/apiUploadImages';

type UploadAvatarParams = {
  images: FileList;
  userId: number;
};

export function useUploadUserAvatar() {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, data } = useMutation({
    mutationFn: ({ images, userId }: UploadAvatarParams) =>
      uploadAvatar(images, userId),
    onSuccess: (data) => {
      if (!data.error) {
        toast.success(`Udało Ci się zalogować na konto ${data.username}`);
      }
      if (data.error) toast.error(`Coś poszło nie tak!`);
      queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
    onError: (err: Error) => {
      toast.error(`Something went wrong. ${err.message}`);
    },
  });

  return { isCreating, data };
}
