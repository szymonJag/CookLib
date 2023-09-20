import React, { useState, useEffect } from 'react';
import { IRecipeTag } from '../../../interfaces/IRecipe';
import Checkboxes from '../../addRecipe/components/TagCheckboxes';
import Input from '../../../ui/Input';
import FormRow from '../../../ui/FormRow';

interface RecipesFilterProps {
  tags: IRecipeTag[];
  onFilterChange: (nameFilter: string, selectedTags: number[]) => void;
}

function RecipesFilter({ onFilterChange }: RecipesFilterProps) {
  const [nameFilter, setNameFilter] = useState('');
  const [selectedTags, setSelectedTags] = useState<number[]>([]);

  useEffect(() => {
    onFilterChange(nameFilter, selectedTags);
  }, [nameFilter, selectedTags, onFilterChange]);

  const handleTagChange = (tagId: number) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  const handleNameFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNameFilter(event.target.value);
  };

  return (
    <div className='recipes-filter'>
      <FormRow label='Nazwa przepisu'>
        <Input
          type='text'
          value={nameFilter}
          onChange={handleNameFilterChange}
          placeholder='Szukaj po nazwie...'
        />
      </FormRow>
      <div className='tag-filter'>
        <Checkboxes
          selectedTags={selectedTags}
          onTagCheckboxChange={handleTagChange}
        />
      </div>
    </div>
  );
}

export default RecipesFilter;
