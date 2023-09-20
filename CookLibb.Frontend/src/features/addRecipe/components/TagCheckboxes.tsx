import Checkbox from '../../../ui/Checkbox';
import { styled } from 'styled-components';
import { useTags } from '../hooks/useGetTags';
import { useState, useEffect } from 'react';
import { IRecipeTag } from '../../../interfaces/IRecipe';

interface CheckboxesProps {
  selectedTags: number[];
  onTagCheckboxChange: (tagId: number) => void;
}

const CheckboxLayout = styled.div`
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
`;

function TagCheckboxes({ selectedTags, onTagCheckboxChange }: CheckboxesProps) {
  const { isLoading, tags: fetchedTags } = useTags();
  const [tags, setTags] = useState<IRecipeTag[]>([]);

  useEffect(() => {
    if (fetchedTags) setTags(fetchedTags);
  }, [fetchedTags]);

  return (
    <CheckboxLayout>
      {isLoading && <span>{'Trwa ładowannie...'}</span>}

      {tags.map((tag) => (
        <Checkbox
          key={tag.id}
          label={tag.name}
          checked={selectedTags.includes(tag.id)}
          onChange={() => onTagCheckboxChange(tag.id)}
        />
      ))}
    </CheckboxLayout>
  );
}

export default TagCheckboxes;