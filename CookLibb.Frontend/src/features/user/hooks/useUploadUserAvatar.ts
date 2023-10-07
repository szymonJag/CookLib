import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { uploadAvatar } from '../../../services/apiUploadImages';
import { useUserContext } from '../../../contexts/UserContext';

type UploadAvatarParams = {
  images: FileList;
  userId: number;
};

export function useUploadUserAvatar() {
  const queryClient = useQueryClient();
  const userContext = useUserContext();

  const {
    isLoading: isUploading,
    data,
    mutate: uploadAvatarMt,
  } = useMutation({
    mutationFn: ({ images, userId }: UploadAvatarParams) =>
      uploadAvatar(images, userId),
    onSuccess: (data) => {
      console.log(data);
      if (!data.error) {
        toast.success(`Avatar został zmieniony`);
        userContext.setAvatarUrl(data);
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

  return { isUploading, data, uploadAvatarMt };
}
