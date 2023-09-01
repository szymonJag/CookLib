import { useQuery } from '@tanstack/react-query';
import { IRecipeTag } from '../../../interfaces/IRecipe';
import { getTags } from '../../../services/apiTags';

export function useTags() {
  const { isLoading, data, error } = useQuery({
    queryKey: ['tags'],
    queryFn: () => getTags(),
  });

  const tags: IRecipeTag[] = data;

  return { isLoading, tags, error };
}
